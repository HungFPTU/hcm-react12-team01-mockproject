import React, { useCallback, useEffect, useState } from "react";
import { PurchaseService } from "../../../../services/PurchaseService/purchase.service";
import { GetPurchaseResponseData } from "../../../../model/admin/response/Purchase.response";
import { GetCourseRequest } from "../../../../model/admin/request/Course.request";
import { CourseService } from "../../../../services/CourseService/course.service";
import { GetCourseResponsePageData } from "../../../../model/admin/response/Course.response";
import { Col, Row } from "antd";
import {
  DollarOutlined,
  BookOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import StatisticCard from "../StatisticCard";
import { Category } from "../../../../model/admin/response/Category.response";
import { CategoryService } from "../../../../services/category/category.service";
import { GetCategoryRequest } from "../../../../model/admin/request/Category.request";
import { UserService } from "../../../../services/UserService/user.service";
import { useCart } from "../../../../context/CartContext";

export enum UserRole {
  ADMIN = "admin",
  INSTRUCTOR = "instructor",
  STUDENT = "student",
}

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  status: boolean;
  is_verified: boolean;
}
const DashboardTable: React.FC = () => {
  const { cartCompletedItems, getCompletedCount } = useCart();
  const [tableData, setTableData] = useState<GetPurchaseResponseData[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [coursesData, setCoursesData] = useState<GetCourseResponsePageData[]>(
    []
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const role = userInfo.role;
  const formatTotalAmount = (amount: number) => {
    return (
      amount.toLocaleString("en-US", {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      }) + " VND"
    );
  };
  useEffect(() => {
    fetchDashBoard();
  }, []);
  useEffect(() => {
    const total = tableData.reduce((sum, item) => sum + item.price_paid, 0);
    setTotalAmount(total);
  }, [tableData]);
  const fetchDashBoard = useCallback(async () => {
    try {
      // Get user info from localStorage
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const role = userInfo.role;

      let response;

      // Call appropriate API based on role
      switch (role) {
        case UserRole.ADMIN:
          response = await PurchaseService.getPurchaseForAdmin({
            pageInfo: {
              pageNum: 1,
              pageSize: 10000,
            },
            searchCondition: {
              purchase_no: "",
              cart_no: "",
              course_id: "",
              status: "",
              is_delete: false,
            },
          });
          fetchCoursesData();
          loadCategories();
          fetchUsersData(true, true);
          break;
        case UserRole.INSTRUCTOR:
          response = await PurchaseService.getPurchaseForInstructor({
            pageInfo: {
              pageNum: 1,
              pageSize: 10000,
            },
            searchCondition: {
              purchase_no: "",
              cart_no: "",
              course_id: "",
              status: "",
              is_delete: false,
            },
          });
          fetchCoursesData();
          getCompletedCount();
          break;
        case UserRole.STUDENT:
          response = await PurchaseService.getPurchaseForStudent({
            pageInfo: {
              pageNum: 1,
              pageSize: 10000,
            },
            searchCondition: {
              purchase_no: "",
              cart_no: "",
              course_id: "",
              status: "",
              is_delete: false,
            },
          });
          getCompletedCount();
          break;
        default:
          throw new Error("Invalid role");
      }

      if (response.data?.data) {
        setTableData(response.data.data.pageData);
      }
    } catch (error) {
      console.error("Error fetching purchase data:", error);
    }
  }, []);
  const fetchCourse = async (params: GetCourseRequest) => {
    try {
      const response = await CourseService.getCourse(params);
      return response.data;
    } catch (error) {
      console.error("Fail to fetch courses:", error);
    }
  };
  const fetchCoursesData = useCallback(async () => {
    try {
      const searchCondition = {
        keyword: "",
        category_id: "",
        status: "",

        is_delete: false,
      };

      const response = await fetchCourse({
        searchCondition,
        pageInfo: {
          pageNum: 1,
          pageSize: 1000,
        },
      });

      if (response && response.success) {
        setCoursesData(response.data.pageData);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  }, []);

  const fetchCategories = async (params: GetCategoryRequest) => {
    try {
      const response = await CategoryService.getCategory(params);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw error;
    }
  };
  const loadCategories = useCallback(async () => {
    const searchCondition = {
      keyword: "",
      is_parent: true,
      is_delete: false,
    };

    try {
      const response = await fetchCategories({
        searchCondition,
        pageInfo: { pageNum: 1, pageSize: 10 },
      });

      if (response && response.success) {
        setCategories(response.data.pageData);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }, []);

  const fetchUsersData = (status: boolean, isVerified: boolean) => {
    UserService.getUsers(status, isVerified)
      .then((response) => {
        if (response.data.success) {
          const fetchedUsers = response.data.data.pageData;
          setUsers(fetchedUsers);
        }
      })
      .catch(() => {});
  };

  return (
    <>
      <strong>
        <Row gutter={16}>
          {role === UserRole.ADMIN && (
            <>
              <Col span={6}>
                <StatisticCard
                  icon={<DollarOutlined />}
                  title="Total Balance"
                  value={formatTotalAmount(totalAmount)}
                  borderColor="#fadb14"
                  iconColor="#fadb14"
                />
              </Col>
              <Col span={6}>
                <StatisticCard
                  icon={<TagOutlined />}
                  title="Total Categories"
                  value={categories.length}
                  borderColor="#722ed1"
                  iconColor="#722ed1"
                />
              </Col>
              <Col span={6}>
                <StatisticCard
                  icon={<BookOutlined />}
                  title="Total Courses"
                  value={coursesData.length}
                  borderColor="#eb2f96"
                  iconColor="#eb2f96"
                />
              </Col>
              <Col span={6}>
                <StatisticCard
                  icon={<UserOutlined />}
                  title="Total Users"
                  value={users.length}
                  borderColor="#722ed1"
                  iconColor="#722ed1"
                />
              </Col>
            </>
          )}
          {role === UserRole.INSTRUCTOR && (
            <>
              <Col span={8}>
                <StatisticCard
                  icon={<DollarOutlined />}
                  title="Total Balance"
                  value={formatTotalAmount(totalAmount)}
                  borderColor="#fadb14"
                  iconColor="#fadb14"
                />
              </Col>
              <Col span={8}>
                <StatisticCard
                  icon={<BookOutlined />}
                  title="Total Courses"
                  value={coursesData.length}
                  borderColor="#eb2f96"
                  iconColor="#eb2f96"
                />
              </Col>
              <Col span={8}>
                <StatisticCard
                  icon={<TagOutlined />}
                  title="Total Bought Courses"
                  value={cartCompletedItems.length}
                  borderColor="#722ed1"
                  iconColor="#722ed1"
                />
              </Col>
            </>
          )}
          {role === UserRole.STUDENT && (
            <>
              <Col span={8}>
                <StatisticCard
                  icon={<BookOutlined />}
                  title="Total Bought Courses"
                  value={cartCompletedItems.length}
                  borderColor="#eb2f96"
                  iconColor="#eb2f96"
                />
              </Col>
              <Col span={8}>
                <StatisticCard
                  icon={<DollarOutlined />}
                  title="Total Balance"
                  value={formatTotalAmount(totalAmount)}
                  borderColor="#fadb14"
                  iconColor="#fadb14"
                />
              </Col>
            </>
          )}
        </Row>
      </strong>
    </>
  );
};

export default DashboardTable;
