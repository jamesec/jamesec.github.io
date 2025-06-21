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

    // Render each group with title and tips
    for (const [group, tipsInGroup] of Object.entries(grouped)) {
      // Create section for the group
      const groupDiv = document.createElement('div');
      const groupTitle = document.createElement('h2');
      groupTitle.textContent = group;
      groupDiv.appendChild(groupTitle);

      // Render each tip in the group
      tipsInGroup.forEach(tip => {
        const tipDiv = document.createElement('div');
        tipDiv.classList.add('tip');
        const tipLink = document.createElement('a');
        tipLink.href = tip.url;
        tipLink.textContent = `Focusing Tip #${tip.number} - "${tip.title}"`;
        tipDiv.appendChild(tipLink);
        groupDiv.appendChild(tipDiv);
      });

      container.appendChild(groupDiv);
    }
  })
  .catch(error => {
    console.error('Error loading tips.json:', error);
  });
