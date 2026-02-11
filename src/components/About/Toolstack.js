import React from "react";
import { Col, Row } from "react-bootstrap";
import MacOs from "../../Assets/TechIcons/Apple MacOSX.svg";
import Chrome from "../../Assets/TechIcons/Google Chrome.svg";
import Vscode from "../../Assets/TechIcons/vscode.svg";
import Cursor from "../../Assets/TechIcons/cursor.svg";
import Windows from "../../Assets/TechIcons/Windows11.svg";
import Ubuntu from "../../Assets/TechIcons/Ubuntu.svg";
import Jira from "../../Assets/TechIcons/Jira.svg";
import DevOps from "../../Assets/TechIcons/AzureDevops.svg";
import Slack from "../../Assets/TechIcons/Slack.svg";
import Postman from "../../Assets/TechIcons/Postman.svg";
import SQLDev from "../../Assets/TechIcons/SQLDev.svg";
import VisualStudio from "../../Assets/TechIcons/VisualStudio.svg";
import Homebrew from "../../Assets/TechIcons/Homebrew.svg";
import Figma from "../../Assets/TechIcons/Figma.svg";
import DBeaver from "../../Assets/TechIcons/DBeaver.svg";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons ">
        <img src={DevOps} alt="DevOps" className="tech-icon-images" />
        <div className="tech-icons-text">DevOps</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons ">
        <img src={Cursor} alt="Cursor" className="tech-icon-images" />
        <div className="tech-icons-text">Cursor</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons ">
        <img src={DBeaver} alt="DBeaver" className="tech-icon-images" />
        <div className="tech-icons-text">DBeaver</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons ">
        <img src={Figma} alt="Figma" className="tech-icon-images" />
        <div className="tech-icons-text">Figma</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons ">
        <img src={Chrome} alt="Chrome" className="tech-icon-images" />
        <div className="tech-icons-text">Google Chrome</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons ">
        <img src={Homebrew} alt="Homebrew" className="tech-icon-images" />
        <div className="tech-icons-text">Homebrew</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons ">
        <img src={Jira} alt="Jira" className="tech-icon-images" />
        <div className="tech-icons-text">Jira</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <img src={MacOs} alt="macOs" className="tech-icon-images" />
        <div className="tech-icons-text">Mac OS</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons ">
        <img src={Slack} alt="Slack" className="tech-icon-images" />
        <div className="tech-icons-text">Slack</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons ">
        <img src={Postman} alt="Postman" className="tech-icon-images" />
        <div className="tech-icons-text">Postman</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons ">
        <img src={SQLDev} alt="SQL Developer" className="tech-icon-images" />
        <div className="tech-icons-text">SQL Developer</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons ">
        <img src={Ubuntu} alt="Ubuntu" className="tech-icon-images" />
        <div className="tech-icons-text">Ubuntu</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons ">
        <img src={Vscode} alt="Vscode" className="tech-icon-images" />
        <div className="tech-icons-text">VS Code</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons ">
        <img
          src={VisualStudio}
          alt="VisualStudio"
          className="tech-icon-images"
        />
        <div className="tech-icons-text">Visual Studio</div>
      </Col>

      <Col xs={4} md={2} className="tech-icons ">
        <img src={Windows} alt="Windows" className="tech-icon-images" />
        <div className="tech-icons-text">Windows</div>
      </Col>
    </Row>
  );
}

export default Toolstack;
