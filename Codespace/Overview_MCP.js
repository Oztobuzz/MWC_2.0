// Set query selector
const cardList = document.querySelector(".cardList");
const searchBox = document.querySelector(".searchBox");

//Declare global variable
let searchString="";
let users = [];

async function fetching(){
    return fetch("https://raw.githubusercontent.com/Oztobuzz/MWC_2.0/main/Codespace/data/MCP.json")
    .then((response) =>{ 
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
        `<p>${user["ID"]}</p>
        <p id = "address">${user["Address"]}</p>
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

// Implement Search Box
searchBox.addEventListener("input",(event)=>{
    searchString = onSearchChange(event);
    const filteredUsers = users.filter(
        (user)=>{return user.ID.toLowerCase().includes(searchString.toLowerCase());}
    ) 
    removeElementsByClass("card");
    filteredUsers.map((user)=>{
        const card =  document.createElement('div');
        card.classList.add("card");
        card.innerHTML = 
        `<p>${user["ID"]}</p>
        <p id = "address">${user["Address"]}</p>
        <p>${user.State}</p>`
        cardList.append(card);
    })

});