import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import React from "react";

const VideoUpload: React.FC = () => {
  return (
    <Form.Item name="video" label="Upload Video">
      <Upload name="video" action="/upload" listType="text">
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Form.Item>
  );
};

export default VideoUpload;
