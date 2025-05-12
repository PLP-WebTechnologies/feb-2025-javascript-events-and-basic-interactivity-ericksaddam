// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
    // ===== 1. EVENT HANDLING =====
    
    // Button Click Event
    const clickBtn = document.getElementById('click-btn');
    const clickOutput = document.getElementById('click-output');
    
    clickBtn.addEventListener('click', function() {
        clickOutput.textContent = 'Button was clicked! 🎉';
        // Reset the message after 2 seconds
        setTimeout(() => {
            clickOutput.textContent = 'Click the button to see what happens!';
        }, 2000);
    });
    
    // Hover Effects
    const hoverBox = document.getElementById('hover-box');
    
    hoverBox.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#4a6cf7';
        this.style.color = 'white';
        this.textContent = 'Hovering! 😊';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#e1e5ee';
        this.style.color = '#333';
        this.textContent = 'Hover over me!';
    });
    
    // Keypress Detection
    const keyInput = document.getElementById('key-input');
    const keyOutput = document.getElementById('key-output');
    
    keyInput.addEventListener('keyup', function(event) {
        keyOutput.textContent = `You pressed: ${event.key} (Key code: ${event.keyCode})`;
    });
    
    // Bonus: Double-click Secret Action
    const secretBox = document.getElementById('secret-box');
    
    secretBox.addEventListener('dblclick', function() {
        this.style.backgroundColor = '#ff6b6b';
        this.style.transform = 'rotate(360deg)';
        this.style.transition = 'all 0.5s ease';
        this.textContent = '🎁 Secret Revealed! 🎁';
        
        // Reset after animation
        setTimeout(() => {
            this.style.backgroundColor = '#e1e5ee';
            this.style.transform = 'rotate(0deg)';
            this.textContent = 'Double-click me for a surprise!';
        }, 3000);
    });
    
    // ===== 2. INTERACTIVE ELEMENTS =====
    
    // Color Changing Button
    const colorBtn = document.getElementById('color-btn');
    const colors = ['#4a6cf7', '#ff6b6b', '#20bf6b', '#f7b731', '#8854d0', '#26de81', '#fd79a8'];
    let colorIndex = 0;
    
    colorBtn.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
    });
    
    // Image Gallery
    const galleryImg = document.getElementById('gallery-img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Array of image paths from local images folder
    const images = [
        'images/pexels-pixabay-414860.jpg',
        'images/pexels-anniroenkae-2156881.jpg',
        'images/pexels-apasaric-325185.jpg',
        'images/pexels-iriser-1209751.jpg',
        'images/pexels-markusspiske-1089438.jpg',
        'images/6020105.jpg',
        'images/pexels-wangming-photo-115695-354941.jpg'
    ];
    
    let currentImageIndex = 0;
    
    // Function to update the gallery image
    function updateGalleryImage() {
        galleryImg.style.opacity = '0';
        
        setTimeout(() => {
            galleryImg.src = images[currentImageIndex];
            galleryImg.style.opacity = '1';
        }, 300);
    }
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGalleryImage();
    });
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGalleryImage();
    });
    
    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ===== 3. FORM VALIDATION =====
    const validationForm = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    
    const formStatus = document.getElementById('form-status');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    
    // Validation functions
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            return false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    
    function validatePassword() {
        if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters long';
            return false;
        } else {
            passwordError.textContent = '';
            return true;
        }
    }
    
    function validateConfirmPassword() {
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
            return false;
        } else {
            confirmPasswordError.textContent = '';
            return true;
        }
    }
    
    // Form submission
    validationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        
        // If all validations pass
        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            formStatus.textContent = 'Form submitted successfully! ✅';
            formStatus.className = 'success';
            
            // Reset form after successful submission
            setTimeout(() => {
                validationForm.reset();
                formStatus.textContent = '';
                formStatus.className = '';
            }, 3000);
        } else {
            formStatus.textContent = 'Please fix the errors in the form ❌';
            formStatus.className = 'error';
        }
    });
});
