import { Button, Card, Col, List, Row, Spin, Typography } from "antd";
import { Link } from "react-router-dom";
import { CartStatusEnum } from "../../model/Cart";
import { helpers } from "../../utils";
import { useEffect, useRef, useState } from "react";
import { CartService } from "../../services/cart/cart.service";
import { CartResponse } from "../../model/admin/response/Cart.response";
const { Title, Text } = Typography;

const MyLearning = () => {
  const [cartItems, setCartItems] = useState<CartResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const hasMounted = useRef(false);

  const fetchCompletedCartItems = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    fetchCompletedCartItems();
  }, []);
  if (loading) return <Spin tip="Loading course details..." />;

  return (
    <>
      <Row gutter={32} justify="center">
        {" "}
        <Col xs={24} sm={20} md={16} lg={14} xl={12}>
          {" "}
          <Card className="overflow-hidden rounded-xl border-4 bg-white ">
            <div className="completed-tab-ui rounded-[2rem] bg-gradient-to-br from-gray-50 via-white to-gray-50 p-12 shadow-inner">
              <Title
                level={3}
                className="mb-12 text-center text-3xl font-extrabold tracking-wider text-gray-900"
              >
                Completed Orders
              </Title>
              <List
                dataSource={cartItems.filter(
                  (item) => item.status === CartStatusEnum.completed
                )}
                renderItem={(item) => (
                  <List.Item key={item._id} className="py-10">
                    <Card className="w-full rounded-3xl border border-gray-100 bg-white/90 shadow-lg backdrop-blur-lg">
                      <Row gutter={32} className="flex items-center p-8">
                        <Col span={16}>
                          <Text
                            strong
                            className="mb-4 block text-3xl tracking-wide text-gray-900"
                          >
                            {item?.course_name}
                          </Text>
                          <Text className="mt-4 block text-lg font-light italic text-gray-600">
                            Instructor:{" "}
                            <span className="inline-block font-medium text-gray-900">
                              {item?.instructor_name}
                            </span>
                          </Text>
                          <div className="mt-8 space-y-4 border-t border-gray-100 pt-6">
                            <div className="flex justify-between text-lg text-gray-700">
                              <span className="font-serif">Original Price</span>
                              <span className="font-medium">
                                {helpers.moneyFormat(item?.price)}
                              </span>
                            </div>
                            <div className="flex justify-between text-lg text-green-600">
                              <span className="font-serif">Savings</span>
                              <span className="font-medium">
                                {item?.discount}% OFF
                              </span>
                            </div>
                            <div className="flex justify-between text-xl">
                              <span className="font-serif">Final Price</span>
                              <span className="font-bold text-gray-900">
                                {helpers.moneyFormat(
                                  item?.price -
                                    (item?.price * item?.discount) / 100
                                )}
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col span={8} className="space-y-6 text-right">
                          <Link to={`/course/${item.course_id}`}>
                            <Button
                              type="primary"
                              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full animate-pulse"
                            >
                              Learn Course
                            </Button>
                          </Link>
                        </Col>
                      </Row>
                    </Card>
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default MyLearning;
