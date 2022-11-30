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
    constructor(name, date) {
       this.name = name;
       this.date = date;
       this.type_of_worker = "";
       this.worker_id = "";
       this.worker_name = "";
       this.vehicle_id = "";
       this.MCP_ID = "";
       this.MCP_address = "";
    }

    input_type(type_of_worker, worker_id, worker_name, vehicle_id,
                MCP_ID, MCP_address) {
        this.type = type_of_worker;
        this.worker_id = worker_id;
        this.worker_name = worker_name;
        this.vehicle_id = vehicle_id;
        this.MCP_ID = MCP_ID;
        this.MCP_address = MCP_address;
    }
}

let eventArr = [];

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
        if (element.classList.value !== "day prev-date"
            && element.classList.value !== 'day next-date') {
            element.addEventListener("click", () => {
                let str = element.innerHTML;
                let tmp = str.length;
                dayN = "";
                for (var i = 0; i < tmp; i++) {
                    if (str[i] >= '0' && str[i] <= 9) dayN += str[i];
                }
                dayN += " " + document.querySelector(".date").innerHTML;
                document.querySelector(".event-date").innerHTML = dayN;
                for (let i = 0; i < eventArr.length; i ++) {
                    if (eventArr[i].date === dayN) {
                        const el = document.createElement(`div`);
                        el.classList.add("event","newlyadd");
                        // let NumT = document.querySelectorAll(".event");
                        el.innerHTML =`<i class="fa fa-circle"></i><h3 class="event-title">${eventArr[i].name}</h3></div>`;
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

function openPopup2() {
    document.getElementById('popup-edit-task').classList.add('open-subpopup');
    document.getElementById('popup-confirm-btn').classList.add('open-subpopup');
}

document.querySelector(".add-btn").addEventListener("click", () => {
    openPopup2();
    document.querySelector(".add-btn").toggleAttribute("disabled");
})

document.querySelector('.identify-MCP-btn').disabled = true;

function unableToggle(el, cl1, cl2) {
    el.classList.toggle(cl1);
    el.classList.toggle(cl2);
}

document.getElementById('workers').addEventListener("change", () => {
    if (document.getElementById('workers').value === "Janitor") {
        let tmpa = document.querySelector('.identify-MCP-btn')
        let tmpb = document.querySelector('.add-vehicle-btn')
        let tmpc = document.querySelector('.make-route-btn')
        tmpa.disabled = false;
        tmpb.disabled = true;
        tmpc.disable = true;
        unableToggle(tmpa, "disable-color", "unable-color");
        unableToggle(tmpc, "unable-color", "disable-color");
        unableToggle(tmpb, "unable-color", "disable-color");
    } else {
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

function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function closePopup() {
    document.getElementById('popup').classList.remove('open-popup');
    document.querySelector('body').classList.remove('stop-scrolling');
    document.getElementById('popup-edit-task').classList.remove('open-subpopup');
    document.getElementById('popup-confirm-btn').classList.remove('open-subpopup');
    removeElementsByClass('newlyadd');
    document.querySelector('.add-btn').removeAttribute("disabled");
}

//////////////////////////////////////////////////////

const addworkerButton = document.querySelectorAll('.add-worker-btn')
addworkerButton.forEach(button => {
    button.addEventListener('click', () => {
        openWorkerList(container2);
    })
})

function openWorkerList(container2) {
    if (container2 == null) return
    container2.classList.add('active')
    if (container3 == null) return
    container3.classList.remove('active')
    if (container4 == null) return
    container4.classList.remove('active')
}

const addvehicleButton = document.querySelectorAll('.add-vehicle-btn')
addvehicleButton.forEach(button => {
    button.addEventListener('click', () => {
        openVehicleList(container3)
    })
})

function openVehicleList(container3) {
    if (container3 == null) return
    container3.classList.add('active')
    if (container2 == null) return
    container2.classList.remove('active')
    if (container4 == null) return
    container4.classList.remove('active')
}

const addMCPButton = document.querySelectorAll('.choose-MCP-btn')
addMCPButton.forEach(button => {
    button.addEventListener('click', () => {
        openMCPList(container4)
    })
})

function openMCPList(container4) {
    if (container4 == null) return
    container4.classList.add('active')
    if (container2 == null) return
    container2.classList.remove('active')
    if (container3 == null) return
    container3.classList.remove('active')
}

console.log(document.querySelector(".table-fixed"))

/* choose btn for table worker */

var table = document.querySelector(".table-fixed");
var selected = table.getElementsByClassName('selected');
table.onclick = highlight;

let tmp_worker_id = new String, tmp_worker_name = new String;

function highlight(e) {
    if (selected[0]) selected[0].className = '';
    e.target.parentNode.className = 'selected';
    let element = document.querySelectorAll('.selected');
    if (element[0] !== undefined) { //it must be selected
        tmp_worker_id = element[0].children[0].firstChild.data;
        tmp_worker_name = element[0].children[1].innerHTML;
    }
    refresh_worker();
    document.getElementById("worker-btn").classList.remove("active");
    document.getElementById("worker-btn").classList.add("unactive");
    document.getElementById("worker-info").classList.remove("unactive");
    document.getElementById("worker-info").classList.add("active");
}

/* choose btn for table vehicle */


var table1 = document.querySelector(".table-fixed1");
var selected1 = table1.getElementsByClassName('selected1');
table1.onclick = highlight1;

let tmp_vehicle_id = new String;

function highlight1(e) {
    if (selected1[0]) selected1[0].className = '';
    e.target.parentNode.className = 'selected1';
    let element = document.querySelectorAll('.selected1');
    if (element[0] !== undefined) { //it must be selected
        tmp_vehicle_id = element[0].children[0].firstChild.data;
    }
    refresh_vehicle();
    document.getElementById("vehicle-btn").classList.remove("active");
    document.getElementById("vehicle-btn").classList.add("unactive");
    document.getElementById("vehicle-info").classList.remove("unactive");
    document.getElementById("vehicle-info").classList.add("active");
}

/* choose btn for table MCP */

var table2 = document.querySelector(".table-fixed2");
var selected2 = table2.getElementsByClassName('selected2');
table2.onclick = highlight2;

let tmp_MCP_id = [];
let tmp_MCP_address = [];

function highlight2(e) {
    if (selected2[0]) selected2[0].className = '';
    e.target.parentNode.className = 'selected2';
    let element = document.querySelectorAll('.selected2');
    if (element[0] !== undefined) { //it must be selected
        var e = document.getElementById("workers");
        var text = e.options[e.selectedIndex].text;

        if (text === "Janitor" && 
            tmp_MCP_id.length === 1) {
                tmp_MCP_id[0] = element[0].children[0].firstChild.data;
                tmp_MCP_address[0] = element[0].children[1].innerText;
        } else {
            tmp_MCP_id.push(element[0].children[0].firstChild.data);
            tmp_MCP_address.push(element[0].children[1].innerText);
        }
    }
    refresh_MCP();
    document.getElementById("MCP-btn").classList.remove("active");
    document.getElementById("MCP-btn").classList.add("unactive");
    document.getElementById("MCP-info").classList.remove("unactive");
    document.getElementById("MCP-info").classList.add("active");
}

// refresh assign frame again

function refresh_worker() {
    document.querySelector(".worker-ID-info").innerHTML = `<div class="add-worker-btn unable-color">${tmp_worker_id + " - " + tmp_worker_name}</div>`;
}

function refresh_vehicle() {
    document.querySelector(".vehicle-ID-info").innerHTML = `<div class="add-vehicle-btn unable-color">${tmp_vehicle_id}</div>`;
}

function refresh_MCP() {
    let tmp_inner_MCP = "";
    for (let i = 0; i < tmp_MCP_id.length; i++) {
        tmp_inner_MCP += `<div class="choose-MCP-btn unable-color">${tmp_MCP_id[i]}</div>`;
    }
    document.querySelector(".choose-MCP-info").innerHTML = tmp_inner_MCP;
}

/* show choosen task info */
function show_task_info() {
    let tmp_name = "";
    document.querySelectorAll(".events").forEach(element => {
        element.addEventListener("click", () => {
            console.log(tmp_MCP_id)
            tmp_name = element.innerText;
            let tmp_inner = "";
            for (let i = 0; i < eventArr.length; i++) {
                if (eventArr[i].name === tmp_name &&
                    eventArr[i].date === dayN) 
                    {
                        tmp_inner =    `<p>Type of worker: </p>
                                        <div class="type-of-worker">
                                        ${eventArr[i].type}
                                        </div>
                                        <br>
                                        <p>Worker ID: </p>
                                        <div class="worker-task-ID">
                                        ${eventArr[i].worker_id}
                                        </div>
                                        <br>
                                        <p>Worker name: </p>
                                        <div class="worker-task-name">
                                        ${eventArr[i].worker_name}
                                        </div>
                                        <br>
                                        <p>Vehicle ID: </p>
                                        <div class="vehicle-task-ID">
                                        ${eventArr[i].vehicle_id}
                                        </div>`
                        document.querySelector(".task-info").innerHTML = tmp_inner;
                        break;
                    } 
            } 
        });
    })
}

show_task_info();

// input data
document.querySelector(".confirm-btn").addEventListener("click", () => {
    var e = document.getElementById("workers");
    var text = e.options[e.selectedIndex].text;

    const event = new Event(`Task ${document.querySelectorAll(".event").length + 1}`, dayN);
    event.input_type(text, tmp_worker_id, tmp_worker_name, tmp_vehicle_id, tmp_MCP_id, tmp_MCP_address);
    console.log(event)
    eventArr.push(event);
    const el = document.createElement(`div`);
    el.classList.add("event","newlyadd");
    el.innerHTML =`<i class="fa fa-circle"></i><h3 class="event-title">${event.name}</h3></div>`;
    eventAvail.append(el);

    document.getElementById("worker-btn").classList.remove("unactive");
    document.getElementById("worker-btn").classList.add("active");
    document.getElementById("worker-info").classList.remove("active");
    document.getElementById("worker-info").classList.add("unactive");

    document.getElementById("vehicle-btn").classList.remove("unactive");
    document.getElementById("vehicle-btn").classList.add("active");
    document.getElementById("vehicle-info").classList.remove("active");
    document.getElementById("vehicle-info").classList.add("unactive");

    document.getElementById("MCP-btn").classList.remove("unactive");
    document.getElementById("MCP-btn").classList.add("active");
    document.getElementById("MCP-info").classList.remove("active");
    document.getElementById("MCP-info").classList.add("unactive");

    document.getElementById('popup-edit-task').classList.remove('open-subpopup');
    document.getElementById('popup-confirm-btn').classList.remove('open-subpopup');
    document.querySelector(".add-btn").toggleAttribute("disabled");
})


