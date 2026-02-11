import React, { useState, useEffect, useCallback } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../Assets/logo.png";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { CgInstagram } from "react-icons/cg";
import { ImLinkedin } from "react-icons/im";
import { FaMusic } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineCalendar,
} from "react-icons/ai";

import { CgFileDocument } from "react-icons/cg";
function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  const scrollHandler = useCallback(() => {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [scrollHandler]);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="lg"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container className="d-flex align-items-center">
        <div className="navbar-logo-offset">
          <Navbar.Brand href="/" className="d-flex">
            <img
              src={logo}
              className="logo"
              alt="brand"
              style={{
                borderRadius: "50%",
                width: 50,
                height: 50,
                background: "red",
                display: "block",
                objectFit: "cover",
              }}
            />
          </Navbar.Brand>
        </div>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px", marginRight: "5px" }} /> Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/about"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser style={{ marginBottom: "2px", marginRight: "5px" }} /> About
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/music"
                onClick={() => updateExpanded(false)}
              >
                <FaMusic style={{ marginBottom: "2px", marginRight: "5px" }} />  Music
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/resume"
                onClick={() => updateExpanded(false)}
              >
                <CgFileDocument style={{ marginBottom: "2px" }} /> Resume
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/practicespace"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineCalendar style={{ marginBottom: "2px" }} /> Practice
                Space
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                href="https://www.linkedin.com/in/cameron-steinburg-72a468b2/"
                target="_blank"
                rel="noreferrer"
              >
                <ImLinkedin style={{ marginBottom: "2px", marginRight: "5px" }} /> LinkedIn
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="navbar-actions-item d-flex align-items-center">
              <ThemeToggle />
            </Nav.Item>

            <Nav.Item className="share-btn navbar-actions-item">
              <Button
                href="https://instragram.com/cameroncain_"
                target="_blank"
                className="fork-btn-inner"
              >
                Message Me &nbsp;
                <CgInstagram style={{ fontSize: "1.1em", marginTop: "5px" }} />
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
