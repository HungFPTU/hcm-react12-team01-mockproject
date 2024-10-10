import React from 'react';
import { Table, Tag } from 'antd';

const { Column } = Table;
interface DataType {
    key: string;
    courseName: string;
    oldStatus: string;
    newStatus: string;
    comment: string;
}

const data: DataType[] = [
    {
        key: '1',
        courseName: 'Java',
        oldStatus: 'New',
        newStatus: 'Waitting Approvement',
        comment: 'No comment',
    },
    {
        key: '2',
        courseName: 'Python',
        oldStatus: 'Waitting Approvement',
        newStatus: 'Approve',
        comment: 'Approve',
    },
    {
        key: '3',
        courseName: 'C++',
        oldStatus: 'Waitting Approvement',
        newStatus: 'Rejected',
        comment: 'Your course is lack of images',
    },
];

const changeColor: (status: string) => string = (status: string) => {
    let color = 'green';
    if (status === 'New') {
        color = 'blue';
    } else if (status === 'Waitting Approvement') {
        color = 'yellow';
    } else if (status === 'Rejected') {
        color = 'volcano';
    }
    return color;
};

const CourseLogTable: React.FC = () => {

    return (
        <>
            <Table<DataType> dataSource={data}>
                <Column title="Course Name" dataIndex="courseName" key="courseName" />
                <Column
                    title="Old Status"
                    dataIndex="oldStatus"
                    key="oldStatus"
                    render={(oldStatus: string) => ( // Changed type to string
                        <>
                            <Tag color={changeColor(oldStatus)} key={oldStatus}>
                                {oldStatus.toUpperCase()}
                            </Tag>
                        </>
                    )}
                />
                <Column
                    title="New Status"
                    dataIndex="newStatus"
                    key="newStatus"
                    render={(newStatus: string) => ( // Changed type to string
                        <>
                            <Tag color={changeColor(newStatus)} key={newStatus}>
                                {newStatus.toUpperCase()}
                            </Tag>
                        </>
                    )}
                />
                <Column title="Comment" dataIndex="comment" key="comment" />


            </Table>
        </>

    );
}

export default CourseLogTable;