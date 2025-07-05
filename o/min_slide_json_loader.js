document.addEventListener('DOMContentLoaded', () => {
  // Get `?i=slide_name` from URL
  const params = new URLSearchParams(window.location.search);
  const slideId = params.get('i');

  if (!slideId) {
    console.error('Missing slide identifier (?i=...)');
    return;
  }

  const jsonFile = `${slideId}.json`;

  fetch(jsonFile)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${jsonFile}`);
      return response.json();
    })
    .then(data => {
      const container = document.getElementById('slides');
      if (!container) {
        console.error('No #slides container found');
        return;
      }

      // Clear any existing content
      container.innerHTML = '';

      // Render each slide
      data.slides.forEach((slide, index) => {
        const section = document.createElement('section');
        section.innerHTML = slide.slide_content;
        section.dataset.slideNumber = slide.slide_number || index;
        container.appendChild(section);
      });

      // Add global footer (after all sections)
      if (data.global_footer) {
        let footer = document.querySelector('footer');
        if (!footer) {
          footer = document.createElement('footer');
          document.body.appendChild(footer);
        }
        footer.textContent = data.global_footer;
      }
    })
    .catch(error => {
      console.error('Slide JSON load error:', error);
      const container = document.getElementById('slides');
      if (container) {
        container.innerHTML = `<p style="color:red;">Error loading slides: ${error.message}</p>`;
      }
    });
});
