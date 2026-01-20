// Configuração inicial
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    initNavigation();
    initThemeToggle();
    initFilters();
    initMobileMenu();
    initContactForm();
    initSmoothScroll();
    initPrintCV();
    initAnimations();
});

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (!navLinks.length || !sections.length) return;

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.toggle(
                            'active',
                            link.getAttribute('href') === `#${entry.target.id}`
                        );
                    });
                }
            });
        },
        {
            root: null,
            threshold: 0.6
        }
    );

    sections.forEach(section => observer.observe(section));
}


// Tema claro/escuro
function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Filtros
function initFilters() {
    // Skills
    const skillButtons = document.querySelectorAll('.filter-btn');
    const skillCategories = document.querySelectorAll('.skill-category');

    skillButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            skillButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            skillCategories.forEach(cat => {
                cat.classList.toggle(
                    'hidden',
                    filter !== 'all' && cat.dataset.category !== filter
                );
            });
        });
    });

    // Projetos
    const projectButtons = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    projectButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            projectButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                setTimeout(() => {
                    card.classList.toggle(
                        'hidden',
                        filter !== 'all' && card.dataset.category !== filter
                    );
                }, 50);
            });
        });
    });
}

// Menu mobile
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!menuToggle || !closeMenu || !mobileMenu) return;

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    function openMenu() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);

    document.querySelectorAll('.mobile-nav-link')
        .forEach(link => link.addEventListener('click', closeMobileMenu));
}


// Notificação
function showNotification(message, type = 'success') {
    document.querySelector('.notification')?.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
        color: '#fff',
        padding: '16px 24px',
        borderRadius: '8px',
        display: 'flex',
        gap: '16px',
        zIndex: '9999'
    });

    document.body.appendChild(notification);

    notification.querySelector('.notification-close')
        .addEventListener('click', () => notification.remove());

    setTimeout(() => notification.remove(), 5000);
}

// Smooth scroll
function initSmoothScroll() {
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;

            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        });
    });
}

// Print CV
function initPrintCV() {
    const btn = document.getElementById('print-cv');
    if (!btn) return;

    btn.addEventListener('click', e => {
        e.preventDefault();
        window.print();
    });
}

// Animações
function initAnimations() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('animate-in');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(
        '.project-card, .about-card, .skill-category, .timeline-item'
    ).forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
});
