// Fetch the data from the JSON file
fetch('focusing_tips_ann.json')
  .then(response => response.json())
  .then(tips => {
    // Function to group by ranges (100s) and subranges (10s)
    const groupTips = (tips) => {
      const grouped = {};

      // Group the tips by ranges (100's) and subranges (10's)
      tips.forEach(tip => {
        const group100 = Math.floor(tip.number / 100) * 100;  // Group by 100s
        const group10 = Math.floor((tip.number % 100) / 10) * 10; // Subgroup by 10s

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

      Object.keys(group)
        .sort((a, b) => b - a)  // Sort the subgroups in descending order
        .forEach(subGroupName => {
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
      .sort((a, b) => b - a)  // Sorting by descending 100's range
      .forEach(group100 => {
        // Check for ranges beyond 0900
        if (group100 >= 900) {
          const groupName = `0${group100} to ${parseInt(group100) + 99}`;
          const groupDiv = renderGroup(groupedTips[group100], groupName);

          // Render the sub-groups inside each 100 group
          container.appendChild(groupDiv);
        }
      });

    // Handle the 0901+ range separately
    const group900Plus = groupedTips[900];
    if (group900Plus) {
      const groupName = '0901+';
      const groupDiv = renderGroup(group900Plus, groupName, true);
      container.appendChild(groupDiv);
    }

    // Handle the 0800 to 0900 range
    const group800To900 = groupedTips[800];
    if (group800To900) {
      const groupName = '0800 to 0900';
      const groupDiv = renderGroup(group800To900, groupName, true);
      container.appendChild(groupDiv);
    }

    // Handle the range from 0000 to 0800
    const group0To800 = groupedTips[0];
    if (group0To800) {
      const groupName = '0000 to 0800';
      const groupDiv = renderGroup(group0To800, groupName, true);
      container.appendChild(groupDiv);
    }
  })
  .catch(error => {
    console.error('Error loading focusing_tips_ann.json:', error);
  });
