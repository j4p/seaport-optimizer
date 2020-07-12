import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export class Footer extends React.Component {
  render() {
    return (
      <footer className="mt-4">
        <Container>
          <Row>
            <Col>
              <h5>Seaport Optimizer</h5>
              <p>
                Seaport Optimizer is an app intended to help optimize the
                deployment of ships by minimizing resources (cargo/crew) lost
                due to deployment.
              </p>
            </Col>
            <Col>
              <h5>On This App</h5>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/how-to-use">How to Use</Link>
                </li>
              </ul>
            </Col>
            <Col>
              <h5>More About This Project</h5>
              <ul>
                <li>
                  <a href="#">Contribute to This Project</a>
                </li>
                <li>
                  <a href="#">Report an Issue</a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}
