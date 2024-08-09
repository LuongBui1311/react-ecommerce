import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { CustomFormItem } from "../customInputs";
import { useDispatch } from "react-redux";
import { register } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import IUser from "../../interfaces/IUser";
import { LOGIN } from "../../routes/routes";
import { createUser } from "../../api/apiCall";
import { inputInfo } from "./inputInfo";

// Setup schema for React Hook Form
const schema = yup
  .object({
    name: yup.string().required(),
    address: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8)
      .max(16)
      .matches(
        /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]))/,
        "password must contains a (capital) letter, a number and a special character."
      )
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "confirm password is not correct.")
      .required(),
  })
  .required();

//Call API
const signUp = (data: IUser) => {
  const response = createUser(data);
  response.then().catch((err) => {
    alert(err.data.message);
  });
};

const RegisterForm: React.FC = () => {
  const method = useForm({
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = method;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: IUser) => {
    const postData: IUser = {
      email: data.email,
      password: data.password,
      name: data.name,
      address: data.address,
    };
    signUp(postData);
    dispatch(register(postData));
    navigate(LOGIN);
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <FormProvider {...method}>
        <Form
          name="normal_login"
          className="register-form"
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
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </FormProvider>
    </div>
  );
};

export default RegisterForm;
