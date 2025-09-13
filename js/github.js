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
  "December",
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

let result;

async function loadGitHubActivity() {
  try {
    const response = await fetch("/.netlify/functions/github-activity");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Network response was not ok");
    }

    result = await response.json();
    const weeks =
      result.data.user.contributionsCollection.contributionCalendar.weeks;
    rendarCalendar(weeks);
  } catch (err) {
    // console.error("Fetch error:", err);
  }
}

loadGitHubActivity();

const calendar = document.querySelector("#github .calendar");
const monthWrapper = document.querySelector("#github .grid .month");
const grid = document.querySelector("#github .grid");
grid.scrollLeft = grid.scrollWidth;
const days = new Array(7);

const SKELETON_ROWS = 7;
const SKELETON_COLS = 53;
rendarSkeleton();

function rendarSkeleton() {
  for (let i = 0; i < 12; ++i) {
    const li = document.createElement("li");
    monthWrapper.append(li);
  }
  monthWrapper.classList.add("skeleton");

  for (let row = 0; row < SKELETON_ROWS; ++row) {
    days[row] = new Array(SKELETON_COLS);
    for (let col = 0; col < SKELETON_COLS; ++col) {
      const day = document.createElement("div");
      day.className = "day";
      calendar.appendChild(day);
      days[row][col] = day;
    }
  }
}

function rendarCalendar(weeks) {
  const contributions = [];
  const months = [];
  for (const { contributionDays } of weeks) {
    months.push(+contributionDays[0].date.split("-")[1]);
    for (const { date, contributionCount } of contributionDays) {
      contributions.push([date, contributionCount]);
    }
  }
  let count = 1;
  const fr = [];
  for (let i = 1; i < months.length; ++i) {
    if (months[i - 1] == months[i]) {
      count++;
    } else {
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
      const [y, m, d] = date.split("-").map(Number);
      let level = 0;
      totalContribution += contributionCount;
      if (contributionCount >= 7) level = 4;
      else if (contributionCount >= 4) level = 3;
      else if (contributionCount >= 2) level = 2;
      else if (contributionCount > 0) level = 1;

      days[row][col].title = `${contributionCount} contributions on ${
        months_str[m - 1]
      } ${d + sufixs[d % 10]}`;
      days[row][col].className = `day level-${level}`;
    }
  }

  document.getElementById("contribution-count").textContent = totalContribution;
}

function rendarMonths(fr, dateStart) {
  let m = new Date(dateStart).getMonth();
  monthWrapper.innerHTML = "";
  monthWrapper.classList.remove("skeleton");

  for (let i = 0; i < fr.length; ++i) {
    m %= 12;
    const li = document.createElement("li");
    li.textContent = months_str[m].slice(0, 3);
    monthWrapper.appendChild(li);
    m++;
  }

  let columns = fr.join("fr ");
  monthWrapper.style.gridTemplateColumns = columns + "fr";
}

function clearExtraSkeletonDays(offset) {
  let length = SKELETON_ROWS * SKELETON_COLS;
  while (offset < length) {
    let row = offset % 7;
    let col = Math.floor(offset / 7);
    days[row][col].style.visibility = "hidden";
    offset++;
  }
}
