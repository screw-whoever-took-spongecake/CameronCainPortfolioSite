import React from "react";
import { Container, Carousel } from "react-bootstrap";
import Particle from "../Particle";
import PracticeSpaceBookingForm from "./PracticeSpaceBookingForm";
import Card from "react-bootstrap/Card";
import { ImMusic } from "react-icons/im";
import ps1 from "../../Assets/PracticeSpace/PS01.jpg";
import ps2 from "../../Assets/PracticeSpace/PS02.jpg";
import ps3 from "../../Assets/PracticeSpace/PS03.jpg";
import ps4 from "../../Assets/PracticeSpace/PS04.jpg";
import ps5 from "../../Assets/PracticeSpace/PS05.jpg";
import ps7 from "../../Assets/PracticeSpace/PS07.jpg";
import ps8 from "../../Assets/PracticeSpace/PS08.jpg";
import ps9 from "../../Assets/PracticeSpace/PS09.jpg";
import ps10 from "../../Assets/PracticeSpace/PS10.jpg";
import ps11 from "../../Assets/PracticeSpace/PS11.jpg";
import ps12 from "../../Assets/PracticeSpace/PS12.jpg";
import ps13 from "../../Assets/PracticeSpace/PS13.jpg";

const CAROUSEL_IMAGES = [
  ps10,
  ps1,
  ps11,
  ps12,
  ps13,
  ps2,
  ps3,
  ps4,
  ps5,
  ps7,
  ps8,
  ps9,
];

function Projects() {
  return (
    <Container>
      <Container>
        <h1 className="project-heading">
          {" "}
          <br />
          My <strong className="purple">Practice Space </strong>{" "}
        </h1>
        <p>
          Here are some images of the space and the available equipment.
          <br />
          Want to book a practice session with your band? Fill out request form
          below
          <br />
        </p>
      </Container>
      <Particle />
      <Carousel fade>
        {CAROUSEL_IMAGES.map((src, index) => (
          <Carousel.Item key={index}>
            <img src={src} alt={`Slide ${index + 1}`} />
            <Carousel.Caption />
          </Carousel.Item>
        ))}
      </Carousel>
      <Card className="quote-card-view">
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <br />
            <h2 className="purple"> Available Equipment and Features</h2>
            <br />
            <div className="practice-space-features-wrapper">
              <ul className="list-unstyled mb-0 practice-space-features">
                <li className="about-activity">
                  <ImMusic /> Mics + Stands w/ Complete PA System + Mixer 🎤
                </li>
                <li className="about-activity">
                  <ImMusic /> 4 piece kit + hardware and stool 🥁
                </li>
                <li className="about-activity">
                  <ImMusic /> Extra XLR and 1/4 guitar cables 🔌
                </li>
                <li className="about-activity">
                  <ImMusic /> LOTS of storage for your bands gear 📦
                </li>
              </ul>
            </div>
          </blockquote>
        </Card.Body>
      </Card>
      <p style={{ textAlign: "center" }}>
        <br />
        This is a{" "}
        <span className="purple">shared practice space in my own home</span> and
        requests are not guaranteed. Weekly/Monthly bookings are available as
        well. DM on Instagram for availability
      </p>
      Currently offering only $40 for per session with a 3 hour slot <br />
      <br />
      <PracticeSpaceBookingForm />
    </Container>
  );
}

export default Projects;
