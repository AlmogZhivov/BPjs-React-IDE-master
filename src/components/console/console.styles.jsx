import _ from "lodash";
import { BOTTOM_PANELS } from "../../pages/IDE/ide";
import styled, { css } from "styled-components";
import { Alert } from "antd";

const getWidth = (activeBottomPanels) => {
    const terminalIsActive = _.includes(activeBottomPanels, BOTTOM_PANELS.CONSOLE);
    const debugIsActive = _.includes(activeBottomPanels, BOTTOM_PANELS.DEBUG);
    if (terminalIsActive && debugIsActive) {
        return css` width: 48% `;
    } else if (!debugIsActive && terminalIsActive) {
        return css` width: 100% `;
    } else if (debugIsActive && !terminalIsActive) {
        return css`width: 0; opacity: 0;`;
    }
};

export const StyledConsole = styled.div`
  font-weight: bold;
  font-size: 16px;
  overflow-y: scroll;
  background-color: rgb(49, 49, 49);
  width: 100%;
  height: 100%;
  border-radius: 1px;
`;

export const ConsoleContainer = styled.div`
  height: 293px;
  transition: width 0.2s ease-out, opacity 0.2s ease;
  ${props => getWidth(props.activeBottomPanels)};
`;

export const Log = styled(Alert)`
  border-bottom: 1px solid orange;
  background: ${props => !props.isSpecial && "none"};

  pre {
    color: ${props => props.isSpecial ? "rgb(49, 49, 49)" : "white"};
  }
`;
