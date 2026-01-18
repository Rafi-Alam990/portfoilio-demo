// ================================
// Mobile Menu Functionality
// ================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.querySelector('.sidebar-overlay');

function openMobileMenu() {
    mobileMenuToggle.classList.add('active');
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenuToggle.classList.remove('active');
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

mobileMenuToggle.addEventListener('click', () => {
    if (sidebar.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

sidebarOverlay.addEventListener('click', closeMobileMenu);

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeMobileMenu();
    }
});

// ================================
// Smooth Scrolling Navigation
// ================================
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Close mobile menu if open
            closeMobileMenu();

            // Calculate offset for better positioning
            const offset = window.innerWidth <= 768 ? 80 : 20;
            const targetPosition = targetSection.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }

        // Update active state
        document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    });
});

// ================================
// Form Submission Handler
// ================================
function handleSubmit(event) {
    event.preventDefault();

    const submitBtn = event.target.querySelector('.submit-btn');
    const originalContent = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;

    // Simulate sending (replace with actual form submission)
    setTimeout(() => {
        submitBtn.innerHTML = '<span>Message Sent!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        // Reset form
        event.target.reset();

        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 2000);
    }, 1500);

    return false;
}

// ================================
// Intersection Observer for Animations
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing after animation
            // sectionObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section-card').forEach(section => {
    sectionObserver.observe(section);
});

// Make hero section visible immediately
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'none';
}

// ================================
// Active Section Highlighting
// ================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Throttle scroll event for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(updateActiveNavLink);
});

// ================================
// Initialize on Load
// ================================
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial visibility check
    updateActiveNavLink();

    // Add visible class to first section immediately if in view
    const firstSection = document.querySelector('.section-card');
    if (firstSection) {
        const rect = firstSection.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            firstSection.classList.add('visible');
        }
    }
});

// ================================
// Handle Resize Events
// ================================
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, 250);
});