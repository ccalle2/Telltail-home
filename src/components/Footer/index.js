import { Button, Container, Form, FormControl } from "react-bootstrap";
import React, { useState } from 'react';
import "./index.scss";

const Footer = () => {
  const [data, setData] = useState({
    email: "",
    date: new Date()
  });

  
  const [success, setSuccess] = useState(false)
  const handleChange = (e) => 
    setData({...data, [e.target.name]: e.target.value})

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://sheet.best/api/sheets/e4f0ff64-6527-44ba-bfcf-edc62af8206e/tabs/Newsletter signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        }
      );
      if (res.ok) {
        setSuccess(true)
        setData({
          email: "",
          date: new Date()
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <footer className="footer">
      <Container className="footer__container d-flex align-items-center flex-column justify-content-center">
        <h3 className="mb-4">Trust. Transparency. TellTail.</h3>
        <span className="d-block my-5 text-center">
          Want to stay in the loop for exciting TellTail updates? Drop your email below!
        </span>
        {success ?
          <h5 className="text-center text-black">
            Thank you! We are so excited to welcome you into the TellTail family!
          </h5>
          :
          <Form className="d-flex align-items-center flex-column flex-sm-row">
            <FormControl
              type="email"
              placeholder="Email Address"
              className="me-md-2 mb-2"
              aria-label="Search"
              name="email"
              onChange={handleChange} 
              value={data.email}
              required
            />
            <Button className="mx-auto sm:mx-0 border-0 mb-2" onClick={event => handleSubmit(event)}>Sign Up</Button>
          </Form>
        }
      </Container>
      <Container className=" fw-light px-5 fs-6">
        <small className="footer__cp">© 2021 TellTail Holdings Inc.</small>
      </Container>
    </footer>
  );
};

export default Footer;
