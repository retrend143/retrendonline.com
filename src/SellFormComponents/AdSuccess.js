import React from "react";
import {
  MDBContainer as Container,
  MDBRow as Row,
  MDBCol as Col,
} from "mdb-react-ui-kit";
import myImage from "../resources/adsuccess.jpg";
import { Link } from "react-router-dom";

const AdSuccess = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col md="12" className="text-center">
          <i className="fas fa-check-circle fa-5x text-info mb-2"></i>
          <h2>Congratulations!</h2>
          <p>Your Ad will go live shortly.</p>
        </Col>
      </Row>
      <Row className="my-5">
        <Col md="12" className="text-center">
          <div className="d-flex justify-content-center">
            <img src={myImage} alt="Congratulations!" />
          </div>
          <p className="mt-2">
            <strong>Your ad has been successfully posted!</strong>
          </p>

          <Link to="/myads" className="btn btn-primary">View Your Ads</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default AdSuccess;
