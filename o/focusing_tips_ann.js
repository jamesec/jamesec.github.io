// Fetch the data from the JSON file
fetch('focusing_tips_ann.json')
  .then(response => response.json())
  .then(tips => {
    // Grouping the tips by ranges like "0901+" or "0931 to 0940"
    const grouped = tips.reduce((acc, tip) => {
      let group = '';
      
      // Adjusted group conditions to make sure all groups are captured
      if (tip.number >= 931) {
        group = '0931 to 0940';
      } else if (tip.number >= 901) {
        group = '0901+';
      } else if (tip.number >= 891) {
        group = '0891 to 0900';
      } else if (tip.number >= 801) {
        group = '0801 to 0900';
      } else if (tip.number >= 91) {
        group = '0091 to 0100';
      } else if (tip.number >= 81) {
        group = '0081 to 0090';
      } else if (tip.number >= 1) {
        group = '0001 to 0100';
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

    // Function to render group
    const renderGroup = (groupName, tipsInGroup) => {
      const groupDiv = document.createElement('div');
      const groupTitle = document.createElement('h2');
      groupTitle.textContent = groupName;
      groupDiv.appendChild(groupTitle);

      tipsInGroup.forEach(tip => {
        const ul = document.createElement('ul');
        const li = document.createElement('li');
        
        if (tip.url) {
          const link = document.createElement('a');
          link.href = tip.url;
          link.textContent = `Focusing Tip #${tip.number} - "${tip.title}"`;
          li.appendChild(link);
        } else {
          li.textContent = `Focusing Tip #${tip.number} - "${tip.title}"`;
        }
        
        ul.appendChild(li);
        groupDiv.appendChild(ul);
      });

      container.appendChild(groupDiv);
    };

    // Render the groups in reverse order, starting from the largest range
    const groupOrder = [
      '0931 to 0940', '0921 to 0930', '0901+', 
      '0891 to 0900', '0881 to 0890', '0801 to 0900',
      '0091 to 0100', '0081 to 0090', '0001 to 0100'
    ];
    
    groupOrder.forEach(group => {
      if (grouped[group]) {
        renderGroup(group, grouped[group]);
      }
    });
  })
  .catch(error => {
    console.error('Error loading focusing_tips_ann.json:', error);
  });
