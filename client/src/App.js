import React from 'react';
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import ReadPage from "./Pages/ReadPage";
import CreatePage from "./Pages/CreatePage";
import UpdatePage from "./Pages/UpdatePage";
import ErrorPage from "./Pages/ErrorPage";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<ReadPage/>} />
                    <Route path="/Create" element={<CreatePage/>} />
                    <Route path="/Update/:id" element={<UpdatePage/>} />
                    <Route path="*" element={<ErrorPage/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;