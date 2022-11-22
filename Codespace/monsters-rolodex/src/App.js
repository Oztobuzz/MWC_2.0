
import { Component } from 'react';

// import logo from './logo.svg';
import './App.css';
import CardList from './components/card_list/card_list.component';
import SearchBox from './components/search_box/search_box.component';
class App extends Component{
  constructor(){
    super();

    this.state = {
      searchString: "",
      monsters: [],
    };
  }

  componentDidMount(){
    let monsterFetch = fetch("https://raw.githubusercontent.com/Oztobuzz/MWC_2.0/main/Codespace/data/worker.json");
    monsterFetch.then((response) =>{ 
      console.log(response);
      return response.json();
      })
    .then((user)=>{
      console.log(user);
      return(
      this.setState(()=>{
        return {monsters: user};
      },()=>{
        console.log(this.state);
      }))
    })
  }


  onSearchChange = (event) =>{  
    const searchString = event.target.value.toLowerCase()
    this.setState(()=> {return {searchString} });
  }
  render(){
    let filteredMonsters = this.state.monsters.filter(
      (monster)=>{return monster.Name.toLowerCase().includes(this.state.searchString.toLowerCase());}
    ) 
    return (
      <div className="App">
        <SearchBox 
        className = "searchBox"
        onChangeHandler = {this.onSearchChange}
        placeholder = "Search employee"
        >  
        </SearchBox>
        <CardList className="cardlist" monsters = {filteredMonsters}></CardList>
        <a rel='stylesheet' href='calendar.html'> Press here</a>
      </div>
    );
  }
}

export default App;
