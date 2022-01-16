import { Col } from "react-bootstrap";
import "./index.scss";

const Card = ({image, title, description}) => {
  return (
    <Col
      xs={12}
      md={4}
      className="d-flex flex-column align-items-center mt-4 card__container"
    >
      <img src={image} alt="" className="services__img" />
      <h4 className="text-center my-3">
        {title}
      </h4>
      <p className="text-center mt-3">
        {description}
      </p>
    </Col>
  );
};

export default Card;
