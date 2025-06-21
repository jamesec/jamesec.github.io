// Sample JSON Data (Assumed structure)
const jsonData = [
    {
        "start": 939,
        "end": 939,
        "url": "https://focusingresources.com/2024/08/29/focusing-tip-939/",
        "title": "How to listen when a friend is going through a hard time"
    },
    {
        "start": 938,
        "end": 938,
        "url": "https://focusingresources.com/2024/08/28/focusing-tip-938/",
        "title": "What if my client never stops talking?"
    },
    {
        "start": 931,
        "end": 931,
        "url": "https://focusingresources.com/2024/08/27/focusing-tip-931/",
        "title": "I don't feel anything."
    },
    // Add more data here...
];

// Function to group data by 100 and then by 10
function groupTips(data) {
    let groups = {};

    // Group by 100s
    data.forEach(item => {
        const groupStart = Math.floor(item.start / 100) * 100;
        const groupEnd = Math.floor(item.end / 100) * 100;

        // Add group if not already there
        if (!groups[groupStart]) {
            groups[groupStart] = [];
        }

        // Group by 10s within each 100 range
        let subGroupStart = Math.floor(item.start / 10) * 10;
        let subGroupEnd = Math.floor(item.end / 10) * 10;

        if (!groups[groupStart][subGroupStart]) {
            groups[groupStart][subGroupStart] = [];
        }

        groups[groupStart][subGroupStart].push(item);
    });

    return groups;
}

// Function to render HTML structure
function renderHTML(groups) {
    const container = document.getElementById('tips-container');
    container.innerHTML = '';  // Clear existing content

    // Sort groups by key in descending order
    const sortedGroups = Object.keys(groups).sort((a, b) => b - a);

    sortedGroups.forEach(groupStart => {
        const group = groups[groupStart];
        const groupHeader = document.createElement('h2');
        groupHeader.textContent = groupStart < 900 ? `${groupStart} to ${(parseInt(groupStart) + 99)}` : `${groupStart}+`;
        container.appendChild(groupHeader);

        // Sort subgroups (by 10s)
        const sortedSubGroups = Object.keys(group).sort((a, b) => b - a);

        sortedSubGroups.forEach(subGroupStart => {
            const subGroup = group[subGroupStart];
            const subGroupHeader = document.createElement('h3');
            subGroupHeader.textContent = `${subGroupStart} to ${parseInt(subGroupStart) + 9}`;
            container.appendChild(subGroupHeader);

            // Create unordered list of links for the subgroup
            const ul = document.createElement('ul');
            subGroup.forEach(item => {
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
}

// Execute the grouping and rendering
const groupedTips = groupTips(jsonData);
renderHTML(groupedTips);
