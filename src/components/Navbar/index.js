import { Container, Nav, Navbar as NavbarComponent } from "react-bootstrap";
import { useEffect, useState } from "react";
import gsap from "gsap/all";

import "./index.scss";
import LOGO from "../../assets/images/telltail_logo.png";

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [navActive, setNavActive] = useState("");
  const handleOpenNav = () => {
    let jumboTl = gsap.timeline();
    setOpenNav((openNav) => !openNav);
    setTimeout(() => {
      jumboTl.from(".navbar__mobile", { opacity: 0, duration: 0.5 });
      jumboTl.from(".navbar__mobile a", {
        y: 20,
        opacity: 0,
        duration: 0.75,
        ease: "expo",
      });
    }, 0);
  };

  useEffect(() => {
    setNavActive(window.location.pathname.split("/")[1]);
  }, []);

  return (
    <NavbarComponent bg="transparent">
      <Container className="position-relative navbar__container p-2 px-5 pt-2 d-flex justify-content-center justify-content-xl-between">
        <div
          onClick={handleOpenNav}
          className={`navbar__iconMobile position-absolute d-xl-none left-0 ${
            openNav && "open"
          }`}
        >
          <span></span>
          <span></span>
        </div>
        <Nav.Link href="/">
          <img className="navbar__logo mx-auto " src={LOGO} alt="" />
        </Nav.Link>

        <Nav className="ms-auto d-none d-xl-flex gap-3">
          <Nav.Link
            href="/"
            className={`text-light ${
              navActive === "" && "border-bottom"
            }  px-0 py-1`}
          >
            Home
          </Nav.Link>
          <Nav.Link
            href="/careers"
            className={`text-light ${
              navActive === "careers" && "border-bottom"
            }  px-0 py-1`}
          >
            Careers
          </Nav.Link>
        </Nav>
      </Container>
      {openNav && (
        <div className="navbar__mobile d-flex justify-content-center align-items-center flex-column">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/careers">Careers</Nav.Link>
        </div>
      )}
    </NavbarComponent>
  );
};

export default Navbar;
