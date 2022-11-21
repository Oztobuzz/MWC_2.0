const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev");
(next = document.querySelector(".next")),
(todayBtn = document.querySelector(".today-btn")),
(gotoBtn = document.querySelector(".goto-btn")),
(dateInput = document.querySelector(".date-input"));

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
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

//function to add days

function initCalendar() {
    //to get prev month and current month all days

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    //update date top of calendar
    date.innerHTML = months[month] + " " + year;

    //adding days on dom

    let days = "";

    //prev month days
    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date"><div class="day-number">${prevDays - x + 1}</div></div>`;
    }
    
    for (let i = 1; i <= lastDate; i++) {
        if (i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()) {
                days += `<div class="day today"><div class="day-number">${i}</div></div>`;
            }
        else {
            days += `<div class="day"><div class="day-number">${i}</div></div>`
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date"><div class="day-number">${j}</div></div>`;
    }

    daysContainer.innerHTML = days;
}

initCalendar();

function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("keyup", (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
        dateInput.value += "/";
    }
    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0,7);
    }
    if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
    const dateArr = dateInput.value.split("/");
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }

    alert("Invalid date");
}



// Popup

let PreDate = document.querySelectorAll(".prev-date");


function openPopup(){
    document.getElementById('popup').classList.add('open-popup');
    document.querySelector('body').classList.add('stop-scrolling');
}
function closePopup(){
    document.getElementById('popup').classList.remove('open-popup');
    document.querySelector('body').classList.remove('stop-scrolling');
}

let dayArray = document.querySelectorAll(".day");

dayArray.forEach(element => {
    if(element.classList.value !== "day prev-date" 
        && element.classList.value !== 'day next-date'){
        element.addEventListener("click", openPopup);
    }
});