import { useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Jumbotron from "../Jumbotron";
import { careerLists } from "../../utils/careers";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { validateInputApplyJob } from "../../utils/validateForm";
import { storage } from "../../firebase";

import "./index.scss";

import HERO from "../../assets/images/hero_img2.png";
import Arrow from "../../assets/icons/arrow.jpg";
import { useEffect } from "react";

const Input = ({
  title,
  placeholder,
  required,
  type,
  onChange,
  accept,
  name,
  error,
  value,
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
        value={value}
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
  formData,
  loading,
  success,
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
            value={formData.firstName}
            placeholder="Type Here"
            onChange={handleChange}
          />
        </Col>
        <Col xs={12} md={4}>
          <Input
            title="Last Name*"
            required
            error={errors.lastName}
            value={formData.lastName}
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
            value={formData.email}
            type="email"
            onChange={handleChange}
            placeholder="Type Here"
          />
        </Col>
        <Col xs={12} md={4}>
          <Input
            title="Phone"
            name="phone"
            value={formData.phone}
            type="number"
            onChange={handleChange}
            placeholder="Type Here"
          />
        </Col>
        <Col xs={12} md={4}>
          <Input
            title="LinkedIn"
            value={formData.linkedIn}
            name="linkedIn"
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
            accept=".doc,.docx,application/msword,.pdf,image/*"
            onChange={handleChooseFile}
            placeholder="Upload Here"
          />
        </Col>
        <Col xs={12} md={4}>
          <Input
            title="Cover Letter"
            accept=".doc,.docx,application/msword,.pdf,image/*"
            name="coverLetter"
            onChange={handleChooseFile}
            type="file"
            placeholder="Upload Here"
          />
        </Col>
        <Col xs={12} md={4}>
          <Input
            title="Anything Else You Want To Share With Us!"
            accept=".doc,.docx,application/msword,.pdf,image/*"
            name="others"
            onChange={handleChooseFile}
            type="file"
            placeholder="Upload Here"
          />
        </Col>
      </Row>
      {success ? (
        <span className="fw-bold text-danger d-flex mx-auto mt-4 justify-content-center align-items-center">
          Your application has been submitted - thank you!
        </span>
      ) : (
        <Button
          className="d-flex justify-content-center align-items-center mx-auto border-0 mt-4 rounded-pill fw-bold"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <div className="loading-text d-flex align-items-end">
              Please wait <span className="loading-dot"></span>
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      )}
    </Form>
  );
};

const CareerDetails = () => {
  let { id } = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState("");
  const [isLoadingGetResume, setIsLoadingGetResume] = useState(false);
  const [isLoadingGetCoverLetter, setIsLoadingGetCoverLetter] = useState(false);
  const [isLoadingGetOthers, setIsLoadingGetOthers] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedIn: "",
    resume: "",
    coverLetter: "",
    others: "",
    date: new Date(),
  });

  const careerDetails = careerLists.find((careerList) => careerList.id === id);

  const handleChooseFile = (e) => {
    // for now I just set this for get file
    const file = e.currentTarget.files[0];

    // just set text to text name and change the color
    const name = e.currentTarget.name;
    if (file) {
      e.currentTarget.nextElementSibling.innerHTML = file.name;
      e.currentTarget.nextElementSibling.style.color = "#000";

      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    }

    // in this below you can set that file or maybe I can do this if you want
    // .......
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const getFileURL = (file, type) => {
    const uploadTask = storage.ref(`files/${type}/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => console.log(error),
      () => {
        storage
          .ref(`files/${type}`)
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            if (type === "resume" && url) {
              setFormData((prevData) => ({ ...prevData, resume: url }));
              setIsLoadingGetResume(false);
            }
            if (type === "others" && url) {
              setFormData((prevData) => ({ ...prevData, others: url }));
              setIsLoadingGetOthers(false);
            }
            if (type === "coverLetter" && url) {
              setFormData((prevData) => ({ ...prevData, coverLetter: url }));
              setIsLoadingGetCoverLetter(false);
            }
          });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { errors, valid } = validateInputApplyJob(formData);

      if (!valid) {
        setErrors(errors);
        return;
      }

      setErrors({})

      setIsLoadingGetResume(true);
      getFileURL(formData.resume, "resume");
      if (formData.coverLetter !== "") {
        getFileURL(formData.coverLetter, "coverLetter");
        setIsLoadingGetCoverLetter(true);
      }
      if (formData.others !== "") {
        setIsLoadingGetOthers(true);
        getFileURL(formData.others, "others");
      }
      setIsLoading(true);
    } catch (err) {
      setIsLoading(false);
      return err;
    }
  };

  const sendFormData = async () => {
    try {
      const res = await fetch(
        `https://sheet.best/api/sheets/e4f0ff64-6527-44ba-bfcf-edc62af8206e/tabs/${careerDetails.roleTitle}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          linkedIn: "",
          resume: "",
          coverLetter: "",
          others: "",
          date: new Date(),
        });
        document
          .querySelectorAll(".careerDetails__labelFile")
          .forEach((element) => {
            element.innerHTML = "Upload Here";
            element.style.color = "#bdbdbd";
          });
        setSuccess(true);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      return err;
    }
  };

  useEffect(() => {
    // if get link from database and loading
    if (formData.coverLetter !== "" && formData.others !== "") {
      if (
        !isLoadingGetOthers &&
        !isLoadingGetResume &&
        !isLoadingGetCoverLetter &&
        isLoading
      ) {
        sendFormData();
      }
    } else if (formData.coverLetter !== "") {
      if (!isLoadingGetResume && !isLoadingGetCoverLetter && isLoading) {
        sendFormData();
      }
    } else if (formData.others !== "") {
      if (!isLoadingGetOthers && !isLoadingGetResume && isLoading) {
        sendFormData();
      }
    } else {
      if (!isLoadingGetResume && isLoading) {
        sendFormData();
      }
    }

    // eslint-disable-next-line
  }, [isLoading, isLoadingGetResume, isLoadingGetCoverLetter]);

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
            formData={formData}
            loading={isLoading}
            success={success}
          />
        </div>
      </Container>
    </div>
  );
};

export default CareerDetails;
