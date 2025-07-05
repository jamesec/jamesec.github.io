// Wait until DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Function to render slides and footer from JSON data
  function renderSlides(data) {
    const container = document.getElementById('slides');
    if (!container) {
      console.error('No element with id "slides" found.');
      return;
    }
    container.innerHTML = ''; // Clear any existing content

    // Render each slide
    data.slides.forEach(slide => {
      const section = document.createElement('section');

      if (slide.header) {
        const header = document.createElement('header');
        header.textContent = slide.header;
        section.appendChild(header);
      }

      if (slide.h1) {
        const h1 = document.createElement('h1');
        h1.textContent = slide.h1;
        section.appendChild(h1);
      }

      if (slide.h2) {
        const h2 = document.createElement('h2');
        h2.textContent = slide.h2;
        section.appendChild(h2);
      }

      // Insert slide_content as HTML
      if (slide.slide_content) {
        const contentDiv = document.createElement('div');
        contentDiv.innerHTML = slide.slide_content;
        section.appendChild(contentDiv);
      }

      container.appendChild(section);
    });

    // Render or update global footer
    let footer = document.querySelector('footer');
    if (!footer) {
      footer = document.createElement('footer');
      document.body.appendChild(footer);
    }
    footer.textContent = data.global_footer || '';
  }

  // Fetch the JSON data file and render slides
  fetch('min_slide.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => renderSlides(data))
    .catch(error => {
      console.error('Failed to load or parse min_slide.json:', error);
      const container = document.getElementById('slides');
      if (container) {
        container.innerHTML = '<p style="color:red;">Failed to load slides. Please try again later.</p>';
      }
    });
});
