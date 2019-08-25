import React, {Component} from "react";


export class DetailsPage extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick("")
    }

    render() {
        return (
            <div className={"detailsPage"} key={"detailsPage"}>
                <button onClick={this.handleClick}>Back</button>
                <Image img={this.props.recipe.img}/>
                <Ingredients ingredients={this.props.recipe.ingredients}/>
                <Instructions instructions={this.props.recipe.instructions} title={this.props.recipe.title}/>
            </div>
        )
    }
}

class Image extends Component {
    render() {
        return (<div className={"imgContainer"}>
            <img src={this.props.img} alt={"Tasty Food Goes Here"}/>
        </div>)
    }
}






class Ingredients extends Component {
    constructor(props) {
        super(props);
        this.renderIngredients = this.renderIngredients.bind(this);
        this.state = {
            edit: false,
            ingredients: this.props.ingredients};
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleClick() {
        if(this.state.edit) {
            console.log(this.state.ingredients);
            this.setState({edit: false})
        }
        else {
            this.setState({edit: true})
        }
    }

    handleChange(e) {
        this.setState({ingredients: e.target.value})
    }

    renderIngredients() {
        let output = [];
        let ingredients = this.state.ingredients.split(",");
        for (let i in ingredients) {
            output.push(<h1 key={i}>{ingredients[i]}</h1>);
        }
        return output;
    }

    render() {
        let element;
        if(this.state.edit) {
            element =  <textarea defaultValue={this.props.ingredients} onChange={this.handleChange}></textarea>
        }
        else {
            element = this.renderIngredients()
        }
        return (<div className={"ingredientsContainer"}>
            {element}
            <button onClick={this.handleClick}>Edit</button>
        </div>);
    }
}




class Instructions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            title: this.props.title,
            instructions: this.props.instructions
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        if(e.target.name === "title") {
            this.setState({
                title: e.target.value
            })
        }
        else {
            this.setState({
                instructions: e.target.value
            })
        }
    }

    handleClick() {
        if(this.state.edit) {
            this.setState({edit: false})
        }
        else {
            this.setState({edit: true})
        }
    }

    render() {
        let title;
        let instructions;

        if(this.state.edit) {
            title = <input name={"title"} defaultValue={this.state.title} onChange={this.handleChange}/>;
            instructions = <textarea defaultValue={this.state.instructions} onChange={this.handleChange}></textarea>;
        }
        else {
            title = <h1>{this.state.title}</h1>;
            instructions = <p>{this.state.instructions}</p>;
        }
        return (
            <div className={"instructionsContainer"}>
                {title}
                {instructions}
                <button onClick={this.handleClick}>Edit</button>
            </div>)
    }
}