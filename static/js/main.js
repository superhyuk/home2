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
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
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
        '.service-card, .portfolio-card, .feature-card, .hero-card'
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

// Project modal functionality
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    // Project details data
    const projectDetails = {
        1: {
            title: 'E-Commerce Platform',
            description: 'A comprehensive e-commerce solution built with modern technologies and AI-powered features.',
            features: [
                'AI-powered product recommendations',
                'Real-time inventory management',
                'Advanced analytics dashboard',
                'Multi-payment gateway integration',
                'Mobile-responsive design',
                'SEO optimization'
            ],
            technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'AWS', 'TensorFlow'],
            demoUrl: 'https://demo1.example.com',
            timeline: '3 months',
            client: 'Fashion Retailer Inc.'
        },
        2: {
            title: 'Analytics Dashboard',
            description: 'Real-time business intelligence platform with interactive data visualization and reporting.',
            features: [
                'Real-time data processing',
                'Interactive charts and graphs',
                'Custom report generation',
                'Data export capabilities',
                'User role management',
                'API integrations'
            ],
            technologies: ['Python', 'Django', 'D3.js', 'PostgreSQL', 'Docker', 'Celery'],
            demoUrl: 'https://demo2.example.com',
            timeline: '4 months',
            client: 'Data Corp Ltd.'
        },
        3: {
            title: 'CRM System',
            description: 'Customer relationship management system with workflow automation and team collaboration features.',
            features: [
                'Contact management',
                'Sales pipeline tracking',
                'Email automation',
                'Task management',
                'Reporting and analytics',
                'Third-party integrations'
            ],
            technologies: ['Vue.js', 'Laravel', 'MySQL', 'Redis', 'AWS SES'],
            demoUrl: 'https://demo3.example.com',
            timeline: '5 months',
            client: 'Sales Solutions Inc.'
        },
        4: {
            title: 'Fitness Tracking App',
            description: 'Cross-platform mobile application for fitness tracking with social features and AI coaching.',
            features: [
                'Workout tracking',
                'Social features',
                'AI coaching recommendations',
                'Progress analytics',
                'Wearable device integration',
                'Nutrition tracking'
            ],
            technologies: ['React Native', 'Firebase', 'ML Kit', 'Google Fit API'],
            demoUrl: 'https://demo4.example.com',
            timeline: '6 months',
            client: 'FitLife Startup'
        },
        5: {
            title: 'Project Management Tool',
            description: 'Comprehensive project management platform with team collaboration and time tracking features.',
            features: [
                'Project planning',
                'Team collaboration',
                'Time tracking',
                'Resource management',
                'Gantt charts',
                'Reporting'
            ],
            technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'Elasticsearch'],
            demoUrl: 'https://demo5.example.com',
            timeline: '4 months',
            client: 'Project Pro Ltd.'
        },
        6: {
            title: 'SaaS Marketing Platform',
            description: 'All-in-one marketing automation platform with email campaigns and detailed analytics.',
            features: [
                'Email marketing',
                'Campaign automation',
                'Lead scoring',
                'A/B testing',
                'Analytics dashboard',
                'CRM integration'
            ],
            technologies: ['Next.js', 'GraphQL', 'Redis', 'Stripe API', 'SendGrid'],
            demoUrl: 'https://demo6.example.com',
            timeline: '5 months',
            client: 'Marketing Automation Co.'
        }
    };
    
    const project = projectDetails[projectId];
    if (!project) return;
    
    modalTitle.textContent = project.title;
    modalBody.innerHTML = `
        <div class="project-details">
            <p class="project-description">${project.description}</p>
            
            <div class="project-info">
                <div class="info-item">
                    <strong>Client:</strong> ${project.client}
                </div>
                <div class="info-item">
                    <strong>Timeline:</strong> ${project.timeline}
                </div>
                <div class="info-item">
                    <strong>Demo:</strong> <a href="${project.demoUrl}" target="_blank" rel="noopener">View Live Demo</a>
                </div>
            </div>
            
            <div class="project-section">
                <h4>Key Features</h4>
                <ul class="feature-list">
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="project-section">
                <h4>Technologies Used</h4>
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div class="project-actions">
                <a href="${project.demoUrl}" target="_blank" class="btn btn-primary" rel="noopener">
                    <i class="fas fa-external-link-alt"></i> View Live Demo
                </a>
                <a href="/contact" class="btn btn-secondary">
                    <i class="fas fa-envelope"></i> Discuss Similar Project
                </a>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
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
    
    /* Modal project details styles */
    .project-details {
        line-height: 1.6;
    }
    
    .project-description {
        font-size: 1.125rem;
        margin-bottom: 1.5rem;
        color: var(--text-light);
    }
    
    .project-info {
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
    
    .project-section {
        margin-bottom: 1.5rem;
    }
    
    .project-section h4 {
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
    
    .project-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        flex-wrap: wrap;
    }
    
    .project-actions .btn {
        flex: 1;
        min-width: 150px;
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