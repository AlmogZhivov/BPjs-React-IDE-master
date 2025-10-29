// import React, { useEffect, useState, useContext } from "react";
// import printoutsResolver from "./ConsoleStateResolver";
// import ProgramStateCTX from "../state-context/StateContext";
//
// export const initialBpjsText = " /$$$$$$$  /$$$$$$$   /$$$$$  /$$$$$$ \n" +
//     "| $$__  $$| $$__  $$ |__  $$ /$$__  $$\n" +
//     "| $$  \\ $$| $$  \\ $$    | $$| $$  \\__/\n" +
//     "| $$$$$$$ | $$$$$$$/    | $$|  $$$$$$ \n" +
//     "| $$__  $$| $$____//$$  | $$ \\____  $$\n" +
//     "| $$  \\ $$| $$    | $$  | $$ /$$  \\ $$\n" +
//     "| $$$$$$$/| $$    |  $$$$$$/|  $$$$$$/\n" +
//     "|_______/ |__/     \\______/  \\______/ \n" +
//     "                                      \n" +
//     "Happy Debugging";
//
// const initialConsoleState = [{message: initialBpjsText, type: "info"}];
//
// export const useConsoleText = () => {
//     const [text, setText] = useState(initialConsoleState);
//     const {terminalState} = useContext(ProgramStateCTX);
//
//     useEffect(() => {
//         setText(prevText => [...prevText, printoutsResolver(terminalState)]);
//     }, [terminalState]);
//
//     const resetConsole = () => {
//         console.log("got here")
//         setText(initialConsoleState);
//     }
//
//     return {consoleText: text, resetConsole};
// };
//
