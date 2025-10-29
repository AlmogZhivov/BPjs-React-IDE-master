import styled, { css } from "styled-components";

const basicCSS = css`
  display: flex;
  align-items: center;
  margin-right: 10px;
  transition: 0.3s;
  padding: 3px;
  width: 90px;
  cursor: pointer;

`;

const getCssPerButtonState = (isClicked) => {
    return isClicked
        ? css`
              font-weight: bold;
              color: #ff9b42;
              padding-bottom: 12px;

              &:hover {
                color: white;
              }
        `
        : css`
              color: white;
              
              &:hover {
                font-weight: bold;
                color: #ff9b42;
                padding-bottom: 12px;
              }`
}

export const ControlButtonContainer = styled.div`
  ${basicCSS}
  ${props => getCssPerButtonState(props.isClicked)}
`;

export const imageStyle = {
    height: "18px",
    width: "18px",
    backgroundColor: "orange",
    borderRadius: "2px",
    padding: "2px",
    marginRight: "5px"
}
