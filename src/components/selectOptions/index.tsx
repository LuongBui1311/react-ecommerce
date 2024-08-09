import { Select } from "antd";
import { useEffect, useState } from "react";
import { CustomSelectProps } from "../../props/CustomSelectProps";

export default function SelectOptions({
  categories,
  productCategories,
  onchange,
}: CustomSelectProps) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    setScreenWidth(window.innerWidth);
  });
  const selectStyle =
    screenWidth > 1024 ? { width: "30rem" } : { width: "15rem" };

  console.log(productCategories);
  const listOptions = categories.map((option) => (
    <Select.Option value={option.id}>{option.name}</Select.Option>
  ));
  return (
    <Select
      style={selectStyle}
      mode="multiple"
      onChange={onchange}
      maxTagCount="responsive"
    >
      {listOptions}
    </Select>
  );
}
