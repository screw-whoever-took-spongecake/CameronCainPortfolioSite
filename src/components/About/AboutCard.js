import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Howdy, my name is
            <span className="purple"> Cameron Steinburg, </span>{" "}
            but you may also know me as <span className="purple">Cameron Cain</span>{" "}
            from <span className="purple">Calgary, Alberta, Canada</span>
            <br />
            <br />
            I’m currently working as a{" "}
            <span className="purple">Quality Assurance Engineer</span>{" "}
            here in Cowtown and I have a certifiacte in Software Development from{" "}
            <span className="purple">SAIT.</span> I am also a certified SCRUM Master and an avid <span className="purple">Musician</span>
            <br />
            <br />
            I do QA shenanigans from 9-5, my 5-9 includes:
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> Gaming 🎮
            </li>
            <li className="about-activity">
              <ImPointRight /> Alternative Music 🎸
            </li>
            <li className="about-activity">
              <ImPointRight /> Running 🏃‍♂️
            </li>
          </ul>

          <div>
            <p style={{ color: "rgb(155 126 172)" }}>
              "If you ain't first, you're last"{" "}
            </p>
          </div>

          <footer className="blockquote-footer"> Ricky Bobby </footer>
        </blockquote >
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
