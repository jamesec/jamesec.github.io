document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('focusing_tips_container');
    if (!container) {
        console.error('Container with ID "focusing_tips_container" not found.');
        return;
    }

    fetch('focusing_tips_ann.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load focusing_tips_ann.json');
            return response.json();
        })
        .then(data => {
            // Sort from highest to lowest number
            data.sort((a, b) => b.number - a.number);

            const grouped = {};

            // Group data by major section and sub-section with 0000 included correctly
            data.forEach(item => {
                const number = item.number;

                // Major section: e.g. 0000 to 0099, 0100 to 0199 ...
                const majorStart = Math.floor(number / 100) * 100;
                const majorEnd = majorStart + 99;
                const majorKey = `${String(majorStart).padStart(4, '0')} to ${String(majorEnd).padStart(4, '0')}`;

                // Subsection: e.g. 0000 to 0009, 0010 to 0019 ...
                const subStart = Math.floor(number / 10) * 10;
                const subEnd = subStart + 9;
                const subKey = `${String(subStart).padStart(4, '0')} to ${String(subEnd).padStart(4, '0')}`;

                if (!grouped[majorKey]) grouped[majorKey] = {};
                if (!grouped[majorKey][subKey]) grouped[majorKey][subKey] = [];
                grouped[majorKey][subKey].push(item);
            });

            // Render to DOM
            // Sort major sections descending (highest first)
            Object.keys(grouped)
                .sort((a, b) => Number(b.split(' ')[0]) - Number(a.split(' ')[0]))
                .forEach(majorKey => {
                    const h2 = document.createElement('h2');
                    h2.textContent = majorKey;
                    container.appendChild(h2);

                    const subSections = grouped[majorKey];

                    // Sort subsections descending (highest first)
                    Object.keys(subSections)
                        .sort((a, b) => Number(b.split(' ')[0]) - Number(a.split(' ')[0]))
                        .forEach(subKey => {
                            const h3 = document.createElement('h3');
                            h3.textContent = subKey;
                            container.appendChild(h3);

                            const ul = document.createElement('ul');
                            subSections[subKey].forEach(item => {
                                const li = document.createElement('li');
                                const text = `Focusing Tip #${item.number} - ${item.title}`;

                                if (item.url) {
                                    const a = document.createElement('a');
                                    a.href = item.url;
                                    a.textContent = text;
                                    a.target = '_blank';
                                    a.rel = 'noopener noreferrer';
                                    li.appendChild(a);
                                } else {
                                    li.textContent = text;
                                }

                                ul.appendChild(li);
                            });

                            container.appendChild(ul);
                        });
                });
        })
        .catch(err => {
            console.error('Error loading or processing JSON:', err);
            container.innerHTML = '<p style="color:red;">Failed to load tips. Please try again later.</p>';
        });
});
