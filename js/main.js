/**
 * =================================================================
 * |                             main.js                           |
 * |                    Primary JavaScript File                    |
 * =================================================================
 *
 * This file contains the main JavaScript logic for the portfolio website.
 * It handles:
 * 1. Theme Toggling (Dark/Light Mode)
 * 2. Sticky Header on Scroll
 * 3. Active Link Highlighting on Scroll (Scroll-spy)
 * 4. Contact Form Submission
 * 5. Skills/Tools Toggle Functionality
 * 6. Scroll to Top Button
 */

document.addEventListener('DOMContentLoaded', () => {

    // Theme, Header, and Scroll-spy logic
    const themeToggleButton = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggleButton.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__nav a');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    sections.forEach(section => observer.observe(section));

    /**
     * ---------------------------------
     * Skills/Tools Toggle
     * ---------------------------------
     */
    const skillsBtn = document.getElementById('skills-btn');
    const toolsBtn = document.getElementById('tools-btn');
    const skillsContent = document.getElementById('skills-content-icons');
    const toolsContent = document.getElementById('tools-content');

    skillsBtn.addEventListener('click', () => {
        skillsBtn.classList.add('active');
        toolsBtn.classList.remove('active');
        skillsContent.style.display = 'grid';
        toolsContent.style.display = 'none';
    });

    toolsBtn.addEventListener('click', () => {
        toolsBtn.classList.add('active');
        skillsBtn.classList.remove('active');
        toolsContent.style.display = 'grid';
        skillsContent.style.display = 'none';
    });

    /**
     * ---------------------------------
     * Contact Form Submission
     * ---------------------------------
     */
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = this.elements.name.value.trim();
        const email = this.elements.email.value.trim();
        const phone = this.elements.phone.value.trim();
        const message = this.elements.message.value.trim();
        
        if (!name || !email || !message) {
            alert('Please fill out Name, Email, and Message fields.');
            return;
        }
        
        const yourEmail = 'dnyaneshtupe@email.com';
        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
        window.location.href = `mailto:${yourEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        this.reset();
    });

    /**
     * ---------------------------------
     * Scroll to Top Button
     * ---------------------------------
     */
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

});
