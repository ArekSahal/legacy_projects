import React from 'react';
import './App.css';

let lorem = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet feugiat ante, in consequat urna. Maecenas eget mauris non odio posuere tincidunt. Ut a velit nec elit varius felis rutrum. Integtis pretium. Vestibulum laoreet aesent auctoruat jus.",
                "Aliquam aliquam faucibus risus, id scelerisque ipsum tempor a. Pellentesque habitant morbi tristiqsagittis non, rhoncus vitae nisi. In quis massa vitae sapien commodo dignissima sed libero pharetra, non rutrum mauris mattis.",
                "Mauris odio eros, hendrerit non eros id, sodales malesuada urna. Fusce nec enim luctus erat vulputate blandit. Sed varius velit sed urna pulvinar finibus. Integer "]

let randomRecipies = [
                        {title: "Pie", text: "Throw som apple in them",color: "blue",image: "https://assets.epicurious.com/photos/59bc150e74febd49ca741558/6:4/w_620%2Ch_413/CINNAMON-CRUMBLE-APPLE-PIE-RECIPE-07092017.jpg", ingredients: [["Flower", "1dl"], ["Water", "5l"], ["Salt", "5g"]],},
                        {title: "Soup", text: "Put it in a mixer",color: "yellow",image: "https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto:eco,c_fill,g_auto,w_1460/https://storage.googleapis.com/gen-atmedia/3/2018/01/7ad08b34d013c250d1ec5a8293adf91c3a0d16c6.jpeg", ingredients: [["Flower", "1dl"], ["Water", "5l"], ["Salt", "5g"]], },
                        {title: "Cake", text: "Just cake", color: "blue", image: "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/salted_dark_chocolate_16338_16x9.jpg", ingredients: [["Flower", "1dl"], ["Water", "5l"], ["Salt", "5g"]],},
                        {title: "Bread", text: "Not dry at all", color: "brown", image: "https://d2gk7xgygi98cy.cloudfront.net/6667-3-large.jpg", ingredients: [["Flower", "1dl"], ["Water", "5l"], ["Salt", "5g"]],},
                        {title: "Pie", text: "Throw som apple in them",color: "blue",image: "https://assets.epicurious.com/photos/59bc150e74febd49ca741558/6:4/w_620%2Ch_413/CINNAMON-CRUMBLE-APPLE-PIE-RECIPE-07092017.jpg", ingredients: [["Flower", "1dl"], ["Water", "5l"], ["Salt", "5g"]],},
                        {title: "Soup", text: "Put it in a mixer",color: "yellow",image: "https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto:eco,c_fill,g_auto,w_1460/https://storage.googleapis.com/gen-atmedia/3/2018/01/7ad08b34d013c250d1ec5a8293adf91c3a0d16c6.jpeg",ingredients: [["Flower", "1dl"], ["Water", "5l"], ["Salt", "5g"]], },
                        {title: "Cake", text: "Just cake", color: "blue", image: "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/salted_dark_chocolate_16338_16x9.jpg", ingredients: [["Flower", "1dl"], ["Water", "5l"], ["Salt", "5g"]],},
                        {title: "Bread", text: "Not dry at all", color: "brown", image: "https://d2gk7xgygi98cy.cloudfront.net/6667-3-large.jpg", ingredients: [["Flower", "1dl"], ["Water", "5l"], ["Salt", "5g"]],},
                        {title: "Pie", text: "Throw som apple in them",color: "blue",image: "https://assets.epicurious.com/photos/59bc150e74febd49ca741558/6:4/w_620%2Ch_413/CINNAMON-CRUMBLE-APPLE-PIE-RECIPE-07092017.jpg", ingredients: [["Flower", "1dl"], ["Water", "5l"], ["Salt", "5g"]],},
                        {title: "Soup", text: "Put it in a mixer",color: "yellow",image: "https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto:eco,c_fill,g_auto,w_1460/https://storage.googleapis.com/gen-atmedia/3/2018/01/7ad08b34d013c250d1ec5a8293adf91c3a0d16c6.jpeg", ingredients: [["Flower", "1dl"], ["Water", "5l"], ["Salt", "5g"]], },
                        {title: "Cake", text: "Just cake", color: "blue", image: "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/salted_dark_chocolate_16338_16x9.jpg", ingredients: [["Flower", "1dl"], ["Water", "5l"], ["Salt", "5g"]],},
                        {title: "Bread", text: "Not dry at all", color: "brown", image: "https://d2gk7xgygi98cy.cloudfront.net/6667-3-large.jpg", ingredients: [["Flower", "1dl"], ["Water", "5l"], ["Salt", "5g"]],},
                        {title: "Pie", text: "Throw som apple in them",color: "blue",image: "https://assets.epicurious.com/photos/59bc150e74febd49ca741558/6:4/w_620%2Ch_413/CINNAMON-CRUMBLE-APPLE-PIE-RECIPE-07092017.jpg", ingredients: [["Flower", "1dl"], ["Water", "5l"], ["Salt", "5g"]],},
                        {title: "Soup", text: "Put it in a mixer",color: "yellow",image: "https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto:eco,c_fill,g_auto,w_1460/https://storage.googleapis.com/gen-atmedia/3/2018/01/7ad08b34d013c250d1ec5a8293adf91c3a0d16c6.jpeg", ingredients: [["Flower", "1dl"], ["Water", "5l"], ["Salt", "5g"]], },
                        {title: "Cake", text: "Just cake", color: "blue", image: "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/salted_dark_chocolate_16338_16x9.jpg", ingredients: [["Flower", "1dl"], ["Water", "5l"], ["Salt", "5g"]],},
                        {title: "Bread", text: "Not dry at all", color: "brown", image: "https://d2gk7xgygi98cy.cloudfront.net/6667-3-large.jpg", ingredients: [["Flower", "1dl"], ["Water", "5l"], ["Salt", "5g"]],}]

function shuffle(li) {
    let newList = []
    for (let i=0;i<li.length;i++ ) {
    let prob =  0.5 - Math.random();
    if (prob <= 0) {
        newList.push(li[i])
    }
    else {
        newList.unshift(li[i])
    }
    }
    return newList
}

randomRecipies = shuffle(randomRecipies)



function App() {
  // This is what goes out so pls don't touch too much
  return (
    <div className="App">
      <header className="App-header">
        <FoodBox />
      </header>
    </div>
  );
}

class FoodCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let background = this.props.recipie.image;
    return (
        <div className={"FoodCard"} style={{backgroundImage: 'url(' + background + ')', backgroundSize: "contain"}} onClick={() => this.props.handleClick(this.props.recipie)}> {/* The onlcick event must be a anonomys function because ti will call the function otherwise */}
          <h1 className={"FoodCardTitle"}>
            {this.props.recipie.title}
          </h1>
        </div>
    )
  }
}

class FoodBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipies: randomRecipies,
      highlight: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(rec) {
    if (this.state.highlight) {
      this.setState({highlight: false})
    }
    else {
      this.setState({highlight: rec})
    }
  }

  render() {
    FoodCard.defaultProps = {handleClick: this.handleClick};
    let lists = this.state.recipies.map(function(rec) {
       return <FoodCard recipie={rec} key={rec.title} />
    });

    return (
        <div>
            {lists}
          {((this.state.highlight) && <FoodWindow recipie={this.state.highlight} handleClick={this.handleClick}/>)}
        </div>
    )
  }
}

class FoodWindow extends React.Component {
  constructor(props) {
    super(props)

  }
  render() {
      let units = [];
      let ingredients = [];
      for (let i=0;i<this.props.recipie.ingredients.length; i++) {
            units.push(this.props.recipie.ingredients[i][1]);
            ingredients.push(this.props.recipie.ingredients[i][0]);
      }

      units = units.map(function(x) {
          return <li>{x}</li>
      });
      ingredients = ingredients.map(function(x) {
          return <li>{x}</li>
      });

      let instructions = lorem.map(function(x) {
          return <li>{x}</li>
      })
    return (
        <div className={"FoodWindow"} onClick={() => this.props.handleClick(this.props.recipie)}>
            <div className={"FoodWindowHeader"} style={{backgroundImage: "url('" + this.props.recipie.image + "')"}}>
                <h1>
                    {this.props.recipie.title}
                </h1>
            </div>
            <div className={"FoodWindowDesc"}>
                <div className={"ingredients"}>
                    <ul className={"desc"}>
                        {ingredients}
                    </ul>
                    <ul className={"unit"}>
                        {units}
                    </ul>
                </div>
                <p>
                    {this.props.recipie.text}
                </p>
                <ol>
                    {instructions}
                </ol>
            </div>
        </div>
    )
  }
}


export default App;
