import LoginForm from "../../components/loginForm";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../components/logo";

function LoginPage() {
  return (
    <div className="page">
      <Logo color="#f0f1fb" />
      <div className="login-page">
        <div className="login_sider-container">
          <div className="login_sider-content">
            <h1>Hello, Friend!</h1>
            <p>
              Register with your information to use all of the site's feature.
            </p>
            <Button>
              <Link to="/signup">Register Now</Link>
            </Button>
          </div>
        </div>
        <div className="login_content-container">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
