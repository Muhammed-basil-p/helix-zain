(function () {
    'use strict';

    var PACKAGES = {
        launch: {
            id: 'launch',
            name: 'Launch Package',
            priceHtml: '889 <span class="spd-price__currency">SAR</span>',
            priceAria: '889 Saudi riyals',
            tagline: 'Perfect for starting your digital presence',
            features: [
                'Basic Website Development',
                'Mobile Responsive Design',
                'Basic Security Setup',
                'Hosting Setup',
                '1 Month Support'
            ]
        },
        growth: {
            id: 'growth',
            name: 'Growth Package',
            priceHtml: '2,289 <span class="spd-price__currency">SAR</span>',
            priceAria: '2289 Saudi riyals',
            tagline: 'Built to grow your business online',
            features: [
                'Advanced Website or App Development',
                'UI/UX Design Enhancement',
                'SEO Optimization',
                'Branding Support',
                'Security Ensurement',
                'Hosting + Maintenance',
                '3 Months Support'
            ]
        },
        elite: {
            id: 'elite',
            name: 'Elite Package',
            priceHtml: '<span class="spd-price__prefix">Starting from</span> 8,889 <span class="spd-price__currency">SAR</span>',
            priceAria: 'Starting from 8889 Saudi riyals',
            tagline: 'Complete digital management for serious businesses',
            features: [
                'Full Website + App Development',
                'Advanced Security Protection',
                'SEO & Performance Optimization',
                'Brand Identity Design (Logo, Posters)',
                'Social Media Management',
                'Ongoing Maintenance & Support'
            ]
        }
    };

    var SECURITY_SECTIONS = {
        launch: {
            title: 'Security & Protection System',
            subtitle: 'Multi-layer protection designed to keep your website secure',
            cards: [
                {
                    icon: '🌐',
                    title: 'Cloud-Based Protection System',
                    items: [
                        'Cloudflare setup for website security',
                        'DDoS attack protection',
                        'Basic Web Application Firewall (WAF)',
                        'Bot and spam traffic filtering',
                        'Secure HTTPS (SSL) enforcement'
                    ]
                },
                {
                    icon: '🛡️',
                    title: 'Website Protection Layer',
                    items: [
                        'Protection against common web attacks (XSS, injection attempts)',
                        'Secure request filtering system',
                        'Blocking suspicious traffic behavior',
                        'Basic abuse prevention mechanisms'
                    ]
                },
                {
                    icon: '🔐',
                    title: 'Authentication & User Security',
                    items: [
                        'Secure login and signup system',
                        'Password encryption and safe storage',
                        'Login attempt protection',
                        'Secure session handling',
                        'Password reset and email verification system'
                    ]
                },
                {
                    icon: '🧩',
                    title: 'Authorization & Access Control',
                    items: [
                        'Role-based access system (Admin / User / Guest)',
                        'Protected routes and restricted areas',
                        'Feature-level access control',
                        'Secure API access rules'
                    ]
                },
                {
                    icon: '🧱',
                    title: 'API Security Layer',
                    items: [
                        'Protected API endpoints',
                        'Request validation and filtering',
                        'Rate limiting to prevent abuse',
                        'API key protection',
                        'Request size and traffic control'
                    ]
                },
                {
                    icon: '🚫',
                    title: 'Anti-Spam & Bot Protection',
                    items: [
                        'Form spam protection system',
                        'Bot detection for contact forms',
                        'Request throttling system',
                        'Temporary blocking of suspicious activity',
                        'CAPTCHA-based protection (if needed)'
                    ]
                },
                {
                    icon: '🔑',
                    title: 'Secure Hosting Configuration',
                    items: [
                        'Firewall setup with only required ports open',
                        'Secure server configuration',
                        'SSH access protection using keys',
                        'Basic server hardening practices'
                    ]
                },
                {
                    icon: '🔒',
                    title: 'HTTPS & Secure Communication',
                    items: [
                        'SSL certificate installation',
                        'Force HTTPS redirect',
                        'Secure encrypted data transmission'
                    ]
                }
            ]
        },
        elite: {
            title: 'Advanced Security & Protection System',
            subtitle: 'Multi-layer protection designed for modern business websites',
            cards: [
                {
                    icon: '🔐',
                    title: 'Authentication & Access Control',
                    items: [
                        'Secure user authentication (JWT-based)',
                        'Refresh token system (persistent login)',
                        'Two-Factor Authentication (2FA) via email OTP',
                        'Role-Based Access Control (Admin / User / Staff)',
                        'Session management with active session tracking',
                        'Auto session expiry with idle timeout',
                        'Login attempt limiting and temporary lockout',
                        'Secure logout that invalidates tokens'
                    ]
                },
                {
                    icon: '🔒',
                    title: 'Data Protection & Encryption',
                    items: [
                        'Password hashing (bcrypt / argon2)',
                        'End-to-end encryption for sensitive data',
                        'Full HTTPS + SSL enforcement',
                        'Secure cookie handling (HttpOnly, Secure flags)',
                        'Environment variable protection (no secrets exposed)',
                        'Database query protection using prepared statements'
                    ]
                },
                {
                    icon: '🛡️',
                    title: 'Attack Protection (Core Web Security)',
                    items: [
                        'SQL Injection protection',
                        'XSS (Cross-Site Scripting) protection',
                        'CSRF (Cross-Site Request Forgery) protection',
                        'Input validation on frontend and backend',
                        'Input sanitization to block malicious data',
                        'File upload security (type & size validation)',
                        'Rate limiting for API and login endpoints'
                    ]
                },
                {
                    icon: '🌐',
                    title: 'Server & API Security',
                    items: [
                        'Secure REST API with token authentication',
                        'API rate limiting and throttling',
                        'CORS configuration to restrict allowed origins',
                        'Security headers: CSP, X-Frame-Options, X-Content-Type-Options, HSTS',
                        'Hide server and tech stack details'
                    ]
                },
                {
                    icon: '📊',
                    title: 'Monitoring & Logging',
                    items: [
                        'User activity logs (logins and key actions)',
                        'Centralized error logging system',
                        'Suspicious activity detection signals',
                        'Basic admin security overview panel',
                        'IP tracking for login attempts'
                    ]
                },
                {
                    icon: '🚨',
                    title: 'Alerts & Threat Response',
                    items: [
                        'Email alerts for multiple failed login attempts',
                        'New device login notifications',
                        'Suspicious activity alerts',
                        'Temporary IP blocking for abusive behavior'
                    ]
                },
                {
                    icon: '💾',
                    title: 'Backup & Recovery',
                    items: [
                        'Automated database backups',
                        'Scheduled backups (daily / weekly)',
                        'One-click restore workflow',
                        'Assisted data recovery support'
                    ]
                },
                {
                    icon: '🔍',
                    title: 'Security Audit & Hardening',
                    items: [
                        'Pre-deployment security checklist',
                        'Basic vulnerability scanning',
                        'Code-level security best practices applied',
                        'Performance plus security optimization',
                        'Removal of unused endpoints and routes'
                    ]
                },
                {
                    icon: '⚙️',
                    title: 'Advanced Protection (Elite Features)',
                    items: [
                        'Device and session tracking (see where users logged in)',
                        'Token expiration and rotation strategy',
                        'Basic bot and spam protection for forms and APIs',
                        'Admin permission restrictions for sensitive actions',
                        'Secure file storage handling',
                        'Anti-clickjacking protection'
                    ]
                }
            ]
        }
    };

    var securityDefaults = null;

    function getPackageKey() {
        var params = new URLSearchParams(window.location.search);
        var key = (params.get('package') || 'growth').toLowerCase();
        if (!PACKAGES[key]) return 'growth';
        return key;
    }

    function buildFeatureList(ul, features) {
        ul.innerHTML = '';
        features.forEach(function (text) {
            var li = document.createElement('li');
            var icon = document.createElement('span');
            icon.className = 'spd-feature-icon';
            icon.setAttribute('aria-hidden', 'true');
            var span = document.createElement('span');
            span.textContent = text;
            li.appendChild(icon);
            li.appendChild(span);
            ul.appendChild(li);
        });
    }

    function createSecurityCard(card) {
        var article = document.createElement('article');
        article.className = 'spd-security-card';

        var heading = document.createElement('h3');
        var icon = document.createElement('span');
        var iconEmoji = document.createElement('span');
        icon.className = 'spd-security-icon';
        icon.setAttribute('aria-hidden', 'true');
        iconEmoji.className = 'spd-security-icon-emoji';
        iconEmoji.textContent = card.icon;
        icon.appendChild(iconEmoji);
        heading.appendChild(icon);
        heading.appendChild(document.createTextNode(' ' + card.title));
        article.appendChild(heading);

        var list = document.createElement('ul');
        card.items.forEach(function (item) {
            var li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
        });
        article.appendChild(list);
        return article;
    }

    function initSecurityDefaults() {
        if (securityDefaults) return;
        var titleEl = document.getElementById('spd-security-title');
        var subtitleEl = document.getElementById('spd-security-subtitle');
        var gridEl = document.getElementById('spd-security-grid');
        if (!titleEl || !subtitleEl || !gridEl) return;
        securityDefaults = {
            title: titleEl.textContent,
            subtitle: subtitleEl.textContent,
            html: gridEl.innerHTML
        };
    }

    function applySecurityContent(key) {
        var sectionEl = document.getElementById('spd-security-section');
        var titleEl = document.getElementById('spd-security-title');
        var subtitleEl = document.getElementById('spd-security-subtitle');
        var gridEl = document.getElementById('spd-security-grid');
        if (!sectionEl || !titleEl || !subtitleEl || !gridEl) return;

        initSecurityDefaults();

        if (key === 'growth') {
            sectionEl.hidden = false;
            if (securityDefaults) {
                titleEl.textContent = securityDefaults.title;
                subtitleEl.textContent = securityDefaults.subtitle;
                gridEl.innerHTML = securityDefaults.html;
            }
            return;
        }

        var launchConfig = SECURITY_SECTIONS[key];
        if (!launchConfig) {
            sectionEl.hidden = true;
            return;
        }

        sectionEl.hidden = false;
        titleEl.textContent = launchConfig.title;
        subtitleEl.textContent = launchConfig.subtitle;
        gridEl.innerHTML = '';
        launchConfig.cards.forEach(function (card) {
            gridEl.appendChild(createSecurityCard(card));
        });
    }

    function applyPackage(key) {
        var data = PACKAGES[key];
        var titleEl = document.getElementById('spd-package-title');
        var priceEl = document.getElementById('spd-price');
        var taglineEl = document.getElementById('spd-tagline');
        var listEl = document.getElementById('spd-feature-list');
        var hiddenId = document.getElementById('spd-package-id');
        if (!data || !titleEl || !priceEl || !taglineEl || !listEl) return;

        document.title = data.name + ' | Helix-Zain';
        titleEl.textContent = data.name;
        priceEl.innerHTML = data.priceHtml;
        priceEl.setAttribute('aria-label', data.priceAria);
        taglineEl.textContent = data.tagline;
        buildFeatureList(listEl, data.features);
        if (hiddenId) hiddenId.value = data.id;
        applySecurityContent(key);
    }

    function initReveals() {
        var nodes = document.querySelectorAll('.spd-reveal');
        if (!nodes.length) return;
        var reduce = typeof window.matchMedia === 'function'
            && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            nodes.forEach(function (n) { n.classList.add('spd-reveal--visible'); });
            return;
        }
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('spd-reveal--visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        nodes.forEach(function (n) { obs.observe(n); });
    }

    function initJourneyTimeline() {
        var track = document.getElementById('spdJourneyTrack');
        var progress = document.getElementById('spdJourneyProgress');
        var rail = track ? track.querySelector('.spd-journey-rail') : null;
        var steps = document.querySelectorAll('.spd-journey-step[data-step-node]');
        if (!track || !progress || !steps.length) return;

        var reduce = typeof window.matchMedia === 'function'
            && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduce) {
            progress.style.transform = 'scaleY(1)';
            progress.style.setProperty('--spd-progress-ratio', '1');
            progress.style.setProperty('--spd-streak-y', '0px');
            steps.forEach(function (step) {
                step.classList.add('is-visible');
                step.classList.add('is-active');
            });
            return;
        }

        var cardObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });

        steps.forEach(function (step) { cardObserver.observe(step); });

        var updateProgress = function () {
            var rect = track.getBoundingClientRect();
            var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            var start = viewportHeight * 0.2;
            var end = viewportHeight * 0.82;
            var distance = rect.height + end - start;
            var traveled = end - rect.top;
            var ratio = Math.max(0, Math.min(1, traveled / distance));
            progress.style.transform = 'scaleY(' + ratio.toFixed(3) + ')';
            progress.style.setProperty('--spd-progress-ratio', ratio.toFixed(3));
            progress.style.setProperty('--spd-streak-y', (rect.height * ratio).toFixed(2) + 'px');

            if (rail) {
                var parallaxOffset = (ratio - 0.5) * 10;
                rail.style.transform = 'translateY(' + parallaxOffset.toFixed(2) + 'px)';
            }

            steps.forEach(function (step) {
                var node = step.querySelector('.spd-journey-node');
                if (!node) return;
                var nodeRect = node.getBoundingClientRect();
                var active = nodeRect.top + (nodeRect.height * 0.5) <= (viewportHeight * 0.62);
                step.classList.toggle('is-active', active);
            });
        };

        var ticking = false;
        var onScroll = function () {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(function () {
                updateProgress();
                ticking = false;
            });
        };

        updateProgress();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
    }

    function openSuccessModal(overlay, previouslyFocused) {
        overlay.classList.add('show');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('spd-modal-open');
        var closeBtn = document.getElementById('spdSuccessClose');
        window.setTimeout(function () {
            if (closeBtn) closeBtn.focus();
        }, 320);
        overlay._spdReturnFocus = previouslyFocused;
    }

    function closeSuccessModal(overlay) {
        overlay.classList.remove('show');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('spd-modal-open');
        var prev = overlay._spdReturnFocus;
        if (prev && typeof prev.focus === 'function') prev.focus();
    }

    function initModal() {
        var overlay = document.getElementById('spdSuccessOverlay');
        var backdrop = document.getElementById('spdSuccessBackdrop');
        var closeBtn = document.getElementById('spdSuccessClose');
        if (!overlay) return;

        if (backdrop) {
            backdrop.addEventListener('click', function () {
                closeSuccessModal(overlay);
            });
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                closeSuccessModal(overlay);
            });
        }
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && overlay.classList.contains('show')) {
                e.preventDefault();
                closeSuccessModal(overlay);
            }
        });
    }

    function initForm() {
        var form = document.getElementById('spdPackageForm');
        if (!form) return;
        var overlay = document.getElementById('spdSuccessOverlay');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!form.reportValidity()) return;
            if (overlay) openSuccessModal(overlay, document.activeElement);
            form.reset();
            var hiddenId = document.getElementById('spd-package-id');
            if (hiddenId) hiddenId.value = getPackageKey();
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        applyPackage(getPackageKey());
        initReveals();
        initJourneyTimeline();
        initModal();
        initForm();
    });
})();
