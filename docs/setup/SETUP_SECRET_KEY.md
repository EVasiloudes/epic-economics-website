# Adding Your reCAPTCHA Secret Key & Email Service

You now have the Vercel serverless function set up to handle your contact form with reCAPTCHA verification and Resend email service. Here's how to complete the setup:

## Step 1: Add Secret Key to Local Environment

Add your reCAPTCHA secret key to your `.env.local` file:

```bash
# Your existing site key
REACT_APP_RECAPTCHA_SITE_KEY=your_site_key_here

# Add your secret key (the one you just got from Google)
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

**Important**: Never commit `.env.local` to git - it's already in `.gitignore`.

## Step 2: Add Secret Key to Vercel (Production)

For your production deployment, you need to add the secret key to Vercel's environment variables:

### Option A: Using Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Navigate to your project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `RECAPTCHA_SECRET_KEY`
   - **Value**: Your secret key from Google
   - **Environment**: Production (and Preview if you want)
   - **Sensitive**: ✅ Check this box
5. Click **Save**

### Option B: Using Vercel CLI
```bash
vercel env add RECAPTCHA_SECRET_KEY
# Follow the prompts to add your secret key
```

## Step 3: Test Locally

1. Make sure both keys are in your `.env.local`
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Go to the contact page and submit a test form
4. Check the browser console and terminal for reCAPTCHA verification logs

## Step 4: Deploy to Production

After adding the environment variable to Vercel, deploy your changes:

```bash
vercel --prod
```

Or if you have git connected:
```bash
git add .
git commit -m "Add contact form API endpoint with reCAPTCHA verification"
git push
```

## What Happens Now

✅ **Frontend**: reCAPTCHA v3 runs invisibly when users submit the form
✅ **Backend**: Your Vercel function verifies the CAPTCHA token server-side
✅ **Security**: Rate limiting prevents spam (5 submissions per 15 minutes per IP)
✅ **Validation**: Email format and input sanitization
✅ **Logging**: Form submissions are logged with timestamps
✅ **Email Service**: Resend integration with onboarding@resend.dev (ready to use!)
✅ **Professional Emails**: HTML formatted emails with reply-to functionality

## Email Service Setup (Required)

The contact form is ready to send emails using Resend! You just need to add your API key:

### Get Your Resend API Key:
1. Go to [resend.com](https://resend.com) and sign up
2. Navigate to **API Keys** → **Create API Key**
3. Name it "Epic Economics Contact Form"
4. Copy the API key (starts with `re_`)

### Add to Your Environment:
**Local (.env.local):**
```bash
RESEND_API_KEY=re_your_api_key_here
```

**Production (via CLI):**
```bash
vercel env add RESEND_API_KEY
# Paste your API key when prompted
```

### Current Email Configuration:
- **From**: Epic Economics <onboarding@resend.dev>
- **To**: elias@densetheory.cc
- **Features**: HTML emails, reply-to sender, delivery tracking
- **Status**: Ready to use immediately (no DNS setup required)

## Troubleshooting

### Common Issues:
1. **"reCAPTCHA verification failed"**: Check that both keys are correctly set
2. **"Method not allowed"**: Make sure you're making POST requests to `/api/contact`
3. **CORS errors**: The API includes CORS headers, but check browser console
4. **Rate limiting**: If testing frequently, wait 15 minutes or restart dev server

### Debug Mode:
Check the Vercel function logs:
```bash
vercel logs
```

Or in the Vercel dashboard: Project → Functions → View Function Logs

## Security Notes

- ✅ Secret key is never exposed to frontend
- ✅ Rate limiting prevents abuse
- ✅ Input sanitization prevents XSS
- ✅ HTTPS enforced by Vercel
- ✅ Environment variables are encrypted

Your contact form is now production-ready with enterprise-level spam protection and professional email delivery! 🎉

### What Happens Next:
1. Add your Resend API key
2. Deploy: `vercel --prod`
3. Test the contact form
4. Check your email inbox for form submissions!