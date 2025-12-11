// Modern CV Website - JavaScript

// ===========================
// CARD DECK ANIMATION
// ===========================
const cards = document.querySelectorAll('.cv-card');
let activeCard = null;
let currentRotation = 0;
let rotationInterval;
let isHovering = false;

// Function to arrange cards in deck formation
function arrangeCards() {
    if (activeCard !== null) return;
    
    cards.forEach((card, index) => {
        const rotation = (index - 2) * 8;
        const translateX = (index - 2) * 30;
        const translateY = Math.abs(index - 2) * 10;
        const scale = 1 - (Math.abs(index - 2) * 0.05);
        const zIndex = cards.length - Math.abs(index - 2);
        
        card.style.transform = `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`;
        card.style.zIndex = zIndex;
    });
}

// Initialize card positions on page load
arrangeCards();

// Automatic card rotation animation
function startRotation() {
    rotationInterval = setInterval(() => {
        if (!isHovering && activeCard === null) {
            currentRotation = (currentRotation + 1) % cards.length;
            
            cards.forEach((card, index) => {
                const newIndex = (index - currentRotation + cards.length) % cards.length;
                const rotation = (newIndex - 2) * 8;
                const translateX = (newIndex - 2) * 30;
                const translateY = Math.abs(newIndex - 2) * 10;
                const scale = 1 - (Math.abs(newIndex - 2) * 0.05);
                const zIndex = cards.length - Math.abs(newIndex - 2);
                
                card.style.transform = `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`;
                card.style.zIndex = zIndex;
            });
        }
    }, 2000); // Rotate every 2 seconds
}

// Start the automatic rotation
startRotation();

// Card hover and click event handlers
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        isHovering = true;
    });

    card.addEventListener('mouseleave', () => {
        isHovering = false;
    });

    card.addEventListener('click', (e) => {
        // Don't open fullscreen if clicking on buttons or links
        if (!card.classList.contains('fullscreen') && 
            e.target.tagName !== 'BUTTON' && 
            e.target.tagName !== 'A') {
            card.classList.add('fullscreen');
            activeCard = card;
            clearInterval(rotationInterval);
        }
    });
});

// Close fullscreen card
function closeCard(btn) {
    const card = btn.closest('.cv-card');
    card.classList.remove('fullscreen');
    activeCard = null;
    arrangeCards();
    startRotation();
}

// ===========================
// PROGRESS BAR ANIMATIONS
// ===========================
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        if (targetWidth) {
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = targetWidth + '%';
            }, 300);
        }
    });
}

// Animate progress bars when page loads
window.addEventListener('load', animateProgressBars);

// ===========================
// CHATBOT FUNCTIONALITY
// ===========================
function toggleChatbot() {
    const modal = document.getElementById('chatbotModal');
    modal.classList.toggle('active');
}

function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const messages = document.getElementById('chatbotMessages');
    const userMessage = input.value.trim();

    if (!userMessage) return;

    // Add user message to chat
    const userDiv = document.createElement('div');
    userDiv.className = 'message user';
    userDiv.textContent = userMessage;
    messages.appendChild(userDiv);

    // Clear input field
    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    // Get bot response
    setTimeout(async () => {
        const botDiv = document.createElement('div');
        botDiv.className = 'message bot';
        
        const response = await getGroqResponse(userMessage);
        botDiv.textContent = response;
        
        messages.appendChild(botDiv);
        messages.scrollTop = messages.scrollHeight;
    }, 500);
}

// ===========================
// GROQ API INTEGRATION
// ===========================
async function getGroqResponse(question) {
    // IMPORTANT: Replace with your actual Groq API implementation
    // This is a placeholder function that needs to be connected to Groq API
    
    /*
    ========================================
    GROQ API INTEGRATION GUIDE
    ========================================
    
    1. Get your Groq API key from: https://console.groq.com
    2. Upload your CV documents to: /documents/ directory
    3. Implement RAG (Retrieval Augmented Generation) to search documents
    4. Replace this function with actual API call
    
    Example implementation:
    
    const GROQ_API_KEY = 'YOUR_API_KEY_HERE';
    const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
    
    try {
        // Step 1: Load and search your documents
        const relevantDocs = await searchDocuments(question);
        
        // Step 2: Create context from documents
        const context = relevantDocs.map(doc => doc.content).join('\n\n');
        
        // Step 3: Call Groq API with context
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama3-70b-8192', // or 'mixtral-8x7b-32768'
                messages: [
                    {
                        role: 'system',
                        content: `You are a helpful assistant answering questions about Hector Rodriguez's CV. 
                                  Use the following context to answer questions accurately:
                                  
                                  ${context}`
                    },
                    {
                        role: 'user',
                        content: question
                    }
                ],
                temperature: 0.7,
                max_tokens: 1024
            })
        });
        
        const data = await response.json();
        return data.choices[0].message.content;
        
    } catch (error) {
        console.error('Groq API Error:', error);
        return 'Sorry, I encountered an error. Please try again later.';
    }
    */
    
    // TEMPORARY: Mock responses until you implement Groq API
    const lowerQuestion = question.toLowerCase();
    
    const responses = {
        'experience': 'Hector has extensive experience in data science and AI, including roles as Senior Data Scientist and Data Analyst at leading tech companies.',
        'work': 'Hector has extensive experience in data science and AI, including roles as Senior Data Scientist and Data Analyst at leading tech companies.',
        'job': 'Hector has extensive experience in data science and AI, including roles as Senior Data Scientist and Data Analyst at leading tech companies.',
        'education': 'Hector holds an MSc in Management of Data and Artificial Intelligence and a Bachelor\'s degree in Computer Science. He also has professional certifications in AI.',
        'degree': 'Hector holds an MSc in Management of Data and Artificial Intelligence and a Bachelor\'s degree in Computer Science. He also has professional certifications in AI.',
        'study': 'Hector holds an MSc in Management of Data and Artificial Intelligence and a Bachelor\'s degree in Computer Science. He also has professional certifications in AI.',
        'skill': 'Hector is highly proficient in Python (95%), Machine Learning (90%), SQL & Databases (85%), and Cloud Computing (80%). He also excels in soft skills like Leadership (90%), Communication (95%), Problem Solving (92%), and Teamwork (88%).',
        'python': 'Hector has expert-level proficiency in Python (95%), using it extensively for data science and machine learning projects.',
        'language': 'Hector is multilingual: English (C2 - Proficient), Spanish (C2 - Native), French (C1 - Advanced), and German (B2 - Intermediate).',
        'speak': 'Hector is multilingual: English (C2 - Proficient), Spanish (C2 - Native), French (C1 - Advanced), and German (B2 - Intermediate).',
        'contact': 'You can reach Hector at hector.rodriguez@email.com or call +33 1 23 45 67 89. He\'s also available on LinkedIn at linkedin.com/in/hector-rodriguez',
        'email': 'You can contact Hector via email at hector.rodriguez@email.com',
        'phone': 'You can call Hector at +33 1 23 45 67 89',
        'linkedin': 'You can connect with Hector on LinkedIn at linkedin.com/in/hector-rodriguez',
        'location': 'Hector is based in Paris, France and is available immediately for new opportunities.',
        'available': 'Hector is available immediately for new opportunities and is currently based in Paris, France.',
        'hire': 'Hector is available immediately and ready to start. He brings expertise in data science, AI, and machine learning with proven leadership skills.'
    };
    
    // Search for matching keywords
    for (const [key, value] of Object.entries(responses)) {
        if (lowerQuestion.includes(key)) {
            return value;
        }
    }
    
    // Default response
    return 'I\'d be happy to help! You can ask me about Hector\'s:\n• Work experience\n• Education and degrees\n• Technical and soft skills\n• Language proficiency\n• Contact information\n• Availability';
}

// ===========================
// DOCUMENT SEARCH (FOR GROQ RAG)
// ===========================
async function searchDocuments(query) {
    /*
    This function should:
    1. Load documents from /documents/ directory
    2. Split documents into chunks
    3. Search for relevant chunks using embeddings or keyword search
    4. Return the most relevant chunks
    
    Example implementation:
    
    const documents = await loadDocumentsFromDirectory('/documents/');
    const relevantChunks = await semanticSearch(query, documents);
    return relevantChunks.slice(0, 5); // Return top 5 most relevant chunks
    */
    
    return [];
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Smooth scroll to top when reopening cards
function scrollToTop(element) {
    if (element) {
        element.scrollTop = 0;
    }
}

// Add smooth scroll behavior to cards
cards.forEach(card => {
    card.addEventListener('click', () => {
        scrollToTop(card);
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (!activeCard) {
            arrangeCards();
        }
    }, 250);
});

// Prevent card rotation when user is interacting with content
document.addEventListener('scroll', (e) => {
    if (e.target.classList && e.target.classList.contains('cv-card')) {
        isHovering = true;
        setTimeout(() => {
            isHovering = false;
        }, 1000);
    }
});

// ===========================
// KEYBOARD SHORTCUTS
// ===========================
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close fullscreen card
    if (e.key === 'Escape' && activeCard) {
        activeCard.classList.remove('fullscreen');
        activeCard = null;
        arrangeCards();
        startRotation();
    }
    
    // Press 'C' to toggle chatbot
    if (e.key === 'c' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT') {
        toggleChatbot();
    }
});

// ===========================
// CONSOLE WELCOME MESSAGE
// ===========================
console.log('%c👋 Welcome to Hector\'s CV Website!', 'color: #FF00FF; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out the repository!', 'color: #00FFFF; font-size: 14px;');
console.log('%cKeyboard Shortcuts:', 'color: #00FF7F; font-size: 14px; font-weight: bold;');
console.log('%c  • Press ESC to close fullscreen cards', 'color: #666666; font-size: 12px;');
console.log('%c  • Press C to toggle chatbot', 'color: #666666; font-size: 12px;');