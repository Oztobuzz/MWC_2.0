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
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12"
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
    show_task_info();  // new 
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

// Subpopup
function openPopup2() {
    document.getElementById('popup-edit-task').classList.add('open-subpopup');
    document.getElementById('popup-confirm-btn').classList.add('open-subpopup');
}

// add task
document.querySelector(".add-btn").addEventListener("click", () => {
    openPopup2();
    document.querySelector(".add-btn").toggleAttribute("disabled");
})

// assign default
document.querySelector('.identify-MCP-btn').disabled = true;

function unableToggle(el, cl1, cl2) {
    el.classList.toggle(cl1);
    el.classList.toggle(cl2);
}

// change type
function changeType(){document.getElementById('workers').addEventListener("change", () => {
    if (document.getElementById('workers').value === "Người dọn rác") {
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
    tmp_MCP_id = [];
    tmp_MCP_address = [];
    tmp_vehicle_id = "";
    tmp_worker_id = "";
    tmp_worker_name = "";
    document.getElementById("worker-btn").innerText = "Thêm nhân viên";
    document.getElementById("vehicle-btn").innerHTML = "Thêm phương tiện";
    document.querySelector(".choose-MCP-in-2").innerHTML = `<button class="choose-MCP-btn unable-color active MCP-btn">Thêm MCPs</button>`;
    show_task_info();
    MCP_button();
})}

changeType(); // change to function : new

// hard code data : new
var WorkerList = [
    {
        "ID": "JNT001",
        "Name": "Thế Phi Cường",
        "Role": "Người dọn rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "CLT003",
        "Name": "Vưu Nghĩa Dũng",
        "Role": "Người thu rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "JNT002",
        "Name": "Thạch Minh Khôi",
        "Role": "Người dọn rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "CLT112",
        "Name": "Nhâm Tuấn Hải",
        "Role": "Người thu rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "JNT342",
        "Name": "Đỗ Thiện Minh",
        "Role": "Người dọn rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "JNT130",
        "Name": "Ngạc Việt Phương",
        "Role": "Người dọn rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "JNT452",
        "Name": "Ngọ Ðình Quảng",
        "Role": "Người dọn rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "JNT855",
        "Name": "Ung Chiến Thắng",
        "Role": "Người dọn rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "JNT999",
        "Name": "Xung Mạnh Ðình",
        "Role": "Người dọn rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "CLT004",
        "Name": "Thi Trọng Khánh",
        "Role": "Người thu rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "JNT142",
        "Name": "Mẫn Cao Kỳ",
        "Role": "Người dọn rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "CLT734",
        "Name": "Giàng Ðức Minh",
        "Role": "Người thu rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "JNT232",
        "Name": "Phùng Thiện Ngôn",
        "Role": "Người dọn rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "JNT464",
        "Name": "Điêu Duy Quang",
        "Role": "Người dọn rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "CLT7462",
        "Name": "Cát Ðình Trung",
        "Role": "Người thu rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "JNT822",
        "Name": "Tiếp Hữu Vượng",
        "Role": "Người dọn rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "JNT546",
        "Name": "Thành Trung Dũng",
        "Role": "Người dọn rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "JNT832",
        "Name": "Quách Hữu Hiệp",
        "Role": "Người dọn rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "JNT133",
        "Name": "Tôn Thất Thành Long",
        "Role": "Người dọn rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "JNT875",
        "Name": "Đào Quốc Trường",
        "Role": "Người dọn rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "CLT654",
        "Name": "Đào Quốc Trường",
        "Role": "Người thu rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "JNT363",
        "Name": "Kông Ngọc Khôi",
        "Role": "Người dọn rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "CLT738",
        "Name": "Liễu Thiên Mạnh",
        "Role": "Người thu rác",
        "State": "Chưa phân công"
    },
    {
        "ID": "JNT360",
        "Name": "Mạc Hoàng Thái",
        "Role": "Người dọn rác",
        "State": "Chưa phân công"
    }
]
var VehicleList = [
    {
        "ID": "VHC131",
        "Weight": 6,
        "Capacity": 3,
        "FuelConsumption": 330,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC630",
        "Weight": 3,
        "Capacity": "1,5",
        "FuelConsumption": 180,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC004",
        "Weight": 3,
        "Capacity": "1,5",
        "FuelConsumption": 180,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC252",
        "Weight": 4,
        "Capacity": 2,
        "FuelConsumption": 230,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC005",
        "Weight": 3,
        "Capacity": "1,5",
        "FuelConsumption": 180,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC144",
        "Weight": 4,
        "Capacity": 2,
        "FuelConsumption": 230,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC633",
        "Weight": 2,
        "Capacity": 1,
        "FuelConsumption": 130,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC078",
        "Weight": 4,
        "Capacity": 2,
        "FuelConsumption": 230,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC958",
        "Weight": 3,
        "Capacity": "1,5",
        "FuelConsumption": 180,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC035",
        "Weight": 4,
        "Capacity": 2,
        "FuelConsumption": 230,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC063",
        "Weight": 5,
        "Capacity": "2,5",
        "FuelConsumption": 280,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC065",
        "Weight": 4,
        "Capacity": 2,
        "FuelConsumption": 230,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC244",
        "Weight": 4,
        "Capacity": 2,
        "FuelConsumption": 230,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC387",
        "Weight": 1,
        "Capacity": "0,5",
        "FuelConsumption": 80,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC466",
        "Weight": 6,
        "Capacity": 3,
        "FuelConsumption": 330,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC333",
        "Weight": 4,
        "Capacity": 2,
        "FuelConsumption": 230,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC857",
        "Weight": 4,
        "Capacity": 2,
        "FuelConsumption": 230,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC255",
        "Weight": 4,
        "Capacity": 2,
        "FuelConsumption": 230,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC956",
        "Weight": 8,
        "Capacity": 4,
        "FuelConsumption": 430,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC422",
        "Weight": 4,
        "Capacity": 2,
        "FuelConsumption": 230,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC043",
        "Weight": 3,
        "Capacity": "1,5",
        "FuelConsumption": 180,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC067",
        "Weight": 4,
        "Capacity": 2,
        "FuelConsumption": 230,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC242",
        "Weight": 2,
        "Capacity": 1,
        "FuelConsumption": 130,
        "State": "Chưa phân công"
    },
    {
        "ID": "VHC111",
        "Weight": 4,
        "Capacity": 2,
        "FuelConsumption": 230,
        "State": "Chưa phân công"
    }
]
var MCPList = [
    {
        "ID": "MCP131",
        "Address": "926/4/22 Nguyen Kiem St. Ward 3,Ho Chi Minh City,Vietnam",
        "State": "50%"
    },
    {
        "ID": "MCP630",
        "Address": "298 Nguyen Trong Tuyen Street Ward 1,Ho Chi Minh City,Vietnam",
        "State": "Full loaded"
    },
    {
        "ID": "MCP004",
        "Address": "678 Truong Chinh St. Ward 15,Ho Chi Minh City,Vietnam",
        "State": "50%"
    },
    {
        "ID": "MCP252",
        "Address": "202 Truong Dinh St. Tuong Mai Ward,Ho Chi Minh City,Vietnam",
        "State": "50%"
    },
    {
        "ID": "MCP005",
        "Address": "149D Doi Can,Hanoi,Vietnam",
        "State": "Full loaded"
    },
    {
        "ID": "MCP144",
        "Address": "584 Nguyen Van Cu Gia Lam Townlet,Vinh,Vietnam",
        "State": "50%"
    },
    {
        "ID": "MCP633",
        "Address": "J5 (19/27) Hoang Hoa Tham St. Ward 3,Binh Phuoc,Vietnam",
        "State": "Full loaded"
    },
    {
        "ID": "MCP078",
        "Address": "70-72 Tran Phu Street Da Nang City,Ho Chi Minh City,Vietnam",
        "State": "75%"
    },
    {
        "ID": "MCP958",
        "Address": "339 Nguyen Van Luong Ward 12 Dist.6,Ho Chi Minh City,Vietnam",
        "State": "Full loaded"
    },
    {
        "ID": "MCP035",
        "Address": "24 B3 Mai Dich Street Group 217 Cau Giay District,Hanoi,Vietnam",
        "State": "50%"
    },
    {
        "ID": "MCP063",
        "Address": "92 Pho Quang Ward 2,Hanoi,Vietnam",
        "State": "50%"
    },
    {
        "ID": "MCP065",
        "Address": "678 Truong Chinh St. Ward 15,Ho Chi Minh City,Vietnam",
        "State": "75%"
    },
    {
        "ID": "MCP244",
        "Address": "Chau Khe Industrial Zone Tu Son District,Hanoi,Vietnam",
        "State": "75%"
    },
    {
        "ID": "MCP387",
        "Address": "3Lane 76 An Duong Street Tay Ho District,Hanoi,Vietnam",
        "State": "20%"
    },
    {
        "ID": "MCP466",
        "Address": "20/33 Le Thanh Tong Street,Thanh Hoa,Vietnam",
        "State": "Full loaded"
    },
    {
        "ID": "MCP333",
        "Address": "220/42/16 Nguyen Xi St. Ward 26,Ho Chi Minh City,Vietnam",
        "State": "75%"
    },
    {
        "ID": "MCP857",
        "Address": "586 Ba Trieu StreetThanh Hoa city,Thanh Hoa,Vietnam",
        "State": "20%"
    },
    {
        "ID": "MCP255",
        "Address": "Nguyen Tri Phuong Extended St. Lot 27A-B B2.6 Resident Area 4,Danang,Vietnam",
        "State": "50%"
    },
    {
        "ID": "MCP956",
        "Address": "260 Tran Khat Chan St. Thanh Luong Ward,Hanoi,Vietnam",
        "State": "75%"
    },
    {
        "ID": "MCP422",
        "Address": "410 Su Van Hanh St. Ward 9 Dist. 10,Ho Chi Minh City,Vietnam",
        "State": "Full loaded"
    },
    {
        "ID": "MCP043",
        "Address": "701 Le Hong Phong Ward 10,Ho Chi Minh City,Vietnam",
        "State": "20%"
    },
    {
        "ID": "MCP067",
        "Address": "44 Street 1A Binh Tri Dong B Ward,Ho Chi Minh City,Vietnam",
        "State": "75%"
    },
    {
        "ID": "MCP242",
        "Address": "344 Tran PHuu Str.,Quang Ninh,Vietnam",
        "State": "Full loaded"
    },
    {
        "ID": "MCP111",
        "Address": "165/2 Street 3/2 Ward 11 District 10,Ho Chi Minh City,Vietnam",
        "State": "20%"
    }
]

// Worker data table : new
function buildWorkerTable(data) {
    var table = document.getElementById('myTable1');
    table.innerHTML = "";
    let Wtype = document.getElementById("workers");
    console.log(Wtype.value);
    for (var i = 0; i < data.length; i++){
        if(data[i].Role == Wtype.value){
            var row = `<tr>
                                <td width="90px">${data[i].ID}</td>
                                <td width="250px">${data[i].Name}</td>
                                <td width="140px">${data[i].Role}</td>
                                <td width="210px">${data[i].State}</td>
                    </tr>`
            table.innerHTML += row
        }
    }
}

function openWTable() {document.getElementById('worker-btn').addEventListener('click', () => {
    buildWorkerTable(WorkerList);                        
    openWorkerList(container2);
})}

openWTable();

// Vehicle data table : new
function buildVehicleTable(data){
    var table = document.getElementById('myTable2')
    for (var i = 0; i < data.length; i++){
        var row = `<tr>
                            <td width="80px">${data[i].ID}</td>
                            <td width="100px">${data[i].Weight}</td>
                            <td width="110px">${data[i].Capacity}</td>
                            <td width="120px">${data[i].FuelConsumption}</td>
                            <td width="160px">${data[i].State}</td>
                      </tr>`
        table.innerHTML += row
    }
}

function openVTable(){document.getElementById('vehicle-btn').addEventListener('click', () => {
    buildVehicleTable(VehicleList);
    openVehicleList(container3);
})}

openVTable();

// MCPs data table : new
function buildMCPTable(data){
    var table = document.getElementById('myTable3')
    for (var i = 0; i < data.length; i++){
        var row = `<tr>
                            <td width="80px">${data[i].ID}</td>
                            <td width="360px">${data[i].Address}</td>
                            <td width="130px">${data[i].State}</td>
                      </tr>`
        table.innerHTML += row
    }
}

function MCP_button() {document.querySelectorAll('.MCP-btn').forEach(element =>{
    element.addEventListener('click', () => {
        buildMCPTable(MCPList);
        openMCPList(container4);
    })
})}

MCP_button();

// open the data table 
function openWorkerList(container2) {
    if (container2 == null) return
    container2.classList.add('active')
    if (container3 == null) return
    container3.classList.remove('active')
    if (container4 == null) return
    container4.classList.remove('active')
}

function openVehicleList(container3) {
    if (container3 == null) return
    container3.classList.add('active')
    if (container2 == null) return
    container2.classList.remove('active')
    if (container4 == null) return
    container4.classList.remove('active')
}

function openMCPList(container4) {
    if (container4 == null) return
    container4.classList.add('active')
    if (container2 == null) return
    container2.classList.remove('active')
    if (container3 == null) return
    container3.classList.remove('active')
}


/* choose btn for table worker : new */ 

var Wtable = document.querySelector(".table-fixed");
var selected = Wtable.getElementsByClassName('selected');
Wtable.onclick = highlight;

let tmp_worker_id = new String, tmp_worker_name = new String;

function highlight(e) {
    if (selected[0]) selected[0].className = '';
    e.target.parentNode.className = 'selected';
    let element = document.querySelectorAll('.selected');
    if (element[0] !== undefined) { //it must be selected
        tmp_worker_id = element[0].children[0].firstChild.data;
        tmp_worker_name = element[0].children[1].innerHTML;
    }
    document.getElementById("worker-btn").innerText = tmp_worker_id + " - " + tmp_worker_name;
}

document.getElementById('W-OK-btn').addEventListener("click", () => {
    document.querySelector(".container2").classList.remove("active");
})


/* choose btn for table vehicle : new */

var Vtable = document.querySelector(".table-fixed1");
var selected1 = Vtable.getElementsByClassName('selected1');
Vtable.onclick = highlight1;

let tmp_vehicle_id = new String;

function highlight1(e) {
    if (selected1[0]) selected1[0].className = '';
    e.target.parentNode.className = 'selected1';
    let element = document.querySelectorAll('.selected1');
    if (element[0] !== undefined) { //it must be selected
        tmp_vehicle_id = element[0].children[0].firstChild.data;
    }

    document.getElementById("vehicle-btn").innerText = tmp_vehicle_id;
}
document.getElementById('V-OK-btn').addEventListener("click", () => {
    document.querySelector(".container3").classList.remove("active");
})

/* choose btn for table MCP : new */

var MCPtable = document.querySelector(".table-fixed2");
var selected2 = MCPtable.getElementsByClassName('selected2');

MCPtable.onclick = highlight2;

let tmp_MCP_id = [];
let tmp_MCP_address = [];

function highlight2(e) {
    if (selected2[0]) selected2[0].className = '';
    e.target.parentNode.className = 'selected2';
    let element = document.querySelectorAll('.selected2');
    if (element[0] !== undefined) { //it must be selected
        var e = document.getElementById("workers");
        var text = e.options[e.selectedIndex].text;
        console.log(text);
        if (text === "Người dọn rác" && 
            tmp_MCP_id.length === 1) {
                tmp_MCP_id[0] = element[0].children[0].firstChild.data;
                tmp_MCP_address[0] = element[0].children[1].innerText;
        } else {
            if(tmp_MCP_id.includes(element[0].children[0].firstChild.data) && tmp_MCP_id.length > 1) {
                tmp_MCP_id = tmp_MCP_id.filter(item => item !== element[0].children[0].firstChild.data);
                tmp_MCP_address = tmp_MCP_address.filter(item => item !== element[0].children[1].innerText);
            }
            else if(tmp_MCP_id.includes(element[0].children[0].firstChild.data)) {

            }
            else {
                console.log(2);
                tmp_MCP_id.push(element[0].children[0].firstChild.data);
                tmp_MCP_address.push(element[0].children[1].innerText);
            }
        }
    }

    let tmp_inner_MCP = "";
    for (let i = 0; i < tmp_MCP_address.length; i++) {
        tmp_inner_MCP += `<div class="choose-MCP-btn unable-color MCP-btn address-after-asg" >${tmp_MCP_address[i]}</div>`;
    }
    document.querySelector(".choose-MCP-in-2").innerHTML = tmp_inner_MCP;
    MCP_button();
}
document.getElementById('MCP-OK-btn').addEventListener("click", () => {
    document.querySelector(".container4").classList.remove("active");
})


// new input data 
function ConfirmButton(){
    document.querySelector(".confirm-btn").addEventListener("click", () => {
    var e = document.getElementById("workers");
    var text = e.options[e.selectedIndex].text;

    const event = new Event(`Task ${document.querySelectorAll(".event").length + 1}`, dayN);
    event.input_type(text, tmp_worker_id, tmp_worker_name, tmp_vehicle_id, tmp_MCP_id, tmp_MCP_address);
    // console.log(event)
    eventArr.push(event);
    const el = document.createElement(`div`);
    el.classList.add("event","newlyadd");
    el.innerHTML =`<i class="fa fa-circle"></i><h3 class="event-title">${event.name}</h3></div>`;
    eventAvail.append(el);
    
    // new 
    document.getElementById("worker-btn").innerText = "Thêm nhân viên";

    document.getElementById("vehicle-btn").innerHTML = "Thêm phương tiện";

    document.querySelector(".choose-MCP-in-2").innerHTML = `<button class="choose-MCP-btn unable-color active MCP-btn">Thêm MCPs</button>`;

    document.getElementById('popup-edit-task').classList.remove('open-subpopup');
    document.getElementById('popup-confirm-btn').classList.remove('open-subpopup');
    document.querySelector(".add-btn").toggleAttribute("disabled");
    tmp_MCP_id = [];
    tmp_MCP_address = [];
    tmp_vehicle_id = "";
    tmp_worker_id = "";
    tmp_worker_name = "";

    show_task_info();
    MCP_button();
})}

ConfirmButton();

// Reset the event of buttons : new
function ReEventButton(){
    changeType();
    openWTable();
    openVTable();
    MCP_button();
    ConfirmButton();
}

// new elements : new
const defaultAssignLayout = 
`<div class="popup-asg-info" id="popup-edit-task">
<div class="choose-type">
    <label for="workers">Chọn chức vụ:</label>
    <select name="workers" id="workers">
        <option value="Người thu rác">Người thu rác</option>
        <option value="Người dọn rác">Người dọn rác</option>
    </select>
</div>

<div class="worker-ID">
    <p>Chọn nhân viên:</p>
    <button class="add-worker-btn unable-color active" id="worker-btn">Thêm nhân viên</button>
</div>

<div class="vehicle-ID">
    <p>Chọn phương tiện:</p>
    <button class="add-vehicle-btn unable-color active" id="vehicle-btn">Thêm phương tiện</button>
</div>

<div class="choose-MCP">
    <div class="choose-MCP-in">
        <div class="choose-MCP-in-1">
            <p>Chọn MCPs:</p>
        </div>
        <div class="choose-MCP-in-2">
            <button class="choose-MCP-btn unable-color active MCP-btn">Thêm MCPs</button>
        </div>
    </div>
</div>

<div class="MCP-final">
    <button class="make-route-btn unable-color">Tạo đường đi</button>
    <button class="identify-MCP-btn disable-color" id="identify-MCP-btn">Xác định MCP</button>
</div>
</div>`;
const defaultConfirmButton = document.querySelector(".confirm-btn");

/* show choosen task info */
function show_task_info() {
    let tmp_name = "";
    // console.log("enter show task function");
    // console.log(document.querySelectorAll(".event"));
    document.querySelectorAll(".event").forEach(tt => {
        // console.log(tt);
        tt.addEventListener("click", () => {
            tmp_name = tt.innerText;
            let tmp_inner = "";
            for (let i = 0; i < eventArr.length; i++) {
                if (eventArr[i].name === tmp_name && eventArr[i].date === dayN) {
                    tmp_inner =    `<p>Chức vụ: </p>
                                    <div class="type-of-worker">${eventArr[i].type}</div>
                                    <br>
                                    <p>Tên nhân viên: </p>
                                    <div class="worker-task-name">${eventArr[i].worker_id + " - " + eventArr[i].worker_name}</div>`;
                    if(eventArr[i].type === "Người thu rác"){
                    tmp_inner +=     `<br>
                                    <p>ID phương tiện: </p>
                                    <div class="vehicle-task-ID">${eventArr[i].vehicle_id}</div>`;
                    }
                    tmp_inner +=    `<br>
                                    <p>Danh sách MCP: </p>`;
                    // console.log(eventArr[i].MCP_address);
                    for(let j = 0; j < eventArr[i].MCP_address.length; j++){
                        tmp_inner += `<div class="MCP-task-address">${eventArr[i].MCP_address[j]}</div>`;
                    }
                    // replace the layout: new
                    document.querySelector(".assign-task").innerHTML = `<div class="task-info">${tmp_inner}</div>`;
                    document.querySelector("#popup-confirm-btn").innerHTML = `<button class="Task-OK-btn"><div>OK</div></button>`;
                    document.querySelector("#popup-confirm-btn").classList.add("open-subpopup");

                    // set performance for Task OK button : new
                    document.querySelector(".Task-OK-btn").addEventListener("click", ()=>{
                        document.querySelector(".assign-task").innerHTML = defaultAssignLayout;
                        document.querySelector("#popup-confirm-btn").innerHTML = `<button class="confirm-btn">Xác nhận</button>`;
                        document.querySelector("#popup-confirm-btn").classList.remove("open-subpopup");
                        ReEventButton();
                        show_task_info();
                    })
                    break;
                } 
            } 
        });
    })
}


// close popup
function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

// new performance for close box : new
function closePopup() {
    // if(document.querySelector(".Task-OK-btn") !== null) {
    //     document.querySelector(".assign-task").innerHTML = defaultAssignLayout;
    //     document.querySelector("#popup-confirm-btn").innerHTML = `<button class="confirm-btn">Xác nhận</button>`;
    //     document.querySelector("#popup-confirm-btn").classList.remove("open-subpopup");
    //     ReEventButton();
    //     show_task_info();
    // }
    // else{
    //     document.getElementById('popup-edit-task').classList.remove('open-subpopup');
    //     document.getElementById('popup-confirm-btn').classList.remove('open-subpopup');
    // }
    document.querySelector(".assign-task").innerHTML = defaultAssignLayout;
        document.querySelector("#popup-confirm-btn").innerHTML = `<button class="confirm-btn">Xác nhận</button>`;
        document.querySelector("#popup-confirm-btn").classList.remove("open-subpopup");
        ReEventButton();
        show_task_info();
    removeElementsByClass('newlyadd');
    document.querySelector('.add-btn').removeAttribute("disabled"); 
    document.getElementById('popup').classList.remove('open-popup');
    document.querySelector('body').classList.remove('stop-scrolling');
}

