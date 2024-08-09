import { Button, Checkbox, Form } from "antd";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomFormItem } from "../customInputs";
import { HOME, PRODUCT_LIST } from "../../routes/routes";
import IUser from "../../interfaces/IUser";
import { getUserInfo, logIn } from "../../api/apiCall";
import { inputInfo } from "./inputInfo";

// Setup schema for React Hook Form
const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

// Call API
const loggingIn = (postData: IUser) => {
  const response = logIn(postData);
  response
    .then((res) => {
      checkUserRole(res.data.accessToken);
      sessionStorage.setItem("accessToken", res.data.accessToken);
      sessionStorage.setItem("refreshToken", res.data.refreshToken);
      sessionStorage.setItem("loginStatus", "true");
    })
    .catch(() => {
      alert("Wrong Credentials");
    });
};
const checkUserRole = (token: string) => {
  const response = getUserInfo(token);
  response
    .then((res) => {
      sessionStorage.setItem("role", res.data.role);
      sessionStorage.setItem("name", res.data.name);
      if (res.data.role === "ADMIN") {
        window.location.href = PRODUCT_LIST;
      }
      if (res.data.role === "USER") {
        window.location.href = HOME;
      }
    })
    .catch();
};

// Form Component
const LoginForm: React.FC = () => {
  const method = useForm({
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = method;

  const onSubmit = (data: IUser) => {
    const postData: IUser = {
      email: data.email,
      password: data.password,
    };
    loggingIn(postData);
  };

  return (
    <div className="form-container">
      <h2>Sign In</h2>
      <FormProvider {...method}>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={handleSubmit(onSubmit)}
        >
          {inputInfo.map((info) => (
            <CustomFormItem
              name={info.name}
              hint={info.hint}
              type={info.type}
            />
          ))}
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
