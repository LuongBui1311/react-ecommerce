import React, { useEffect, useState } from "react";
import { Button, Form } from "antd";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomFormItem } from "../customInputs";
import SelectOptions from "../selectOptions";
import { useNavigate, useParams } from "react-router-dom";
import ICatergory from "../../interfaces/ICatergory";
import IProduct from "../../interfaces/IProduct";
import { LOGIN, PRODUCT_LIST } from "../../routes/routes";
import {
  createProduct,
  getCategory,
  getProductById,
  updateProduct,
} from "../../api/apiCall";
import { inputInfo } from "./inputInfo";

// Setup schema for React Hook Form
const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    basePrice: yup.number().required(),
    discountPercentage: yup.number().required(),
    stock: yup.number().required(),
    description: yup.string().required(),
  })
  .required();

const ProductForm: React.FC = () => {
  const method = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      basePrice: 0,
      discountPercentage: 0,
      stock: 0,
      description: "",
    },
  });
  const {
    handleSubmit,
    reset,
  } = method;

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [productCategory, setProductCategory] = useState<ICatergory[]>([]);
  const param = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<ICatergory[]>([]);

  // Call API
  const populateCategory = () => {
    const response = getCategory();
    response
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getProduct = (productId: string) => {
    const response = getProductById(productId);
    response
      .then((res) => {
        reset(res.data);
        setProductCategory(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
        sessionStorage.setItem("accessToken", "");
        sessionStorage.setItem("refreshToken", "");
        sessionStorage.setItem("loginStatus", "false");
        window.location.href = LOGIN;
      });
  };
  const createNewProduct = (postData: any) => {
    const response = createProduct(postData);
    response
      .then(() => {
        navigate(PRODUCT_LIST);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateOldProduct = (id: string | undefined, postData: any) => {
    const response = updateProduct(id, postData);
    response
      .then(() => {
        navigate(PRODUCT_LIST);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    populateCategory();
    if (param.productId) {
      getProduct(param.productId);
    }
  }, []);

  // Event Handlers
  const handleChange = (data: string[]) => {
    setSelectedCategory(data);
  };

  const addProduct = (data: IProduct) => {
    const postData: IProduct = {
      name: data.name,
      basePrice: data.basePrice,
      discountPercentage: data.discountPercentage,
      stock: data.stock,
      description: data.description,
      categories: selectedCategory,
    };
    createNewProduct(postData);
  };

  const updateProductInfo = (data: IProduct) => {
    const patchData: IProduct = {
      name: data.name,
      basePrice: data.basePrice,
      discountPercentage: data.discountPercentage,
      stock: data.stock,
      description: data.description,
    };
    updateOldProduct(param.productId, patchData);
  };

  const onSubmit = (data: any) => {
    if (!param.productId) {
      addProduct(data);
    } else {
      updateProductInfo(data);
    }
  };

  return (
    <div>
      <FormProvider {...method}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          name="normal_login"
          onFinish={handleSubmit(onSubmit)}
        >
          {!param.productId && (
            <Form.Item label="Catergory" required>
              <SelectOptions
                productCategories={productCategory}
                categories={category}
                onchange={handleChange}
              />
            </Form.Item>
          )}

          {inputInfo.map((info) => (
            <CustomFormItem
            label={info.label}
            name={info.name}
            hint={info.hint}
          />
          ))}
          <Form.Item style={{ textAlign: "end" }}>
            <Button type="primary" htmlType="submit" className="btn">
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </FormProvider>
    </div>
  );
};

export default ProductForm;
