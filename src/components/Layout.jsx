import { Outlet, Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const Layout = ({ isLoggedIn, handleLogin }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    // Clear everything in localStorage
    localStorage.clear();

    // Update isLoggedIn state
    handleLogin(false);

    // Redirect to login page
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            VoltAI
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              {isLoggedIn ? (
                <>
                  <Nav.Link as={Link} to="/entries">
                    Data Entry
                  </Nav.Link>
                  <Nav.Link as={Link} to="/rawdata">
                    Data Viewer
                  </Nav.Link>
                  <Nav.Link as={Link} to="/predictive">
                    Predictive
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
            {isLoggedIn && (
              <Button variant="outline-light" onClick={logoutHandler}>
                Logout
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
