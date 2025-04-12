document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            nav.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');

            // Animate hamburger menu
            const bars = hamburgerMenu.querySelectorAll('.bar');
            if (hamburgerMenu.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    hamburgerMenu.classList.remove('active');

                    const bars = hamburgerMenu.querySelectorAll('.bar');
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            }
        });
    });

    // Form validation
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const locality = document.getElementById('locality').value;

            // Basic validation
            if (!name || !phone || !email || !locality) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // Phone validation
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)) {
                showNotification('Please enter a valid 10-digit phone number', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // If all validations pass, show success message
            showNotification('Thank you! We will call you back soon.', 'success');
            contactForm.reset();
        });
    }

    // Notification function
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 5px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                z-index: 1000;
                animation: slideIn 0.3s forwards;
            }
            
            .notification.success {
                background-color: #4caf50;
                color: white;
            }
            
            .notification.error {
                background-color: #f44336;
                color: white;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.style.animation = 'slideOut 0.3s forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });

        // Auto close after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s forwards';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }

    // Initialize Swiper sliders
    if (typeof Swiper !== 'undefined') {
        // Property slider
        const propertySlider = new Swiper('.property-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: '.property-slider .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.property-slider .swiper-button-next',
                prevEl: '.property-slider .swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }
        });

        // Testimonial slider
        const testimonialSlider = new Swiper('.testimonial-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: '.testimonial-slider .swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }
        });
    }

    // Floating CTA button
    const floatingCta = document.querySelector('.floating-cta');
    const leadForm = document.querySelector('.lead-form');

    if (floatingCta && leadForm) {
        floatingCta.addEventListener('click', function() {
            leadForm.scrollIntoView({ behavior: 'smooth' });

            // Highlight the form
            leadForm.classList.add('highlight-form');
            setTimeout(() => {
                leadForm.classList.remove('highlight-form');
            }, 1500);
        });

        // Add highlight form animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes highlightForm {
                0% { box-shadow: 0 0 0 0 rgba(0, 184, 212, 0.7); }
                70% { box-shadow: 0 0 0 20px rgba(0, 184, 212, 0); }
                100% { box-shadow: 0 0 0 0 rgba(0, 184, 212, 0); }
            }
            
            .highlight-form {
                animation: highlightForm 1.5s ease-out;
            }
        `;
        document.head.appendChild(style);
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.amenity-card, .step, .testimonial-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Add initial styles for animation
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .amenity-card, .step, .testimonial-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
    `;
    document.head.appendChild(animationStyle);

    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Property image hover effect
    const propertyCards = document.querySelectorAll('.property-card');

    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.1)';
        });
    });
});