import React, { useState, useEffect } from "react";
import { Container, Carousel, Col, Row } from "react-bootstrap";
import Particle from "../Particle";
import Button from "react-bootstrap/Button";
import band1 from "../../Assets/GC1.jpg";
import band2 from "../../Assets/GC2.jpg";
import band3 from "../../Assets/GC3.jpg";
import band4 from "../../Assets/GC4.jpg";
import band5 from "../../Assets/GC5.jpg";
import band6 from "../../Assets/GC6.jpg";
import { FaSpotify } from "react-icons/fa";
import cc1 from "../../Assets/CC1_Square.jpg";
import cc3 from "../../Assets/CC3.jpg";
import cc4 from "../../Assets/CC4.png";
import Tilt from "react-parallax-tilt";

const TITLE = "GLASSCULT";
const DESCRIPTION =
  "Jesse Kopala, Cameron Cain, Hazel Cochrane, Kade Wolfe, Liam Dali";

const CAROUSEL_IMAGES = [band6, band5, band4, band2, band1, band3];
const CYCLE_IMAGES = [cc1, cc3, cc4];
const FLIP_INTERVAL_MS = 5000;
const FLIP_DURATION_MS = 1000;

function Music() {
  const [imageIndex, setImageIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipping(true);
      setTimeout(
        () => setImageIndex((i) => (i + 1) % CYCLE_IMAGES.length),
        FLIP_DURATION_MS / 2,
      );
      setTimeout(() => setFlipping(false), FLIP_DURATION_MS);
    }, FLIP_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col xs="auto">
            <br />
            <br />
            <Button
              href="https://open.spotify.com/artist/5ECYNFQwqO6rG7sBwTX5sK?si=ALtr0D8kSKqfsNl95FTXbA"
              target="_blank"
              className="fork-btn-inner music-button"
            >
              <FaSpotify style={{ fontSize: "1.1em" }} />
              &nbsp; Listen to my Music Here &nbsp;
            </Button>
            <br />
            <br />
            <br />
          </Col>
        </Row>
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
      </Container>

      <Container fluid className="home-about-section" id="about">
        <Container>
          <Row>
            <Col md={8} className="home-about-description">
              <h1 style={{ fontSize: "2.6em" }}>
                The Life and Times of{" "}
                <span className="purple"> CAMERON CAIN </span>
              </h1>
              <p className="home-about-body">
                I have been performing in bands around Calgary for the past 10
                years. Previously of{" "}
                <span className="purple">Diamonds on Neptune</span>, I am
                primarily a vocalist, utilizing clean and harsh vocals in my
                projects, but I also am an avid drummer, bass player, and guitar
                player. I have professional training as a singer, whereas my
                screaming and instrumental abilities are entirely self-taught
                <br />
                <br />I draw inspiration from legendary vocalists such as
                <b className="purple">
                  {" "}
                  <i>
                    {" "}
                    Greg Puciato, Chester Bennington, Gerard Way, and Jason
                    Butler{" "}
                  </i>
                </b>
                <br />
                <br />I currently front a metalcore band called
                <span className="purple"> GLASSCULT</span>
                <br />
                We strive to build a strong community and to bring awareness on
                destructive religious hierarchies. Our music is fast and our
                performances are frenetic and unpredictable
              </p>
            </Col>
            <Col md={4} className="myAvtar">
              <Tilt>
                <div className="music-coin" style={{ perspective: "1000px" }}>
                  <div
                    className={`music-coin-inner ${flipping ? "music-coin-flip" : ""}`}
                  >
                    <img
                      src={CYCLE_IMAGES[imageIndex]}
                      alt="about"
                      className="avatar-cycle-img"
                      style={{
                        borderRadius: "50%",
                        width: 300,
                        height: 300,
                        background: "red",
                        display: "block",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              </Tilt>
            </Col>
          </Row>
          <br />
          <br />
          <Button
            href="https://open.spotify.com/artist/5ECYNFQwqO6rG7sBwTX5sK?si=ALtr0D8kSKqfsNl95FTXbA"
            target="_blank"
            className="fork-btn-inner music-button"
          >
            <FaSpotify style={{ fontSize: "1.1em" }} />
            &nbsp; Listen to my Music Here &nbsp;
          </Button>
        </Container>
      </Container>
      <Particle />
    </div>
  );
}

export default Music;
