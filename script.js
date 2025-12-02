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

