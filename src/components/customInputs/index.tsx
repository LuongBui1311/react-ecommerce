import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { CustomFormItemProps } from "../../props/CustomFormItemProps";

export function CustomFormItem({
  name,
  hint,
  type = "text",
  label = ""
}: CustomFormItemProps) {
  const { control } = useFormContext();
  const InputComponent = type === "password" ? Input.Password : Input;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Form.Item
          label={label}
          validateStatus={fieldState.error ? "error" : ""}
          help={fieldState.error?.message}
        >
          <InputComponent className="inputs" placeholder={hint} {...field} />
        </Form.Item>
      )}
    />
  );
}
