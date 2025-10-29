import React, { useContext, useEffect, useRef, useState } from "react";
import LayoutCtx from "../../pages/IDE/LayoutCtx";
import { ConsoleContainer, Log, StyledConsole } from "./console.styles";
import { CustomTitle } from "../title/title";
import scrollIntoView from 'scroll-into-view-if-needed';
import ProgramStateCTX from "../state-context/StateContext";
import printoutsResolver from "./ConsoleStateResolver";

const initialBpjsText = " /$$$$$$$  /$$$$$$$   /$$$$$  /$$$$$$ \n" +
    "| $$__  $$| $$__  $$ |__  $$ /$$__  $$\n" +
    "| $$  \\ $$| $$  \\ $$    | $$| $$  \\__/\n" +
    "| $$$$$$$ | $$$$$$$/    | $$|  $$$$$$ \n" +
    "| $$__  $$| $$____//$$  | $$ \\____  $$\n" +
    "| $$  \\ $$| $$    | $$  | $$ /$$  \\ $$\n" +
    "| $$$$$$$/| $$    |  $$$$$$/|  $$$$$$/\n" +
    "|_______/ |__/     \\______/  \\______/ \n" +
    "                                      \n" +
    "Happy Debugging";

const initialConsoleState = [{message: initialBpjsText, type: "info"}];

const assembleLog = (consoleOutput) => {
    const isSpecialLog = consoleOutput.type === "warning" || consoleOutput.type === "error";
    return <Log isSpecial={isSpecialLog}
                showIcon={isSpecialLog}
                type={consoleOutput.type}
                banner={true}
                message={<pre>{consoleOutput.message}</pre>}/>;
}

export default function BPConsole() {

    const layoutCtx = useContext(LayoutCtx);
    const {activeBottomPanels} = layoutCtx;
    const {terminalState} = useContext(ProgramStateCTX);
    const [consoleOutput, setConsoleOutput] = useState(initialConsoleState);

    const consoleEndRef = useRef()

    useEffect(() => {
        if (printoutsResolver(terminalState) === null) {
            setConsoleOutput(initialConsoleState);
        } else {
            setConsoleOutput(prevText => [...prevText, printoutsResolver(terminalState)]);
        }
    }, [terminalState]);

    useEffect(() => {
        scrollIntoView(consoleEndRef.current, {
            scrollMode: 'if-needed',
            block: 'nearest',
            skipOverflowHiddenElements: true,
            inline: 'nearest',
            behavior: "smooth"
        });
    }, [consoleOutput]);

    return (
        <ConsoleContainer activeBottomPanels={activeBottomPanels}>
            <CustomTitle level={4} color={"white"}>
                Console
            </CustomTitle>
            <StyledConsole>
                <div>
                    {consoleOutput
                        .filter(log => !!log)
                        .map(consoleOutput => assembleLog(consoleOutput))}
                </div>
                <div ref={consoleEndRef}/>
            </StyledConsole>
        </ConsoleContainer>
    );
}

