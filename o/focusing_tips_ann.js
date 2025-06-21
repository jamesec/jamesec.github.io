fetch('focusing_tips_ann.json')
  .then(response => response.json())
  .then(data => {
    const grouped = {};

    data.forEach(item => {
      const tipNum = item.start;

      const group100Start = Math.floor(tipNum / 100) * 100;
      const group10Start = Math.floor(tipNum / 10) * 10;

      if (!grouped[group100Start]) {
        grouped[group100Start] = {};
      }

      if (!grouped[group100Start][group10Start]) {
        grouped[group100Start][group10Start] = [];
      }

      grouped[group100Start][group10Start].push(item);
    });

    const container = document.getElementById('tips-container');

    const sorted100s = Object.keys(grouped)
      .map(n => parseInt(n))
      .sort((a, b) => b - a);

    sorted100s.forEach(group100 => {
      const h2 = document.createElement('h2');
      h2.textContent = group100 >= 900 ? `${String(group100).padStart(4, '0')}+` : `${String(group100).padStart(4, '0')} to ${String(group100 + 99).padStart(4, '0')}`;
      container.appendChild(h2);

      const subgroups = grouped[group100];
      const sorted10s = Object.keys(subgroups)
        .map(n => parseInt(n))
        .sort((a, b) => b - a);

      sorted10s.forEach(group10 => {
        let labelStart = group10;
        let labelEnd = group10 + 9;

        // Special case for the first block
        if (group10 === 0) {
          labelStart = 0;
          labelEnd = 10;
        }

        const h3 = document.createElement('h3');
        h3.textContent = `${String(labelStart).padStart(4, '0')} to ${String(labelEnd).padStart(4, '0')}`;
        container.appendChild(h3);

        const ul = document.createElement('ul');
        subgroups[group10]
          .sort((a, b) => b.start - a.start)
          .forEach(item => {
            const li = document.createElement('li');
            if (item.url) {
              const a = document.createElement('a');
              a.href = item.url;
              a.textContent = `Focusing Tip #${item.start} - ${item.title}`;
              li.appendChild(a);
            } else {
              li.textContent = `Focusing Tip #${item.start} - ${item.title}`;
            }
            ul.appendChild(li);
          });

        container.appendChild(ul);
      });
    });
  })
  .catch(error => console.error('Error loading focusing_tips_ann.json:', error));
