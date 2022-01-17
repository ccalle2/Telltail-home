import Jumbotron from "../../components/Jumbotron";
import HERO from "../../assets/images/hero_img2.png";

import "./index.scss";

import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { careerLists } from "../../utils/careers";

const CareerList = ({ id, roleTitle, location, type }) => {
  return (
    <div className="careers__careerList d-flex flex-column flex-sm-row align-items-sm-center  justify-content-between mt-5">
      <div>
        
        <Link
          to={`/careers/${id}`}
          className="mt-2 mt-sm-0"
          onClick={() =>
            // scrolled to the top
            window.scrollTo({ top: 0 })
          }
        >
          <h3>{roleTitle}</h3>
        </Link>
        <div>
          {location} <span className="mx-2">|</span> {type}
        </div>
      </div>

      <Link
        to={`/careers/${id}`}
        className="mt-2 mt-sm-0"
        onClick={() =>
          // scrolled to the top
          window.scrollTo({ top: 0 })
        }
      >
        See details
      </Link>
    </div>
  );
};

const Careers = () => {
  return (
    <div className="careers">
      <Jumbotron image={HERO} title="We are hiring!" />
      <Container className="p-4 p-md-5 py-3 my-4">
        <h2 className="mt-3 mb-5">Open positions</h2>
        <div>
          {careerLists.map(({ id, roleTitle, type, location }) => (
            <CareerList
              key={id}
              id={id}
              roleTitle={roleTitle}
              type={type}
              location={location}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Careers;
