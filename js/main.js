// MISAL Lab - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    console.log('MISAL Lab Website Loaded');

    // Add active class to current nav link
    setActiveNavLink();

    // Smooth scrolling for anchor links
    setupSmoothScroll();

    // Add fade-in animation to cards
    addCardAnimations();
});

/**
 * Set active nav link based on current page
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Add intersection observer for card animations
 */
function addCardAnimations() {
    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

/**
 * Utility function to format date
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

/**
 * Utility function to create notification/alert
 */
function showNotification(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.insertBefore(alertDiv, document.body.firstChild);

    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

/**
 * Setup navigation collapse on mobile when link is clicked
 */
function setupMobileNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });
}

// Initialize mobile navigation
setupMobileNavigation();

/**
 * Log page analytics
 */
function logPageView() {
    const page = window.location.pathname;
    console.log(`Page viewed: ${page}`);
}

// Log page view on load
logPageView();
