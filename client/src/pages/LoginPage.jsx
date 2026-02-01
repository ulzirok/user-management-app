import { Container, Form, Button, Card } from "react-bootstrap";
import { useState } from "react";
import { login } from "../api/auth.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(formData);
      localStorage.setItem("token", data.token);
      toast.success("Logged in successfully.");
      navigate("/admin");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card style={{ width: "420px" }} className="p-4 shadow-sm">
        <Card.Body>
          <h3 className="mb-4">Sign In to The App</h3>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                placeholder=""
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="password"
                placeholder=""
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 d-flex justify-content-between">
              <Form.Check label="Remember me" />
            </Form.Group>

            <Button type="submit" className="w-100" variant="primary">
              Sign In
            </Button>
          </Form>
          <div className="d-flex align-items-center justify-content-center mt-4">
            <span>
              Don't have an account?
              <a href="/register"> Sign up</a>
            </span>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
