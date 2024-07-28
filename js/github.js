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



const base_URL = 'https://api.github.com/graphql';
const username = 'abhijeetSinghRajput';
const token_stream = '01100111 01101000 01110000 01011111 01010001 01100011 01001001 00110110 01110111 01110000 01110100 01110111 01110111 00110010 01000010 01010100 01010100 01001101 01010001 01110110 01100111 01111010 00110010 01110110 01000111 01001001 01101110 01010100 01100011 01001110 01010010 00110111 01001011 00110010 00110011 01010101 01111001 01010111 01000101 01100001';

const token = token_stream.split(' ').map(bin=>{
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
const days = new Array(7);

rendarSkeleton();
function rendarSkeleton() {
    for (let row = 0; row < 7; ++row) {
        days[row] = new Array(53);
        for (let col = 0; col < 53; ++col) {
            const day = document.createElement('div');
            day.className = 'day';
            calendar.appendChild(day);
            days[row][col] = day;
        }
    }
}

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
const days_str = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

const monthWrapper = document.querySelector('#github .grid .month');
function rendarMonths(fr, dateStart) {
    console.log(fr);
    let m = new Date(dateStart).getMonth();

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
