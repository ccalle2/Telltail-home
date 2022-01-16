import gsap from "gsap/all";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Jumbotron from "../../components/Jumbotron";
import Card from "../../components/Card";

import HERO from "../../assets/images/hero_img.jpg";
import IMAGE1 from "../../assets/images/image1.png";
import IMAGE2 from "../../assets/images/image2.png";
import IMAGE3 from "../../assets/images/image3.png";

const cardList = [
  {
    image: IMAGE1,
    title: "Breeders are the unsung heroes of the pet industry.",
    description:
      "TellTail puts breeders at the center of everything we do; these nurturing breeders loved your pet first, so that you can love them forever.",
  },
  {
    image: IMAGE2,
    title:
      "Breeders deserve more, and TellTail is focused on helping them flourish.",
    description:
      "Our platform is focused on empowering breeders with resources, business support, and education – but this is only the beginning.",
  },
  {
    image: IMAGE3,
    title: "No scammers. No puppy mills.",
    description:
      "We are building a world free from bad actors in the pet search process (like scammers and inhumane puppy mills), so that breeders and healthy puppies can thrive.",
  },
];

const Home = () => {
  useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".services__container",
        start: "top bottom",
      },
    });
    if (window.innerWidth > 768) {
      tl.from(
        ".services__container .services__img",
        { y: 25, opacity: 0, duration: 0.5 },
        1
      );
    }
  });
  return (
    <div>
      <Jumbotron home image={HERO} title="Your tail begins soon..." />
      <Container className="services__container p-5 py-3">
        <h2 className="text-center mt-3">Trust. Transparency. TellTail.</h2>
        <Row>
          {cardList.map((item) => (
            <Card
              image={item.image}
              title={item.title}
              description={item.description}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
