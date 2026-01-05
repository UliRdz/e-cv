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
    apiKey: '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',
    apiUrl: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama3-70b-8192', // Options: 'llama3-70b-8192', 'llama3-8b-8192', 'mixtral-8x7b-32768'
    temperature: 1.0,
    maxTokens: 1024
};

// List of documents to be loaded for RAG
const DOCUMENTS = [
    '/documents/CV-Fr.pdf',
    // Add more document paths as needed
];

// System prompt for the chatbot
const SYSTEM_PROMPT = `You are a helpful AI assistant answering questions about Ulises Rodriguez's CV and professional background.
They can ask you questions in any languague and you need to translate the information you have concerning his career path and answer in the asked language.

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
      if (
        lowerQuestion.includes('experience') ||
        lowerQuestion.includes('work') ||
        lowerQuestion.includes('job')
      ) {
        return (
          "Ulises Rodriguez is a Project Manager / AI Product Owner with 6 years of experience.\n\n" +
          "• AI Product Owner — EGIS Group (France), CDD, May 2025–Oct 2026:\n" +
          "  - AI product vision & strategic roadmap for road, rail, airport sectors\n" +
          "  - User/stakeholder needs, backlog (user stories, functional specs)\n" +
          "  - Coordinated data scientists & developers; ML POCs (XGBoost, LSTM, BiLSTM)\n" +
          "  - KPI dashboards (ROI, adoption, NPS) & release planning\n\n" +
          "• Strategic Planning & Project Implementation — CUADRA (Mexico), CDI, Aug 2022–Sept 2024:\n" +
          "  - Quarterly syntheses for CEO; Balanced Scorecard optimization (+10% accuracy)\n" +
          "  - IT/IoT rollout: +20% operational efficiency across 69 stores; −30% manual processes\n" +
          "  - AGILE & Management 3.0 for improved delivery and collaboration\n\n" +
          "• Process Engineering Specialist (NPI) — DENSO North America, CDI, Sept 2019–Aug 2022:\n" +
          "  - NPI for HONDA, FORD, STELLANTIS, TOYOTA (95% mass‑production efficiency)\n" +
          "  - RPA automation; >15% budget savings during COVID‑19\n" +
          "  - Core Tools (MSA, PPAP, FMEA) reducing defects to 3%"
        );
      }
    
      // Education related
      if (
        lowerQuestion.includes('education') ||
        lowerQuestion.includes('degree') ||
        lowerQuestion.includes('study') ||
        lowerQuestion.includes('university')
      ) {
        return (
          "Education & Certifications:\n\n" +
          "• MSc — Management with Data & Artificial Intelligence (Grenoble Ecole de Management), 2024–2025\n" +
          "• Bachelor’s — Business Management (Universidad de Guanajuato), 2014–2019\n" +
          "• Certifications: SCRUM Product Owner (SPOC, 2024); Front‑End Development (Oracle Next Education, 2023);\n" +
          "  Core Tools (2021); Microsoft AI‑900 (2024–2025)\n\n" +
          "Focus: AI product/roadmaps, ML (supervised/unsupervised/deep learning), NLP, neural networks, computer vision, LLMs"
        );
      }
    
      // Skills related
      if (
        lowerQuestion.includes('skill') ||
        lowerQuestion.includes('skills') ||
        lowerQuestion.includes('technology') ||
        lowerQuestion.includes('technical')
      ) {
        return (
          "Skills:\n\n" +
          "**Data & Analytics:** Power BI, Excel, Python libraries\n" +
          "**Product & Backlog Tools:** Jira, Miro, Trello, Figma, MS Project, Klaxoon\n" +
          "**Programming:** Python, SQL, CSS & HTML\n" +
          "**Machine Learning:** Supervised (regression, classification), Unsupervised (clustering), Deep Learning\n" +
          "**Domains:** NLP, Neural Networks, Computer Vision, Large Language Models (LLMs)\n" +
          "**Soft Skills:** Leadership, Communication, Backlog management, Prioritization, Cross‑team collaboration, Continuous improvement"
        );
      }
    
      // Languages related
      if (
        lowerQuestion.includes('language') ||
        lowerQuestion.includes('languages') ||
        lowerQuestion.includes('speak') ||
        lowerQuestion.includes('multilingual')
      ) {
        return (
          "Languages:\n\n" +
          "• Spanish — Native\n" +
          "• English — Bilingual\n" +
          "• French — C1 (Advanced)"
        );
      }
    
      // Contact related
      if (
        lowerQuestion.includes('contact') ||
        lowerQuestion.includes('reach') ||
        lowerQuestion.includes('email') ||
        lowerQuestion.includes('phone') ||
        lowerQuestion.includes('linkedin')
      ) {
        return (
          "Contact:\n\n" +
          "📧 Email: hulises.rg@gmail.com\n" +
          "📱 Phone: +33 0759544936\n" +
          "💼 LinkedIn: https://www.linkedin.com/in/lgeulisesrg\n" +
          "🌐 Portfolio (e‑CV): https://ulirdz.github.io/e‑cv/\n" +
          "📍 Location: France (city not specified)"
        );
      }
    
      // Availability related
      if (
        lowerQuestion.includes('available') ||
        lowerQuestion.includes('availability') ||
        lowerQuestion.includes('start') ||
        lowerQuestion.includes('start date') ||
        lowerQuestion.includes('hire')
      ) {
        return (
          "Availability:\n\n" +
          "• Available from January 1, 2026\n" +
          "• Seeking a permanent role (CDI)\n" +
          "• Open to discussing on‑site, hybrid, or remote modes; relocation not specified"
        );
      }
    
      // Projects or portfolio
      if (
        lowerQuestion.includes('project') ||
        lowerQuestion.includes('projects') ||
        lowerQuestion.includes('portfolio') ||
        lowerQuestion.includes('work sample') ||
        lowerQuestion.includes('case') ||
        lowerQuestion.includes('cases')
      ) {
        return (
          "Selected work & projects:\n\n" +
          "• EGIS: AI product vision and ML POCs (XGBoost, LSTM, BiLSTM); KPI dashboards (ROI, adoption, NPS); release planning\n" +
          "• CUADRA: IT/IoT deployment across 69 stores; +20% operational efficiency; −30% manual processes; Balanced Scorecard optimization (+10%)\n" +
          "• DENSO: NPI for major OEMs; 95% mass‑production efficiency; Core Tools (MSA, PPAP, FMEA); RPA automation\n\n" +
          "Portfolio: https://ulirdz.github.io/e‑cv/"
        );
      }
    
      // Salary (HR common)
      if (lowerQuestion.includes('salary') || lowerQuestion.includes('compensation')) {
        return "Salary/compensation: Not specified in CV; open to discuss based on role scope, responsibilities, and market.";
      }
    
      // Relocation / remote / travel (HR common)
      if (lowerQuestion.includes('relocation') || lowerQuestion.includes('remote') || lowerQuestion.includes('travel')) {
        return (
          "Work preferences:\n\n" +
          "• Remote/Hybrid: Experienced with international coordination; preference not specified\n" +
          "• On‑site: Significant on‑site/project experience\n" +
          "• Travel: Comfortable with travel; past coordination with teams in Italy, Czech Republic, Japan, US, Canada"
        );
      }
    
      // Default response
      return (
        "I'd be happy to help you learn more about Ulises!\n\n" +
        "You can ask about:\n" +
        "• Work experience and achievements\n" +
        "• Education and certifications\n" +
        "• Technical and soft skills\n" +
        "• Language proficiency\n" +
        "• Contact information\n" +
        "• Availability and location\n\n" +
        "What would you like to know?"
      );
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
