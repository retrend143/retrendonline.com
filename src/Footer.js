import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <MDBFooter
      className="text-center text-lg-start text-muted"
      style={{ backgroundColor: "rgba(235, 238, 239, 1)" }}
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div className="text-dark">
          <a href="#" className="me-4 text-reset">
            <MDBIcon icon="globe" />
          </a>
          <a href="#" className="me-4 text-reset">
            <MDBIcon fab icon="instagram" />
          </a>
          <a href="#" className="me-4 text-reset">
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href="#" className="me-4 text-reset">
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className="text-dark">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Retrend
              </h6>
              <p>
                "Retrend is an online platform that facilitates the buying and
                selling of second-hand items. It provides a user-friendly
                interface for individuals to list their used goods and connect
                with potential buyers across various categories."
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">About Us</h6>
              <p><Link to="/about-us" className="text-reset">About Retrend</Link></p>
              <p><Link to="/careers" className="text-reset">Careers</Link></p>
              <p><Link to="/our-team" className="text-reset">Our Team</Link></p>
              <p><Link to="/blog" className="text-reset">Blog</Link></p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Support</h6>
              <p><Link to="/help-center" className="text-reset">Help Center</Link></p>
              <p><Link to="/sitemap" className="text-reset">Sitemap</Link></p>
              <p><Link to="/privacy-policy" className="text-reset">Privacy Policy</Link></p>
              <p><Link to="/terms-and-conditions" className="text-reset">Terms & Conditions</Link></p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <p><Link to="/feedback" className="text-reset">Feedback</Link></p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className="text-center text-white p-4" style={{ backgroundColor: "rgba(0, 47, 52, 1)" }}>
        © {new Date().getFullYear()} Copyright:
        <Link className="fw-bold text-white" to="/"> Retrendonline.in</Link>
      </div>
    </MDBFooter>
  );
}
