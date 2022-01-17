import { Button, Container, Form, FormControl, Nav } from "react-bootstrap";
import { useState } from "react";
import "./index.scss";

const Footer = () => {
  const [data, setData] = useState({
    email: "",
    date: new Date(),
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data.email.trim() === "") {
        setError(true);
        return;
      }

      const res = await fetch(
        "https://sheet.best/api/sheets/e4f0ff64-6527-44ba-bfcf-edc62af8206e/tabs/Newsletter signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (res.ok) {
        setSuccess(true);
        setData({
          email: "",
          date: new Date(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <footer className="footer">
      <Container className="footer__container d-flex align-items-center flex-column justify-content-center">
        <h3 className="mb-4">Trust. Transparency. TellTail.</h3>
        <span className="d-block my-5 text-center">
          Drop your email below to stay in the loop for exciting updates!
        </span>
        {success ? (
          <h5 className="text-center text-black">
            Thank you! We are so excited to welcome you into the TellTail
            family!
          </h5>
        ) : (
          <>
            <Form className="d-flex align-items-center flex-column flex-sm-row">
              <FormControl
                type="email"
                placeholder="Email Address"
                className={`me-md-2 mb-2 ${
                  error && "border border-danger border-2"
                }`}
                aria-label="Search"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
              />
              <Button
                className="mx-auto mx-md-0 border-0 mb-2"
                onClick={(event) => handleSubmit(event)}
              >
                Sign Up
              </Button>
            </Form>
          </>
        )}
        <div className="d-block my-5 text-center">
          Interested in joining the TellTail team? Click{" "}
          <Nav.Link href="/careers" className="d-inline-block p-0">
            <strong>here</strong>
          </Nav.Link>{" "}
          to learn more about our available roles!
        </div>
      </Container>
      <Container className=" fw-light px-5 fs-6">
        <small className="footer__cp">© 2021 TellTail Holdings Inc.</small>
      </Container>
    </footer>
  );
};

export default Footer;
