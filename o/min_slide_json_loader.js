// min_slide_json_loader.js

document.addEventListener('DOMContentLoaded', () => {
    // Get 'i' parameter from URL query string, default to 'default'
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

            container.innerHTML = ''; // Clear container

            // Create and append each slide section
            data.slides.forEach((slide, index) => {
                const section = document.createElement('section');
                section.id = `slide_${index}`;

                // slide_content is raw HTML string, inject safely here
                section.innerHTML = slide.slide_content;

                container.appendChild(section);
            });

            // Remove any existing footer in body
            const existingFooter = document.querySelector('footer');
            if (existingFooter) existingFooter.remove();
            
            data.slides.forEach((slide, index) => {
              if (index === 0) return; // skip first slide
            
              const section = container.querySelector(`#slide_${index}`);
              if (section) {
                const footer = document.createElement('footer');
                footer.textContent = data.global_footer || '';
                section.appendChild(footer);
              }
            });
            
            // Initialize slide navigation & sizing
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
