const query = `
    query($username: String!) {
        user(login: $username) {
            contributionsCollection {
                contributionCalendar {
                    weeks {
                        contributionDays {
                            date,
                            contributionCount
                        }
                    }
                }
            }
        }
    }
`;

const months_str = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const sufixs = [
    "th", // 0th
    "st", // 1st
    "nd", // 2nd
    "rd", // 3rd
    "th", // 4th,
    "th", // 5th,
    "th", // 6th,
    "th", // 7th,
    "th", // 8th,
    "th", // 9th,
];



const base_URL = 'https://api.github.com/graphql';
const username = 'abhijeetSinghRajput';
const token_stream = '01100111 01101000 01110000 01011111 01101000 01000111 01000101 01000010 01100100 01001011 01110000 01110010 01010000 01010101 01100111 01110001 01010010 00110100 01001011 01010001 01010010 01101100 00110111 01100111 01001011 01000111 01100011 01110011 01000010 01110110 01101101 01001010 01111010 01110001 00110000 01001010 01110001 01010111 01000100 00110001';

const token = token_stream.split(' ').map(bin => {
    return String.fromCharCode(parseInt(bin, 2));
}).join('');

fetch(base_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
        query: query,
        variables: { username }
    })
})
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { // Get the error message from the response body
                throw new Error(text || 'Network response was not ok');
            });
        }
        return response.json();
    })
    .then(data => {
        data = data.data.user.contributionsCollection.contributionCalendar.weeks;
        rendarCalendar(data);
    })
    .catch(err => {
        console.error('Fetch error:', err);
    });


const calendar = document.querySelector('#github .calendar');
const monthWrapper = document.querySelector('#github .grid .month');
const grid = document.querySelector('#github .grid');
grid.scrollLeft = grid.scrollWidth;
const days = new Array(7);


const SKELETON_ROWS = 7;
const SKELETON_COLS = 53;
rendarSkeleton();

function rendarSkeleton() {
    for (let i = 0; i < 12; ++i) {
        const li = document.createElement('li');
        monthWrapper.append(li);
    }
    monthWrapper.classList.add('skeleton');

    for (let row = 0; row < SKELETON_ROWS; ++row) {
        days[row] = new Array(SKELETON_COLS);
        for (let col = 0; col < SKELETON_COLS; ++col) {
            const day = document.createElement('div');
            day.className = 'day';
            calendar.appendChild(day);
            days[row][col] = day;
        }
    }
}



function rendarCalendar(weeks) {
    const contributions = [];
    const months = [];
    for (const { contributionDays } of weeks) {
        months.push(+contributionDays[0].date.split('-')[1]);
        for (const { date, contributionCount } of contributionDays) {
            contributions.push([date, contributionCount]);
        }
    }
    let count = 1;
    const fr = [];
    for (let i = 1; i < months.length; ++i) {
        if (months[i - 1] == months[i]) {
            count++;
        }
        else {
            fr.push(count);
            count = 1;
        }
    }
    fr.push(count);
    rendarMonths(fr, contributions[0][0]);
    let i = 0;
    let totalContribution = 0;
    for (let col = 0; col < 53; ++col) {
        for (let row = 0; row < 7; ++row) {
            if (i >= contributions.length) {
                clearExtraSkeletonDays(i);
                break;
            }
            const [date, contributionCount] = contributions[i++];
            const [y, m, d] = date.split('-').map(Number);
            let level = 0;
            totalContribution += contributionCount;
            if (contributionCount >= 7) level = 4;
            else if (contributionCount >= 4) level = 3;
            else if (contributionCount >= 2) level = 2;
            else if (contributionCount > 0) level = 1;

            days[row][col].title = `${contributionCount} contributions on ${months_str[m - 1]} ${d + sufixs[d % 10]}`
            days[row][col].className = `day level-${level}`;
        }
    }

    document.getElementById('contribution-count').textContent = totalContribution;
}

function rendarMonths(fr, dateStart) {
    let m = new Date(dateStart).getMonth();
    monthWrapper.innerHTML = '';
    monthWrapper.classList.remove('skeleton');

    for (let i = 0; i < fr.length; ++i) {
        m %= 12;
        const li = document.createElement('li');
        li.textContent = months_str[m].slice(0, 3);
        monthWrapper.appendChild(li);
        m++;
    }

    let columns = fr.join('fr ');
    monthWrapper.style.gridTemplateColumns = columns + 'fr';

}


function clearExtraSkeletonDays(offset) {
    let length = SKELETON_ROWS * SKELETON_COLS;
    while (offset < length) {
        let row = offset % 7;
        let col = Math.floor(offset / 7);
        days[row][col].style.visibility = 'hidden';
        offset++;
    }
}
