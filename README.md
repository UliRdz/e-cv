CV Website - Ulises Rodriguez
CV website with animated card deck interface and AI-powered chatbot integration

Features
Responsive Two-Column Layout

Left (33%): Professional profile photo with header information
Right (67%): Animated rotating card deck with CV sections


Dynamic Animations

Automatic card rotation (clockwise)
Hover effects pause rotation
Click to expand cards to fullscreen
Smooth transitions and progress bar animations


AI Chatbot Integration

Powered by Groq API
RAG (Retrieval Augmented Generation) for accurate responses
Answers questions about CV content



Project Structure
cv-website/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # Main JavaScript functionality
├── config.js           # Groq API configuration
├── README.md           # This file
├── assets/
│   └── images/         
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

Customization
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

