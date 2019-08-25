import React, { Component } from 'react';
import {DetailsPage} from "./DetailsPage/DetailsPage";
import placeholder from "../photos/placeholder.jpg"

const ipsumText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur, beatae deleniti\n" +
    "    ducimus est id in iste itaque natus necessitatibus nesciunt numquam provident quasi recusandae repellat sed\n" +
    "    temporibus vitae voluptatem." +
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur, beatae deleniti\n" +
    "    ducimus est id in iste itaque natus necessitatibus nesciunt numquam provident quasi recusandae repellat sed\n" +
    "    temporibus vitae voluptatem." +
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur, beatae deleniti\n" +
    "    ducimus est id in iste itaque natus necessitatibus nesciunt numquam provident quasi recusandae repellat sed\n" +
    "    temporibus vitae voluptatem."

const state = {"id1": {title: "Pizza", ingredients: "sauce, dough", img: placeholder, instructions: "just call 118800"},
    "id4": {title: "Soup", ingredients: "bowl, Soup", img: placeholder, instructions: "just call 118800"},
    "id3": {title: "Pizza and crackers", ingredients: "1 sauce, 2 cups dough, a handful ofcrackers", img: placeholder, instructions: ipsumText},
    "id2": {title: "Pizza", ingredients: "sauce, dough", img: placeholder, instructions: ipsumText},
    "id5": {title: "Pizza", ingredients: "sauce, dough", img: placeholder, instructions: "just call 118800"},
    "id6": {title: "Pizza", ingredients: "sauce, dough", img: placeholder, instructions: "just call 118800"},
    "id7": {title: "Pizza", ingredients: "sauce, dough", img: placeholder, instructions: "just call 118800"},
    "id8": {title: "Pizza", ingredients: "sauce, dough", img: placeholder, instructions: "just call 118800"},
    "id9": {title: "Pizza", ingredients: "sauce, dough", img: placeholder, instructions: "just call 118800"},
    "id10": {title: "Pizza", ingredients: "sauce, dough", img: placeholder, instructions: "just call 118800"},
    "id11": {title: "Pizza", ingredients: "sauce, dough", img: placeholder, instructions: "just call 118800"},
    "id12": {title: "Pizza", ingredients: "sauce, dough", img: placeholder, instructions: "just call 118800"},
    "id13": {title: "Pizza", ingredients: "sauce, dough", img: placeholder, instructions: "just call 118800"}
};


export class RecipeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {recipes: state, detailView: ""};
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(id) {
        if(id === "") {
            this.setState({detailView: ""})
        }
        else {
            this.setState({
                detailView: <DetailsPage id={id} recipe={this.state.recipes[id]} onClick={this.handleClick} />,
            });
        }
    }

  render() {
        let output;

        if(this.state.detailView === "") {
            output =  <RecipeGrid state={this.state.recipes} handleClick={this.handleClick}/>;
        }
        else {
            output = this.state.detailView
        }
         return <div className={"recipeContainer"}>{output}</div>;
    }
}

class RecipeThumbnail extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.handleClick(this.props.id);
    }

    render() {
       return (
         <a className="thumbnailContainer" value={this.props.id} onClick={this.handleClick} key={this.props.id}>
            <img src={this.props.img} alt="placeholder" />
             <p>
                 {this.props.title}
             </p>
         </a>
       );
    }
}

class RecipeGrid extends Component {

    constructor(props) {
        super(props);
        this.createDivs = this.createDivs.bind(this);
    }

    createDivs() {
        let output = [];
        let state = this.props.state;
        for (let i in state) {
            output.push(<RecipeThumbnail title={state[i].title} img={state[i].img} id={i} key={i} handleClick={this.props.handleClick}/>)
        }
        return output;
    }

    render(){
        return (
            <div className={"recipeGrid"} key={"recipieGrid"}>
                {this.createDivs()}
            </div>
        )
    }
}

