import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";

const VideoUpload = () => {
  return (
    <Form.Item name="video" label="Upload Video">
      <Upload name="video" action="/upload" listType="text">
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Form.Item>
  );
};

export default VideoUpload;
