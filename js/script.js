// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Intersection Observer for Scroll Reveal Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with reveal class
document.addEventListener('DOMContentLoaded', () => {
    // Add reveal class to elements that should animate on scroll
    const elementsToReveal = document.querySelectorAll(
        '.stat-item, .founder-text, .founder-visual, .testimonial-card, .achievement-item, .value-item, .service-detail-card, .mv-card, .content-item, .contact-info, .contact-form-wrapper, .story-content, .capability-content, .mission-content, .story-content-grid, .value-grid, .value-card, .stats-row, .stat-box, .certifications-grid, .cert-item, .testimonials-grid-about, .testimonial-card-about, .cta-content, .service-category-card, .services-values-grid, .services-value-card, .process-timeline, .process-step, .tech-stack-grid, .tech-item, .services-metrics-row, .services-metric-box, .services-testimonials-grid, .services-testimonial-card, .faq-container, .services-cta-content, .trust-strip-content, .home-services-grid, .home-service-card, .home-values-grid, .home-value-card, .home-process-timeline, .home-process-step, .home-case-studies-grid, .home-case-study-card, .home-testimonials-grid, .home-testimonial-card, .home-tech-stack-grid, .home-tech-item, .home-blog-grid, .home-blog-card, .home-cta-content'
    );

    elementsToReveal.forEach(el => {
        el.classList.add('reveal');
    observer.observe(el);
});

    // Typing reveal (scroll-based) for .typing-reveal elements
    const typingElements = document.querySelectorAll('.typing-reveal');
    const reduceMotion = typeof window.matchMedia === 'function'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (typingElements.length > 0) {
        typingElements.forEach(el => {
            const fullText = el.getAttribute('data-text') || '';
            el.dataset.fullText = fullText;
            el.textContent = '';
        });

        const typeElement = (el) => {
            const text = el.dataset.fullText || '';
            const speed = parseInt(el.getAttribute('data-speed') || '18', 10); // ms/char (previous default)
            const startDelay = parseInt(el.getAttribute('data-delay') || '0', 10);

            // Make it visible immediately so the typing chars can be seen
            el.style.opacity = '1';
            el.classList.remove('typed');
            el.classList.add('typing');

            let i = 0;
            const tick = () => {
                // rAF-driven typing for smoother timing
                const step = () => {
                    const now = performance.now();
                    if (!step.lastTs) step.lastTs = now;
                    if (now - step.lastTs >= speed) {
                        step.lastTs = now;
                        i = Math.min(text.length, i + 1);
                        el.textContent = text.slice(0, i);
                    }

                    if (i < text.length) {
                        requestAnimationFrame(step);
                    } else {
                        el.classList.add('typed');
                        el.classList.remove('typing');
                    }
                };
                requestAnimationFrame(step);
            };

            if (startDelay > 0) {
                setTimeout(tick, startDelay);
            } else {
                tick();
            }
        };

        const typingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                if (el.classList.contains('typed')) return;
                typeElement(el);
                typingObserver.unobserve(el);
            });
        }, { threshold: 0.25 });

        typingElements.forEach(el => typingObserver.observe(el));
    }

    // Animated counter for stats
    const statNumbers = document.querySelectorAll('.stat-number-large');
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const prefix = element.getAttribute('data-prefix') || '';
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = prefix + Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = prefix + target + suffix;
            }
        };

        updateCounter();
    };

    // Animated counter for services metrics
    const animateServicesCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const prefix = element.getAttribute('data-prefix') || '';
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = prefix + Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = prefix + target + suffix;
            }
        };

        updateCounter();
    };

    // Observe stat boxes for counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number-large');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    statNumber.classList.add('animated');
                    animateCounter(statNumber);
                }
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        const statBox = stat.closest('.stat-box');
        if (statBox) {
            statsObserver.observe(statBox);
        }
    });

    // Services metrics counter animation
    const servicesMetricNumbers = document.querySelectorAll('.services-metric-number');
    const servicesMetricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const metricNumber = entry.target;
                if (metricNumber && !metricNumber.classList.contains('animated')) {
                    metricNumber.classList.add('animated');
                    animateServicesCounter(metricNumber);
                }
            }
        });
    }, { threshold: 0.5 });

    servicesMetricNumbers.forEach(metric => {
        const metricBox = metric.closest('.services-metric-box');
        if (metricBox) {
            servicesMetricsObserver.observe(metricBox);
        }
    });

    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                // Close all FAQ items
                faqItems.forEach(faq => faq.classList.remove('active'));
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Trust count animation
    const trustCount = document.querySelector('.trust-count');
    if (trustCount) {
        const trustCountObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !trustCount.classList.contains('animated')) {
                    trustCount.classList.add('animated');
                    const target = parseInt(trustCount.getAttribute('data-target'));
                    const prefix = trustCount.getAttribute('data-prefix') || '';
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            trustCount.textContent = prefix + Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            trustCount.textContent = prefix + target;
                        }
                    };

                    updateCounter();
                }
            });
        }, { threshold: 0.5 });

        trustCountObserver.observe(trustCount);
    }
});

// Button Hover Scaling Animations
document.querySelectorAll('.cta-primary, .cta-secondary, .submit-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });

    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
        navbar.style.boxShadow = '0px 4px 20px rgba(0, 0, 0, 0.05)';
    } else {
        navbar.style.boxShadow = '0px 2px 10px rgba(0, 0, 0, 0.03)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Google Sheets Integration
// After deploying google-apps-script.js as a web app, paste your URL here:
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyc6v2SdnY3qEC6XafrByp9aEkpDjMGWb9RQpfTQKQauBFThsWO2NutMzq_QNSJboEp/exec';

async function sendToGoogleSheets(data) {
    if (GOOGLE_SHEETS_URL === 'YOUR_APPS_SCRIPT_URL') return;
    try {
        await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    } catch (err) {
        console.error('Google Sheets submission error:', err);
    }
}

// Form Validation and Submission
// EmailJS Configuration
// To set up EmailJS:
// 1. Sign up at https://www.emailjs.com/ (free)
// 2. Create an email service and get your Service ID
// 3. Create an email template and get your Template ID
// 4. Get your Public Key from Account settings
// 5. Replace the values below with your actual keys
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY',      // Replace with your EmailJS Public Key
    serviceId: 'YOUR_SERVICE_ID',      // Replace with your EmailJS Service ID
    templateId: 'YOUR_TEMPLATE_ID'     // Replace with your EmailJS Template ID
};

// Initialize EmailJS if configured
if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_CONFIG.publicKey);
}

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const businessNameEl = document.getElementById('businessName');
        const serviceNeededEl = document.getElementById('serviceNeeded');
        const businessName = businessNameEl ? businessNameEl.value.trim() : '';
        const serviceNeeded = serviceNeededEl ? serviceNeededEl.value.trim() : '';
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !email || !message || !businessName || !serviceNeeded) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn ? submitBtn.textContent : 'Send Message';
        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        }

        // Check if EmailJS is configured
        const isEmailJSConfigured = typeof emailjs !== 'undefined' && 
                                    EMAILJS_CONFIG.serviceId !== 'YOUR_SERVICE_ID' &&
                                    EMAILJS_CONFIG.templateId !== 'YOUR_TEMPLATE_ID';

        try {
            // Send to Google Sheets
            await sendToGoogleSheets({
                formType: 'contact',
                name, email, businessName, serviceNeeded, phone, message
            });

            // Also send via EmailJS if configured
            if (isEmailJSConfigured) {
                const templateParams = {
                    to_email: 'basilbasheermuhammad@gmail.com',
                    from_name: name,
                    from_email: email,
                    business_name: businessName,
                    service_needed: serviceNeeded,
                    phone: phone || 'Not provided',
                    subject: `Consultation: ${serviceNeeded} — ${businessName}`,
                    message: message,
                    reply_to: email
                };
                await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams);
            }

            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('Submission error:', error);
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const bgColor = type === 'success' ? '#0A1A2F' : '#d32f2f';
    const textColor = '#FFFFFF';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: ${textColor};
        padding: 1rem 2rem;
        border-radius: 12px;
        z-index: 10000;
        box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.15);
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth fade-in on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Project Form Submission
const projectForm = document.getElementById('projectForm');
const successOverlay = document.getElementById('successOverlay');
const scheduleCallBtn = document.getElementById('scheduleCallBtn');

if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const budget = document.getElementById('budget').value;
        const description = document.getElementById('description').value.trim();
        const timeline = document.getElementById('timeline').value;

        // Basic validation
        if (!fullName || !email || !phone || !service || !budget || !description || !timeline) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        setTimeout(() => {
            successOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            projectForm.reset();
        }, 300);
    });
}

// Schedule Call Button
if (scheduleCallBtn) {
    scheduleCallBtn.addEventListener('click', () => {
        window.location.href = 'contact.html';
    });
}

// Close success overlay when clicking outside or on return home
if (successOverlay) {
    successOverlay.addEventListener('click', (e) => {
        if (e.target === successOverlay) {
            successOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Audit Booking Page Functionality
const auditForm = document.getElementById('auditForm');
const auditSuccessOverlay = document.getElementById('auditSuccessOverlay');
const auditOptionCards = document.querySelectorAll('.audit-option-card');
const selectedAuditTypeInput = document.getElementById('selectedAuditType');

// Risk Score Data
const riskScoreData = {
    'quick-risk': { score: 72, level: 'Medium Risk', badge: 'medium' },
    'full-audit': { score: 55, level: 'High Risk', badge: 'high' },
    'red-team': { score: 41, level: 'Critical Risk', badge: 'critical' },
    'enterprise': { score: 48, level: 'High Risk', badge: 'high' }
};

// Update Risk Score Preview
function updateRiskScore(auditType) {
    const riskScorePreview = document.getElementById('riskScorePreview');
    const riskScoreValue = document.getElementById('riskScoreValue');
    const riskScoreLabel = document.getElementById('riskScoreLabel');
    const riskScoreBadge = document.getElementById('riskScoreBadge');

    if (riskScorePreview && auditType && riskScoreData[auditType]) {
        const data = riskScoreData[auditType];
        riskScoreValue.textContent = `${data.score}/100`;
        riskScoreLabel.textContent = `Estimated ${data.level}`;
        riskScoreBadge.textContent = data.level;
        riskScoreBadge.className = `risk-score-badge ${data.badge}`;
        riskScorePreview.classList.add('active');
    } else if (riskScorePreview) {
        riskScoreValue.textContent = '--';
        riskScoreLabel.textContent = 'Select an audit type to see estimated risk score';
        riskScoreBadge.textContent = 'Select an audit type';
        riskScoreBadge.className = 'risk-score-badge';
        riskScorePreview.classList.remove('active');
    }
}

// Audit Option Card Selection
if (auditOptionCards.length > 0) {
    auditOptionCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selected class from all cards
            auditOptionCards.forEach(c => c.classList.remove('selected'));
            // Add selected class to clicked card
            card.classList.add('selected');
            // Update hidden input value
            const auditType = card.getAttribute('data-audit-type');
            selectedAuditTypeInput.value = auditType;
            // Update risk score
            updateRiskScore(auditType);
        });
    });
}

// Audit Form Submission
if (auditForm) {
    auditForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const auditType = selectedAuditTypeInput.value;
        const auditDate = document.getElementById('auditDate').value;
        const auditTime = document.getElementById('auditTime').value;
        const clientName = document.getElementById('clientName').value.trim();
        const clientEmail = document.getElementById('clientEmail').value.trim();
        const clientPhone = document.getElementById('clientPhone').value.trim();

        // Basic validation
        if (!auditType) {
            showNotification('Please select an audit type.', 'error');
            return;
        }

        if (!auditDate || !auditTime) {
            showNotification('Please select both date and time.', 'error');
            return;
        }

        if (!clientName || !clientEmail || !clientPhone) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        if (!isValidEmail(clientEmail)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Check if date is in the past
        const selectedDate = new Date(auditDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showNotification('Please select a future date.', 'error');
            return;
        }

        // Simulate form submission
        setTimeout(() => {
            auditSuccessOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            auditForm.reset();
            // Reset selected card and risk score
            auditOptionCards.forEach(c => c.classList.remove('selected'));
            selectedAuditTypeInput.value = '';
            updateRiskScore(null);
        }, 300);
    });
}

// Close audit success overlay
if (auditSuccessOverlay) {
    auditSuccessOverlay.addEventListener('click', (e) => {
        if (e.target === auditSuccessOverlay) {
            auditSuccessOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Set minimum date to today for date input
const auditDateInput = document.getElementById('auditDate');
if (auditDateInput) {
    const today = new Date().toISOString().split('T')[0];
    auditDateInput.setAttribute('min', today);
}

// PDF Download Functionality
const downloadChecklistBtn = document.getElementById('downloadChecklistBtn');
if (downloadChecklistBtn) {
    downloadChecklistBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create a simple PDF-like content (placeholder)
        const pdfContent = `
PRE-AUDIT CHECKLIST
Helix-Zain Security Audit

1. System Documentation
   - Network architecture diagrams
   - Application inventory
   - Access control policies

2. Security Configuration
   - Firewall rules
   - SSL/TLS certificates
   - Authentication mechanisms

3. Compliance Requirements
   - Industry standards (ISO, SOC2)
   - Regulatory requirements
   - Data protection policies

4. Previous Audit Reports
   - Historical security assessments
   - Vulnerability reports
   - Incident logs

5. Access Preparation
   - Test environment access
   - Admin credentials (if needed)
   - Network access permissions

For questions, contact: hello@helix-zain.com
        `;
        
        // Create blob and download
        const blob = new Blob([pdfContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Helix-Zain-Pre-Audit-Checklist.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showNotification('Checklist downloaded successfully!', 'success');
    });
}

// Scroll Reveal for Audit Page
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        observer.observe(el);
    });
});

// Start Project Page - Premium Onboarding
document.addEventListener('DOMContentLoaded', () => {
    // Project Type Card Selection
    const projectTypeCards = document.querySelectorAll('.project-type-card');
    const selectedProjectTypeInput = document.getElementById('selectedProjectType');
    const otherProjectInputWrapper = document.getElementById('otherProjectInput');
    const otherProjectTypeInput = document.getElementById('otherProjectType');

    if (projectTypeCards.length > 0) {
        projectTypeCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove selected from all cards
                projectTypeCards.forEach(c => c.classList.remove('selected'));
                // Add selected to clicked card
                card.classList.add('selected');
                // Update hidden input
                const projectType = card.dataset.type;
                if (selectedProjectTypeInput) {
                    selectedProjectTypeInput.value = projectType;
                }
                // Show/hide other input
                if (otherProjectInputWrapper && otherProjectTypeInput) {
                    if (projectType === 'other') {
                        otherProjectInputWrapper.style.display = 'block';
                        otherProjectTypeInput.required = true;
                    } else {
                        otherProjectInputWrapper.style.display = 'none';
                        otherProjectTypeInput.required = false;
                        otherProjectTypeInput.value = '';
                    }
                }
            });
        });
    }

    // File Upload Handling
    const fileUploadInput = document.getElementById('fileUpload');
    const fileUploadList = document.getElementById('fileUploadList');

    if (fileUploadInput && fileUploadList) {
        fileUploadInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            fileUploadList.innerHTML = '';

            files.forEach((file, index) => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-upload-item';
                fileItem.innerHTML = `
                    <div class="file-upload-item-name">
                        <span>📄</span>
                        <span>${file.name}</span>
                    </div>
                    <button type="button" class="file-upload-item-remove" data-index="${index}">×</button>
                `;
                fileUploadList.appendChild(fileItem);

                // Remove file handler
                const removeBtn = fileItem.querySelector('.file-upload-item-remove');
                removeBtn.addEventListener('click', () => {
                    fileItem.remove();
                    // Create new FileList without removed file
                    const dt = new DataTransfer();
                    Array.from(fileUploadInput.files).forEach((f, i) => {
                        if (i !== index) dt.items.add(f);
                    });
                    fileUploadInput.files = dt.files;
                });
            });
        });
    }

    // Testimonial Carousel
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;

    function showSlide(index) {
        testimonialSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        carouselDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    }

    if (carouselNext) {
        carouselNext.addEventListener('click', nextSlide);
    }

    if (carouselPrev) {
        carouselPrev.addEventListener('click', prevSlide);
    }

    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-rotate carousel
    if (testimonialSlides.length > 0) {
        setInterval(nextSlide, 5000);
    }

    // FAQ Accordion
    const startProjectFaqItems = document.querySelectorAll('.start-project-faq-item');
    startProjectFaqItems.forEach(item => {
        const question = item.querySelector('.start-project-faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                // Close all items
                startProjectFaqItems.forEach(i => i.classList.remove('active'));
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Form Submission
    const submitProjectBtn = document.getElementById('submitProjectBtn');
    const successOverlay = document.getElementById('successOverlay');
    const addToCalendarBtn = document.getElementById('addToCalendarBtn');
    const downloadChecklistBtn = document.getElementById('downloadChecklistBtn');

    if (submitProjectBtn) {
        submitProjectBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Validation
            const projectType = selectedProjectTypeInput ? selectedProjectTypeInput.value : '';
            const projectName = document.getElementById('projectName') ? document.getElementById('projectName').value.trim() : '';
            const projectDescription = document.getElementById('projectDescription') ? document.getElementById('projectDescription').value.trim() : '';
            const budget = document.querySelector('input[name="budget"]:checked') ? document.querySelector('input[name="budget"]:checked').value : '';
            const timeline = document.querySelector('input[name="timeline"]:checked') ? document.querySelector('input[name="timeline"]:checked').value : '';
            const clientName = document.getElementById('clientName') ? document.getElementById('clientName').value.trim() : '';
            const clientEmail = document.getElementById('clientEmail') ? document.getElementById('clientEmail').value.trim() : '';
            const clientPhone = document.getElementById('clientPhone') ? document.getElementById('clientPhone').value.trim() : '';

            // Check required fields
            if (!projectType) {
                alert('Please select a project type.');
                document.getElementById('projectTypeSection').scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            if (projectType === 'other' && (!otherProjectTypeInput || !otherProjectTypeInput.value.trim())) {
                alert('Please specify your project type.');
                return;
            }

            if (!projectName) {
                alert('Please enter a project name.');
                document.getElementById('requirementsSection').scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            if (!projectDescription) {
                alert('Please provide a project description.');
                document.getElementById('requirementsSection').scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            if (!budget) {
                alert('Please select a budget range.');
                document.getElementById('budgetSection').scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            if (!timeline) {
                alert('Please select a timeline.');
                document.getElementById('timelineSection').scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            if (!clientName || !clientEmail || !clientPhone) {
                alert('Please fill in all required contact information.');
                document.getElementById('clientDetailsSection').scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(clientEmail)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Send to Google Sheets
            const goals = Array.from(document.querySelectorAll('input[name="goals"]:checked'))
                .map(cb => cb.value).join(', ');
            const clientCompany = document.getElementById('clientCompany') ? document.getElementById('clientCompany').value.trim() : '';
            const meetingPreference = document.getElementById('meetingPreference') ? document.getElementById('meetingPreference').value : '';

            sendToGoogleSheets({
                formType: 'start-project',
                clientName, clientEmail, clientPhone, clientCompany,
                projectType: projectType === 'other' && otherProjectTypeInput
                    ? otherProjectTypeInput.value.trim()
                    : projectType,
                goals,
                budget,
                timeline,
                projectName,
                projectDescription,
                meetingPreference
            });

            // Show success overlay
            if (successOverlay) {
                successOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Success Overlay Buttons
    if (addToCalendarBtn) {
        addToCalendarBtn.addEventListener('click', () => {
            // Create calendar event
            const startDate = new Date();
            startDate.setDate(startDate.getDate() + 1);
            startDate.setHours(10, 0, 0, 0);
            const endDate = new Date(startDate);
            endDate.setHours(11, 0, 0, 0);

            const formatDate = (date) => {
                return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
            };

            const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Project Discussion with Helix-Zain&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=Project consultation call`;
            window.open(calendarUrl, '_blank');
        });
    }

    if (downloadChecklistBtn) {
        downloadChecklistBtn.addEventListener('click', () => {
            const checklistContent = `Pre-Project Checklist:\n\n1. Define clear project goals and objectives\n2. Prepare project requirements and specifications\n3. Gather any existing documentation or designs\n4. List key features and functionality needed\n5. Consider your target audience and user needs\n6. Prepare questions for the consultation call\n7. Review your budget and timeline expectations\n\nThank you for preparing!`;
            const blob = new Blob([checklistContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Helix-Zain_Pre_Project_Checklist.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        });
    }

    // Smooth scroll to sections on button click
    const submitBtn = document.getElementById('submitProjectBtn');
    if (submitBtn) {
        // Already handled above
    }

    // Services grid: click card (outside links) to open unified request form with service pre-selected
    document.querySelectorAll('.service-category-card[data-request-service]').forEach((card) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            if (e.target.closest('a, button, .coming-soon-badge')) return;
            const key = card.getAttribute('data-request-service');
            if (key) window.location.href = `request-service.html?service=${encodeURIComponent(key)}`;
        });
    });
});
