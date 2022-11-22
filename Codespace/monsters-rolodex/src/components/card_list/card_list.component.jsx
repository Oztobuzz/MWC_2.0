import { Component } from "react";
import Card from "./card.component";
<link rel="stylesheet" href="./card_list.component.css" />
class CardList extends Component{

    render()
    {
        const monsters = this.props.monsters;
        return(
            <div className={this.props.className}>
                <div className = "header">
                    <h2>Full name</h2>
                    <h2>ID</h2>
                    <h2>STATE</h2>
                </div>
                {monsters.map((monster)=>{
                    return(
                        <Card monster = {monster}></Card>
                    )
                })}
            </div>
        )
    }
};

export default CardList; 