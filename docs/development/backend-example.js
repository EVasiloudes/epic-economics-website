// Backend Example for reCAPTCHA Verification
// This is an example Node.js/Express backend for handling contact form submissions with reCAPTCHA verification

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

// Environment variables (add these to your .env file)
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const EMAIL_SERVICE_API_KEY = process.env.EMAIL_SERVICE_API_KEY; // For services like SendGrid, Mailgun, etc.

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting - prevent spam
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many contact form submissions, please try again later.'
  }
});

// Apply rate limiting to contact endpoint
app.use('/api/contact', contactLimiter);

// Verify reCAPTCHA token
async function verifyRecaptcha(token, userIP) {
  try {
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', {
      secret: RECAPTCHA_SECRET_KEY,
      response: token,
      remoteip: userIP
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { success, score, action } = response.data;
    
    // For reCAPTCHA v3, check the score (0.0 - 1.0, higher is better)
    // Typical threshold is 0.5, but you can adjust based on your needs
    return {
      success,
      score,
      action,
      isValid: success && score >= 0.5 && action === 'contact_form'
    };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, isValid: false, error: error.message };
  }
}

// Send email function (example using a generic email service)
async function sendContactEmail(formData) {
  // This is a placeholder - replace with your preferred email service
  // Examples: SendGrid, Mailgun, AWS SES, Nodemailer with SMTP, etc.
  
  try {
    // Example with SendGrid:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(EMAIL_SERVICE_API_KEY);
    // 
    // const msg = {
    //   to: 'contact@epiceconomics.com',
    //   from: 'noreply@epiceconomics.com',
    //   subject: `Contact Form: ${formData.subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${formData.name}</p>
    //     <p><strong>Email:</strong> ${formData.email}</p>
    //     <p><strong>Subject:</strong> ${formData.subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${formData.message.replace(/\n/g, '<br>')}</p>
    //   `
    // };
    // 
    // await sgMail.send(msg);

    console.log('Email would be sent with data:', formData);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
}

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message, recaptchaToken } = req.body;
    const userIP = req.ip || req.connection.remoteAddress;

    // Validate required fields
    if (!name || !email || !subject || !message || !recaptchaToken) {
      return res.status(400).json({
        success: false,
        error: 'All fields including reCAPTCHA are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Verify reCAPTCHA
    const recaptchaResult = await verifyRecaptcha(recaptchaToken, userIP);
    
    if (!recaptchaResult.isValid) {
      console.log('reCAPTCHA verification failed:', recaptchaResult);
      return res.status(400).json({
        success: false,
        error: 'reCAPTCHA verification failed. Please try again.'
      });
    }

    console.log(`reCAPTCHA verified successfully. Score: ${recaptchaResult.score}`);

    // Send email
    const emailResult = await sendContactEmail({ name, email, subject, message });
    
    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to send email. Please try again later.'
      });
    }

    // Log successful submission (consider using a proper logging service)
    console.log(`Contact form submitted successfully by ${email} at ${new Date().toISOString()}`);

    res.json({
      success: true,
      message: 'Your message has been sent successfully!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;

// To use this backend:
// 1. Install dependencies: npm install express cors axios express-rate-limit
// 2. Set up environment variables in .env:
//    - RECAPTCHA_SECRET_KEY=your_secret_key_from_google
//    - EMAIL_SERVICE_API_KEY=your_email_service_key
// 3. Choose and configure an email service (SendGrid, Mailgun, etc.)
// 4. Deploy to your preferred hosting service (Vercel, Heroku, AWS, etc.)
// 5. Update your frontend to point to this API endpoint