import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";

// import {BrowserRouter, Routes} from "react-router-dom";
// import {Route} from "react-router";
import HomePage from "./Pages/HomePage";

class App extends Component {
    render() {
        return (
            <Fragment>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<HomePage/>} />
                    </Routes>
                </Router>
            </Fragment>
        );
    }
}

export default App;