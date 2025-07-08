# EmailJS Setup Guide

## Overview
The contact form now uses EmailJS to send emails directly from the frontend without requiring a backend server.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Create a free account (allows 200 emails per month)
3. Verify your email address

### 2. Add Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Note the Service ID** (you'll need this later)

### 3. Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}} ({{from_email}})
Project Type: {{project_type}}

Message:
{{message}}

---
This message was sent from the portfolio contact form.
```

4. **Template Variables to include:**
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{project_type}}` - Project type
   - `{{message}}` - Message content
   - `{{to_name}}` - Recipient name (Seyma Betül Sökemiş)
   - `{{to_email}}` - Recipient email (seymabetulsokel@gmail.com)

5. **Note the Template ID** (you'll need this later)

### 4. Get Public Key
1. Go to **Account** → **General**
2. Find your **Public Key**
3. **Note the Public Key** (you'll need this later)

### 5. Configure Environment Variables
1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 6. Test the Setup
1. Restart your development server: `npm run dev`
2. Navigate to the contact page
3. Fill out and submit the form
4. Check your email for the message

## Security Notes
- The `.env` file is already added to `.gitignore` to prevent committing sensitive data
- EmailJS public keys are meant to be public, but service and template IDs should be kept secure
- The free tier allows 200 emails per month, upgrade if you need more

## Troubleshooting

### Common Issues:
1. **"EmailJS not configured" error**: Check that all environment variables are set correctly
2. **Email not received**: Check your spam folder and verify template configuration
3. **CORS errors**: EmailJS handles CORS automatically, but make sure your domain is allowed in EmailJS settings

### Testing:
- Use the browser's developer tools to check console errors
- EmailJS provides a test mode in their dashboard
- Verify all template variables are correctly mapped

## Support
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Contact form implementation: See `src/views/ContactView.vue`