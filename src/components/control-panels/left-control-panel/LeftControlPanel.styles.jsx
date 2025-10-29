import styled  from "styled-components";
import { Resizable } from "re-resizable";
import { device } from "../../../pages/IDE/ide.styles";

export const LeftControlPanelContent = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  ${props => `height: calc(100vh - ${props.bottomPanelHeight + 20}px)`};
  width: 90%;
  margin: 20px 20px;
  padding: 20px 20px;
`;

export const StyledLeftControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  height: calc(100vh - 87px);
  background-color: rgb(35, 39, 43);
  overflow-y: auto;
  overflow-x: hidden;

  @media ${device.tablet} {
    overflow-y: scroll;
  }
`;

export const StyledResizableContainer = styled(Resizable)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const handleStyle = {
    right: {
        right: "0px"
    }
};
