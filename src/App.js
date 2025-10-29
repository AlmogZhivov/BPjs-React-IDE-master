import React, { useState } from "react";
import './App.css';
import AceEditor from "react-ace"; // do not remove this import.
import IDE from "./pages/IDE/ide";
import StateManager from "./components/state-context/StateContextWrapper";

function App() {
    return (
        <StateManager>
            <IDE/>
        </StateManager>
    );
}

export default App;
