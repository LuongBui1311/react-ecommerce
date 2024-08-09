import RegisterForm from "../../components/registerForm";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../components/logo";

function RegisterPage() {
  return (
    <div className="register-page">
      <Logo color="#4e54c8" />
      <div className="register_sider-container">
        <div className="register_sider-content">
          <h1>Welcome back!</h1>
          <p>Sign in with your account to use all of the site's feature.</p>
          <Button>
            <Link to="/signin">Sign in</Link>
          </Button>
        </div>
      </div>
      <div className="register_content-container">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
