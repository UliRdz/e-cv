Modern CV Website - Hector Ulises Rodriguez Garcia
A modern, responsive CV website with animated card deck interface and AI-powered chatbot integration.
🌟 Features

Responsive Two-Column Layout

Left (33%): Professional profile photo with header information
Right (67%): Animated rotating card deck with CV sections


5 Interactive CV Cards

Academic Achievements & Degrees
Professional Experience
Language Proficiency
Skills & Expertise
Contact Information


Dynamic Animations

Automatic card rotation (clockwise)
Hover effects pause rotation
Click to expand cards to fullscreen
Smooth transitions and progress bar animations


AI Chatbot Integration

Powered by Groq API
RAG (Retrieval Augmented Generation) for accurate responses
Answers questions about CV content



📁 Project Structure
cv-website/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # Main JavaScript functionality
├── config.js           # Groq API configuration
├── README.md           # This file
├── assets/
│   └── images/         # Place your images here
│       ├── profile-photo.jpg
│       ├── university-logo-1.png
│       ├── company-logo-1.png
│       ├── flag-english.png
│       ├── icon-python.png
│       └── ... (other icons)
└── documents/          # CV documents for chatbot
    ├── cv.pdf
    ├── resume.pdf
    └── ... (other documents)
🚀 Setup Instructions
1. Basic Setup

Clone or download the project files
Create the folder structure as shown above
Add your images to assets/images/
Update content in index.html with your information

2. Image Replacement
Replace the emoji placeholders with your actual images:
html<!-- In index.html, replace: -->
<span>🎓</span>
<!-- With: -->
<img src="assets/images/university-logo.png" alt="University Logo">
Required Images:

profile-photo.jpg - Your professional photo (3:4 aspect ratio recommended)
University/company logos for education and experience sections
Flag icons for language proficiency
Skill icons (Python, ML, SQL, etc.)
Contact icons (email, phone, LinkedIn, etc.)

3. Groq API Setup (Chatbot)
Option A: Full Groq API Integration

Get API Key:

Sign up at https://console.groq.com
Generate an API key


Configure API:

javascript   // In config.js, update:
   const GROQ_CONFIG = {
       apiKey: 'YOUR_ACTUAL_API_KEY',
       apiUrl: 'https://api.groq.com/openai/v1/chat/completions',
       model: 'llama3-70b-8192',
       temperature: 0.7,
       maxTokens: 1024
   };

Add Documents:

Place CV documents in /documents/ directory
Update DOCUMENTS array in config.js
Supported formats: PDF, TXT, MD


Integrate with script.js:

javascript   // Replace getGroqResponse() function in script.js
   async function getGroqResponse(question) {
       return await callGroqAPI(question);
   }
Option B: Simple Fallback (No API Required)
The chatbot includes a rule-based fallback that works without API:

Uses keyword matching
Provides pre-written responses
No API key needed
Already implemented in config.js

4. Customization
Colors
All colors follow your specified palette in styles.css:

Primary: #FFFFFF (white)
Text: #000000 (black)
Secondary Text: #666666 / #888888
Accent Gradient 1: #FF00FF → #FF6EC7 (Pink)
Accent Gradient 2: #00FFFF → #00BFFF (Cyan)
Accent Gradient 3: #00FF7F → #32CD32 (Green)
Success: #4CAF50
Error: #FF4C4C

Content
Edit index.html to update:

Personal information
Education entries
Work experience
Skills and proficiency levels
Contact details

Animation Speed
In script.js, adjust the rotation interval:
javascript}, 2000); // Change from 2000ms (2 seconds) to your preference
🎨 Color Scheme Reference
CategoryHex CodeUsagePrimary Background#FFFFFFPage background, containersPrimary Text#000000Headlines, body textSecondary Text#666666 / #888888Subheadings, labelsAccent Gradient 1#FF00FF → #FF6EC7Highlights, hover effectsAccent Gradient 2#00FFFF → #00BFFFInteractive elementsAccent Gradient 3#00FF7F → #32CD32Motion effects, iconsNeutral Gray#F5F5F5 / #E0E0E0Dividers, cardsSuccess Green#4CAF50Positive feedbackError Red#FF4C4CAlerts
⌨️ Keyboard Shortcuts

ESC - Close fullscreen card
C - Toggle chatbot

📱 Responsive Design
The website is fully responsive and works on:

Desktop (1200px+)
Tablet (768px - 1200px)
Mobile (< 768px)

🌐 Deployment
GitHub Pages

Create a repository
Upload all files
Go to Settings → Pages
Select branch and root folder
Save and wait for deployment

Other Platforms
Compatible with:

Netlify
Vercel
Firebase Hosting
Any static hosting service

🔧 Browser Support

Chrome (latest)
Firefox (latest)
Safari (latest)
Edge (latest)

📝 License
This project is free to use and modify for personal CV websites.
🤝 Support
For questions or issues:

Check the code comments
Review the setup instructions
Test with the simple chatbot fallback first

🎯 Tips

Images: Use high-quality images (PNG for logos, JPG for photos)
Performance: Optimize images before uploading (compress to < 500KB)
Content: Keep descriptions concise and impactful
Testing: Test on multiple devices before deploying
SEO: Add meta tags in <head> for better visibility

📊 Progress Bar Levels
Language/Skill levels translate to percentages:

A1: 20%
A2: 40%
B1: 60%
B2: 70%
C1: 85%
C2: 95-100%

Update the data-width attribute in HTML to change levels.
