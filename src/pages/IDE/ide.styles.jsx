import styled from "styled-components";

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '800px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

export const device = {
    mobileS: `(max-height: ${size.mobileS})`,
    mobileM: `(max-height: ${size.mobileM})`,
    mobileL: `(max-height: ${size.mobileL})`,
    tablet: `(max-height: ${size.tablet})`,
    laptop: `(max-height: ${size.laptop})`,
    laptopL: `(max-height: ${size.laptopL})`,
    desktop: `(max-height: ${size.desktop})`,
    desktopL: `(max-height: ${size.desktop})`
};

export const IdeContentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  overflow: hidden !important;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: calc(100vh - 50px);
`;

export const IdeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden !important;
  height: 100vh;
`;
