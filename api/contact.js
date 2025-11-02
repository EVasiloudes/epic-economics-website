// Vercel Serverless Function for Contact Form with reCAPTCHA Verification
// File: api/contact.js

import { Resend } from 'resend';

// Rate limiting storage (in production, consider using Redis or a database)
const rateLimitMap = new Map();

// Rate limiting function
function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  const userLimit = rateLimitMap.get(ip);

  if (now > userLimit.resetTime) {
    // Reset the window
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (userLimit.count >= maxRequests) {
    return true;
  }

  userLimit.count++;
  return false;
}

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Send email using Resend
async function sendContactEmail(formData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping email sending');
    return { success: true, message: 'Email service not configured' };
  }

  try {
    const { name, email, subject, message } = formData;

    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><em>Sent from Epic Economics contact form</em></p>
    `;

    const result = await resend.emails.send({
      from: 'Epic Economics <contact@epic-economics.dimis.org>', // Using Resend's free domain
      to: ['elias@densetheory.cc'], // Your email address
      subject: `Contact Form: ${subject}`,
      html: emailContent,
      replyTo: email, // Allow replying directly to the sender
    });

    console.log('Email sent successfully:', result.id);
    return { success: true, emailId: result.id };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
}

// Verify reCAPTCHA token
async function verifyRecaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn('RECAPTCHA_SECRET_KEY not configured, skipping verification');
    return { success: true, score: 1.0, isValid: true };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await response.json();
    const { success, score, action } = data;

    // For reCAPTCHA v3, check the score (0.0 - 1.0, higher is better)
    // Typical threshold is 0.5, but you can adjust based on your needs
    return {
      success,
      score: score || 0,
      action,
      isValid: success && (score >= 0.5) && (action === 'contact_form')
    };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, isValid: false, error: error.message };
  }
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sanitize input to prevent XSS
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // Remove < and > characters
    .trim()
    .substring(0, 1000); // Limit length
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const userIP = req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';

    // Check rate limiting
    if (isRateLimited(userIP)) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please try again later.'
      });
    }

    const { name, email, subject, message, recaptchaToken } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message)
    };

    // Verify reCAPTCHA if token is provided
    if (recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken);

      if (!recaptchaResult.isValid) {
        console.log('reCAPTCHA verification failed:', {
          success: recaptchaResult.success,
          score: recaptchaResult.score,
          action: recaptchaResult.action
        });

        return res.status(400).json({
          success: false,
          error: 'Security verification failed. Please try again.'
        });
      }

      console.log(`reCAPTCHA verified successfully. Score: ${recaptchaResult.score}`);
    }

    // Send email using Resend
    console.log('Contact form submission:', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      subject: sanitizedData.subject,
      timestamp: new Date().toISOString(),
      ip: userIP
    });

    const emailResult = await sendContactEmail(sanitizedData);

    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error);
      return res.status(500).json({
        success: false,
        error: 'Failed to send email. Please try again later.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully! We\'ll get back to you soon.',
      emailId: emailResult.emailId
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.'
    });
  }
}
