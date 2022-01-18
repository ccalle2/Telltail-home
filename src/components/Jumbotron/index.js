import { Container, Form, FormControl, Button } from "react-bootstrap";
import React, { useState } from "react";
import "./index.scss";
import { validateWaitingList } from "../../utils/validateForm";

const Jumbotron = ({ home, image, title, bgShort }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    date: new Date(),
  });

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(false);
  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { errors, valid } = validateWaitingList(data);

      if (!valid) {
        setErrors(errors);
        return;
      }

      const res = await fetch(
        "https://sheet.best/api/sheets/1ed45b51-2411-4583-94e0-c3af6bdbc71f",
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
          firstName: "",
          lastName: "",
          email: "",
          date: new Date(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`jumbotron position-relative ${bgShort && "bg-short"}`}>
      <img className="jumbotron__img" src={image} alt="" />
      <Container className="jumbotron__container p-4 position-absolute top-0 d-flex text-light justify-content-center flex-column h align-items-center">
        {title !== "" && (
          <h1 className={`text-center mb-5 ${!home && "jumbotron__title"}`}>
            {title}
          </h1>
        )}
        {home && (
          <>
            <h3 className="text-center">
              Are you a breeder looking for more tools, education, and support?
            </h3>
            <h3 className="text-center">
              Join our waitlist to be one of the first to use TellTail!
            </h3>
            {success ? (
              <h4 className="text-center mt-5">
                Thank you! We are so excited to welcome you into the TellTail
                family!
              </h4>
            ) : (
              <Form className="d-flex mt-5 align-items-center flex-column flex-sm-row">
                <FormControl
                  type="text"
                  placeholder="First Name"
                  className={`me-2 mb-4 input-first-name ${
                    errors &&
                    errors.firstName &&
                    "border border-danger border-2"
                  }`}
                  aria-label="Search"
                  name="firstName"
                  onChange={handleChange}
                  value={data.firstName}
                  required
                />
                <FormControl
                  type="text"
                  placeholder="Last Name"
                  className={`me-2 mb-4 input-last-name ${
                    errors && errors.lastName && "border border-danger border-2"
                  }`}
                  aria-label="Search"
                  name="lastName"
                  onChange={handleChange}
                  value={data.lastName}
                  required
                />
                <FormControl
                  type="email"
                  placeholder="Email Address"
                  className={`me-2 mb-4 input-email ${
                    errors && errors.email && "border border-danger border-2"
                  }`}
                  aria-label="Search"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  required
                />
                <Button
                  type="submit"
                  className="mx-auto sm:mx-0 border-0 mb-4"
                  onClick={(event) => handleSubmit(event)}
                >
                  Join Waitlist
                </Button>
              </Form>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Jumbotron;
