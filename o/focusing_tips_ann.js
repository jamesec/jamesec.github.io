// Fetch the data from the JSON file
fetch('focusing_tips_ann.json')
  .then(response => response.json())
  .then(tips => {
    // Grouping the tips by ranges like "0901+" or "0931 to 0940"
    const grouped = tips.reduce((acc, tip) => {
      let group = '';
      if (tip.number >= 931) {
        group = '0931 to 0940';
      } else if (tip.number >= 901) {
        group = '0901+';
      } else if (tip.number >= 891) {
        group = '0891 to 0900';
      } else if (tip.number >= 801) {
        group = '0801 to 0900';
      } else {
        group = 'Other';
      }

      // Create group if it doesn't exist
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(tip);
      return acc;
    }, {});

    // Render the grouped tips
    const container = document.getElementById('tips-container');

    // Handle "0801 to 0900" group first, followed by "0891 to 0900" under it
    if (grouped['0801 to 0900']) {
      const groupDiv = document.createElement('div');
      const groupTitle = document.createElement('h2');
      groupTitle.textContent = '0801 to 0900';
      groupDiv.appendChild(groupTitle);

      // Handle sub-group "0891 to 0900"
      if (grouped['0891 to 0900']) {
        const subGroupDiv = document.createElement('div');
        const subGroupTitle = document.createElement('h3');
        subGroupTitle.textContent = '0891 to 0900';
        subGroupDiv.appendChild(subGroupTitle);

        // Render each tip in the "0891 to 0900" group
        grouped['0891 to 0900'].forEach(tip => {
          const tipDiv = document.createElement('div');
          tipDiv.classList.add('tip');
          if (tip.url) {
            const tipLink = document.createElement('a');
            tipLink.href = tip.url;
            tipLink.textContent = `Focusing Tip #${tip.number} - "${tip.title}"`;
            tipDiv.appendChild(tipLink);
          } else {
            tipDiv.textContent = `Focusing Tip #${tip.number} - "${tip.title}" (No link available)`;
          }
          subGroupDiv.appendChild(tipDiv);
        });

        groupDiv.appendChild(subGroupDiv);
      }
      container.appendChild(groupDiv);
    }

    // Render the other groups
    for (const [group, tipsInGroup] of Object.entries(grouped)) {
      if (group !== '0801 to 0900' && group !== '0891 to 0900') {
        const groupDiv = document.createElement('div');
        const groupTitle = document.createElement('h2');
        groupTitle.textContent = group;
        groupDiv.appendChild(groupTitle);

        tipsInGroup.forEach(tip => {
          const tipDiv = document.createElement('div');
          tipDiv.classList.add('tip');
          if (tip.url) {
            const tipLink = document.createElement('a');
            tipLink.href = tip.url;
            tipLink.textContent = `Focusing Tip #${tip.number} - "${tip.title}"`;
            tipDiv.appendChild(tipLink);
          } else {
            tipDiv.textContent = `Focusing Tip #${tip.number} - "${tip.title}" (No link available)`;
          }
          groupDiv.appendChild(tipDiv);
        });

        container.appendChild(groupDiv);
      }
    }
  })
  .catch(error => {
    console.error('Error loading tips.json:', error);
  });
