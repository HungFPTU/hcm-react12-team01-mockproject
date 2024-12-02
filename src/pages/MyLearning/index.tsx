import { Button, Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { CartStatusEnum } from "../../model/Cart";
import { helpers } from "../../utils";
import { useEffect, useRef, useState } from "react";
import { CartService } from "../../services/cart/cart.service";
import { CartResponse } from "../../model/admin/response/Cart.response";
const { Title } = Typography;

const MyLearning = () => {
  const [cartItems, setCartItems] = useState<CartResponse[]>([]);
  const hasMounted = useRef(false);

  const fetchCompletedCartItems = async () => {
    try {
      const response = await CartService.getCarts({
        searchCondition: {
          status: CartStatusEnum.completed,
          is_delete: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 20,
        },
      });
      const items = Array.isArray(response.data.data.pageData)
        ? response.data.data.pageData
        : [response.data.data.pageData];
      setCartItems(items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    fetchCompletedCartItems();
  }, []);

  return (
    <>
      <div className="completed-tab-ui rounded-[2rem] bg-gradient-to-br from-gray-50 via-white to-gray-50 p-12 shadow-inner">
        <Title level={3} className="mb-12 text-center text-3xl font-extrabold tracking-wider text-gray-900">
          Completed Orders
        </Title>
        <Table
          dataSource={cartItems.filter((item) => item.status === CartStatusEnum.completed)}
          columns={[
            {
              title: 'Course Name',
              dataIndex: 'course_name',
              key: 'course_name',
              render: (text: string, record: any) => (
                <Link to={`/course/${record.course_id}`}>
                  <span className="text-blue-500 hover:underline">{text}</span>
                </Link>
              )
            },
            {
              title: 'Instructor',
              dataIndex: 'instructor_name',
              key: 'instructor_name',
            },
            {
              title: 'Original Price',
              dataIndex: 'price',
              key: 'price',
              render: (price: number) => <span>{helpers.moneyFormat(price)}</span>
            },
            {
              title: 'Savings',
              dataIndex: 'discount',
              key: 'discount',
              render: (discount: number) => <span>{discount}% OFF</span>
            },
            {
              title: 'Final Price',
              key: 'finalPrice',
              render: (record: any) => (
                <span>
                  {helpers.moneyFormat(record.price - (record.price * record.discount) / 100)}
                </span>
              )
            },
            {
              title: 'Action',
              key: 'action',
              render: (record: any) => (
                <Link to={`/course/${record.course_id}`}>
                  <Button type="primary" className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full">
                    Learn Course
                  </Button>
                </Link>
              )
            },
          ]}
        />
      </div>
    </>
  );
};

export default MyLearning;
