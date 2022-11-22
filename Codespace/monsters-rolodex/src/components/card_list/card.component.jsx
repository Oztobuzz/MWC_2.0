import { Component } from "react";

class Card extends Component{

    render()
    {
        const monster = this.props.monster;
        return (
            <div key = {monster.ID} className = "card">
                <p>{monster.Name}</p>
                <p>{monster.Role}</p>
                <p>{monster.State}</p>
            </div>
        );
    }
};



export default Card;