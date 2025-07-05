// min_slide_json_loader.js

document.addEventListener('DOMContentLoaded', () => {
    // Simple HTML sanitizer – allows <a> and <iframe> tags with safe attributes
    function sanitizeHTML(html) {
        const temp = document.createElement('div');
        temp.innerHTML = html;

        temp.querySelectorAll('*').forEach(el => {
            const tag = el.tagName.toLowerCase();
            if (tag === 'a') {
                // Allow only href, target, rel on <a>
                [...el.attributes].forEach(attr => {
                    const name = attr.name.toLowerCase();
                    if (!['href', 'target', 'rel'].includes(name)) {
                        el.removeAttribute(attr.name);
                    }
                });
                if (!el.getAttribute('target')) el.setAttribute('target', '_blank');
                if (!el.getAttribute('rel')) el.setAttribute('rel', 'noopener noreferrer');
            } else if (tag === 'iframe') {
                // Allow common safe iframe attributes only
                [...el.attributes].forEach(attr => {
                    const name = attr.name.toLowerCase();
                    if (!['src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen', 'title'].includes(name)) {
                        el.removeAttribute(attr.name);
                    }
                });
            } else {
                // Replace all other tags with their text content (strip tags)
                el.replaceWith(document.createTextNode(el.textContent));
            }
        });

        return temp.innerHTML;
    }

    const params = new URLSearchParams(window.location.search);
    const slideName = params.get('i') || 'default';

    fetch(`${slideName}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${slideName}.json: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('slides');
            if (!container) {
                console.error('No element with id "slides" found.');
                return;
            }

            container.innerHTML = '';

            // Create and append each slide section
            data.slides.forEach((slide, index) => {
                const section = document.createElement('section');
                section.id = `slide_${index}`;
                section.innerHTML = slide.slide_content;
                container.appendChild(section);
            });

            // Update document title using <h1> from first slide
            const firstSlide = container.querySelector('#slide_0');
            const h1 = firstSlide ? firstSlide.querySelector('h1') : null;
            if (h1 && h1.textContent.trim()) {
                const originalTitle = document.title;
                document.title = `${h1.textContent.trim()} - ${originalTitle}`;
            }

            // Add global footer to all slides except slide 0
            const existingFooter = document.querySelector('footer');
            if (existingFooter) existingFooter.remove();

            data.slides.forEach((slide, index) => {
                if (index === 0) return;
                const section = container.querySelector(`#slide_${index}`);
                if (section) {
                    const footer = document.createElement('footer');
                    // Use sanitizer before setting innerHTML to safely render <a> and <iframe>
                    footer.innerHTML = sanitizeHTML(data.global_footer || '');
                    section.appendChild(footer);
                }
            });

            if (typeof initializeSlides === 'function') {
                initializeSlides();
            } else {
                console.error('initializeSlides() function not found.');
            }
        })
        .catch(error => {
            console.error('Error loading slides:', error);
            const container = document.getElementById('slides');
            if (container) {
                container.innerHTML = `<p style="color:red;">Failed to load slides. Please try again later.</p>`;
            }
        });
});
