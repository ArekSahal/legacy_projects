import React from 'react';
import ReactDOM from 'react-dom';
import {RecipeContainer} from './RecipeBox/Recipe';
import {HeaderBox} from "./HeaderBox/Header";
import "./WrapperStyle.css"
import registerServiceWorker from './registerServiceWorker';

class Wrapper extends React.Component {
    render() {
        return(
            <div className={"wrapper"}>
                <HeaderBox/>
                <RecipeContainer/>
            </div>
        )
    }
}

ReactDOM.render(<Wrapper/>, document.getElementById('root'));
registerServiceWorker();
