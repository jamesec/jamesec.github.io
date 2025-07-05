fetch('focusing_tips_ann.json')
  .then(response => response.json())
  .then(data => {
    const grouped = {};

    data.forEach(item => {
      if (typeof item.start !== 'number') return; // Skip invalid entries

      const tipNum = item.start;

      const group100Start = Math.floor(tipNum / 100) * 100;
      const group10Start = Math.floor(tipNum / 10) * 10;

      if (!grouped[group100Start]) grouped[group100Start] = {};
      if (!grouped[group100Start][group10Start]) grouped[group100Start][group10Start] = [];

      grouped[group100Start][group10Start].push(item);
    });

    const container = document.getElementById('tips-container');
    container.innerHTML = ''; // Clear existing content

    const sorted100s = Object.keys(grouped)
      .map(n => parseInt(n))
      .sort((a, b) => b - a);

    sorted100s.forEach(group100 => {
      const group10s = grouped[group100];
      const groupHeader = document.createElement('h2');
      const isTopGroup = group100 >= 900;
      const paddedStart = String(group100).padStart(4, '0');
      const paddedEnd = String(group100 + 99).padStart(4, '0');
      groupHeader.textContent = isTopGroup ? `${paddedStart}+` : `${paddedStart} to ${paddedEnd}`;
      container.appendChild(groupHeader);

      const sorted10s = Object.keys(group10s)
        .map(n => parseInt(n))
        .sort((a, b) => b - a);

      sorted10s.forEach(group10 => {
        const labelStart = group10 === 0 ? 0 : group10;
        const labelEnd = group10 === 0 ? 10 : group10 + 9;

        const subHeader = document.createElement('h3');
        subHeader.textContent = `${String(labelStart).padStart(4, '0')} to ${String(labelEnd).padStart(4, '0')}`;
        container.appendChild(subHeader);

        const ul = document.createElement('ul');
        group10s[group10]
          .sort((a, b) => b.start - a.start)
          .forEach(item => {
            const li = document.createElement('li');
            const tipText = `Focusing Tip #${String(item.start).padStart(4, '0')} - ${item.title}`;
            if (item.url) {
              const a = document.createElement('a');
              a.href = item.url;
              a.textContent = tipText;
              li.appendChild(a);
            } else {
              li.textContent = tipText;
            }
            ul.appendChild(li);
          });

        container.appendChild(ul);
      });
    });
  })
  .catch(error => {
    console.error('Error loading or parsing focusing_tips_ann.json:', error);
    document.getElementById('tips-container').innerText = 'Failed to load tips.';
  });
