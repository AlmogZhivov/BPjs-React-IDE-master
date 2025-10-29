import React, { useContext, useState } from "react";
import LayoutCtx from "../../../../../pages/IDE/LayoutCtx";
import _ from "lodash"
import { ControlButtonContainer, imageStyle } from "./ControlButton.styles";



const ControlButton = ({Image, title: panel}) => {

    const [isClicked, setIsClicked] = useState(true);
    const layoutCtx = useContext(LayoutCtx);
    const {activeBottomPanels, setActiveBottomPanels} = layoutCtx;

    const handleClick = () => {
        setIsClicked(!isClicked);
        if (_.includes(activeBottomPanels, panel)) { //already active
            const withOutCurrentPanel = activeBottomPanels.filter(p => p !== panel);
            setActiveBottomPanels(withOutCurrentPanel);
        } else {
            setActiveBottomPanels([...activeBottomPanels, panel]);
        }
    };

    return (
        <ControlButtonContainer onClick={handleClick} isClicked={isClicked}>
            <Image style={imageStyle}/>
            {_.capitalize(panel)}
        </ControlButtonContainer>
    );
};

export default ControlButton;