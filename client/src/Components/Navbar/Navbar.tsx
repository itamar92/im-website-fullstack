import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import LOGO from "../../assents/Logo_IM icon.png";
import "./navbarStyles.css";

function navbar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-3 fixed-top">
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              src={LOGO}
              width="100"
              height="60"
              className="d-inline-block align-top"
              alt="IM logo"
            />{" "}
          </Navbar.Brand>
          <Form className="d-flex ">
            <Form.Control
              type="search"
              placeholder="Search Songs"
              className="me-2 "
              aria-label="Search"
            />
            <Button className="text-white" variant="outline-secondary">
              Search
            </Button>
          </Form>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
          <Navbar.Offcanvas
            className="text-bg-dark"
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                IM-website
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">About</Nav.Link>
                <Nav.Link href="#action3">Products</Nav.Link>
                <Nav.Link href="#action4">Contact</Nav.Link>
              </Nav>
              <Nav className="d-flex">
                <NavDropdown
                  title="Log in"
                  id="offcanvasNavbarDropdown-expand-sm"
                  //className="mx-5"
                >
                  <NavDropdown.Item href="#action5">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action7">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default navbar;
