// ===========================
// GROQ API CONFIGURATION
// ===========================

/*
 * SETUP INSTRUCTIONS:
 * 
 * 1. Get your Groq API key from https://console.groq.com
 * 2. Replace 'YOUR_GROQ_API_KEY_HERE' with your actual API key
 * 3. Upload your CV documents to the /documents/ directory
 * 4. Update the DOCUMENTS array with your file paths
 */

const GROQ_CONFIG = {
    apiKey: 'YOUR_GROQ_API_KEY_HERE',
    apiUrl: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama3-70b-8192', // Options: 'llama3-70b-8192', 'llama3-8b-8192', 'mixtral-8x7b-32768'
    temperature: 0.7,
    maxTokens: 1024
};

// List of documents to be loaded for RAG
const DOCUMENTS = [
    '/documents/cv.pdf',
    '/documents/resume.pdf',
    '/documents/portfolio.pdf',
    '/documents/certifications.pdf',
    // Add more document paths as needed
];

// System prompt for the chatbot
const SYSTEM_PROMPT = `You are a helpful AI assistant answering questions about Hector Ulises Rodriguez Garcia's CV and professional background.

Your role is to:
- Provide accurate information based on the CV documents
- Be professional and concise
- Highlight Hector's key strengths and qualifications
- Answer questions about his experience, education, skills, and availability
- If you don't know something, politely say so instead of making up information

Hector's key information:
- Name: Hector Ulises Rodriguez Garcia
- Current Status: Available Immediately
- Location: Paris, France
- Education: MSc in Management of Data and Artificial Intelligence
- Languages: English (C2), Spanish (C2 Native), French (C1), German (B2)
- Core Skills: Python, Machine Learning, SQL, Cloud Computing, Leadership, Communication

Always be helpful, professional, and accurate in your responses.`;

// ===========================
// GROQ API IMPLEMENTATION
// ===========================

/**
 * Load and process documents from the documents directory
 * @returns {Promise<Array>} Array of document contents
 */
async function loadDocuments() {
    const documents = [];
    
    for (const docPath of DOCUMENTS) {
        try {
            // For PDFs, you'll need a PDF parsing library
            // For text files, you can use fetch
            const response = await fetch(docPath);
            
            if (response.ok) {
                // If it's a text file
                if (docPath.endsWith('.txt') || docPath.endsWith('.md')) {
                    const content = await response.text();
                    documents.push({
                        path: docPath,
                        content: content
                    });
                }
                // For PDFs, you would need to use a library like PDF.js
                // Example: const pdfContent = await parsePDF(response);
            }
        } catch (error) {
            console.error(`Error loading document ${docPath}:`, error);
        }
    }
    
    return documents;
}

/**
 * Search documents for relevant content based on query
 * @param {string} query - User's question
 * @param {Array} documents - Array of document objects
 * @returns {string} Relevant context from documents
 */
function searchDocuments(query, documents) {
    // Simple keyword-based search
    // For better results, implement semantic search using embeddings
    
    const keywords = query.toLowerCase().split(' ');
    let relevantContent = [];
    
    documents.forEach(doc => {
        const content = doc.content.toLowerCase();
        let relevanceScore = 0;
        
        keywords.forEach(keyword => {
            if (content.includes(keyword)) {
                relevanceScore++;
            }
        });
        
        if (relevanceScore > 0) {
            relevantContent.push({
                content: doc.content,
                score: relevanceScore
            });
        }
    });
    
    // Sort by relevance and return top results
    relevantContent.sort((a, b) => b.score - a.score);
    
    return relevantContent
        .slice(0, 3)
        .map(item => item.content)
        .join('\n\n---\n\n');
}

/**
 * Call Groq API with RAG context
 * @param {string} userMessage - User's question
 * @returns {Promise<string>} AI response
 */
async function callGroqAPI(userMessage) {
    try {
        // Load documents
        const documents = await loadDocuments();
        
        // Search for relevant context
        const context = searchDocuments(userMessage, documents);
        
        // Prepare the API request
        const response = await fetch(GROQ_CONFIG.apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_CONFIG.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: GROQ_CONFIG.model,
                messages: [
                    {
                        role: 'system',
                        content: `${SYSTEM_PROMPT}\n\nRelevant CV information:\n${context}`
                    },
                    {
                        role: 'user',
                        content: userMessage
                    }
                ],
                temperature: GROQ_CONFIG.temperature,
                max_tokens: GROQ_CONFIG.maxTokens
            })
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
        
    } catch (error) {
        console.error('Groq API Error:', error);
        return 'I apologize, but I\'m having trouble connecting to the AI service right now. Please try again in a moment, or feel free to contact Hector directly at hector.rodriguez@email.com';
    }
}

// ===========================
// ALTERNATIVE: SIMPLE CONTEXT-BASED RESPONSES
// ===========================

/**
 * Simple rule-based chatbot (fallback if Groq API is not configured)
 * @param {string} question - User's question
 * @returns {string} Response
 */
function getSimpleResponse(question) {
    const lowerQuestion = question.toLowerCase();
    
    // Experience related
    if (lowerQuestion.includes('experience') || lowerQuestion.includes('work') || lowerQuestion.includes('job')) {
        return 'Hector has extensive experience in data science and AI:\n\n• Senior Data Scientist at a leading tech company (March 2024 - Present)\n• Data Analyst at an analytics firm (June 2022 - Feb 2024)\n• Junior Developer at a startup (Jan 2021 - May 2022)\n\nHe has led teams, developed ML models, and improved business metrics by 25%.';
    }
    
    // Education related
    if (lowerQuestion.includes('education') || lowerQuestion.includes('degree') || lowerQuestion.includes('study') || lowerQuestion.includes('university')) {
        return 'Hector holds advanced degrees in data science and AI:\n\n• MSc in Management of Data and Artificial Intelligence (2022-2024)\n• Bachelor\'s Degree in Computer Science (2018-2022) - Top 5% of class\n• Professional Certification in AI (2024)\n\nHis education focused on machine learning, neural networks, and AI applications.';
    }
    
    // Skills related
    if (lowerQuestion.includes('skill') || lowerQuestion.includes('technology') || lowerQuestion.includes('technical')) {
        return 'Hector\'s technical expertise includes:\n\n**Hard Skills:**\n• Python (95%) - Expert level\n• Machine Learning (90%)\n• SQL & Databases (85%)\n• Cloud Computing (80%)\n\n**Soft Skills:**\n• Communication (95%)\n• Leadership (90%)\n• Problem Solving (92%)\n• Teamwork (88%)';
    }
    
    // Languages related
    if (lowerQuestion.includes('language') || lowerQuestion.includes('speak') || lowerQuestion.includes('multilingual')) {
        return 'Hector is multilingual with proficiency in:\n\n• English - C2 (Proficient)\n• Spanish - C2 (Native)\n• French - C1 (Advanced)\n• German - B2 (Intermediate)\n\nThis allows him to work effectively in international environments.';
    }
    
    // Contact related
    if (lowerQuestion.includes('contact') || lowerQuestion.includes('reach') || lowerQuestion.includes('email') || lowerQuestion.includes('phone')) {
        return 'You can contact Hector through:\n\n📧 Email: hector.rodriguez@email.com\n📱 Phone: +33 1 23 45 67 89\n💼 LinkedIn: linkedin.com/in/hector-rodriguez\n🐙 GitHub: github.com/hectorrodriguez\n📍 Location: Paris, France';
    }
    
    // Availability related
    if (lowerQuestion.includes('available') || lowerQuestion.includes('start') || lowerQuestion.includes('hire')) {
        return 'Hector is available immediately! He\'s ready to start on new projects and opportunities right away. Based in Paris, France, he\'s open to both on-site and remote positions.';
    }
    
    // Projects or portfolio
    if (lowerQuestion.includes('project') || lowerQuestion.includes('portfolio') || lowerQuestion.includes('work sample')) {
        return 'Hector has worked on various data science and AI projects including:\n\n• Developing ML models for business optimization\n• Leading data science initiatives for Fortune 500 clients\n• Building predictive models that improved metrics by 25%\n• Creating web applications and backend services\n\nFor detailed project information, please contact him directly.';
    }
    
    // Default response
    return 'I\'d be happy to help you learn more about Hector! You can ask me about:\n\n• His work experience and achievements\n• Education and certifications\n• Technical and soft skills\n• Language proficiency\n• Contact information\n• Availability and location\n\nWhat would you like to know?';
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GROQ_CONFIG,
        DOCUMENTS,
        SYSTEM_PROMPT,
        callGroqAPI,
        getSimpleResponse,
        loadDocuments,
        searchDocuments
    };
}