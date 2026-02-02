import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import cc1 from "../../Assets/CC1_Square.jpg";
import cc2 from "../../Assets/CC2_Square.jpg";
import cameronSteinburg from "../../Assets/CameronSteinburg.jpg";
import Tilt from "react-parallax-tilt";

const CYCLE_IMAGES = [cameronSteinburg, cc2];
const FLIP_INTERVAL_MS = 5000;
const FLIP_DURATION_MS = 1000;

function Home2() {
  const [imageIndex, setImageIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipping(true);
      setTimeout(() => setImageIndex((i) => (i + 1) % CYCLE_IMAGES.length), FLIP_DURATION_MS / 2);
      setTimeout(() => setFlipping(false), FLIP_DURATION_MS);
    }, FLIP_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              But you may also know me as <span className="purple"> CAMERON CAIN </span> 
            </h1>
            <p className="home-about-body">
              I am Quality Assurance Engineer, Web Developer, and musician from 
              <br />
              Calgary, Canada.
              <br />
              <br />
              Languages and frameworks I am proficient in include:
              <i>
                <b className="purple">
                  {" "}
                  Java, C#, JS, Angular, React, and Python{" "}
                </b>
              </i>
              <br />
              <br />
              I have employed a variety of test automation tools and frameworks to test the software products I work on, including:
              <i>
                <b className="purple">
                  {" "}
                  Playwright, Cypress, Selenium, TestComplete, and Squish{" "}
                </b>
              </i>
              <br />
              <br />
              I am also a highly skilled SCRUM Master and an expert in Agile methodologies. I have lead teams both large and small and have been a part of QA teams with established test frameworks, but am most well known for creating new test frameworks on young projects entirely from the ground up. I have written hundreds of end-to-end test cases that are designed comprehensively and specifically to have as many of its steps
              <span className="purple"> automated </span> as possible
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <div className="music-coin" style={{ perspective: "1000px" }}>
                <div className={`music-coin-inner ${flipping ? "music-coin-flip" : ""}`}>
                  <img
                    src={CYCLE_IMAGES[imageIndex]}
                    alt="about"
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
      </Container>
    </Container>
  );
}
export default Home2;
