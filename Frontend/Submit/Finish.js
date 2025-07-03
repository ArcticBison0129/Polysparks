// Generate random submission ID
function generateSubmissionId() {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 9999) + 1;
    return `#AI-${year}-${randomNum.toString().padStart(4, '0')}`;
}

// Get current date in readable format
function getCurrentDate() {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
}

// Initialize page with dynamic data
function initializePage() {
    // Set submission ID
    document.getElementById('submissionId').textContent = generateSubmissionId();
    
    // Set current date
    document.getElementById('submissionDate').textContent = getCurrentDate();
    
    // Try to get data from localStorage (from the submission flow)
    try {
        const lastSubmission = localStorage.getItem('lastSubmission');
        if (lastSubmission) {
            const data = JSON.parse(lastSubmission);
            populateSubmissionData(data);
            
            // Clear the data after use
            localStorage.removeItem('lastSubmission');
        } else {
            // Check if there's any other submission data
            const submissionData = localStorage.getItem('submissionData');
            if (submissionData) {
                const data = JSON.parse(submissionData);
                populateSubmissionData(data);
                
                // Clear the data
                localStorage.removeItem('submissionData');
            } else {
                // Show sample data for demonstration
                populateSampleData();
            }
        }
    } catch (error) {
        console.log('No submission data found, using sample data');
        populateSampleData();
    }
}

// Populate with actual submission data
function populateSubmissionData(data) {
    // Helper function to safely set text content
    function setTextContent(elementId, value, fallback = 'Not provided') {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value && value.trim() !== '' ? value : fallback;
        }
    }

    // Populate submission summary
    setTextContent('toolName', data.toolName, 'Your AI Tool');
    setTextContent('submitterName', data.submitterName, 'Anonymous User');
    setTextContent('contactEmail', data.submitterEmail, 'Not provided');
}

// Sample data for demonstration
function populateSampleData() {
    document.getElementById('toolName').textContent = 'AI Writing Assistant';
    document.getElementById('submitterName').textContent = 'John Smith';
    document.getElementById('contactEmail').textContent = 'john@aiwritingassistant.com';
}

// Animate timeline steps
function animateTimeline() {
    setTimeout(() => {
        // Animate the timeline progress line
        const timelineElement = document.querySelector('.timeline');
        if (timelineElement) {
            const progressLine = timelineElement.querySelector('::before');
            // Add animation class or style changes if needed
        }
    }, 1000);
}

// Add interactive effects to buttons
function initializeButtonEffects() {
    const actionButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Add click effect
            button.style.transform = 'scale(0.98)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });
}

// Handle contact email click
function initializeContactEmail() {
    const contactEmail = document.querySelector('.contact-email');
    if (contactEmail) {
        contactEmail.addEventListener('click', (e) => {
            // Optional: Add analytics tracking here
            console.log('Contact email clicked');
        });
    }
}

// Initialize confetti effect (optional celebration)
function showCelebration() {
    // Create a simple celebration effect
    const successIcon = document.querySelector('.success-icon');
    if (successIcon) {
        // Add extra pulse animation
        successIcon.style.animation = 'successPulse 1s ease-in-out 3';
        
        setTimeout(() => {
            successIcon.style.animation = 'successPulse 2s ease-in-out infinite';
        }, 3000);
    }
}

// Cleanup any remaining form data
function cleanupFormData() {
    try {
        // Remove any remaining submission data
        localStorage.removeItem('submissionData');
        localStorage.removeItem('submitToolFormData');
        console.log('Cleanup completed: All form data removed');
    } catch (error) {
        console.error('Error during cleanup:', error);
    }
}

// Track page view (for analytics)
function trackPageView() {
    // Optional: Add analytics tracking
    console.log('Submission confirmation page viewed');
    
    // Example: Google Analytics or other tracking
    // gtag('event', 'submission_completed', {
    //     event_category: 'form',
    //     event_label: 'ai_tool_submission'
    // });
}

// Handle navigation
function initializeNavigation() {
    // Handle logo click
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            window.location.href = 'Index.html';
        });
    }
    
    // Handle back navigation
    window.addEventListener('popstate', (e) => {
        // Prevent going back to form pages with cleared data
        if (document.referrer.includes('Confirm.html') || document.referrer.includes('Submit.html')) {
            window.location.href = 'Index.html';
        }
    });
}

// Initialize keyboard shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Press 'H' to go home
        if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.metaKey) {
            window.location.href = 'Index.html';
        }
        
        // Press 'S' to submit another tool
        if (e.key.toLowerCase() === 's' && !e.ctrlKey && !e.metaKey) {
            window.location.href = 'Submit.html';
        }
        
        // Escape key to go home
        if (e.key === 'Escape') {
            window.location.href = 'Index.html';
        }
    });
}

// Show keyboard shortcuts hint
function showKeyboardHints() {
    // Optional: Show a small hint about keyboard shortcuts
    console.log('Keyboard shortcuts: H = Home, S = Submit Another, Esc = Home');
}

// Initialize all functionality
function initializeAllFeatures() {
    initializeButtonEffects();
    initializeContactEmail();
    initializeNavigation();
    initializeKeyboardShortcuts();
    showCelebration();
    cleanupFormData();
    trackPageView();
    showKeyboardHints();
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    animateTimeline();
    initializeAllFeatures();
});

// Backup initialization on window load
window.addEventListener('load', function() {
    // Double check if page wasn't initialized properly
    const submissionId = document.getElementById('submissionId');
    if (!submissionId || submissionId.textContent === '#AI-2025-0001') {
        // Re-generate submission ID if it's still the default
        document.getElementById('submissionId').textContent = generateSubmissionId();
    }
});

// Handle page unload
window.addEventListener('beforeunload', function() {
    // Final cleanup
    cleanupFormData();
});

// Export functions for external use (if needed)
window.FinishPage = {
    generateSubmissionId,
    getCurrentDate,
    populateSubmissionData,
    cleanupFormData
};