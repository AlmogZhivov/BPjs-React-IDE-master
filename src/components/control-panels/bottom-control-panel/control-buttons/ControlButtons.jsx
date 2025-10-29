import React, { useContext } from "react";
import { ControlButtonsContainer } from "./ControlButtons.styles";
import { ReactComponent as TerminalImg } from '../../../../assets/terminal.svg';
import { ReactComponent as DebugImg } from '../../../../assets/debug.svg';
import ControlButton from "./control-button/ControlButton";
import { BOTTOM_PANELS } from "../../../../pages/IDE/ide";

const ControlButtons = () => {

    return (
        <ControlButtonsContainer>
            <ControlButton Image={DebugImg} title={BOTTOM_PANELS.DEBUG}/>
            <ControlButton Image={TerminalImg} title={BOTTOM_PANELS.CONSOLE}/>
        </ControlButtonsContainer>
    );
};

export default ControlButtons;