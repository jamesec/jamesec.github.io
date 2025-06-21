// Fetch the data from the JSON file
fetch('focusing_tips_ann.json')
  .then(response => response.json())
  .then(tips => {
    // Function to group by 100 and then by 10
    const groupTips = (tips) => {
      const grouped = {};

      // Group the tips by ranges (100's) and subranges (10's)
      tips.forEach(tip => {
        const group100 = Math.floor(tip.number / 100) * 100;  // Calculate group by 100 range
        const group10 = Math.floor((tip.number % 100) / 10) * 10; // Calculate group by 10 within each 100 range
        
        // Initialize the group structure if not already created
        if (!grouped[group100]) {
          grouped[group100] = {};
        }
        
        // Initialize sub-group for 10 if not already created
        if (!grouped[group100][group10]) {
          grouped[group100][group10] = [];
        }

        // Add the tip to its respective sub-group
        grouped[group100][group10].push(tip);
      });

      return grouped;
    };

    // Function to render the grouped data as HTML
    const renderGroup = (group, groupName, isSubGroup = false) => {
      const groupDiv = document.createElement('div');
      const groupTitle = document.createElement(isSubGroup ? 'h3' : 'h2');
      groupTitle.textContent = groupName;
      groupDiv.appendChild(groupTitle);

      Object.keys(group).forEach(subGroupName => {
        const subGroup = group[subGroupName];
        const subGroupDiv = document.createElement('div');
        const subGroupTitle = document.createElement('h4');
        subGroupTitle.textContent = `${subGroupName} to ${parseInt(subGroupName) + 9}`;  // Show as range, e.g., "0000 to 0010"
        subGroupDiv.appendChild(subGroupTitle);

        subGroup.forEach(tip => {
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
          subGroupDiv.appendChild(ul);
        });

        groupDiv.appendChild(subGroupDiv);
      });

      return groupDiv;
    };

    // Render the tips by using the groupTips function to create groups and sub-groups
    const groupedTips = groupTips(tips);
    const container = document.getElementById('tips-container');

    // Sorting the groups by the 100s range in descending order
    Object.keys(groupedTips)
      .sort((a, b) => b - a)
      .forEach(group100 => {
        const groupName = `${group100} to ${parseInt(group100) + 99}`;
        const groupDiv = renderGroup(groupedTips[group100], groupName);

        // Render the sub-groups inside each 100 group
        container.appendChild(groupDiv);
      });
  })
  .catch(error => {
    console.error('Error loading focusing_tips_ann.json:', error);
  });
