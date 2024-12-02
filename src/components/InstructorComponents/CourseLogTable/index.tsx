import { useState, useEffect, useRef, useCallback } from "react";
import { Table, Popover, Input } from "antd";
import { CourseLogResponseData } from "../../../model/admin/response/Course.response";
import { CourseStatusEnum } from "../../../model/Course";
import { CourseService } from "../../../services/CourseService/course.service";

const CoursesLogTable = () => {
    const [coursesLogData, setCoursesLogData] = useState<CourseLogResponseData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDataEmpty, setIsDataEmpty] = useState(false);
    const hasMounted = useRef(false);


    const fetchCourseLogData = useCallback(async () => {
        try {
            // 1. Fetch courses first
            const courseResponse = await CourseService.getCourse({
                searchCondition: {
                    keyword: searchQuery,
                    category_id: "",
                    status: undefined,
                    is_delete: false,
                },
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                },
            });

            if (courseResponse && courseResponse.data.success) {

                // 2. Map over courses and fetch logs for each
                const coursesLogPromises = courseResponse.data.data.pageData.map(async (course) => {
                    const courseLogResponse = await CourseService.getCourseLog({
                        searchCondition: {
                            keyword: "",
                            course_id: course._id, // Fetch logs for this specific course ID
                            old_status: undefined,
                            new_status: undefined,
                            is_delete: false,
                        },
                        pageInfo: {
                            pageNum: 1,
                            pageSize: 10,
                        },
                    });

                    if (courseLogResponse && courseLogResponse.data.success) {
                        return courseLogResponse.data.data.pageData; // Return log data for this course
                    } else {
                        return []; // Return an empty array if there's an error or no logs
                    }
                });

                // 3. Wait for all log fetches to complete
                const allCoursesLogs = await Promise.all(coursesLogPromises);

                // 4. Flatten the array of arrays and update state
                const flattenedLogs = allCoursesLogs.flat();
                setCoursesLogData(flattenedLogs);
                setIsDataEmpty(flattenedLogs.length === 0);
            }

        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }, [searchQuery])



    useEffect(() => {
        if (hasMounted.current) return;
        hasMounted.current = true;
        fetchCourseLogData();
    }, []);


    const handleSearch = () => {
        fetchCourseLogData();
    };



    const columns = [
        {
            title: "Course Name",
            dataIndex: "course_name",
            key: "course_name",
        },
        {
            title: "Old Status",
            dataIndex: "old_status",
            key: "old_status",
            render: (status: CourseStatusEnum) => {
                let statusText = "";
                let statusColor = "";
                let borderColor = "";
                let popoverContent = "";

                switch (status) {
                    case CourseStatusEnum.New:
                        statusText = "New";
                        statusColor = "text-blue-500";
                        borderColor = "border-blue-500";
                        popoverContent = "You can send approval request to admin";
                        break;
                    case CourseStatusEnum.WaitingApprove:
                        statusText = "Waiting for Approval";
                        statusColor = "text-orange-300";
                        borderColor = "border-orange-300";
                        popoverContent = "Please watting for the approval from admin";

                        break;
                    case CourseStatusEnum.Approved:
                        statusText = "Approved";
                        statusColor = "text-green-500";
                        borderColor = "border-green-500";
                        popoverContent =
                            "Your course has been approved, you can activate the course";

                        break;
                    case CourseStatusEnum.Rejected:
                        statusText = "Rejected";
                        statusColor = "text-red-500";
                        borderColor = "border-red-500";
                        popoverContent =
                            "Your course has been rejected, please check your course and resend approval request to admin";

                        break;
                    case CourseStatusEnum.Active:
                        statusText = "Active";
                        statusColor = "text-purple-500";
                        borderColor = "border-purple-500";
                        popoverContent =
                            "Your course has been activated, now student can see your course at homepage!";

                        break;
                    case CourseStatusEnum.Inactive:
                        statusText = "Inactive";
                        statusColor = "text-gray-500";
                        borderColor = "border-gray-500";
                        popoverContent =
                            "Your course has been inactivated, now student can not see your course at homepage!";

                        break;
                    default:
                        statusText = "Unknown";
                        statusColor = "text-gray-500";
                        borderColor = "border-gray-500";
                        popoverContent = "NO CAP!";

                        break;
                }

                return (
                    <Popover content={`${popoverContent}`}>
                        <span
                            className={`font-semibold ${statusColor} border-2 ${borderColor} px-2 py-1 rounded-md`}
                        >
                            {statusText}
                        </span>
                    </Popover>
                );
            },
        },
        {
            title: "New Status",
            dataIndex: "new_status",
            key: "new_status",
            render: (status: CourseStatusEnum) => {
                let statusText = "";
                let statusColor = "";
                let borderColor = "";
                let popoverContent = "";

                switch (status) {
                    case CourseStatusEnum.New:
                        statusText = "New";
                        statusColor = "text-blue-500";
                        borderColor = "border-blue-500";
                        popoverContent = "You can send approval request to admin";
                        break;
                    case CourseStatusEnum.WaitingApprove:
                        statusText = "Waiting for Approval";
                        statusColor = "text-orange-300";
                        borderColor = "border-orange-300";
                        popoverContent = "Please watting for the approval from admin";

                        break;
                    case CourseStatusEnum.Approved:
                        statusText = "Approved";
                        statusColor = "text-green-500";
                        borderColor = "border-green-500";
                        popoverContent =
                            "Your course has been approved, you can activate the course";

                        break;
                    case CourseStatusEnum.Rejected:
                        statusText = "Rejected";
                        statusColor = "text-red-500";
                        borderColor = "border-red-500";
                        popoverContent =
                            "Your course has been rejected, please check your course and resend approval request to admin";

                        break;
                    case CourseStatusEnum.Active:
                        statusText = "Active";
                        statusColor = "text-purple-500";
                        borderColor = "border-purple-500";
                        popoverContent =
                            "Your course has been activated, now student can see your course at homepage!";

                        break;
                    case CourseStatusEnum.Inactive:
                        statusText = "Inactive";
                        statusColor = "text-gray-500";
                        borderColor = "border-gray-500";
                        popoverContent =
                            "Your course has been inactivated, now student can not see your course at homepage!";

                        break;
                    default:
                        statusText = "Unknown";
                        statusColor = "text-gray-500";
                        borderColor = "border-gray-500";
                        popoverContent = "NO CAP!";

                        break;
                }

                return (
                    <Popover content={`${popoverContent}`}>
                        <span
                            className={`font-semibold ${statusColor} border-2 ${borderColor} px-2 py-1 rounded-md`}
                        >
                            {statusText}
                        </span>
                    </Popover>
                );
            },
        },
        {
            title: "Comment",
            dataIndex: "comment",
            key: "comment",
            render: (comment: string) => comment,
        },


    ];
    return (
        <div className="w-5em">
            <Input.Search
                className="w-1/4"
                placeholder="Search courses..."
                value={searchQuery}
                onSearch={handleSearch}
                onPressEnter={handleSearch}
                onChange={(e) => setSearchQuery(e.target.value)}
                enterButton
            />
            <div className="w-full">
                {isDataEmpty ? (
                    <div className="text-center text-red-500">No courses found.</div>
                ) : (
                    <Table<CourseLogResponseData>
                        columns={columns}
                        dataSource={coursesLogData}
                        rowKey="_id"
                        className="w-full shadow-md rounded-lg overflow-hidden"
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} of ${total} courses`,
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default CoursesLogTable;
