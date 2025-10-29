import React, { useState } from "react";
import { PanelDivider } from "../panel-divider/PanelDivider";
import { handleStyle, StyledLeftControlPanel, StyledResizableContainer } from "./LeftControlPanel.styles";
import EventsHistory from "../../event-history/EventsHistory.component";
import RequestedOrBlocked from "../../requested-or-blocked/RequestedOrBlocked";
import Trace from "../../trace/trace";
import ThreadsToLinesMap from "../../threads-to-line-map/ThreadToLineMap";

const LeftControlPanel = () => {

    const [shouldFadePanel, setShouldFadePanel] = useState(false);

    const handleResize = (resizeEvent) => {
        if (resizeEvent.clientX <= 100) {
            setShouldFadePanel(true)
        } else {
            setShouldFadePanel(false)
        }
    }

    return (
        <StyledResizableContainer
            enable={{right: true}}
            handleStyles={handleStyle}
            defaultSize={{width: 450}}
            maxWidth={500}
            onResize={handleResize}>
            <PanelDivider direction={"vertical"}/>
            <StyledLeftControlPanel>
                <EventsHistory shouldFadePanel={shouldFadePanel}/>
                <ThreadsToLinesMap shouldFadePanel={shouldFadePanel}/>
                <RequestedOrBlocked shouldFadePanel={shouldFadePanel}/>
                <Trace shouldFadePanel={shouldFadePanel}/>
            </StyledLeftControlPanel>
        </StyledResizableContainer>
    );
};

export default LeftControlPanel;