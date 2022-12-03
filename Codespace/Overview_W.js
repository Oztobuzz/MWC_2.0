// Set query selector
const cardList = document.querySelector(".cardList");
const searchBox = document.querySelector(".searchBox");
const roleSelect = document.querySelector("#roleSelect")

//Declare global variable
let searchString="";
let users = [];

async function fetching(){
    return fetch("https://raw.githubusercontent.com/Oztobuzz/MWC_2.0/main/Codespace/data/worker.json")
    .then((response) =>{
        // console.log(response.json());
        return response.json();
    })
    .then((user)=>{
        return user;
    })
}


async function didmount(){
    users = await this.fetching();
    console.log(users);
    users.map((user)=>{
        const card =  document.createElement('div');
        card.classList.add("card");
        card.innerHTML = 
        `<p>${user.ID}</p>
        <p>${user.Name}</p>
        <p>${user.Role}</p>
        <p>${user.State}</p>`
        cardList.append(card);
    })
}
didmount();

//Call helper function
function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
onSearchChange = (event) =>{  
    const searchString = event.target.value.toLowerCase()
    return searchString;
}

function filterOnCondition(condition, fieldToCompare){
    const filteredUsers = users.filter(
        (user)=>{return user[fieldToCompare].toLowerCase().includes(condition.toLowerCase());}
    ) 
    return filteredUsers;
}

function renderCardList(filteredUsers){
    removeElementsByClass("card");
    filteredUsers.map((user)=>{
        const card =  document.createElement('div');
        card.classList.add("card");
        card.innerHTML = 
        `<p>${user.ID}</p>
        <p>${user.Name}</p>
        <p>${user.Role}</p>
        <p>${user.State}</p>`
        cardList.append(card);
    })
}

// Implement Search Box
searchBox.addEventListener("input",(event)=>{
    searchString = onSearchChange(event);
    const filteredUsers = users.filter(
        (user)=>{return user.Name.toLowerCase().includes(searchString.toLowerCase());}
    ) 
    renderCardList(filteredUsers);

});
//Implement filter for overview
roleSelect.addEventListener("change", (event)=>{
    const condition = event.target.value;
    let filteredUsers = users;
    if(condition === "all"){}
    else{filteredUsers = filterOnCondition(condition, "Role");}
    renderCardList(filteredUsers);
})

// console.log(users);

