import { useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Jumbotron from "../Jumbotron";
import { careerLists } from "../../utils/careers";
import { useHistory } from "react-router-dom";
import "./index.scss";

import HERO from "../../assets/images/hero_img2.png";
import Arrow from "../../assets/icons/arrow.svg";
import { useState } from "react";
import { validateInputApplyJob } from "../../utils/validateForm";

const Input = ({
  title,
  placeholder,
  required,
  type,
  onChange,
  accept,
  name,
  error,
}) => {
  return (
    <Form.Group
      className="mb-3 careerDetails__inputGroup"
      controlId="formBasicEmail"
    >
      <Form.Label>{title}</Form.Label>
      <Form.Control
        type={type}
        className={`${error && "border border-danger border-2"}`}
        required={required}
        accept={accept}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
      />
      {type === "file" && (
        <span className="careerDetails__labelFile">{placeholder}</span>
      )}
      {error && <small className="text-danger error-text">{error}</small>}
    </Form.Group>
  );
};

const FormInput = ({
  handleChooseFile,
  handleChange,
  handleSubmit,
  errors,
}) => {
  return (
    <Form className="mb-3">
      <Row>
        <Col xs={12} md={4}>
          <Input
            title="First Name*"
            required
            error={errors.firstName}
            type="text"
            name="firstName"
            placeholder="Type Here"
            onChange={handleChange}
          />
        </Col>
        <Col xs={12} md={4}>
          <Input
            title="Last Name*"
            required
            error={errors.lastName}
            name="lastName"
            type="text"
            placeholder="Type Here"
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4}>
          <Input
            title="Email*"
            name="email"
            required
            error={errors.email}
            type="email"
            onChange={handleChange}
            placeholder="Type Here"
          />
        </Col>
        <Col xs={12} md={4}>
          <Input
            title="Phone"
            name="phoneNumber"
            type="number"
            onChange={handleChange}
            placeholder="Type Here"
          />
        </Col>
        <Col xs={12} md={4}>
          <Input
            title="Linkedin"
            name="linkedin"
            type="text"
            placeholder="Type Here"
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4}>
          <Input
            title="Resume/CV*"
            id="resume-or-cv"
            type="file"
            name="resume"
            required
            error={errors.resume}
            accept=".doc,.docx,application/msword"
            onChange={handleChooseFile}
            placeholder="Upload Here"
          />
        </Col>
        <Col xs={12} md={4}>
          <Input
            title="Cover Letter"
            accept=".doc,.docx,application/msword"
            name="coverLetter"
            onChange={handleChooseFile}
            type="file"
            placeholder="Upload Here"
          />
        </Col>
        <Col xs={12} md={4}>
          <Input
            title="Anything Else You Want To Share With Us!"
            accept=".doc,.docx,application/msword"
            name="anything"
            onChange={handleChooseFile}
            type="file"
            placeholder="Upload Here"
          />
        </Col>
      </Row>
      <Button
        className="d-flex justify-content-center align-items-center mx-auto border-0 mt-3 rounded-pill"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Form>
  );
};

const CareerDetails = () => {
  let { id } = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    linkedin: "",
    resume: "",
    coverLetter: "",
    anything: "",
  });

  const careerDetails = careerLists.find((careerList) => careerList.id === id);

  const handleChooseFile = (e) => {
    const file = e.currentTarget.files[0];
    const name = e.currentTarget.name;
    if (file.name) {
      e.currentTarget.nextElementSibling.innerHTML = file.name;
      e.currentTarget.nextElementSibling.style.color = "#000";

      setFormData((prevData) => ({
        ...prevData,
        [name]: file.name,
      }));
    }
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { errors, valid } = validateInputApplyJob(formData);

      if (!valid) {
        setErrors(errors);
        return;
      }
    } catch (err) {
      return err;
    }

  };

  return (
    <div className="careerDetails">
      <Jumbotron bgShort title="" image={HERO} />
      <Container className="p-4 p-md-5 py-3 my-4">
        <div
          className="d-flex align-items-center gap-2 careerDetails__back"
          onClick={() => history.goBack()}
        >
          <img src={Arrow} alt="" />{" "}
          <span className="d-inline-block">Back to TellTail Careers</span>
        </div>
        <div className="mt-3 careerDetails__head">
          <h2>{careerDetails.roleTitle}</h2>
          <span>
            {careerDetails.location}, CA / {careerDetails.type}
          </span>
        </div>

        <div className="careerDetails__details">
          {careerDetails.details.role && (
            <div>
              <h3 className="mt-4">The Role.</h3>
              <div
                dangerouslySetInnerHTML={{ __html: careerDetails.details.role }}
              ></div>
            </div>
          )}
          {careerDetails.details.responsibility && (
            <div>
              <h3 className="mt-4">Responsibilities.</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: careerDetails.details.responsibility,
                }}
              ></div>
            </div>
          )}
          {careerDetails.details.qualifications && (
            <div>
              <h3 className="mt-4">Qualifications</h3>
              {careerDetails.details.qualifications.about && (
                <div>
                  <h4>About you</h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: careerDetails.details.qualifications.about,
                    }}
                  ></div>
                </div>
              )}
              {careerDetails.details.qualifications.bonus && (
                <div>
                  <h4>Bonus</h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: careerDetails.details.qualifications.bonus,
                    }}
                  ></div>
                </div>
              )}
            </div>
          )}
          {careerDetails.details.aboutTellTails && (
            <div>
              <h3 className="mt-4">About Tell Tail.</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: careerDetails.details.aboutTellTails,
                }}
              ></div>
            </div>
          )}
        </div>
        <div className="careerDetails__form mt-5 p-4">
          <h3>Interested in this job?</h3>
          <span className="d-block mb-4">
            Let the hiring team at TellTail contact you by providing your
            information below!
          </span>
          <FormInput
            handleChooseFile={handleChooseFile}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errors={errors}
          />
        </div>
      </Container>
    </div>
  );
};

export default CareerDetails;
