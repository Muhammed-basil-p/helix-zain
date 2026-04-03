# Email Setup Instructions

## Option 1: EmailJS (Recommended - Works with static files)

1. **Sign up for EmailJS** (free):
   - Go to https://www.emailjs.com/
   - Create a free account

2. **Create an Email Service**:
   - Go to "Email Services" in your dashboard
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions
   - Note your **Service ID**

3. **Create an Email Template**:
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template:
     ```
     Subject: New Contact Form Submission from Helix-Zain Website
     
     From: {{from_name}} ({{from_email}})
     Phone: {{phone}}
     Subject: {{subject}}
     
     Message:
     {{message}}
     
     ---
     Reply to: {{reply_to}}
     ```
   - Set "To Email" to: `basilbasheermuhammad@gmail.com`
   - Note your **Template ID**

4. **Get your Public Key**:
   - Go to "Account" → "General"
   - Copy your **Public Key**

5. **Update the code**:
   - Open `js/script.js`
   - Replace `YOUR_PUBLIC_KEY` with your EmailJS Public Key
   - Replace `YOUR_SERVICE_ID` with your Service ID
   - Replace `YOUR_TEMPLATE_ID` with your Template ID

## Option 2: Use a Local Server (For FormSubmit)

If you prefer to use FormSubmit (which was in the original code), you need to run your site through a local web server:

### Using Python (if installed):
```bash
# Navigate to your project folder
cd C:\Users\AIM\Desktop\helixion

# Python 3
python -m http.server 8000

# Then open: http://localhost:8000/contact.html
```

### Using Node.js (if installed):
```bash
# Install http-server globally (one time)
npm install -g http-server

# Navigate to your project folder
cd C:\Users\AIM\Desktop\helixion

# Start server
http-server

# Then open the URL shown (usually http://localhost:8080/contact.html)
```

### Using PHP (if installed):
```bash
# Navigate to your project folder
cd C:\Users\AIM\Desktop\helixion

# Start server
php -S localhost:8000

# Then open: http://localhost:8000/contact.html
```

## Current Setup

The contact form is currently configured to use **EmailJS**. Follow Option 1 above to complete the setup.

