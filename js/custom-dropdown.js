/**
 * Premium Custom Dropdown Component
 * Converts native select elements to custom animated dropdowns
 */

class CustomDropdown {
    constructor(selectElement) {
        this.select = selectElement;
        this.isOpen = false;
        this.selectedValue = '';
        this.selectedText = '';
        this.init();
    }

    init() {
        // Create dropdown wrapper
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'custom-dropdown';
        
        // Create trigger button
        this.trigger = document.createElement('div');
        this.trigger.className = 'custom-dropdown-trigger';
        
        // Create selected value display
        this.valueDisplay = document.createElement('span');
        this.valueDisplay.className = 'selected-value';
        
        // Create placeholder
        this.placeholder = document.createElement('span');
        this.placeholder.className = 'placeholder';
        // Get placeholder from first empty option or use default
        const firstOption = this.select.options[0];
        if (firstOption && firstOption.value === '') {
            this.placeholder.textContent = firstOption.text || 'Select an option';
        } else {
            this.placeholder.textContent = 'Select an option';
        }
        
        // Create arrow icon
        this.arrow = document.createElement('div');
        this.arrow.className = 'custom-dropdown-arrow';
        this.arrow.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                <path fill="currentColor" d="M6 9L1 4h10z"/>
            </svg>
        `;
        
        // Create options container
        this.optionsContainer = document.createElement('div');
        this.optionsContainer.className = 'custom-dropdown-options';
        
        // Build options
        Array.from(this.select.options).forEach((option) => {
            // Include all options, even placeholder
            const optionElement = document.createElement('div');
            optionElement.className = 'custom-dropdown-option';
            optionElement.textContent = option.text;
            optionElement.dataset.value = option.value;
            
            // Mark placeholder option
            if (option.value === '') {
                optionElement.classList.add('placeholder-option');
            }
            
            optionElement.addEventListener('click', () => {
                this.selectOption(option.value, option.text);
            });
            
            this.optionsContainer.appendChild(optionElement);
        });
        
        // Assemble trigger
        this.trigger.appendChild(this.placeholder);
        this.trigger.appendChild(this.arrow);
        
        // Assemble wrapper
        this.wrapper.appendChild(this.trigger);
        this.wrapper.appendChild(this.optionsContainer);
        
        // Insert wrapper after select
        this.select.parentNode.insertBefore(this.wrapper, this.select.nextSibling);
        
        // Add click handler
        this.trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this.wrapper.contains(e.target)) {
                this.close();
            }
        });
        
        // Handle keyboard
        this.handleKeyboard();
        
        // Sync with native select changes
        this.select.addEventListener('change', () => {
            this.syncFromNative();
        });
        
        // Initial sync
        this.syncFromNative();
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        if (this.isOpen) return;
        
        // Close other dropdowns
        document.querySelectorAll('.custom-dropdown-trigger.active').forEach(trigger => {
            if (trigger !== this.trigger) {
                trigger.classList.remove('active');
                trigger.parentElement.querySelector('.custom-dropdown-options').classList.remove('active');
            }
        });
        
        this.isOpen = true;
        this.trigger.classList.add('active');
        this.optionsContainer.classList.add('active');
    }

    close() {
        if (!this.isOpen) return;
        
        this.isOpen = false;
        this.trigger.classList.remove('active');
        this.optionsContainer.classList.remove('active');
    }

    selectOption(value, text) {
        this.selectedValue = value;
        this.selectedText = text;
        
        // Update display
        if (value === '') {
            // Reset to placeholder
            this.placeholder.style.display = 'inline';
            if (this.trigger.contains(this.valueDisplay)) {
                this.valueDisplay.remove();
            }
        } else {
            // Show selected value
            this.placeholder.style.display = 'none';
            this.valueDisplay.textContent = text;
            if (!this.trigger.contains(this.valueDisplay)) {
                this.trigger.insertBefore(this.valueDisplay, this.arrow);
            }
        }
        
        // Update native select
        this.select.value = value;
        this.select.dispatchEvent(new Event('change', { bubbles: true }));
        
        // Update selected state in options
        this.optionsContainer.querySelectorAll('.custom-dropdown-option').forEach(opt => {
            opt.classList.remove('selected');
            if (opt.dataset.value === value) {
                opt.classList.add('selected');
            }
        });
        
        // Close dropdown
        this.close();
    }

    syncFromNative() {
        const selectedOption = this.select.options[this.select.selectedIndex];
        if (selectedOption && selectedOption.value !== '') {
            this.selectOption(selectedOption.value, selectedOption.text);
        } else {
            // Reset to placeholder
            this.placeholder.style.display = 'inline';
            this.valueDisplay.remove();
            this.selectedValue = '';
            this.selectedText = '';
            
            this.optionsContainer.querySelectorAll('.custom-dropdown-option').forEach(opt => {
                opt.classList.remove('selected');
            });
        }
    }

    handleKeyboard() {
        this.trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggle();
            } else if (e.key === 'Escape') {
                this.close();
            }
        });
        
        this.optionsContainer.addEventListener('keydown', (e) => {
            const options = Array.from(this.optionsContainer.querySelectorAll('.custom-dropdown-option'));
            const currentIndex = options.findIndex(opt => opt.classList.contains('selected') || opt === document.activeElement);
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
                options[nextIndex].focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
                options[prevIndex].focus();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (currentIndex >= 0) {
                    const option = options[currentIndex];
                    this.selectOption(option.dataset.value, option.textContent);
                }
            } else if (e.key === 'Escape') {
                this.close();
            }
        });
        
        // Make options focusable
        this.optionsContainer.querySelectorAll('.custom-dropdown-option').forEach(opt => {
            opt.setAttribute('tabindex', '0');
        });
    }
}

// Initialize all custom dropdowns
function initCustomDropdowns() {
    document.querySelectorAll('select:not(.no-custom-dropdown)').forEach(select => {
        // Skip if already initialized
        if (select.dataset.customDropdown === 'true') return;
        
        // Skip if no options
        if (select.options.length === 0) return;
        
        select.dataset.customDropdown = 'true';
        new CustomDropdown(select);
    });
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomDropdowns);
} else {
    initCustomDropdowns();
}

// Re-initialize after dynamic content loads
if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => {
        initCustomDropdowns();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

