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
    
      // CORE
      "experience": "Ulises Rodriguez est Chef de projet / AI Product Owner avec 6 ans d'expérience. Dernier poste : AI Product Owner (EGIS Group, France, mai 2025–oct. 2026) : vision produit IA, roadmap, backlog, coordination data scientists et développeurs, POC (XGBoost, LSTM, BiLSTM), suivi KPI (ROI, adoption, NPS). Avant : CUADRA (Mexique, 2022–2024) et DENSO North America (2019–2022) avec résultats (+10% Balanced Scorecard, +20% efficacité, −30% processus manuels, 95% efficacité production, >15% économies, défauts 3%).",
      "work": "Voir expérience : EGIS (AI Product Owner), CUADRA (planification stratégique, IT/IoT), DENSO (NPI, Core Tools, coordination internationale).",
      "job": "Postes : AI Product Owner (EGIS, 2025–2026), Planification stratégique (CUADRA, 2022–2024), Spécialiste NPI (DENSO, 2019–2022).",
    
      "education": "MSc Management with Data & Artificial Intelligence (Grenoble EM, 2024–2025) ; Licence en Gestion d’Entreprise (Universidad de Guanajuato, 2014–2019). Certifications : SCRUM Product Owner (2024), Front‑End (2023), Core Tools (2021), Microsoft AI‑900 (2024–2025).",
      "degree": "MSc Management with Data & AI ; Licence en Gestion ; SPOC, Front‑End, Core Tools, AI‑900.",
      "study": "Études : MSc (GEM) et Licence (UG).",
    
      "skill": "Analyse & visualisation (Power BI, Excel, Python) ; Outils backlog (Jira, Miro, Trello, Figma, MS Project, Klaxoon) ; Programmation (Python, SQL, CSS & HTML) ; Machine Learning (supervisé, non supervisé, deep learning) ; Domaines : NLP, réseaux de neurones, computer vision, LLMs.",
      "python": "Python pour analyse, visualisation et machine learning ; POC avec XGBoost, LSTM, BiLSTM.",
    
      "language": "Espagnol (natif), Anglais (bilingue), Français (C1).",
      "speak": "Ulises parle Espagnol, Anglais et Français.",
    
      "contact": "Contact : hulises.rg@gmail.com | +33 0759544936 | LinkedIn: linkedin.com/in/lgeulisesrg | e‑CV: ulirdz.github.io/e‑cv/",
      "email": "E‑mail : hulises.rg@gmail.com",
      "phone": "Téléphone : +33 0759544936",
      "linkedin": "LinkedIn : linkedin.com/in/lgeulisesrg",
    
      "location": "Basé en France (mission récente chez EGIS Group).",
      "available": "Disponible à partir du 1er janvier 2026 pour un CDI.",
      "hire": "Prêt à démarrer au 01/01/2026. Atouts : stratégie produit IA, delivery agile, POCs ML, pilotage par KPI, leadership transversal.",
    
      // HR-STYLE KEYWORDS
      "summary": "Chef de projet / AI Product Owner, 6 ans d’expérience. Pont entre parties prenantes et ingénieurs ; focus IA, KPI et adoption.",
      "headline": "AI Product Owner orienté impact, expériences EGIS, CUADRA, DENSO ; MSc Management with Data & AI.",
      "motivation": "Motivé par l’innovation et la création de valeur via l’IA (vision produit, adoption, ROI).",
      "role-fit": "Fit naturel pour rôles Product Owner IA / Chef de projet data/IA / PM technique.",
      "why-hire": "Capable d’aligner stratégie et exécution, livrer des POC ML, piloter par KPI et coordonner des équipes pluridisciplinaires.",
      "strengths": "Leadership transversal, cadrage produit IA, backlog & specs, delivery agile, mesure d’impact.",
      "weaknesses": "Non spécifié ; à discuter en entretien.",
      "achievements": "EGIS : POC ML et KPI adoption/ROI ; CUADRA : +10% Balanced Scorecard, +20% efficacité, −30% manuel ; DENSO : 95% efficacité production, >15% économies, défauts 3%.",
      "kpi": "Mesure via KPI : ROI, taux d’adoption, NPS.",
      "impact": "Impacts mesurés sur performance, qualité et finances.",
      "methodology": "AGILE, Management 3.0 ; backlog, user stories, specs, comités de pilotage.",
      "tools": "Jira, Miro, Trello, Figma, MS Project, Klaxoon ; Power BI, Excel ; Python, SQL.",
      "ml-stack": "Supervisé, non supervisé, deep learning ; NLP, réseaux de neurones, computer vision, LLMs.",
      "projects": "EGIS : roadmap IA, POC ML ; CUADRA : IT/IoT ; DENSO : NPI pour HONDA, FORD, STELLANTIS, TOYOTA.",
      "sectors": "Routier, ferroviaire, aéroportuaire ; retail ; automobile.",
      "industry": "Mobilité/transports, retail, automobile.",
      "leadership": "Animation de comités, coordination data scientists/développeurs, communication métiers-tech-direction.",
      "team-size": "Taille non précisée ; coordination pluridisciplinaire et internationale.",
      "stakeholders": "Parties prenantes métiers, direction, équipes techniques.",
      "start-date": "01/01/2026.",
      "notice-period": "Disponible immédiatement à partir du 01/01/2026.",
      "contract": "Recherche un CDI.",
      "cdi": "Oui, recherche un CDI.",
      "cdd": "Dernier contrat : CDD chez EGIS (mai 2025–oct. 2026).",
      "freelance": "Non spécifié.",
      "relocation": "Non spécifié (basé en France).",
      "remote": "Habitué aux environnements hybrides et coordination internationale.",
      "on-site": "Expérience significative sur site.",
      "travel": "A travaillé avec équipes internationales ; déplacements possibles.",
      "salary": "Non spécifié ; à discuter.",
      "visa": "Non spécifié.",
      "work-authorization": "Non spécifié.",
      "certifications": "SPOC (2024), Front‑End (2023), Core Tools (2021), Microsoft AI‑900 (2024–2025).",
      "portfolio": "e‑CV : ulirdz.github.io/e‑cv/",
      "website": "ulirdz.github.io/e‑cv/",
      "references": "Disponibles sur demande.",
      "graduation-year": "Licence : 2019 ; MSc : 2025.",
      "gaps": "Aucune période d’inactivité longue mentionnée.",
      "soft-skills": "Leadership, communication, gestion de backlog, priorisation, collaboration multi‑équipes.",
      "francais": "Français (C1).",
      "anglais": "Anglais (bilingue).",
      "espagnol": "Espagnol (natif).",
      "availability": "Disponible au 01/01/2026.",
      "location-preference": "France ; mobilité non précisée.",
      "future-goals": "Continuer à porter des produits IA à fort impact.",
      "culture-fit": "Orienté collaboration et amélioration continue (AGILE, Management 3.0).",
      "egis": "EGIS Group (France) : AI Product Owner, vision produit IA, KPI, POC ML.",
      "cuadra": "CUADRA (Mexique) : planification stratégique, Balanced Scorecard, IT/IoT.",
      "denso": "DENSO North America : NPI pour HONDA, FORD, STELLANTIS, TOYOTA."

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
