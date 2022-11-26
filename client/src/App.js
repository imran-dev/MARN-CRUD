import React, {Component, Fragment} from 'react';
import {BrowserRouter, Routes} from "react-router-dom";
import {Route} from "react-router";
import HomePage from "./Pages/HomePage";

class App extends Component {
    render() {
        return (
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route exact path='/' component={HomePage}/>
                    </Routes>
                </BrowserRouter>
            </Fragment>
        );
    }
}

export default App;