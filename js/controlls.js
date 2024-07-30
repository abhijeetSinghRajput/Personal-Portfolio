optionSlector(document.querySelectorAll('#skills #web .btn'));
optionSlector(document.querySelectorAll('#skills #dsa .btn'));
const navLinks = document.querySelectorAll('.nav-item a');

const sections = document.querySelectorAll('.body > section');
const [heroSection, aboutSection, educationSection, projectsSection, skillsSection] = sections;
const nav = document.querySelector('nav');

navLinks.forEach(link=>{
    link.addEventListener('click', (e)=>{
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        const offsetTop = targetSection.offsetTop - nav.clientHeight;

        window.scrollTo({top: offsetTop});
    })
})

// active link on scroll
window.addEventListener('scroll', () => {
    let currentSectionId = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - nav.clientHeight;
        const sectionBottom = sectionTop + section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
});


function optionSlector(options){
    options.forEach(option=>{
        option.addEventListener('click', ()=>{
            options.forEach(e=>e.classList.remove('active'));
            option.classList.add('active');
        })
    })
}

const projects = document.querySelector('#projects .card-wrapper');
fetch('projects.json')
    .then((res) => {
        if (res.ok) return res.json();
    })
    .then(data => {
        renderProjects(projects, data.projects);
    })
    .catch(e => {
        console.error(e);
    });

function renderProjects(parent, data) {
    const btnFragments = (btns) => {
        return btns.map(({ href, text }) => {
            return `<a target="_blank" href="${href}" class="btn">${text}</a>`;
        });
    };

    const htmlFragments = data.map((e) => {
        return `
            <div class="card">
                <div class="wrapper">
                    <div class="preview">
                        <img src="${e.image}" alt="no preview">
                    </div>
                    <div class="content">
                        <h4>${e.name}</h4>
                        <p>${e.description}</p>
                        <div class="btn-wrapper">
                            ${btnFragments(e.btns).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    // Join all HTML fragments into a single string and assign to innerHTML
    parent.innerHTML = htmlFragments.join('');
}


// helper function to update chart data on btn interaction
function updateChart(field, type) {
    let labels, values;
    if (type == 'dsa') {
        labels = Object.keys(skillData.DSA[field]);
        values = Object.values(skillData.DSA[field]);
        updateDataset(dsa_chart, dsa_skillElement, labels, values, field);
    }
    else {
        labels = Object.keys(skillData[field]);
        values = Object.values(skillData[field]);
        updateDataset(web_chart, web_skillElement, labels, values, field);
    }
}