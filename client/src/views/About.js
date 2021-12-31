import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const About = () => {
  return (
    <Row className="mt-5" style={{ marginRight: 0 }}>
      <Col className="text-center">
        <Button
          variant="primary"
          href="https://www.facebook.com/yuumiiiiiiii/"
          size="lg"
          target="_blank"
        >
          Visit my Facebook for more info
        </Button>
      </Col>
    </Row>
  );
};

export default About;
