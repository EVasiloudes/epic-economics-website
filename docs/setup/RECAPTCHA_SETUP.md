# reCAPTCHA Setup Guide

This guide will help you set up Google reCAPTCHA v3 for the Epic Economics contact form to prevent spam submissions.

## Why reCAPTCHA v3?

- **Invisible to users**: No clicking checkboxes or solving puzzles
- **Better user experience**: Seamless form submission
- **Advanced protection**: Uses machine learning to detect bots
- **Score-based**: Returns a score (0.0-1.0) indicating likelihood of being human

## Step 1: Get reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)
2. Click "Create" to add a new site
3. Fill out the form:
   - **Label**: Epic Economics Website
   - **reCAPTCHA type**: Select "reCAPTCHA v3"
   - **Domains**: Add your domains:
     - `localhost` (for development)
     - Your production domain (e.g., `epiceconomics.com`)
     - Your Vercel domain (e.g., `epic-economics-website.vercel.app`)
4. Accept the Terms of Service
5. Click "Submit"

You'll receive two keys:
- **Site Key**: Used in the frontend (public)
- **Secret Key**: Used in the backend (private, never expose this)

## Step 2: Frontend Setup

### 2.1 Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Site Key to `.env.local`:
   ```
   REACT_APP_RECAPTCHA_SITE_KEY=your_site_key_here
   ```

### 2.2 Verify Installation

The reCAPTCHA package is already installed:
```bash
npm list react-google-recaptcha-v3
```

If not installed, run:
```bash
npm install react-google-recaptcha-v3
```

## Step 3: Backend Setup (Optional but Recommended)

For production use, you should verify the reCAPTCHA token on your backend.

### 3.1 Environment Variables for Backend

Add to your backend `.env` file:
```
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

### 3.2 Backend Implementation

See `backend-example.js` for a complete Node.js/Express example that includes:
- reCAPTCHA token verification
- Rate limiting
- Email sending
- Error handling

### 3.3 API Endpoint

Create an endpoint to handle form submissions:
```javascript
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "Test message",
  "recaptchaToken": "token_from_frontend"
}
```

## Step 4: Frontend Integration

Update your contact form to call your backend API:

```javascript
// In Contact.jsx, replace the simulation with:
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ...formData, recaptchaToken })
});

const result = await response.json();

if (result.success) {
  setSubmitStatus('success');
  setFormData({ name: '', email: '', subject: '', message: '' });
} else {
  setSubmitStatus('error');
}
```

## Step 5: Testing

### 5.1 Development Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to the contact page and submit the form
3. Check the browser console for reCAPTCHA logs
4. Verify the reCAPTCHA badge appears in the bottom right

### 5.2 Production Testing

1. Deploy your changes
2. Test form submission on your live site
3. Monitor reCAPTCHA analytics in the Google admin console

## Step 6: Monitoring and Analytics

### 6.1 reCAPTCHA Admin Console

Visit the [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin) to:
- View submission statistics
- Monitor score distributions
- Adjust score thresholds
- Check for suspicious activity

### 6.2 Score Interpretation

- **0.9-1.0**: Very likely human
- **0.7-0.8**: Likely human
- **0.5-0.6**: Neutral (default threshold)
- **0.1-0.4**: Likely bot
- **0.0-0.1**: Very likely bot

### 6.3 Adjusting Thresholds

You can adjust the score threshold in your backend:
```javascript
// In backend verification
const isValid = success && score >= 0.5; // Adjust 0.5 as needed
```

## Troubleshooting

### Common Issues

1. **"reCAPTCHA couldn't find user-provided function"**
   - Ensure the site key is correct
   - Check that the domain is added to reCAPTCHA admin

2. **Low scores for legitimate users**
   - Lower the threshold (e.g., from 0.5 to 0.3)
   - Check if users have JavaScript disabled

3. **reCAPTCHA badge not showing**
   - Verify the site key is set in environment variables
   - Check browser console for errors

### Debug Mode

Enable debug logging by adding to your console:
```javascript
console.log('reCAPTCHA score:', recaptchaResult.score);
console.log('reCAPTCHA action:', recaptchaResult.action);
```

## Security Best Practices

1. **Never expose the secret key** in frontend code
2. **Always verify tokens on the backend** - frontend verification can be bypassed
3. **Use HTTPS** for all reCAPTCHA requests
4. **Implement rate limiting** to prevent abuse
5. **Monitor analytics** for unusual patterns
6. **Set appropriate score thresholds** based on your traffic

## Alternative CAPTCHA Solutions

If you prefer alternatives to Google reCAPTCHA:

- **hCaptcha**: Privacy-focused, GDPR compliant
- **Cloudflare Turnstile**: Privacy-first, no personal data collection
- **FriendlyCaptcha**: GDPR compliant, uses proof-of-work instead of tracking

## Support

- [reCAPTCHA Documentation](https://developers.google.com/recaptcha/docs/v3)
- [reCAPTCHA FAQ](https://developers.google.com/recaptcha/docs/faq)
- [React reCAPTCHA v3 Package](https://github.com/t49tran/react-google-recaptcha-v3)

---

**Note**: The contact form will work without reCAPTCHA if no site key is provided, but for production use, implementing CAPTCHA protection is highly recommended to prevent spam.