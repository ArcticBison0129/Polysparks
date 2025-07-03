// Enhanced mobile menu functionality - EXACT COPY FROM OTHER PAGES
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    } else {
        mobileMenu.classList.add('active');
        menuBtn.innerHTML = '✕';
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileMenu.classList.remove('active');
    menuBtn.innerHTML = '☰';
    document.body.style.overflow = 'auto';
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
        mobileMenu.classList.remove('active');
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Features management
let features = [];
const featureInput = document.getElementById('featureInput');
const addFeatureBtn = document.getElementById('addFeatureBtn');
const featuresList = document.getElementById('featuresList');

// FAQ management
let faqs = [];
const faqQuestion = document.getElementById('faqQuestion');
const faqAnswer = document.getElementById('faqAnswer');
const addFaqBtn = document.getElementById('addFaqBtn');
const faqList = document.getElementById('faqList');

// Tags management
const tagsInput = document.getElementById('tags');
const tagsDisplay = document.getElementById('tagsDisplay');
let tags = [];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeFeatures();
    initializeFaqs();
    initializeTags();
    initializePricing();
    initializeFileUpload();
    initializeFormValidation();
    initializeFormSubmission();
    initializeScrollAnimations();
    loadSavedFormData();
});

// Features functionality
function initializeFeatures() {
    if (addFeatureBtn && featureInput) {
        addFeatureBtn.addEventListener('click', () => {
            const feature = featureInput.value.trim();
            if (feature && !features.includes(feature) && features.length < 10) {
                features.push(feature);
                updateFeaturesList();
                featureInput.value = '';
            }
        });

        featureInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addFeatureBtn.click();
            }
        });
    }
}

function updateFeaturesList() {
    if (featuresList) {
        featuresList.innerHTML = features.map((feature, index) => 
            `<div class="feature-item">
                <span class="feature-text">${feature}</span>
                <button type="button" class="remove-feature" onclick="removeFeature(${index})">&times;</button>
            </div>`
        ).join('');
    }
}

function removeFeature(index) {
    features.splice(index, 1);
    updateFeaturesList();
}

// FAQ functionality
function initializeFaqs() {
    if (addFaqBtn) {
        addFaqBtn.addEventListener('click', () => {
            const question = faqQuestion.value.trim();
            const answer = faqAnswer.value.trim();
            
            if (question && answer && faqs.length < 10) {
                faqs.push({ question, answer });
                updateFaqList();
                faqQuestion.value = '';
                faqAnswer.value = '';
            }
        });
    }
}

function updateFaqList() {
    if (faqList) {
        faqList.innerHTML = faqs.map((faq, index) => 
            `<div class="faq-item">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                    <div style="flex: 1;">
                        <h4 class="faq-question-text">Q: ${faq.question}</h4>
                        <p class="faq-answer-text">A: ${faq.answer}</p>
                    </div>
                    <button type="button" class="remove-faq" onclick="removeFaq(${index})">&times;</button>
                </div>
            </div>`
        ).join('');
    }
}

function removeFaq(index) {
    faqs.splice(index, 1);
    updateFaqList();
}

// Tags functionality
function initializeTags() {
    if (tagsInput) {
        tagsInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const tag = tagsInput.value.trim().toLowerCase();
                
                if (tag && !tags.includes(tag) && tags.length < 10) {
                    tags.push(tag);
                    updateTagsDisplay();
                    tagsInput.value = '';
                }
            }
        });
    }
}

function updateTagsDisplay() {
    if (tagsDisplay) {
        tagsDisplay.innerHTML = tags.map(tag => 
            `<span class="tag-chip">
                ${tag}
                <span class="tag-remove" onclick="removeTag('${tag}')">&times;</span>
            </span>`
        ).join('');
    }
}

function removeTag(tagToRemove) {
    tags = tags.filter(tag => tag !== tagToRemove);
    updateTagsDisplay();
}

// Pricing model validation
function initializePricing() {
    const pricingCheckboxes = document.querySelectorAll('input[name="pricing"]');
    
    pricingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            validatePricing();
        });
    });
}

function validatePricing() {
    const pricingCheckboxes = document.querySelectorAll('input[name="pricing"]');
    const checkedPricing = Array.from(pricingCheckboxes).some(cb => cb.checked);
    
    pricingCheckboxes.forEach(cb => {
        const option = cb.closest('.pricing-option');
        if (!checkedPricing) {
            option.style.borderColor = '#ff6b6b';
        } else {
            option.style.borderColor = cb.checked ? '#00ff9d' : 'rgba(255, 255, 255, 0.1)';
        }
    });
    
    return checkedPricing;
}

// File upload handling
function initializeFileUpload() {
    const logoInput = document.getElementById('logo');
    const fileUpload = document.getElementById('logoUpload');

    if (logoInput && fileUpload) {
        logoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const fileName = file.name;
                const fileUploadText = fileUpload.querySelector('.file-upload-text');
                if (fileUploadText) {
                    fileUploadText.textContent = `Selected: ${fileName}`;
                }
                fileUpload.style.borderColor = '#00ff9d';
                fileUpload.style.background = 'rgba(0, 255, 157, 0.1)';
                
                // Simulate upload progress
                const uploadProgress = document.getElementById('uploadProgress');
                const progressBar = uploadProgress.querySelector('.upload-progress-bar');
                uploadProgress.style.opacity = '1';
                
                let progress = 0;
                const interval = setInterval(() => {
                    progress += 10;
                    progressBar.style.width = `${progress}%`;
                    if (progress >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            uploadProgress.style.opacity = '0';
                        }, 500);
                    }
                }, 100);
            }
        });

        // Drag and drop functionality
        fileUpload.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUpload.style.borderColor = '#00ff9d';
            fileUpload.style.background = 'rgba(0, 255, 157, 0.1)';
        });

        fileUpload.addEventListener('dragleave', (e) => {
            e.preventDefault();
            fileUpload.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            fileUpload.style.background = 'rgba(26, 26, 26, 0.5)';
        });

        fileUpload.addEventListener('drop', (e) => {
            e.preventDefault();
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                logoInput.files = files;
                logoInput.dispatchEvent(new Event('change'));
            }
        });
    }
}

// Form validation with enhanced visual feedback
function initializeFormValidation() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            const underline = input.nextElementSibling;
            if (input.hasAttribute('required') && input.value.trim() === '') {
                if (underline && underline.classList.contains('input-underline')) {
                    underline.style.background = '#ff6b6b';
                    underline.style.width = '100%';
                    setTimeout(() => {
                        underline.style.width = '0';
                    }, 2000);
                }
            }
        });

        input.addEventListener('focus', () => {
            const underline = input.nextElementSibling;
            if (underline && underline.classList.contains('input-underline')) {
                underline.style.background = 'linear-gradient(90deg, #00ff9d, #00d4aa)';
            }
        });
    });

    // Character count for description
    const description = document.getElementById('toolDescription');
    if (description) {
        const descHelp = description.parentElement.querySelector('.form-help');
        
        description.addEventListener('input', () => {
            const count = description.value.length;
            const min = 50;
            
            if (descHelp) {
                if (count < min) {
                    descHelp.textContent = `Minimum 50 characters. Current: ${count}`;
                    descHelp.style.color = '#ff6b6b';
                } else {
                    descHelp.textContent = `Character count: ${count}`;
                    descHelp.style.color = '#00ff9d';
                }
            }
        });
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe form sections for scroll animations
    document.querySelectorAll('.form-section').forEach(section => {
        observer.observe(section);
    });
    
    // Initial animation for form sections
    setTimeout(() => {
        document.querySelectorAll('.form-section').forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('visible');
            }, index * 200);
        });
    }, 500);
}

// IMPROVED: Function to scroll to element with proper offset to avoid header
function scrollToElementBelowHeader(element) {
    // Get the header height dynamically
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 80; // fallback to 80px if header not found
    
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight - 80;
    
    window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
    });
}

// Enhanced form submission with better error handling and positioning
function initializeFormSubmission() {
    const form = document.getElementById('submitToolForm');
    const submitBtn = document.querySelector('.submit-form-btn');
    const successMessage = document.getElementById('successMessage');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Check for first empty required field
            const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');
            let firstEmptyField = null;
            
            for (let field of requiredFields) {
                if (!field.value.trim()) {
                    firstEmptyField = field;
                    break;
                }
            }
            
            // Check pricing selection
            const pricingSelected = document.querySelectorAll('input[name="pricing"]:checked').length > 0;
            if (!pricingSelected && !firstEmptyField) {
                // If no pricing selected, scroll to pricing section
                const pricingSection = document.querySelector('[data-section="pricing"]');
                if (pricingSection) {
                    scrollToElementBelowHeader(pricingSection);
                    
                    // Show better visual feedback for pricing options
                    const pricingOptions = document.querySelectorAll('.pricing-option');
                    pricingOptions.forEach(option => {
                        option.style.borderColor = '#ff6b6b';
                        option.style.boxShadow = '0 0 15px rgba(255, 107, 107, 0.3)';
                    });
                    
                    // Reset the red highlighting after 3 seconds
                    setTimeout(() => {
                        pricingOptions.forEach(option => {
                            option.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                            option.style.boxShadow = 'none';
                        });
                    }, 3000);
                    
                    alert('Please select at least one pricing model.');
                    return;
                }
            }
            
            // Check features
            if (features.length === 0 && !firstEmptyField) {
                const featuresSection = document.querySelector('[data-section="features"]');
                if (featuresSection) {
                    scrollToElementBelowHeader(featuresSection);
                    alert('Please add at least one key feature.');
                    if (featureInput) {
                        // Add visual highlight to the feature input
                        featureInput.style.borderColor = '#ff6b6b';
                        featureInput.style.boxShadow = '0 0 15px rgba(255, 107, 107, 0.3)';
                        featureInput.focus();
                        
                        // Reset highlighting after focus
                        featureInput.addEventListener('focus', () => {
                            featureInput.style.borderColor = '';
                            featureInput.style.boxShadow = '';
                        }, { once: true });
                    }
                    return;
                }
            }
            
            // IMPROVED: If there's an empty required field, scroll to it with proper header offset
            if (firstEmptyField) {
                scrollToElementBelowHeader(firstEmptyField);
                
                // Enhanced visual feedback for empty required field
                firstEmptyField.style.borderColor = '#ff6b6b';
                firstEmptyField.style.boxShadow = '0 0 15px rgba(255, 107, 107, 0.3)';
                
                // Add visual feedback to the underline as well
                const underline = firstEmptyField.nextElementSibling;
                if (underline && underline.classList.contains('input-underline')) {
                    underline.style.background = '#ff6b6b';
                    underline.style.width = '100%';
                }
                
                // Focus the field after scrolling is complete
                setTimeout(() => {
                    firstEmptyField.focus();
                }, 300); // Small delay to ensure scroll completes
                
                // Reset highlighting when user starts typing
                const resetStyling = () => {
                    firstEmptyField.style.borderColor = '';
                    firstEmptyField.style.boxShadow = '';
                    if (underline && underline.classList.contains('input-underline')) {
                        underline.style.background = 'linear-gradient(90deg, #00ff9d, #00d4aa)';
                        underline.style.width = '0';
                    }
                };
                
                firstEmptyField.addEventListener('input', resetStyling, { once: true });
                firstEmptyField.addEventListener('focus', resetStyling, { once: true });
                
                return;
            }

            // Show enhanced loading state
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }

            // Collect form data
            const formData = new FormData(form);
            
            // Create comprehensive submission data object
            const submissionData = {
                // Basic Information
                toolName: formData.get('toolName'),
                toolUrl: formData.get('toolUrl'),
                tagline: formData.get('tagline'),
                toolDescription: formData.get('toolDescription'),
                logo: document.getElementById('logo').files[0],
                
                // Categorization
                toolCategory: formData.get('toolCategory'),
                tags: tags,
                
                // Pricing
                pricing: Array.from(document.querySelectorAll('input[name="pricing"]:checked')).map(cb => cb.value),
                priceDetails: formData.get('priceDetails'),
                
                // Key Metrics
                monthlyUsers: formData.get('monthlyUsers'),
                totalInteractions: formData.get('totalInteractions'),
                languagesSupported: formData.get('languagesSupported'),
                responseTime: formData.get('responseTime'),
                
                // Features and FAQs
                features: features,
                faqs: faqs,
                
                // Personal Information
                submitterName: formData.get('submitterName'),
                submitterEmail: formData.get('submitterEmail'),
                companyName: formData.get('companyName'),
                jobTitle: formData.get('jobTitle'),
                website: formData.get('website'),
                socialMedia: formData.get('socialMedia'),
                additionalInfo: formData.get('additionalInfo')
            };

            // Store submission data for review page
            try {
                localStorage.setItem('submissionData', JSON.stringify(submissionData));
                console.log('Submission data stored for review:', submissionData);
                
                // Redirect to review page after delay
                setTimeout(() => {
                    window.location.href = 'Confirm.html';
                }, 2000);
                
            } catch (error) {
                console.error('Error storing submission data:', error);
                alert('There was an error preparing your submission for review. Please try again.');
                
                // Reset button
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }
            }
        });
    }
}

// Auto-save functionality
let autoSaveTimeout;
const autoSaveInputs = document.querySelectorAll('input, textarea, select');

autoSaveInputs.forEach(input => {
    input.addEventListener('input', () => {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            saveFormData();
        }, 1000);
    });
});

function saveFormData() {
    const formData = {
        toolName: document.getElementById('toolName')?.value || '',
        toolUrl: document.getElementById('toolUrl')?.value || '',
        tagline: document.getElementById('tagline')?.value || '',
        toolDescription: document.getElementById('toolDescription')?.value || '',
        toolCategory: document.getElementById('toolCategory')?.value || '',
        priceDetails: document.getElementById('priceDetails')?.value || '',
        monthlyUsers: document.getElementById('monthlyUsers')?.value || '',
        totalInteractions: document.getElementById('totalInteractions')?.value || '',
        languagesSupported: document.getElementById('languagesSupported')?.value || '',
        responseTime: document.getElementById('responseTime')?.value || '',
        submitterName: document.getElementById('submitterName')?.value || '',
        submitterEmail: document.getElementById('submitterEmail')?.value || '',
        companyName: document.getElementById('companyName')?.value || '',
        jobTitle: document.getElementById('jobTitle')?.value || '',
        website: document.getElementById('website')?.value || '',
        socialMedia: document.getElementById('socialMedia')?.value || '',
        additionalInfo: document.getElementById('additionalInfo')?.value || '',
        features: features,
        tags: tags,
        faqs: faqs
    };
    
    try {
        localStorage.setItem('submitToolFormData', JSON.stringify(formData));
    } catch (e) {
        console.log('Auto-save failed:', e);
    }
}

// Load saved form data
function loadSavedFormData() {
    try {
        const savedData = localStorage.getItem('submitToolFormData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            
            // Restore form fields
            Object.keys(formData).forEach(key => {
                const input = document.getElementById(key);
                if (input && formData[key] && typeof formData[key] === 'string') {
                    input.value = formData[key];
                }
            });
            
            // Restore features, tags, and FAQs
            if (formData.features && Array.isArray(formData.features)) {
                features = formData.features;
                updateFeaturesList();
            }
            
            if (formData.tags && Array.isArray(formData.tags)) {
                tags = formData.tags;
                updateTagsDisplay();
            }
            
            if (formData.faqs && Array.isArray(formData.faqs)) {
                faqs = formData.faqs;
                updateFaqList();
            }
        }
    } catch (e) {
        console.log('Failed to load saved data:', e);
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        const form = document.getElementById('submitToolForm');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
});

// Focus on first input when page loads
window.addEventListener('load', function() {
    const firstInput = document.getElementById('toolName');
    if (firstInput) {
        setTimeout(() => {
            firstInput.focus();
        }, 1000);
    }
});