// Test script for Resend functionality
// This simulates a contact form submission to test the Resend implementation

const testData = {
  name: "Test User",
  email: "test@example.com",
  subject: "Test Email from Resend Implementation",
  message: "This is a test message to verify that the Resend email functionality is working properly. If you receive this email, the implementation is successful!",
  recaptchaToken: null  // null for testing without reCAPTCHA
};

console.log("Testing Resend functionality...");
console.log("Sending test data:", JSON.stringify(testData, null, 2));

// Make a POST request to the contact API endpoint
fetch('http://localhost:5173/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData)
})
.then(response => response.json())
.then(data => {
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
})
.catch(error => {
  console.error('Network error:', error);
  console.log('Make sure the development server is running on http://localhost:5173');
});