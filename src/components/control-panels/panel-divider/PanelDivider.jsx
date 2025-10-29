import styled, { css } from "styled-components";
import { device } from "../../../pages/IDE/ide.styles";

const getCssPerDirection = (direction) => {
    const verticalCss = css`
      right: 0;
      height: 70%;
    `;
    const horizontalCss = css`
      top: 0;
      width: 50%;
    `;
    return direction === "horizontal" ? horizontalCss : verticalCss;
};

export const PanelDivider = styled.div`
  position: absolute;
  border: 3px solid #ff9b43;
  border-radius: 30px;
  ${props => getCssPerDirection(props.direction)}
  transition: 0.4s;
  opacity: 1;

  @media ${device.tablet} {
    opacity: 0;
  }
`;