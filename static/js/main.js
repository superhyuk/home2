// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initFlashMessages();
    initPortfolioFilter();
    initStatsCounter();
    initScrollAnimations();
    initMobileMenu();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Flash messages functionality
function initFlashMessages() {
    const flashMessages = document.querySelectorAll('.flash-message');
    
    flashMessages.forEach(message => {
        const closeBtn = message.querySelector('.flash-close');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideFlashMessage(message);
        }, 5000);
        
        // Close on click
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                hideFlashMessage(message);
            });
        }
    });
}

function hideFlashMessage(message) {
    message.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => {
        message.remove();
    }, 300);
}

// Portfolio filter functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const solutionItems = document.querySelectorAll('.solution-item, .portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter solution items
            solutionItems.forEach(item => {
                const categories = item.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Stats counter animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
            }
        });
    }, observerOptions);
    
    if (statNumbers.length > 0) {
        observer.observe(statNumbers[0].closest('.stats-section'));
    }
}

function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-card, .portfolio-card, .solution-card, .feature-card, .hero-card'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// Solution modal functionality (supports both project and solution modals)
function openSolutionModal(solutionId) {
    const modal = document.getElementById('solutionModal') || document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    // Solution details data
    const solutionDetails = {
        1: {
            title: 'Temperature Monitoring AI',
            description: 'Advanced thermal analysis system deployed in a major chemical processing facility with 24/7 predictive monitoring.',
            features: [
                'Multi-zone temperature analysis',
                'Predictive overheating detection',
                'Automated cooling system control',
                'Emergency alert integration',
                'Historical trend analysis',
                'Mobile operator alerts'
            ],
            technologies: ['LSTM Networks', 'Edge AI', 'IoT Sensors', 'TensorRT', 'CUDA', 'Docker'],
            demoUrl: 'https://temp-monitor.nextbrg.com',
            timeline: '6 weeks deployment',
            client: 'ChemCorp Manufacturing',
            results: {
                accuracy: '99.4%',
                responseTime: '150ms',
                incidentReduction: '87%',
                uptimeImprovement: '12%'
            }
        },
        2: {
            title: 'Pressure Anomaly Detection',
            description: 'Real-time pressure monitoring system for critical pipeline infrastructure with AI-powered leak detection.',
            features: [
                'Multi-point pressure analysis',
                'Leak detection algorithms',
                'Burst prediction models',
                'SCADA system integration',
                'Maintenance scheduling',
                'Regulatory compliance reporting'
            ],
            technologies: ['Transformer Models', 'Edge Computing', 'SCADA Integration', 'InfluxDB', 'Grafana'],
            demoUrl: 'https://pressure-ai.nextbrg.com',
            timeline: '8 weeks deployment',
            client: 'PipelineOps Inc.',
            results: {
                accuracy: '98.7%',
                responseTime: '75ms',
                leakDetection: '95%',
                falsePositives: '-89%'
            }
        },
        3: {
            title: 'Multi-Sensor Integration Platform',
            description: 'Universal IoT platform connecting diverse sensor types with unified AI analytics across manufacturing facility.',
            features: [
                '500+ sensor type support',
                'Protocol auto-discovery',
                'Unified data analytics',
                'Cross-sensor correlation',
                'Automated response systems',
                'Scalable edge deployment'
            ],
            technologies: ['Federated Learning', 'MQTT', 'OPC-UA', 'Kubernetes', 'Apache Kafka', 'Redis'],
            demoUrl: 'https://multi-sensor.nextbrg.com',
            timeline: '12 weeks deployment',
            client: 'MegaFactory Corp.',
            results: {
                accuracy: '97.2%',
                responseTime: '200ms',
                sensorIntegration: '500+',
                dataReduction: '73%'
            }
        },
        4: {
            title: 'Smart Temperature Monitoring',
            description: 'AI-powered thermal monitoring system for chemical processing plant with predictive overheat detection.',
            features: [
                'Thermal pattern recognition',
                'Predictive failure analysis',
                'Automated alert system',
                'Equipment health scoring',
                'Energy optimization',
                'Compliance monitoring'
            ],
            technologies: ['LSTM Networks', 'Edge AI', 'IoT Sensors'],
            demoUrl: 'https://temp-monitor.nextbrg.com',
            timeline: '6 weeks',
            client: 'ProcessChem Ltd.'
        },
        5: {
            title: 'Vibration Analysis AI',
            description: 'Real-time vibration monitoring for rotating machinery with 48-hour failure prediction capability.',
            features: [
                'FFT spectrum analysis',
                'Bearing fault detection',
                'Shaft misalignment detection',
                'Predictive maintenance',
                'Vibration trending',
                'Machine health scoring'
            ],
            technologies: ['FFT Analysis', 'Time Series AI', 'Edge Processing'],
            demoUrl: 'https://vibration-ai.nextbrg.com',
            timeline: '5 weeks',
            client: 'RotorTech Industries'
        },
        6: {
            title: 'Smart Gas Detection',
            description: 'Multi-gas AI monitoring system with automatic ventilation control and emergency response integration.',
            features: [
                'Multi-gas detection',
                'Concentration prediction',
                'Automatic ventilation control',
                'Emergency response automation',
                'Worker safety alerts',
                'Regulatory compliance'
            ],
            technologies: ['Multi-Gas Sensors', 'AI Classification', 'Auto Response'],
            demoUrl: 'https://gas-detection.nextbrg.com',
            timeline: '7 weeks',
            client: 'SafeChem Manufacturing'
        }
    };
    
    const solution = solutionDetails[solutionId];
    if (!solution) return;
    
    modalTitle.textContent = solution.title;
    modalBody.innerHTML = `
        <div class="solution-details">
            <p class="solution-description">${solution.description}</p>
            
            <div class="solution-info">
                <div class="info-item">
                    <strong>Client:</strong> ${solution.client}
                </div>
                <div class="info-item">
                    <strong>Timeline:</strong> ${solution.timeline}
                </div>
                <div class="info-item">
                    <strong>Live System:</strong> <a href="${solution.demoUrl}" target="_blank" rel="noopener">View Live Demo</a>
                </div>
            </div>
            
            ${solution.results ? `
            <div class="solution-section">
                <h4>Performance Results</h4>
                <div class="results-grid">
                    ${Object.entries(solution.results).map(([key, value]) => `
                        <div class="result-item">
                            <span class="result-value">${value}</span>
                            <span class="result-label">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            <div class="solution-section">
                <h4>Key Features</h4>
                <ul class="feature-list">
                    ${solution.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="solution-section">
                <h4>Technologies Used</h4>
                <div class="tech-tags">
                    ${solution.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div class="solution-actions">
                <a href="${solution.demoUrl}" target="_blank" class="btn btn-primary" rel="noopener">
                    <i class="fas fa-external-link-alt"></i> View Live Demo
                </a>
                <a href="/contact" class="btn btn-secondary">
                    <i class="fas fa-envelope"></i> Request Similar Solution
                </a>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSolutionModal() {
    const modal = document.getElementById('solutionModal') || document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function closeProjectModal() {
    closeSolutionModal(); // Alias for backward compatibility
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('solutionModal') || document.getElementById('projectModal');
    if (e.target === modal) {
        closeSolutionModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSolutionModal();
    }
});

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    showFieldError(field, 'This field is required');
                } else {
                    field.classList.remove('error');
                    hideFieldError(field);
                }
            });
            
            // Email validation
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                if (field.value && !isValidEmail(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                    showFieldError(field, 'Please enter a valid email address');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    hideFieldError(field); // Remove existing error
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function hideFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.onclick = scrollToTop;
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
}

// Theme switcher (optional)
function initThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Add CSS for additional features
const additionalCSS = `
    /* Flash message animations */
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    /* Mobile menu styles */
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            right: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: var(--bg-white);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: right 0.3s ease;
            border-top: 1px solid var(--border-color);
        }
        
        .nav-menu.active {
            right: 0;
        }
        
        .nav-toggle.active .bar:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .nav-toggle.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active .bar:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
    
    /* Form error styles */
    .form-group input.error,
    .form-group textarea.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .field-error {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    /* Modal project and solution details styles */
    .project-details,
    .solution-details {
        line-height: 1.6;
    }
    
    .project-description,
    .solution-description {
        font-size: 1.125rem;
        margin-bottom: 1.5rem;
        color: var(--text-light);
    }
    
    .project-info,
    .solution-info {
        background: var(--bg-light);
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1.5rem;
    }
    
    .info-item {
        margin-bottom: 0.5rem;
    }
    
    .info-item:last-child {
        margin-bottom: 0;
    }
    
    .project-section,
    .solution-section {
        margin-bottom: 1.5rem;
    }
    
    .project-section h4,
    .solution-section h4 {
        color: var(--text-dark);
        margin-bottom: 0.75rem;
        font-size: 1.125rem;
    }
    
    .feature-list {
        list-style: none;
        padding-left: 0;
    }
    
    .feature-list li {
        padding: 0.25rem 0;
        padding-left: 1.5rem;
        position: relative;
    }
    
    .feature-list li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--accent-color);
        font-weight: bold;
    }
    
    .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .project-actions,
    .solution-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        flex-wrap: wrap;
    }
    
    .project-actions .btn,
    .solution-actions .btn {
        flex: 1;
        min-width: 150px;
    }
    
    /* Solution-specific styles */
    .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .result-item {
        text-align: center;
        background: var(--bg-light);
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
    }
    
    .result-value {
        display: block;
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--primary-color);
        margin-bottom: 0.25rem;
    }
    
    .result-label {
        font-size: 0.75rem;
        color: var(--text-light);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    /* Scroll to top button */
    .scroll-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    }
    
    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-xl);
    }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Initialize additional features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initFormValidation();
    initLazyLoading();
    initScrollToTop();
    initThemeSwitcher();
});