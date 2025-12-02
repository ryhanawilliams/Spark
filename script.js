// Smooth scroll and active link highlighting
document.addEventListener('DOMContentLoaded', function() {
    const aboutLink = document.getElementById('about-link');
    const aboutSection = document.getElementById('about');
    const sponsorsLink = document.getElementById('sponsors-link');
    const sponsorsSection = document.getElementById('sponsors');
    const faqLink = document.getElementById('faq-link');
    const faqSection = document.getElementById('faq');
    
    // Function to check if section is in view
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        // Check if element is in viewport (with some offset for better UX)
        return (
            rect.top >= -200 &&
            rect.left >= 0 &&
            rect.bottom <= windowHeight + 200 &&
            rect.right <= windowWidth
        );
    }
    
    // Function to update active state
    function updateActiveLink() {
        // Remove active from all links first
        aboutLink.classList.remove('active');
        sponsorsLink.classList.remove('active');
        if (faqLink) faqLink.classList.remove('active');
        
        // Check which section is in view
        if (faqSection && isInViewport(faqSection)) {
            if (faqLink) faqLink.classList.add('active');
        } else if (isInViewport(sponsorsSection)) {
            sponsorsLink.classList.add('active');
        } else if (isInViewport(aboutSection)) {
            aboutLink.classList.add('active');
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Check on page load
    updateActiveLink();
    
    // Handle click on ABOUT link
    aboutLink.addEventListener('click', function(e) {
        e.preventDefault();
        aboutSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
    
    // Handle click on SPONSORS link
    sponsorsLink.addEventListener('click', function(e) {
        e.preventDefault();
        sponsorsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
    
    // Smooth scroll for FAQ link
    if (faqLink && faqSection) {
        faqLink.addEventListener('click', function(e) {
            e.preventDefault();
            faqSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                // Close all items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
});

// Team carousel functionality - auto-cycling
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('team-carousel');
    
    if (!carousel) return;
    
    const teamMembers = carousel.querySelectorAll('.team-member');
    
    if (teamMembers.length === 0) return;
    
    let currentIndex = 0;
    const membersPerView = 1; // Show 1 member at a time
    
    // Calculate total slides (0-indexed)
    const totalSlides = Math.max(0, teamMembers.length - membersPerView);
    
    // Function to update carousel position
    function updateCarousel() {
        if (teamMembers.length === 0) return;
        
        // Get the width of one member including gap
        const firstMember = teamMembers[0];
        const memberWidth = firstMember.offsetWidth || 500;
        const gap = 300; // Match the gap in CSS
        const slideWidth = memberWidth + gap;
        
        // Calculate translation - move by 1 member at a time
        const translateX = -(currentIndex * slideWidth);
        carousel.style.transform = `translateX(${translateX}px)`;
    }
    
    // Auto-cycle function
    function autoCycle() {
        if (currentIndex < totalSlides) {
            currentIndex++;
        } else {
            // Loop back to the beginning
            currentIndex = 0;
        }
        updateCarousel();
    }
    
    // Initialize
    updateCarousel();
    
    // Auto-cycle every 4 seconds
    setInterval(autoCycle, 4000);
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateCarousel, 250);
    });
});

// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        // Wait at least 2 seconds before hiding
        setTimeout(function() {
            // Add fade-out class
            loadingScreen.classList.add('fade-out');
            // Remove from DOM after animation
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000);
    }
});

