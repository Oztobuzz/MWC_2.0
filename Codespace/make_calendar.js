const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev");
(next = document.querySelector(".next")),
    (todayBtn = document.querySelector(".today-btn")),
    (gotoBtn = document.querySelector(".goto-btn")),
    (dateInput = document.querySelector(".date-input")),
    eventAvail = document.querySelector(".events") ;

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();
class Event{
    constructor(name,date){
       this.name = name;
       this.date = date; 
    }
}
let events = [];

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
let dayN = "";
function openPopup(){
    document.getElementById('popup').classList.add('open-popup');
    document.querySelector('body').classList.add('stop-scrolling');
}


function addPopup() {
    document.querySelectorAll(".day").forEach(element => {
        if(element.classList.value !== "day prev-date"
            && element.classList.value !== 'day next-date'){
            element.addEventListener("click", ()=>{
                let str = element.innerHTML;
                let tmp = str.length;
                dayN = "";
                for(var i = 0; i < tmp; i++){
                    if(str[i] >= '0' && str[i] <= 9) dayN += str[i];
                }
                dayN += " " + document.querySelector(".date").innerHTML;
                document.querySelector(".event-date").innerHTML = dayN;
                for(let i = 0; i < events.length; i ++)
                {
                    if(events[i].date === dayN)
                    {
                        const el = document.createElement(`div`);
                        el.classList.add("event","newlyadd");
                        el.innerHTML =`<i class="fa fa-circle"></i><h3 class="event-title">${events[i].name}</h3></div>`;
                        eventAvail.append(el);
                    }
                }
                openPopup();
            });

        }
    });
}

addPopup();

document.querySelectorAll(".change-month").forEach(element => {
    element.addEventListener("click", addPopup);
})

document.querySelectorAll(".go-btn").forEach(element => {
    element.addEventListener("click", addPopup);
})

function openPopup2(){
    document.getElementById('popup-edit-task').classList.add('open-subpopup');
    document.getElementById('popup-confirm-btn').classList.add('open-subpopup');
}

document.querySelector(".add-btn").addEventListener("click", ()=>{
    openPopup2();
    console.log(dayN);
    const event = new Event(`Event ${events.length + 4}`, dayN);
    events.push(event);
    const el = document.createElement(`div`);
    el.classList.add("event","newlyadd");
    el.innerHTML =`<i class="fa fa-circle"></i><h3 class="event-title">${event.name}</h3></div>`;
    document.querySelector(".add-btn").toggleAttribute("disabled");
    eventAvail.append(el);

})

document.querySelector('.identify-MCP-btn').disabled = true;

function unableToggle(el, cl1, cl2){
    el.classList.toggle(cl1);
    el.classList.toggle(cl2);
}

document.getElementById('workers').addEventListener("change", ()=>{
    if(document.getElementById('workers').value === "Janitor") {
        let tmpa = document.querySelector('.identify-MCP-btn')
        let tmpb = document.querySelector('.add-vehicle-btn')
        let tmpc = document.querySelector('.make-route-btn')
        tmpa.disabled = false;
        tmpb.disabled = true;
        tmpc.disable = true;
        unableToggle(tmpa, "disable-color", "unable-color");
        unableToggle(tmpc, "unable-color", "disable-color");
        unableToggle(tmpb, "unable-color", "disable-color");
    }
    else{
        let tmpa = document.querySelector('.identify-MCP-btn')
        let tmpb = document.querySelector('.add-vehicle-btn')
        let tmpc = document.querySelector('.make-route-btn')
        tmpa.disabled = true;
        tmpb.disabled = false;
        tmpc.disable = false;
        unableToggle(tmpa, "unable-color", "disable-color");
        unableToggle(tmpc, "disable-color", "unable-color");
        unableToggle(tmpb, "disable-color", "unable-color");
    }
})
function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
function closePopup(){
    document.getElementById('popup').classList.remove('open-popup');
    document.querySelector('body').classList.remove('stop-scrolling');
    document.getElementById('popup-edit-task').classList.remove('open-subpopup');
    document.getElementById('popup-confirm-btn').classList.remove('open-subpopup');
    removeElementsByClass('newlyadd');
    document.querySelector('.add-btn').removeAttribute("disabled");
}
