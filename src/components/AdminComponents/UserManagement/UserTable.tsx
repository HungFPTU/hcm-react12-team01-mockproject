import { Table } from "antd";

const UserTable = ({ columns, filteredUsers }: any) => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={filteredUsers}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["4", "8"],
          position: ["bottomRight"],
        }}
      />
    </>
  );
};

export default UserTable;
