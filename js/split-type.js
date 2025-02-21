class SplitType {
    constructor(target, options = {}) {
        this.elements = typeof target === 'string' ? document.querySelectorAll(target) : [target];
        this.options = {
            types: options.types || ['chars'],
            tagName: options.tagName || 'span',
            className: options.className || '',
        };
        this.init();
    }

    init() {
        this.elements.forEach(element => {
            // Store original content
            const originalContent = element.innerHTML;
            element.setAttribute('data-original', originalContent);

            // Split text into characters
            if (this.options.types.includes('chars')) {
                const chars = originalContent.split('');
                const wrappedChars = chars.map(char => {
                    if (char === ' ') {
                        return ' ';
                    }
                    return `<${this.options.tagName} class="char ${this.options.className}">${char}</${this.options.tagName}>`;
                });
                element.innerHTML = wrappedChars.join('');
            }
        });
    }

    revert() {
        this.elements.forEach(element => {
            const originalContent = element.getAttribute('data-original');
            if (originalContent) {
                element.innerHTML = originalContent;
                element.removeAttribute('data-original');
            }
        });
    }
}

// Make it available globally
window.SplitType = SplitType;
