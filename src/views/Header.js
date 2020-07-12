import React, { useState, useContext } from "react";
import { Container, Navbar, Nav, Form } from "react-bootstrap";
import logo from "../img/seaport-logo.png";
import { Link } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

export const Header = () => {
  // menambahkan state untuk mengontrol tombol pengubah tema
  const [isSwitchToggled, setSwitch] = useState(false);

  // destructuring context berdasarkan value dalam provider
  const { theme, handleChangeTheme } = useContext(ThemeContext);

  return (
    <Navbar
      style={
        // mengubah background berdasarkan tema
        theme === "light"
          ? { backgroundColor: "#e3f2fd" }
          : { backgroundColor: "#051e2e" }
      }
      variant={theme}
      expand="lg"
    >
      <Container>
        {/* logo */}
        <Navbar.Brand href="/">
          <img
            src={logo}
            height="40"
            width="auto"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        {/* toggle dan collapse untuk burger menu dropdown pada screen kecil */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* link navigasi */}
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/how-to-use">
              How to Use
            </Nav.Link>
          </Nav>
          {/* tombol pengubah tema */}
          <Form.Check
            type="switch"
            id="theme-switch"
            label=""
            className="ml-2"
            checked={isSwitchToggled}
            onChange={() => setSwitch(!isSwitchToggled)}
            onClick={handleChangeTheme}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
