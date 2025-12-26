// Focus Foods Hub - Main JavaScript

// Waitlist Form Submission
document.getElementById('waitlistForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    
    // In production, you would send this to a server
    // For now, we'll just show a success message
    
    alert(`Thank you ${name}! You've been added to our waitlist. We'll contact you at ${email} when we launch.`);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('waitlistModal'));
    modal.hide();
    
    // Reset form
    this.reset();
});

// Restaurant Savings Calculator
const calculator = {
    init: function() {
        const slider = document.getElementById('monthlyOrders');
        const orderValue = document.getElementById('orderValue');
        const competitorCost = document.getElementById('competitorCost');
        const ourCost = document.getElementById('ourCost');
        const savingsAmount = document.getElementById('savingsAmount');
        
        if (!slider) return;
        
        // Update display on slider change
        slider.addEventListener('input', function() {
            const orders = parseInt(this.value);
            
            // Update order value display
            orderValue.textContent = `${orders} orders`;
            
            // Calculate costs
            const avgOrderValue = 500; // Average order value in PKR
            const competitorCostValue = Math.round(orders * avgOrderValue * 0.25); // 25% commission
            const ourCostValue = orders <= 150 ? 400 : 600; // Tiered pricing
            
            // Update displays
            competitorCost.textContent = `₨${competitorCostValue.toLocaleString()}`;
            ourCost.textContent = `₨${ourCostValue.toLocaleString()}`;
            
            // Calculate and display savings
            const savings = competitorCostValue - ourCostValue;
            savingsAmount.textContent = `₨${savings.toLocaleString()}`;
            
            // Update savings result
            document.getElementById('savingsResult').innerHTML = `
                <h5><i class="fas fa-money-bill-wave me-2"></i> 
                You save: <span id="savingsAmount">₨${savings.toLocaleString()}</span>/month</h5>
                <p class="mb-0">That's ₨${(savings * 12).toLocaleString()} per year!</p>
            `;
        });
        
        // Trigger initial calculation
        slider.dispatchEvent(new Event('input'));
    }
};

// Mobile Menu Enhancement
const mobileMenu = {
    init: function() {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Close mobile menu when a link is clicked
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });
    }
};

// Scroll Animation
const scrollAnimations = {
    init: function() {
        // Add animation class to elements when they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                }
            });
        }, observerOptions);
        
        // Observe elements you want to animate
        document.querySelectorAll('.step-card, .pricing-card').forEach(el => {
            observer.observe(el);
        });
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    calculator.init();
    mobileMenu.init();
    scrollAnimations.init();
    
    // Add current year to footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return re.test(phone);
}

// Waitlist counter (mock data)
function updateWaitlistCounter() {
    const counter = document.getElementById('waitlistCounter');
    if (counter) {
        // In production, fetch from API
        // For now, use a mock number that increases
        let currentCount = parseInt(counter.textContent) || 548;
        currentCount += Math.floor(Math.random() * 5) + 1;
        counter.textContent = currentCount;
    }
}

// Update counter every 30 seconds (for demo purposes)
setInterval(updateWaitlistCounter, 30000);
