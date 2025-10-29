import styled, { css } from "styled-components";
import { Resizable } from "re-resizable";


export const handleStyle = {
    right: {
        right: "0px"
    }
};

export const StyledResizableContainerFlexHorizon = styled(Resizable)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border: 2px solid #ff9b42;
  border-radius: 8px
`;