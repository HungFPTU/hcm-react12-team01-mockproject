import { useState } from 'react';
import { Button, Modal, Form, Input} from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { Session } from '../../../../../model/Session';

// const { Option } = Select;

const ButtonSession = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values: Session) => {
    console.log('Submitted values:', values);
    setIsModalVisible(false);
  };

  return (
    <>
      <Button onClick={showModal} style={{ marginRight: '10px' }}>Create Session</Button>
      
      <Modal
        title="Create Session"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
            <Form.Item name= "sessionName" label="Session Name" labelCol={{
            span: 24,
          }} rules={[{ required: true}]} >
                <Input.TextArea style={{height: '20px', width: '100%'}}/>
            </Form.Item>

          <Form.Item name="courseName" label="Course Name" labelCol={{
            span: 24,
          }} rules={[{ required: true }]}>
            <Input.TextArea style={{height: '20px', width: '100%'}}/>
          </Form.Item>

          <Form.Item name="description" label="Description" labelCol={{
            span: 24,
          }}>
            <Editor
              apiKey="8pum9vec37gu7gir1pnpc24mtz2yl923s6xg7x1bv4rcwxpe"
              init={{
                width: '100%',
                height: 300,
                plugins: [
                  'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
                  'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media',
                  'table', 'emoticons', 'help'
                ],
                toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
                  'forecolor backcolor emoticons | help',
                menubar: 'file edit view insert format tools table help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Session
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ButtonSession;
