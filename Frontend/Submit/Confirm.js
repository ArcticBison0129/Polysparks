// Initialize page with form data
function initializePage() {
    try {
        const submissionData = localStorage.getItem('submissionData');
        if (submissionData) {
            const data = JSON.parse(submissionData);
            populateReviewData(data);
            initializeAllFeatures();
        } else {
            console.log('No submission data found, redirecting to submit page');
            handleMissingData();
            setTimeout(() => {
                window.location.href = 'Submit.html';
            }, 3000);
        }
    } catch (error) {
        console.error('Error loading submission data:', error);
        handleMissingData();
        setTimeout(() => {
            window.location.href = 'Submit.html';
        }, 3000);
    }
}

// Populate with actual form data
function populateReviewData(data) {
    // Helper function to set value or show empty state
    function setValue(elementId, value, fallback = 'Not provided') {
        const element = document.getElementById(elementId);
        if (element) {
            if (value && value.trim() !== '') {
                element.textContent = value;
                element.classList.remove('empty-value');
            } else {
                element.textContent = fallback;
                element.classList.add('empty-value');
            }
        }
    }

    // Basic Information
    setValue('toolName', data.toolName);
    setValue('toolUrl', data.toolUrl);
    setValue('tagline', data.tagline);
    setValue('toolDescription', data.toolDescription);
    
    // Logo status
    const logoElement = document.getElementById('logoStatus');
    if (data.logo && data.logo.name) {
        logoElement.innerHTML = '✅ ' + data.logo.name;
        logoElement.classList.remove('empty-value');
    } else {
        logoElement.textContent = 'No logo uploaded';
        logoElement.classList.add('empty-value');
    }

    // Categorization
    if (data.toolCategory) {
        const categoryMap = {
            'chat': 'Chat & Conversational AI',
            'writing': 'Writing & Content',
            'coding': 'Code & Development',
            'design': 'Design & Creative',
            'business': 'Business & Productivity',
            'research': 'Research & Analysis',
            'education': 'Education & Learning',
            'marketing': 'Marketing & Sales',
            'image': 'Image Generation',
            'video': 'Video & Audio',
            'other': 'Other'
        };
        setValue('toolCategory', categoryMap[data.toolCategory] || data.toolCategory);
    } else {
        setValue('toolCategory', '', 'No category selected');
    }

    // Display tags
    const tagsElement = document.getElementById('tags');
    if (data.tags && Array.isArray(data.tags) && data.tags.length > 0) {
        const tagsHtml = data.tags.map(tag => 
            `<span class="tag-display">${tag}</span>`
        ).join('');
        tagsElement.innerHTML = `<div class="tags-display">${tagsHtml}</div>`;
        tagsElement.classList.remove('empty-value');
    } else {
        tagsElement.textContent = 'No tags added';
        tagsElement.classList.add('empty-value');
    }

    // Pricing
    const pricingElement = document.getElementById('pricingModels');
    if (data.pricing && Array.isArray(data.pricing) && data.pricing.length > 0) {
        const pricingMap = {
            'free': 'Free',
            'freemium': 'Freemium',
            'one-time-paid': 'One-time Paid',
            'subscription': 'Subscription',
            'pay-per-use': 'Pay-per-use'
        };
        const pricingHtml = data.pricing.map(p => 
            `<span class="pricing-model">${pricingMap[p] || p}</span>`
        ).join('');
        pricingElement.innerHTML = `<div class="pricing-models">${pricingHtml}</div>`;
        pricingElement.classList.remove('empty-value');
    } else {
        pricingElement.textContent = 'No pricing model selected';
        pricingElement.classList.add('empty-value');
    }
    
    setValue('priceDetails', data.priceDetails);

    // Key Metrics
    setValue('monthlyUsers', data.monthlyUsers ? Number(data.monthlyUsers).toLocaleString() : '');
    setValue('totalInteractions', data.totalInteractions ? Number(data.totalInteractions).toLocaleString() : '');
    setValue('languagesSupported', data.languagesSupported ? data.languagesSupported + ' languages' : '');
    setValue('responseTime', data.responseTime);

    // Features
    const featuresElement = document.getElementById('features');
    if (data.features && Array.isArray(data.features) && data.features.length > 0) {
        const featuresHtml = data.features.map(feature => 
            `<div class="feature-item-display">${feature}</div>`
        ).join('');
        featuresElement.innerHTML = 
            `<div class="features-list-display">${featuresHtml}</div>`;
        featuresElement.classList.remove('empty-value');
    } else {
        featuresElement.innerHTML = 
            `<div class="features-list-display empty-value">No features added</div>`;
    }

    // FAQs
    const faqsElement = document.getElementById('faqs');
    if (data.faqs && Array.isArray(data.faqs) && data.faqs.length > 0) {
        const faqsHtml = data.faqs.map(faq => 
            `<div class="faq-item-display">
                <div class="faq-question-display">Q: ${faq.question}</div>
                <div class="faq-answer-display">A: ${faq.answer}</div>
            </div>`
        ).join('');
        faqsElement.innerHTML = 
            `<div class="faqs-list-display">${faqsHtml}</div>`;
        faqsElement.classList.remove('empty-value');
    } else {
        faqsElement.innerHTML = 
            `<div class="faqs-list-display empty-value">No FAQs added</div>`;
    }

    // Personal Information
    setValue('submitterName', data.submitterName);
    setValue('submitterEmail', data.submitterEmail);
    setValue('companyName', data.companyName);
    setValue('jobTitle', data.jobTitle);
    setValue('website', data.website);
    setValue('socialMedia', data.socialMedia);
    setValue('additionalInfo', data.additionalInfo);
}

// Go back to submit page
function goBackToSubmit() {
    window.location.href = 'Submit.html';
}

// Checkbox validation
function validateCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const submitBtn = document.getElementById('submitBtn');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    if (submitBtn) {
        submitBtn.disabled = !allChecked;
    }
}

// Initialize checkbox validation
function initializeCheckboxValidation() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', validateCheckboxes);
    });
}

// Submit functionality
function initializeSubmitHandler() {
    const submitBtn = document.getElementById('submitBtn');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            if (Array.from(checkboxes).every(cb => cb.checked)) {
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.textContent = 'Submitting...';
                
                // Simulate submission process
                setTimeout(() => {
                    // Store submission data for finish page
                    const currentData = localStorage.getItem('submissionData');
                    if (currentData) {
                        localStorage.setItem('lastSubmission', currentData);
                        localStorage.removeItem('submissionData');
                    }
                    
                    // Clear all form data
                    clearAllFormData();
                    
                    // Redirect to finish page
                    window.location.href = 'Finish.html';
                    
                }, 2000);
                
            } else {
                alert('Please confirm all checkboxes before submitting.');
            }
        });
    }
}

// Clear all form data
function clearAllFormData() {
    try {
        localStorage.removeItem('submissionData');
        localStorage.removeItem('submitToolFormData');
        console.log('All form data cleared successfully');
    } catch (error) {
        console.error('Error clearing form data:', error);
    }
}

// Error handling for missing data
function handleMissingData() {
    console.error('No submission data found');
    
    // Show user-friendly message
    const container = document.querySelector('.review-container');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #666;">
                <h3 style="color: #00ff9d; margin-bottom: 16px; font-size: 1.5rem;">No Submission Data Found</h3>
                <p style="margin-bottom: 24px;">It looks like you haven't filled out the submission form yet.</p>
                <button onclick="window.location.href='Submit.html'" style="background: linear-gradient(135deg, #00ff9d, #00d4aa); color: #000; padding: 12px 24px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
                    Go to Submit Form
                </button>
            </div>
        `;
    }
}

// Initialize all functionality
function initializeAllFeatures() {
    initializeCheckboxValidation();
    initializeSubmitHandler();
    
    // Initial validation check
    validateCheckboxes();
}

// Initialize keyboard shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Escape key to go back
        if (e.key === 'Escape') {
            goBackToSubmit();
        }
        
        // Ctrl/Cmd + Enter to submit (if all checkboxes are checked)
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn && !submitBtn.disabled) {
                submitBtn.click();
            }
        }
    });
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    initializeKeyboardShortcuts();
});

// Initialize page when loaded (backup)
window.addEventListener('load', function() {
    // Double check if page wasn't initialized
    const toolNameElement = document.getElementById('toolName');
    if (!toolNameElement || toolNameElement.textContent === '-') {
        initializePage();
    }
});