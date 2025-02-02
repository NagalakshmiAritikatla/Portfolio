// Initialize AOS Animation Library
AOS.init({
    duration: 1000,
    once: true
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to navigation items
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Add scroll animation for the hero section
window.addEventListener('scroll', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    let scrolled = window.scrollY;
    
    if (heroContent && heroImage) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Add hover effect for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

// Section Glow Effect
const sections = document.querySelectorAll('section');

const sectionOptions = {
    threshold: 0.3, // Trigger when 30% of the section is visible
    rootMargin: "-50px" // Adds a bit of margin to make the effect smoother
};

const sectionObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('glow');
            // Optional: remove glow when section is not in view
            setTimeout(() => {
                if (!entry.isIntersecting) {
                    entry.target.classList.remove('glow');
                }
            }, 2000);
        } else {
            entry.target.classList.remove('glow');
        }
    });
}, sectionOptions);

// Observe all sections
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Add error handling for PDF loading
document.addEventListener('DOMContentLoaded', function() {
    const resumePDF = document.getElementById('resumePDF');
    if (resumePDF) {
        resumePDF.onerror = function() {
            console.error('Error loading PDF');
            resumePDF.innerHTML = `
                <p>Error loading PDF. 
                   <a href="./resume.pdf" download>Click here to download instead</a>
                </p>
            `;
        };
    }
});

// Function to open PDF preview
function openPDFPreview(pdfPath) {
    const pdfModal = document.getElementById('pdfPreviewModal');
    const pdfViewer = document.getElementById('pdfViewer');
    
    if (pdfModal && pdfViewer) {
        pdfViewer.src = pdfPath;
        pdfModal.style.display = "block";
        document.body.style.overflow = "hidden";
    }
}

// Function to close PDF preview
function closePDFPreview() {
    const pdfModal = document.getElementById('pdfPreviewModal');
    if (pdfModal) {
        pdfModal.style.display = "none";
        document.body.style.overflow = "auto";
        // Clear the source to stop PDF loading
        document.getElementById('pdfViewer').src = '';
    }
}

// Remove the old contact form handlers and replace with this one
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact form') || document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for contacting me! I will get back to you soon.');
            this.reset(); // Reset the form after submission
        });
    }
});
