document.addEventListener('DOMContentLoaded', function() {
    // Animate story paragraphs on scroll
    const storyParagraphs = document.querySelectorAll('.story-text p');
    
    // Animate tokenomics cards on scroll
    const cards = document.querySelectorAll('.card');
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                
                if (entry.target.classList.contains('typewriter')) {
                    entry.target.style.transform = 'translateY(0)';
                } else if (entry.target.classList.contains('card')) {
                    entry.target.style.transform = 'translateY(0)';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observe elements for animation
    storyParagraphs.forEach(paragraph => {
        observer.observe(paragraph);
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // Gallery navigation
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevButton = document.querySelector('.gallery-nav.prev');
    const nextButton = document.querySelector('.gallery-nav.next');
    
    // Initially show all images
    galleryItems.forEach(item => {
        item.style.display = 'block';
    });
    
    // Set up navigation if we want to only show one image at a time
    if (window.innerWidth < 768) {
        // Show only the first image initially
        let currentImageIndex = 0;
        
        const showImage = (index) => {
            galleryItems.forEach((item, i) => {
                if (i === index) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });
        };
        
        // Initial setup
        showImage(currentImageIndex);
        
        // Navigation buttons
        prevButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
            showImage(currentImageIndex);
        });
        
        nextButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
            showImage(currentImageIndex);
        });
    }
    
    // Preload gallery images to ensure they display properly
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        const src = img.getAttribute('src');
        const newImg = new Image();
        newImg.src = src;
        newImg.onload = function() {
            img.style.opacity = '1';
        };
    });
    
    // Animate counter for total supply
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2500; // milliseconds
        const step = target / (duration / 30); // Update every 30ms
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.innerText = Math.ceil(current).toLocaleString();
                setTimeout(updateCounter, 30);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counterObserver.observe(counter);
    });
    
    // Mirror of Truth prophecy generator
    const prophecies = [
        "destined for legendary wealth",
        "written in the stars of fortune",
        "blessed by the ancient desert spirits",
        "about to change your destiny forever",
        "going to reveal hidden treasures",
        "the path to your mysterious fortune",
        "aligned with cosmic prosperity"
    ];
    
    const prophecyText = document.getElementById('prophecy-text');
    const mirrorCoin = document.querySelector('.mirror-coin');
    
    mirrorCoin.addEventListener('mouseenter', function() {
        const randomIndex = Math.floor(Math.random() * prophecies.length);
        prophecyText.innerText = "Your fate with $SNC is " + prophecies[randomIndex];
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add magical stars/particles to the background
    const storySection = document.getElementById('story');
    
    function createStars(parent, count) {
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Random position
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            
            // Random size
            const size = Math.random() * 2;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // Random opacity
            star.style.opacity = Math.random() * 0.8 + 0.2;
            
            // Random animation delay
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            parent.appendChild(star);
        }
    }
    
    // Create stars
    createStars(storySection, 100);
    
    // Glowing text effect
    const glowElements = document.querySelectorAll('h1, h2');
    
    glowElements.forEach(element => {
        setInterval(() => {
            const intensity = (Math.sin(Date.now() / 1000) + 1) * 5 + 5;
            element.style.textShadow = `0 0 ${intensity}px var(--gold-glow)`;
        }, 50);
    });
});

// Add CSS for the stars
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
.star {
    position: absolute;
    background-color: white;
    border-radius: 50%;
    animation: twinkle 5s infinite ease-in-out;
    z-index: 0;
}

@keyframes twinkle {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.8; }
}
`;
document.head.appendChild(styleSheet); 