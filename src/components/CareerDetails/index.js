import { useParams } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
import Jumbotron from "../Jumbotron";
import { careerLists } from "../../utils/careers";
import "./index.scss";

import HERO from "../../assets/images/hero_img2.png";
import Arrow from "../../assets/icons/arrow.svg";
import { useHistory } from "react-router-dom";

const Input = ({ title, placeholder, required, type, onChange, accept }) => {
  return (
    <Form.Group
      className="mb-3 careerDetails__inputGroup"
      controlId="formBasicEmail"
    >
      <Form.Label>{title}</Form.Label>
      <Form.Control
        type={type}
        required={required}
        accept={accept}
        placeholder={placeholder}
        onChange={onChange}
      />
      {type === "file" && (
        <span className="careerDetails__labelFile">{placeholder}</span>
      )}
    </Form.Group>
  );
};

const FormInput = ({ handleChooseFile }) => {
  return (
    <Form className="mb-3">
      <Row>
        <Col xs={12} md={4}>
          <Input
            title="First Name*"
            required
            type="text"
            placeholder="Type Here"
          />
        </Col>
        <Col xs={12} md={4}>
          <Input
            title="Last Name*"
            required
            type="text"
            placeholder="Type Here"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4}>
          <Input title="Email*" required type="email" placeholder="Type Here" />
        </Col>
        <Col xs={12} md={4}>
          <Input title="Phone" type="number" placeholder="Type Here" />
        </Col>
        <Col xs={12} md={4}>
          <Input title="Linkedin" type="text" placeholder="Type Here" />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4}>
          <Input
            title="Resume/CV*"
            id="resume-or-cv"
            type="file"
            required
            accept=".doc,.docx,application/msword"
            onChange={handleChooseFile}
            placeholder="Upload Here"
          />
        </Col>
        <Col xs={12} md={4}>
          <Input
            title="Cover Letter"
            accept=".doc,.docx,application/msword"
            type="file"
            placeholder="Upload Here"
          />
        </Col>
        <Col xs={12} md={4}>
          <Input
            title="Anything Else You Want To Share With Us!"
            accept=".doc,.docx,application/msword"
            type="file"
            placeholder="Upload Here"
          />
        </Col>
      </Row>
    </Form>
  );
};

const CareerDetails = () => {
  let { id } = useParams();
  const history = useHistory();

  const careerDetails = careerLists.find((careerList) => careerList.id === id);

  const handleChooseFile = (e) => {
    // for now I just set this for get file
    const file = e.currentTarget.files[0];

    // just set text to text name and change the color
    if (file.name) {
      e.currentTarget.nextElementSibling.innerHTML = file.name;
      e.currentTarget.nextElementSibling.style.color = "#000";
    }

    // in this below you can set that file or maybe I can do this if you want
    // .......
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
            {careerDetails.location} / {careerDetails.type}
          </span>
        </div>

        <div className="careerDetails__details">
          {careerDetails.details.role && (
            <div>
              <h3 className="mt-4">The Role</h3>
              <div
                dangerouslySetInnerHTML={{ __html: careerDetails.details.role }}
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
              <h3 className="mt-4">About Tell Tail</h3>
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
          <FormInput handleChooseFile={handleChooseFile} />
        </div>
      </Container>
    </div>
  );
};

export default CareerDetails;
