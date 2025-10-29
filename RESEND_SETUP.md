# Resend Email Setup Guide

Resend is the recommended email service for Vercel projects, created by the Vercel team. This guide will help you set up email functionality for your Epic Economics contact form.

## Why Resend?

- **Built for developers**: Simple, modern API
- **Vercel integration**: Created by the Vercel team, seamless integration
- **Generous free tier**: 3,000 emails/month for free
- **High deliverability**: Built-in SPF, DKIM, and DMARC
- **React Email support**: Create beautiful emails with React components

## Step 1: Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up with your email address
3. Verify your email account

## Step 2: Domain Setup

### Option A: Use Free resend.dev Domain (Quick Start)
- Emails will be sent from `onboarding@resend.dev`
- Good for testing and development
- No domain verification required

### Option B: Use Your Own Domain (Recommended for Production)
1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `epiceconomics.com`)
4. Add the provided DNS records to your domain:
   - **MX Record**: `feedback-smtp.resend.com`
   - **TXT Record**: SPF record for authentication
   - **CNAME Records**: DKIM records for signing
5. Wait for verification (usually takes a few minutes)

### DNS Records Example:
```
Type    Name                Value
MX      @                   feedback-smtp.resend.com
TXT     @                   "v=spf1 include:_spf.resend.com ~all"
CNAME   resend1._domainkey  resend1.resend.com
CNAME   resend2._domainkey  resend2.resend.com
```

## Step 3: Get API Key

1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Give it a name (e.g., "Epic Economics Contact Form")
4. Choose permissions:
   - **Domain**: Select your domain or "All domains"
   - **Permission**: "Sending access" (default)
5. Click **Add**
6. **Copy the API key** (you won't see it again!)

## Step 4: Add to Environment Variables

### Local Development (.env.local)
Add to your `.env.local` file:
```bash
RESEND_API_KEY=re_your_api_key_here
```

### Production (Vercel)
Add to Vercel environment variables:

**Via Vercel Dashboard:**
1. Go to your Vercel project
2. **Settings** → **Environment Variables**
3. Add new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your Resend API key
   - **Environment**: Production (and Preview)
   - **✅ Mark as Sensitive**

**Via Vercel CLI:**
```bash
vercel env add RESEND_API_KEY
# Enter your API key when prompted
```

## Step 5: Update Email Configuration

Edit the `api/contact.js` file to customize the email settings:

```javascript
const result = await resend.emails.send({
  from: 'Epic Economics <contact@yourdomain.com>', // Update this
  to: ['elias@densetheory.cc'], // Your email address
  subject: `Contact Form: ${subject}`,
  html: emailContent,
  replyTo: email, // Sender's email for replies
});
```

### Important: Update the "from" address
- If using your own domain: `Epic Economics <contact@yourdomain.com>`
- If using resend.dev: `Epic Economics <onboarding@resend.dev>`

## Step 6: Test Email Functionality

1. Make sure all environment variables are set
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Submit a test contact form
4. Check your email inbox
5. Check Resend dashboard for delivery status

## Step 7: Deploy to Production

```bash
vercel --prod
```

Or if you have git connected:
```bash
git add .
git commit -m "Add Resend email service to contact form"
git push
```

## Monitoring and Analytics

### Resend Dashboard Features:
- **Logs**: View all sent emails and their status
- **Analytics**: Open rates, click rates, bounce rates
- **Suppressions**: Manage bounced/complained emails
- **Webhooks**: Get notified of email events

### Email Status Codes:
- ✅ **Delivered**: Email successfully delivered
- ⏳ **Queued**: Email is being processed
- ❌ **Bounced**: Email address invalid or inbox full
- 🚫 **Complained**: Recipient marked as spam

## Customizing Email Templates

The current implementation sends a simple HTML email. You can enhance it:

### Option 1: Improve HTML Template
```javascript
const emailContent = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #667eea;">New Contact Form Submission</h2>
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <div>
        <strong>Message:</strong>
        <div style="margin-top: 10px; padding: 15px; background: white; border-radius: 4px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
      </div>
    </div>
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
    <p style="color: #666; font-size: 14px;">
      <em>Sent from Epic Economics contact form at ${new Date().toLocaleString()}</em>
    </p>
  </div>
`;
```

### Option 2: Use React Email (Advanced)
```bash
npm install react-email @react-email/components
```

Create email templates with React components for professional-looking emails.

## Troubleshooting

### Common Issues:

1. **"API key is invalid"**
   - Check that the API key is correctly set in environment variables
   - Ensure no extra spaces or characters

2. **"Domain not verified"**
   - Check DNS records are correctly added
   - Wait up to 24 hours for DNS propagation
   - Use the resend.dev domain for testing

3. **Emails not being delivered**
   - Check Resend logs for bounce/complaint status
   - Verify recipient email address
   - Check spam folder

4. **"From address not verified"**
   - Ensure the "from" email uses your verified domain
   - Or use `onboarding@resend.dev` for testing

### Debug Mode:
Add logging to see what's happening:
```javascript
console.log('Sending email with Resend API key:', process.env.RESEND_API_KEY ? 'Set' : 'Not set');
console.log('Email result:', result);
```

## Pricing

### Free Tier:
- 3,000 emails per month
- All features included
- Perfect for most contact forms

### Pro Plans:
- $20/month for 50,000 emails
- $80/month for 200,000 emails
- Additional features: Custom domains, priority support

## Security Best Practices

1. **Protect API Keys**: Never expose in frontend code
2. **Rate Limiting**: Already implemented in the contact form
3. **Input Sanitization**: Already handled in the API
4. **HTTPS Only**: Enforced by Vercel
5. **Monitor Usage**: Check Resend dashboard regularly

## Alternative Email Services

If you prefer other services:
- **SendGrid**: `npm install @sendgrid/mail`
- **Mailgun**: `npm install mailgun.js`
- **AWS SES**: `npm install @aws-sdk/client-ses`
- **Nodemailer**: `npm install nodemailer` (requires SMTP)

## Support

- [Resend Documentation](https://resend.com/docs)
- [Resend Discord Community](https://discord.gg/resend)
- [Vercel + Resend Guide](https://vercel.com/guides/resend-vercel)

Your contact form is now ready to send professional emails! 📧