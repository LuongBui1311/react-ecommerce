import { Button, Flex, Image, Space, Table, TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import defaultpic from "../../assets/defaultpic.png";
import { RcFile } from "antd/es/upload";
import Search from "antd/es/input/Search";
import IProduct from "../../interfaces/IProduct";
import {
  deleteProduct,
  getProductByName,
  getProductByPage,
  updateImage,
} from "../../api/apiCall";
import CustomModal from "../modal";
import IPagination from "../../interfaces/IPagination";
import CustomTableColumns from "../../props/CustomTableColumns";

export default function ProductTable() {
  // Component states
  const [data, setData] = useState([]);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<RcFile | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);
  const [nextButton, setNextButton] = useState(false);
  const [previousButton, setPreviousButton] = useState(false);
  const [pagination, setPagination] = useState<IPagination>({
    current: 1,
    pageSize: 10,
  });

  //Call API
  const fetchData = async (currentPage: number, pageSize: number) => {
    setLoading(true);
    setNextButton(true);
    setPreviousButton(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = getProductByPage(currentPage, pageSize);
    response
      .then((res) => {
        const productsWithKey = res.data.map((product: IProduct) => ({
          ...product,
          key: product.id,
        }));
        setData(productsWithKey);
        res.data.length === 0 ? setNextButton(true) : setNextButton(false);
        currentPage === 1 ? setPreviousButton(true) : setPreviousButton(false);
      })
      .catch(() => {
        setNextButton(false);
        setPreviousButton(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const deletingProduct = (id: string | null) => {
    const response = deleteProduct(id);
    response
      .then(() => {
        setDeleteVisible(false);
        fetchData(pagination.current, pagination.pageSize);
      })
      .catch(() => {
        sessionStorage.setItem("accessToken", "");
        sessionStorage.setItem("refreshToken", "");
        sessionStorage.setItem("loginStatus", "false");
        window.location.href = "/signin";
      });
  };
  const uploadImage = (id: string | null, formData: FormData) => {
    const response = updateImage(id, formData);
    response
      .then(() => {
        setUploadVisible(false);
        fetchData(pagination.current, pagination.pageSize);
      })
      .catch();
  };
  const searchProduct = (keyword: string) => {
    const response = getProductByName(
      keyword,
      pagination.current,
      pagination.pageSize
    );
    return response
      .then((res) => {
        setData(res.data);
        setSearchLoading(false);
      })
      .catch(() => {
        setSearchLoading(false);
      });
  };

  // Event Handlers
  const handleDelete = (id: string | null) => {
    deletingProduct(id);
  };
  const handleUpload = (id: string | null) => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    uploadImage(id, formData);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    if (keyword) {
      setSearchLoading(true);
      setPagination((pagination) => ({ ...pagination, current: 1 }));
      handleSearch(keyword);
    } else {
      fetchData(pagination.current, pagination.pageSize);
    }
  };
  const handleSearch = (keyword: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeout = setTimeout(() => {
      searchProduct(keyword);
    }, 1000);
    setTimeoutId(newTimeout);
  };
  const handlePreviousClick = () => {
    fetchData(pagination.current - 1, pagination.pageSize);
    setPagination((prev) => ({ ...prev, current: prev.current - 1 }));
  };
  const handleNextClick = () => {
    fetchData(pagination.current + 1, pagination.pageSize);
    setPagination((prev) => ({ ...prev, current: prev.current + 1 }));
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, []);

  const columns: TableProps<CustomTableColumns>["columns"] = [
    {
      title: "Product ID",
      dataIndex: "id",
      key: "id",
      width: "15%",
      responsive: ["md"],
    },
    {
      title: "Product Picture",
      dataIndex: "picture",
      key: "picture",
      render: (source, record) => (
        <div className="image-container">
          <Image
            width="100px"
            src={`http://${source}`}
            fallback={defaultpic}
            preview={false}
          />
          <Button
            className="change-button"
            onClick={() => {
              setCurrentProductId(record.id);
              setUploadVisible(true);
            }}
          >
            Change
          </Button>
        </div>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      responsive: ["xs", "md"],
    },
    {
      title: "Product Price",
      key: "basePrice",
      dataIndex: "basePrice",
      render: (text) => <>${text}</>,
      responsive: ["xs", "md"],
    },
    {
      title: "In Stock",
      key: "stock",
      dataIndex: "stock",
      responsive: ["xs", "md"],
    },
    {
      title: "Discount",
      key: "discountPercentage",
      dataIndex: "discountPercentage",
      render: (text) => <>{text}%</>,
      responsive: ["xs", "md"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() =>
              (window.location.href = `/admin/productdetails/${record.id}`)
            }
          >
            <EditOutlined />
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setCurrentProductId(record.id);
              setDeleteVisible(true);
            }}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
      responsive: ["xs", "md"],
    },
  ];

  return (
    <>
      <Search
        placeholder="input search text"
        allowClear
        size="large"
        style={{ width: "25%", margin: "16px 0" }}
        onChange={handleChange}
        loading={searchLoading}
      />
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: "max-content" }}
        pagination={false}
        loading={loading}
      />
      <CustomModal
        title="Delete Product"
        visibility={deleteVisible}
        setVisible={setDeleteVisible}
        handleClick={handleDelete}
        actionKey="delete"
        currentProductId={currentProductId}
        action="Delete"
      />
      <CustomModal
        title="Upload Image"
        visibility={uploadVisible}
        setVisible={setUploadVisible}
        handleClick={handleUpload}
        actionKey="upload"
        currentProductId={currentProductId}
        action="Upload"
        setSelectedFile={setSelectedFile}
      />
      <Flex gap="large" style={{ margin: 20, float: "inline-end" }}>
        <Button
          disabled={previousButton}
          onClick={() => {
            handlePreviousClick();
          }}
        >
          Previous
        </Button>
        <Button
          disabled={nextButton}
          onClick={() => {
            handleNextClick();
          }}
        >
          Next
        </Button>
      </Flex>
    </>
  );
}
