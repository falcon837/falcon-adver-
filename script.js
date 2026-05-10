/* ============================================
   FALCON LIMITED - JAVASCRIPT FUNCTIONALITY
   Health Informatics & Software Consultancy
   ============================================ */

// ============================================
// MOBILE MENU TOGGLE - IMPROVED
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    // Toggle menu on button click
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// SCROLL ANIMATION FOR ELEMENTS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements for scroll animation
document.querySelectorAll('.service-card, .team-member, .mission-card, .vision-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Reset message display
        formMessage.classList.remove('success', 'error');

        // Validation - check if fields are empty
        if (!name || !email || !message) {
            formMessage.textContent = 'Please fill in all fields.';
            formMessage.classList.add('error');
            formMessage.style.display = 'block';
            return;
        }

        // Email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.classList.add('error');
            formMessage.style.display = 'block';
            return;
        }

        // Form is valid - store and redirect
        storeSubmission(name, email, message);
        
        // Show success message briefly then redirect
        formMessage.classList.add('success');
        formMessage.style.display = 'block';

        // Reset form
        contactForm.reset();

        // Redirect to thank you page after 1.5 seconds
        setTimeout(() => {
            window.location.href = 'thank-you.html';
        }, 200);
    });
}

// ============================================
// STORE SUBMISSION IN LOCAL STORAGE & TXT FILE
// ============================================
function storeSubmission(name, email, message) {
    const submission = {
        id: Date.now(),
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        })
    };

    // Get existing submissions
    let submissions = JSON.parse(localStorage.getItem('falconSubmissions')) || [];
    
    // Add new submission
    submissions.push(submission);
    
    // Store back to localStorage
    localStorage.setItem('falconSubmissions', JSON.stringify(submissions));
    
    // Also store last submission for thank you page
    localStorage.setItem('lastSubmission', JSON.stringify(submission));
    
    console.log('✓ Submission #' + submissions.length + ' stored successfully');
    console.log('Total submissions:', submissions.length);
}

// ============================================
// DOWNLOAD SUBMISSIONS AS TEXT FILE
// ============================================
window.downloadSubmissions = function() {
    const submissions = JSON.parse(localStorage.getItem('falconSubmissions')) || [];
    
    if (submissions.length === 0) {
        alert('No submissions to download yet.');
        return;
    }

    // Create text content
    let textContent = '════════════════════════════════════════════\n';
    textContent += '  FALCON LIMITED - CONTACT FORM SUBMISSIONS\n';
    textContent += '════════════════════════════════════════════\n\n';
    textContent += 'Downloaded: ' + new Date().toLocaleString() + '\n';
    textContent += 'Total Submissions: ' + submissions.length + '\n';
    textContent += 'File: submissions-' + new Date().getTime() + '.txt\n\n';
    textContent += '════════════════════════════════════════════\n\n';

    submissions.forEach((submission, index) => {
        textContent += '───── SUBMISSION #' + (index + 1) + ' ─────\n';
        textContent += 'Date & Time: ' + submission.date + '\n';
        textContent += 'Submission ID: ' + submission.id + '\n';
        textContent += 'Name: ' + submission.name + '\n';
        textContent += 'Email: ' + submission.email + '\n';
        textContent += 'Message:\n' + submission.message + '\n';
        textContent += '─────────────────────────────────\n\n';
    });

    textContent += '════════════════════════════════════════════\n';
    textContent += 'End of Submissions Report\n';
    textContent += 'Falcon Limited © 2026\n';
    textContent += '════════════════════════════════════════════\n';

    // Create and trigger download
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textContent));
    element.setAttribute('download', 'falcon-submissions-' + new Date().getTime() + '.txt');
    element.style.display = 'none';
    
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    alert('✓ Downloaded ' + submissions.length + ' submission(s) as text file!');
};

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
let scrollPosition = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
});

// ============================================
// ACTIVE NAVIGATION LINK INDICATOR
// ============================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            navLinks.forEach(link => {
                link.style.color = 'var(--text-dark)';
            });

            const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.style.color = 'var(--primary-blue)';
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
updateActiveNavLink(); // Call on page load

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0.95';
