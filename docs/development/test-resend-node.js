// Node.js test script for Resend functionality
// This script tests the contact form API endpoint

// We'll use node-fetch to make the API call
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const testData = {
  name: "Test User",
  email: "test@example.com", 
  subject: "Test Email from Resend Implementation",
  message: "This is a test message to verify that the Resend email functionality is working properly. If you receive this email, the implementation is successful!",
  recaptchaToken: null  // null for testing without reCAPTCHA
};

console.log("Testing Resend functionality...");
console.log("Sending test data:", JSON.stringify(testData, null, 2));

// Wait a moment for server to be ready
setTimeout(async () => {
  try {
    // Make a POST request to the contact API endpoint
    const response = await fetch('http://localhost:5173/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    const data = await response.json();
    console.log('Response from API:', data);
    
    if (data.success) {
      console.log('✅ SUCCESS: Email functionality is working!');
      if (data.emailId) {
        console.log(`Email ID: ${data.emailId}`);
      } else {
        console.log('(Note: Email was not sent because RESEND_API_KEY is not configured)');
      }
    } else {
      console.log('❌ ERROR: Something went wrong.');
      console.error('Error details:', data.error);
    }
  } catch (error) {
    console.error('Network error:', error);
    console.log('Make sure the development server is running on http://localhost:5173');
  }
}, 2000);  // Wait 2 seconds before testing