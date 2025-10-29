import React from "react";
import logo from "../../assets/logo.png";
import { StyledHeader, StyledLogo } from "./Header.styles";
import ThemePicker from "../theme-picker/ThemePicker.component";
import FileUploader from "../file-uploader/FileUploader";
import { Space } from "antd";
import ProgramSaver from "../program-saver/ProgramSaver";

const IdeHeader = () => {
    return (
        <StyledHeader>
            <StyledLogo src={logo}/>
            <Space>
                <ProgramSaver/>
                <FileUploader/>
                <ThemePicker/>
            </Space>
        </StyledHeader>
    );
};

export default IdeHeader;