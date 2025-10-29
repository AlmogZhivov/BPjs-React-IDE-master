import styled from "styled-components";
import { Typography } from "antd";

const {Title} = Typography;

export const CustomTitle = styled(Title)`
  color: ${props => props.color} !important;
`