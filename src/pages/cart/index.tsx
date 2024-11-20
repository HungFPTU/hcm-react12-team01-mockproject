import React, { useState } from "react";
import { Typography, List, Card, Button, Row, Col, Divider, Checkbox, Tabs, Image } from "antd";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { CartStatusEnum } from "../../model/Cart";
import { useCart } from "../../context/CartContext";
import { helpers } from "../../utils";
const { Title, Text } = Typography;

const CartPage: React.FC = () => {
    // const navigate = useNavigate();
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<CartStatusEnum>(CartStatusEnum.new);
    const { cartItems, updateCartStatus, deleteCartItem, updateCartItems } = useCart(); // Use cartItems, updateCartStatus, and deleteCartItem from context


    const handleSelectAllChange = (e: CheckboxChangeEvent) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        if (isChecked) {
            setSelectedItems(cartItems.map((item: any) => item._id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleItemSelectChange = (itemId: string) => {
        setSelectedItems((prevSelectedItems) => (prevSelectedItems.includes(itemId) ? prevSelectedItems.filter((id) => id !== itemId) : [...prevSelectedItems, itemId]));
    };

    const tabItems = [
        {
            key: String(CartStatusEnum.new),
            label: "New"
        },
        {
            key: String(CartStatusEnum.cancel),
            label: "Cancel"
        },
        {
            key: String(CartStatusEnum.waiting_paid),
            label: "Waiting"
        },
        {
            key: String(CartStatusEnum.completed),
            label: "Completed"
        }
    ];

    const handleTabChange = (key: string) => {
        const status = key as CartStatusEnum;
        if (Object.values(CartStatusEnum).includes(status)) {
            setActiveTab(status);
            updateCartItemsByStatus(status);
        } else {
            console.error("Invalid tab status:", status);
        }
    };

    const updateCartItemsByStatus = async (status: CartStatusEnum) => {
        try {
            await updateCartItems(status); // Pass the status to updateCartItems
        } catch (error) {
            console.error("Error fetching cart items by status:", error);
        }
    };

    const handleDeleteCartItem = async (cartId: string) => {
        await deleteCartItem(cartId);
        updateCartItemsByStatus(activeTab);
        updateCartItems(activeTab);
    };

    const handleCheckout = async () => {
        try {
            for (const itemId of selectedItems) {
                await updateCartStatus(itemId, CartStatusEnum.waiting_paid);
            }
            setActiveTab(CartStatusEnum.waiting_paid); // Ensure the "Waiting" tab is active
            updateCartItemsByStatus(CartStatusEnum.waiting_paid); // Fetch items for the "Waiting" status
            updateCartItems(CartStatusEnum.waiting_paid);
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    // Tính toán lại các giá trị dựa trên các mục đã chọn
    const calculateSummary = () => {
        const selectedCartItems = cartItems.filter((item) => selectedItems.includes(item._id));
        const subtotal = selectedCartItems.reduce((acc, item) => acc + item.price, 0);
        const discount = selectedCartItems.reduce((acc, item) => acc + item.discount, 0);
        const total = selectedCartItems.reduce((acc, item) => acc + (item.price - (item.price * item.discount) / 100), 0);
        return {
            subtotal: helpers.moneyFormat(subtotal),
            discount: discount,
            total: helpers.moneyFormat(total)
        };
    };

    const { subtotal, discount, total } = calculateSummary();

    const handleConfirmPayment = async (cartId: string) => {
        try {
            await updateCartStatus(cartId, CartStatusEnum.completed);
            setActiveTab(CartStatusEnum.completed);
            updateCartItemsByStatus(CartStatusEnum.completed);
            updateCartItems(CartStatusEnum.completed);
        } catch (error) {
            console.error("Error during confirm payment:", error);
        }
    };

    const handleCancelOrder = async (cartId: string) => {
        try {
            await updateCartStatus(cartId, CartStatusEnum.cancel);
            setActiveTab(CartStatusEnum.cancel); // Ensure the "Cancel" tab is active
            updateCartItemsByStatus(CartStatusEnum.cancel); // Fetch items for the "Cancel" status
            updateCartItems(CartStatusEnum.cancel);
        } catch (error) {
            console.error("Error during cancel order:", error);
        }
    };

    return (
        <div className="container mx-auto min-h-screen bg-gradient-to-b from-white to-gray-50 p-8">

            <Tabs
                activeKey={String(activeTab)}
                onChange={handleTabChange}
                items={tabItems}
                className="custom-tabs mb-10 mt-10 transform "
                // type="line"
                size="large"
                tabBarStyle={{
                    marginBottom: "2rem",
                    background: "linear-gradient(to bottom, #fff, #fafafa)",
                    boxShadow: "0 4px 12px rgba(26, 35, 126, 0.15)",
                    padding: "0.5rem 1rem",
                    borderRadius: "12px 12px 0 0",
                    backdropFilter: "blur(8px)"
                }}
                tabBarGutter={32}
                animated={{
                    inkBar: true,
                    tabPane: true
                }}
                tabPosition="top"
                centered={true}

            />

            <Row gutter={32}>
                <Col span={16}>
                    <Card className="overflow-hidden rounded-xl border-4 bg-white ">
                        {activeTab === CartStatusEnum.waiting_paid ? (
                            <div className="waiting-tab-ui bg-gradient-to-br via-white to-gray-50 p-12">
                                <Title level={3} className="mb-12 text-center text-3xl text-gray-900">
                                    Pending Orders
                                </Title>
                                <List
                                    dataSource={cartItems}
                                    renderItem={(item) => (
                                        <List.Item key={item._id} className="py-10">
                                            <Card className="w-full rounded-3xl border border-gray-100 bg-white shadow-xl backdrop-blur-sm">
                                                <Row gutter={32} className="flex items-center p-8">
                                                    <Col span={16}>
                                                        <Text strong className="mb-4 block text-2xl font-light text-gray-600"> {/* Reduced text size */}
                                                            Course Name: <span className="font-medium text-gray-800">{item?.course_name}</span>
                                                        </Text>
                                                        <Text className="mt-4 block text-lg font-light text-gray-600">
                                                            Instructor: <span className="font-medium text-gray-800">{item?.instructor_name}</span>
                                                        </Text>
                                                        <div className="mt-8 space-y-4 border-t border-gray-100 pt-6">
                                                            <div className="flex justify-between text-lg text-gray-700">
                                                                <span className="font-serif">Original Price</span>
                                                                <span className="font-medium">{helpers.moneyFormat(item?.price)}</span>
                                                            </div>
                                                            <div className="flex justify-between text-lg text-emerald-600">
                                                                <span className="font-serif">Savings</span>
                                                                <span className="font-medium">{item?.discount}% OFF</span>
                                                            </div>
                                                            <div className="flex justify-between text-xl text-gray-900">
                                                                <span>Paid Price</span>
                                                                <span>{helpers.moneyFormat(item?.price - (item?.price * item?.discount) / 100)}</span>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col span={8} className="space-y-6 text-right">
                                                        <Button type="primary" onClick={() => handleConfirmPayment(item._id)} className="h-auto w-full rounded-2xl border-0 px-8 py-4 font-serif text-base text-white shadow-lg bg-blue-500 hover:bg-blue-700"> {/* Smaller button */}
                                                            Complete Payment
                                                        </Button>
                                                        <Button type="default" onClick={() => handleCancelOrder(item._id)} className="h-auto w-full rounded-2xl border-0  px-8 py-4 font-serif text-base text-white shadow-lg bg-red-500 hover:bg-red-700"> {/* Smaller button */}
                                                            Cancel Order
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        ) : activeTab === CartStatusEnum.completed ? (
                            <div className="completed-tab-ui rounded-[2rem] bg-gradient-to-br from-gray-50 via-white to-gray-50 p-12 shadow-inner">
                                <Title level={3} className="mb-12 text-center text-3xl font-extrabold tracking-wider text-gray-900">
                                    Completed Orders
                                </Title>
                                <List
                                    dataSource={cartItems.filter((item) => item.status === CartStatusEnum.completed)}
                                    renderItem={(item) => (
                                        <List.Item key={item._id} className="py-10">
                                            <Card className="w-full rounded-3xl border border-gray-100 bg-white/90 shadow-lg backdrop-blur-lg">
                                                <Row gutter={32} className="flex items-center p-8">
                                                    <Col span={16}>
                                                        <Text strong className="mb-4 block text-3xl tracking-wide text-gray-900">
                                                            {item?.course_name}
                                                        </Text>
                                                        <Text className="mt-4 block text-lg font-light italic text-gray-600">
                                                            Instructor: <span className="inline-block font-medium text-gray-900">{item?.instructor_name}</span>
                                                        </Text>
                                                        <div className="mt-8 space-y-4 border-t border-gray-100 pt-6">
                                                            <div className="flex justify-between text-lg text-gray-700">
                                                                <span className="font-serif">Original Price</span>
                                                                <span className="font-medium">{helpers.moneyFormat(item?.price)}</span>
                                                            </div>
                                                            <div className="flex justify-between text-lg text-green-600">
                                                                <span className="font-serif">Savings</span>
                                                                <span className="font-medium">{item?.discount}% OFF</span>
                                                            </div>
                                                            <div className="flex justify-between text-xl">
                                                                <span className="font-serif">Final Price</span>
                                                                <span className="font-bold text-gray-900">{helpers.moneyFormat(item?.price - (item?.price * item?.discount) / 100)}</span>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col span={8} className="space-y-6 text-right">
                                                        <Link to={`/course/${item?.course_id}`}>
                                                            <Button type="primary" className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full animate-pulse">
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
                        ) : (
                            <div className="default-tab-ui">
                                <div className="mb-6 flex items-center border-b border-gray-100 pb-4">
                                    <Checkbox checked={selectAll} onChange={handleSelectAllChange} className="text-lg font-medium text-gray-700">
                                        Select All Items
                                    </Checkbox>
                                </div>
                                <List
                                    dataSource={cartItems}
                                    renderItem={(item) => {
                                        const pricePaid = item.price_paid ?? 0;
                                        const price = item.price ?? 0;

                                        return (
                                            <List.Item key={item._id} className="border-b border-gray-50 py-6 last:border-0">
                                                <Card className="w-full border-0 bg-transparent shadow-none">
                                                    <Row gutter={24} className="flex items-center">
                                                        <Col span={1}>
                                                            <Checkbox checked={selectedItems.includes(item._id)} onChange={() => handleItemSelectChange(item._id)} />
                                                        </Col>

                                                        <Col span={5}>
                                                            <Image src={item?.course_image} alt={item?.name} className="rounded-lg object-cover" width={120} height={80} />
                                                        </Col>

                                                        <Col span={12}>
                                                            <Text strong className="block text-xl font-bold tracking-wide text-gray-800">
                                                                {item?.course_name}
                                                            </Text>
                                                            <Text className="mt-2 block text-base text-gray-600">By {item?.instructor_name}</Text>
                                                        </Col>

                                                        <Col span={6} className="text-right">
                                                            <div className="space-y-2">
                                                                <Text className="block text-lg font-semibold text-gray-900"> {/* Changed text color */}
                                                                    {helpers.moneyFormat(pricePaid)}
                                                                </Text>
                                                                {item.discount > 0 && (
                                                                    <>
                                                                        <Text className="block text-sm text-gray-500 line-through">{helpers.moneyFormat(price)}</Text>
                                                                        <Text className="block text-sm text-green-600">Sale {item.discount} %</Text>
                                                                    </>
                                                                )}
                                                                {item.status === CartStatusEnum.cancel && (
                                                                    <Button icon={<DeleteOutlined />} onClick={() => handleDeleteCartItem(item._id)} />
                                                                )}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </List.Item>
                                        );
                                    }}
                                />
                            </div>
                        )}
                    </Card>
                </Col>

                {activeTab !== CartStatusEnum.waiting_paid && activeTab !== CartStatusEnum.completed && (
                    <Col span={8}>
                        <Card className="sticky top-8 rounded-xl border-0 bg-white p-6 shadow-xl">
                            <Title level={3} className="mb-8 text-center font-bold tracking-wide text-gray-800">
                                Order Summary
                            </Title>

                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-600">
                                    <Text>Subtotal:</Text>
                                    <Text>{subtotal}</Text>
                                </div>

                                <div className="flex justify-between text-green-600">
                                    <Text>Discount:</Text>
                                    <Text>- {discount} %</Text>
                                </div>

                                <Divider className="my-6" />

                                <div className="flex justify-between">
                                    <Text className="text-xl font-bold text-gray-800">Total:</Text>
                                    <Text className="text-xl font-bold text-[#02005dc6]">{total}</Text>
                                </div>
                            </div>

                            <div className="mt-8 space-y-4">
                                <Button size="large" block className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full animate-pulse" icon={<ShoppingCartOutlined />} onClick={handleCheckout}>
                                    Checkout
                                </Button>
                            </div>
                        </Card>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default CartPage;
