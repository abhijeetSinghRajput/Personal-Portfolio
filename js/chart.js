let skillData = null;
const dsa_skills = document.getElementById('dsa_skills');
const web_skills = document.getElementById('web_skills');

let dsa_skillElement = null;
let web_skillElement = null;
let dsa_chart = null;
let web_chart = null;

const dsa_ctx = document.getElementById('dsa_chart').getContext('2d');
const web_ctx = document.getElementById('web_chart').getContext('2d');

// Create gradient
const gradient = web_ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(255, 50, 0, 0.75)');
gradient.addColorStop(1, 'rgba(254, 202, 102, 0.75)');

//fetching data
fetch('skills.json')
    .then((res) => {
        if (res.ok) return res.json();
    })
    .then(data => {
        skillData = data;
        dsa_skillElement = renderBars(dsa_skills, data.DSA.Advanced);
        web_skillElement = renderBars(web_skills, data.Frontend);

        dsa_chart = renderChart(dsa_ctx, data.DSA.Fundamental, 'Fundamental');
        web_chart = renderChart(web_ctx, data.Frontend, 'Frontend');
    })
    .catch(e => {
        console.error(e);
    });



//renderingt the skill progress bars
function renderBars(parent, data) {
    // Create an array to store all HTML fragments
    const htmlFragments = Object.entries(data).map(([label, value]) => {
        return `
            <li>
                <h5>${label}</h5>
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
        labels: parent.querySelectorAll('h5'),
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





