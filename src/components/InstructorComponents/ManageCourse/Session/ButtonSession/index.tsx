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
            <Form.Item name= "sessionName" label="Session Name" rules={[{ required: true}]} >
                <Input.TextArea/>
            </Form.Item>

          <Form.Item name="courseName" label="Course Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Editor
              apiKey="8pum9vec37gu7gir1pnpc24mtz2yl923s6xg7x1bv4rcwxpe"
              init={{
                height: 300,
                menubar: 'favs file edit view insert format tools table help',
                menu: {
                  favs: { title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons' }
                },
                plugins: [
                  'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
                  'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
                  'media', 'table', 'emoticons', 'help'
                ],
                toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
                  'forecolor backcolor emoticons | help',
                content_css: 'css/content.css'
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
