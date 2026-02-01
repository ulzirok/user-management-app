import { Navbar, Container, Button } from "react-bootstrap";

export default function Header() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  
  return (
    <Navbar bg="light" className="border-bottom">
      <Container fluid>
        <Navbar.Brand>The App</Navbar.Brand>
        <Button onClick={handleLogout} variant="secondary">
          Logout
        </Button>
      </Container>
    </Navbar>
  );
}