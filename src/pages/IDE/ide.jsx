import React, { useState } from "react";
import Editor from "../../components/code-editor/CodeEditor.component";
import LeftControlPanel from "../../components/control-panels/left-control-panel/LeftControlPanel.component";
import BottomControlPanel from "../../components/control-panels/bottom-control-panel/BottomControlPanel.component";
import {
    IdeContainer,
    IdeContentContainer,
    RightContainer,
} from "./ide.styles";
import IdeHeader from "../../components/header/Header.component";
import ControlButtons from "../../components/control-panels/bottom-control-panel/control-buttons/ControlButtons";
import LayoutCtx from "./LayoutCtx";
import IDECTX from "./IDECTX";

export const BOTTOM_PANELS = {
    CONSOLE: "console",
    DEBUG: "debug",
};

function IDE() {
    const [currTheme, setCurrTheme] = useState("idle_fingers");
    const [activeBottomPanels, setActiveBottomPanels] = useState([BOTTOM_PANELS.CONSOLE, BOTTOM_PANELS.DEBUG]);
    const [prog, setProg] = useState("");
    const [bps, setBps] = useState([]);
    const [bpMuted, setBpMuted] = useState(false);
    const [syncStateMuted, setSyncStateMuted] = useState(false);
    const [skipExternals, setSkipExternals] = useState(false);

    const layoutProperties = {
        activeBottomPanels,
        setActiveBottomPanels,
        currTheme,
        setCurrTheme
    };

    const ideProperties = {
        prog,
        setProg,
        bps,
        setBps,
        bpMuted,
        setBpMuted,
        syncStateMuted,
        setSyncStateMuted,
        skipExternals,
        setSkipExternals
    };

    return (
        <LayoutCtx.Provider value={layoutProperties}>
            <IDECTX.Provider value={ideProperties}>
                <IdeContainer>
                    <IdeHeader/>
                    <IdeContentContainer>
                        <LeftControlPanel/>
                        <RightContainer>
                            <Editor/>
                            <BottomControlPanel/>
                        </RightContainer>
                    </IdeContentContainer>
                    <ControlButtons/>
                </IdeContainer>
            </IDECTX.Provider>
        </LayoutCtx.Provider>
    );
}

export default IDE;
