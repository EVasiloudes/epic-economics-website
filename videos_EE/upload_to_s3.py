#!/usr/bin/env python3
\"\"\"Script to upload MP4 files to S3 and make them publicly accessible.

Generates a text file with public URLs.
\"\"\"

import boto3
import os
from botocore.exceptions import ClientError


def create_s3_bucket_if_not_exists(bucket_name, region='eu-north-1'):
    \"\"\"Create an S3 bucket if it doesn't exist.\"\"\"
    s3_client = boto3.client('s3', region_name=region)
    try:
        # Check if bucket exists
        s3_client.head_bucket(Bucket=bucket_name)
        print(f\"Bucket {bucket_name} already exists.\")
        return True
    except ClientError as e:
        error_code = int(e.response['Error']['Code'])
        if error_code == 404:
            print(f\"Creating bucket {bucket_name}...\")
            try:
                if region == 'us-east-1':
                    # us-east-1 doesn't need LocationConstraint
                    s3_client.create_bucket(Bucket=bucket_name)
                else:
                    s3_client.create_bucket(
                        Bucket=bucket_name, CreateBucketConfiguration={
                            'LocationConstraint': region})
                print(f\"Bucket {bucket_name} created successfully.\")
                return True
            except ClientError as e:
                print(f\"Error creating bucket: {e}\")
                return False
        else:
            print(f\"Error checking bucket: {e}\")
            return False


def set_bucket_public_policy(bucket_name):
    \"\"\"Set the bucket policy to allow public read access.\"\"\"
    s3_client = boto3.client('s3')
    bucket_policy = {
        'Version': '2012-10-17',
        'Statement': [{
            'Sid': 'PublicReadGetObject',
            'Effect': 'Allow',
            'Principal': '*',
            'Action': 's3:GetObject',
            'Resource': f'arn:aws:s3:::{bucket_name}/*'
        }]
    }
    try:
        s3_client.put_bucket_policy(
            Bucket=bucket_name, Policy=str(bucket_policy).replace(\"'\", '\"'))
        print(f\"Public read policy set for bucket {bucket_name}\")
        return True
    except ClientError as e:
        print(f\"Error setting bucket policy: {e}\")
        return False


def upload_file_to_s3(file_path, bucket_name, object_name=None, public=False):
    \"\"\"Upload a file to an S3 bucket and optionally make it public.\"\"\"
    s3_client = boto3.client('s3')
    if object_name is None:
        object_name = os.path.basename(file_path)
    try:
        # Upload file
        s3_client.upload_file(file_path, bucket_name, object_name)
        # Set object ACL to public-read if requested
        if public:
            s3_client.put_object_acl(
                Bucket=bucket_name, Key=object_name, ACL='public-read')
        # Generate public URL
        public_url = f\"https://{bucket_name}.s3.{boto3.Session().region_name}.amazonaws.com/{object_name}\"
        print(f\"File {file_path} uploaded successfully to {public_url}\")
        return public_url
    except ClientError as e:
        print(f\"Error uploading file {file_path}: {e}\")
        return None


def main():
    # Define bucket name (you can change this as needed)
    bucket_name = 'epic-economics-videos'
    # Get all MP4 files in current directory
    mp4_files = [f for f in os.listdir('.') if f.lower().endswith('.mp4')]
    if not mp4_files:
        print('No MP4 files found in the current directory.')
        return
    print(f\"Found {len(mp4_files)} MP4 file(s): {mp4_files}\")
    # Create bucket if it doesn't exist
    if not create_s3_bucket_if_not_exists(bucket_name):
        print('Failed to create or access the S3 bucket. Exiting.')
        return
    # Set public policy for the bucket
    set_bucket_public_policy(bucket_name)
    # Upload each file and collect URLs
    urls = []
    for mp4_file in mp4_files:
        print(f\"\nUploading {mp4_file}...\")
        public_url = upload_file_to_s3(mp4_file, bucket_name, public=True)
        if public_url:
            urls.append(public_url)
    # Write URLs to a text file
    with open('s3_urls.txt', 'w') as f:
        for url in urls:
            f.write(url + '\n')
    print(f\"\nPublic URLs written to s3_urls.txt:\")
    for url in urls:
        print(url)


if __name__ == \"__main__\":
    main()