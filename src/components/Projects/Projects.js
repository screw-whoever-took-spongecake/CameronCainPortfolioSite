import React from "react";
import { Container, Carousel } from "react-bootstrap";
import Particle from "../Particle";
import PracticeSpaceBookingForm from "./PracticeSpaceBookingForm";
import band1 from "../../Assets/GC1.png";
import band2 from "../../Assets/GC2.jpg";
import band3 from "../../Assets/GC3.jpg";
import band4 from "../../Assets/GC4.jpg";
import band5 from "../../Assets/GC5.jpg";
import band6 from "../../Assets/GC6.png";

const TITLE = "Available Equipment:";
const DESCRIPTION = "Drum shells and hardware, stool. XLR and 1/4 inch cables. PA and mics w/ stands. Guitar racks and wall hangers. Equipment storage and access to treated bonus room";
const CAROUSEL_IMAGES = [band1, band2, band3, band4, band5, band6];

function Projects() {
  return (
    <Container>
      <Container>
        <h1 className="project-heading"> My <strong className="purple">Practice Space </strong> </h1>
        <p style={{ color: "white" }}>
          Here are some images of the space and the available equipment.
          <br />
          Want to book a session with your band?
          <br />
        </p>
      </Container>
      <Particle />

      <Carousel fade>
        {CAROUSEL_IMAGES.map((src, index) => (
          <Carousel.Item key={index}>
            <img src={src} alt={`Slide ${index + 1}`} />
            <Carousel.Caption>
              <h3>{TITLE}</h3>
              <p>{DESCRIPTION}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <PracticeSpaceBookingForm />
    </Container>
  );
}

export default Projects;
