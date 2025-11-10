let skillData = null;
const dsa_skills = document.getElementById('dsa_skills');
const web_skills = document.getElementById('web_skills');

let dsa_skillElement = null;
let dsa_chart = null;
let web_chart = null;

const dsaSkills = {
    "Advanced": {
        "Divide and Conquer": 69,
        "Union Find": 30,
        "DP": 79, 
        "Backtracking": 48,
        "Trie": 21,
        "Game Theory": 90
    },
    "Intermediate": {
        "DFS": 70,
        "Hash Table": 90,
        "BFS": 60,
        "Tree": 55,
        "Math": 45,
        "Greedy": 60
    },
    "Fundamental": {
        "Array": 90,
        "String": 85,
        "Sorting": 70,
        "Two Pointers": 77,
        "Matrix": 92,
        "Linked List": 95
    }
}

// helper function to update chart data on btn interaction
function updateChart(field) {
    let labels, values;
    labels = Object.keys(dsaSkills[field]);
    values = Object.values(dsaSkills[field]);
    updateDataset(dsa_chart, dsa_skillElement, labels, values, field);
}

const dsa_ctx = document.getElementById('dsa_chart').getContext('2d');

// Create gradient
const gradient = dsa_ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(255, 50, 0, 0.75)');
gradient.addColorStop(1, 'rgba(254, 202, 102, 0.75)');

// Initialize the bars and chart
dsa_skillElement = renderBars(dsa_skills, dsaSkills.Fundamental);
dsa_chart = renderChart(dsa_ctx, dsaSkills.Fundamental, 'Fundamental');

//rendering the skill progress bars
function renderBars(parent, data) {
    // Create an array to store all HTML fragments
    const htmlFragments = Object.entries(data).map(([label, value]) => {
        return `
            <li>
                <strong>${label}</strong>
                <data value="${value}">${value}%</data>
                <div class="skill-progress">
                    <div class="bar" style="width: ${value}%;"></div>
                </div>
            </li>
        `;
    });

    // Join all HTML fragments into a single string and assign to innerHTML
    parent.innerHTML = htmlFragments.join('');
    return {
        labels: parent.querySelectorAll('strong'),  // Changed from 'h5' to 'strong'
        data: parent.querySelectorAll('data'),
        bar: parent.querySelectorAll('.bar'),
    }
}

function renderChart(ctx, skills, title) {
    return new Chart(ctx, {
        type: 'radar',
        data: {
            labels: Object.keys(skills),
            datasets: [{
                label: 'Efficiency index',
                data: Object.values(skills),
                backgroundColor: gradient,
                pointRadius: 0,
                pointHoverRadius: 0
            }]
        },

        options: {
            responsive: true,
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    angleLines: {
                        color: '#666'
                    },
                    grid: {
                        color: '#666'
                    },
                    pointLabels: {
                        color: '#fff',
                        font: {
                            size: 12
                        }
                    },
                    ticks: {
                        display: false,
                        stepSize: 100 / 3,
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: title,
                    color: '#ff6b6b',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    enabled: false
                },
            }
        }
    })
}

function updateDataset(chart, skillElement, labels, values, title) {
    //update the chart
    chart.data.labels = labels;
    chart.data.datasets[0].data = values;
    chart.data.datasets[0].backgroundColor = gradient;
    chart.options.plugins.title.text = title;
    chart.update();

    //update the bar
    for (let i = 0; i < labels.length; ++i) {
        skillElement.labels[i].textContent = labels[i];
        skillElement.data[i].value = values[i];
        skillElement.data[i].textContent = values[i] + '%';
        skillElement.bar[i].style.width = `${values[i]}%`;
    }
}