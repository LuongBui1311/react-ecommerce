import { Typography, Row, Col, MenuProps, Spin } from "antd";
import PageDropDown from "../paginationDropDown";
import { useEffect, useRef, useState } from "react";
import IProduct from "../../interfaces/IProduct";
import "./style.css";
import Search from "antd/es/input/Search";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductByName } from "../../api/apiCall";
import ProductCard from "../productCard";
import { ADMIN } from "../../constants";
import IPagination from "../../interfaces/IPagination";

export default function ProductList() {
  // Component states
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [timeoutId, setTimeoutId] = useState<number | undefined | null>(
    undefined
  );
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<IPagination>({
    current: 0,
    pageSize: 6,
  });
  const [menuValue, setMenuValue] = useState("6 items");
  const [hasMore, setHasMore] = useState(true);
  const user = useSelector((state: any) => state.users);
  const elementRef = useRef(null);
  const items: MenuProps["items"] = [
    {
      key: "6",
      label: "6 items",
    },
    {
      key: "8",
      label: "8 items",
    },
    {
      key: "12",
      label: "12 items",
    },
  ];

  // Call API
  const fetchData = async (
    keyword: string | null,
    currentPage: number,
    pageSize: number,
    productList: IProduct[]
  ) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = getProductByName(keyword, currentPage, pageSize);
    response
      .then((res) => {
        const productsWithKey = res.data.map((product: IProduct) => ({
          ...product,
          key: product.id,
        }));
        setProductList([...productList, ...productsWithKey]);
        if (res.data.length === 0) {
          setHasMore(false);
        }
      })
      .catch()
      .finally(() => {
        setLoading(false);
      });
  };

  // Event Handlers
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const selectedItem: any = items.find((item) => item?.key === e.key);
    if (selectedItem) {
      setMenuValue(selectedItem.label);
      const newSize = selectedItem.key?.toString();
      if (newSize) {
        setPagination({ current: 1, pageSize: parseInt(newSize, 10) });
        setHasMore(true);
        fetchData(searchInput, 1, parseInt(newSize, 10), []);
      }
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    console.log(event.target.value)
    const keyword = (event.target.value) ? event.target.value : null;
    setHasMore(true);
    setSearchInput(keyword);
    const newTimeout = setTimeout(() => {
      fetchData(keyword, 1, pagination.pageSize, []);
    }, 1000);
    setTimeoutId(newTimeout);
    setPagination((pagination) => ({ ...pagination, current: 1 }));
  };
  const onIntersection = (entries: any) => {
    const firstEntry = entries[0];
    console.log(searchInput);
    if (firstEntry.isIntersecting && hasMore) {
      fetchData(
        searchInput,
        pagination.current + 1,
        pagination.pageSize,
        productList
      );
      setPagination((page) => ({
        ...page,
        current: pagination.current + 1,
      }));
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [productList.length]);

  return (
    <>
      <Row
        justify="space-between"
        align="middle"
        style={{ margin: "0 auto 20px" }}
      >
        <Col>
          <Typography.Title level={3} className="primary--color">
            Product List
          </Typography.Title>
        </Col>
        <Col>
          <Row gutter={[10, 10]}>
            <Col>
              <PageDropDown
                items={items}
                handleMenuClick={handleMenuClick}
                menuValue={menuValue}
              />
            </Col>
            <Col>
              <Search
                placeholder="input search text"
                onChange={handleChange}
                enterButton
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Spin spinning={loading}>
        <Row gutter={[16, { xs: 24, sm: 24, md: 16 }]}>
          {productList.map((data: IProduct) => (
            <Col xs={24} sm={24} md={12} lg={8} key={data.id}>
              <Link
                to={`${user.role === ADMIN ? "/admin" : ""}/productdetails/${
                  user.role === ADMIN ? data.id : data.urlName
                }`}
              >
                <ProductCard data={data} />
              </Link>
            </Col>
          ))}
        </Row>
      </Spin>
      {hasMore && <p ref={elementRef}></p>}
    </>
  );
}
