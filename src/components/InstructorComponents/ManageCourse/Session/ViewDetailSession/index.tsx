import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { LeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Session } from '../../../../../model/Session';
import Sessions from '../../../../../data/Sessions.json';
import { Editor } from '@tinymce/tinymce-react';


const ViewDetailSession = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = Sessions.sessions.find((s) => s.id === sessionId);
    if (session) {
      setSession(session as unknown as Session);
    } else {
      navigate('/instructor/manage-course/session');
    }
  }, [sessionId, navigate]);

  const onFinish = (values: Session) => {
    console.log('Form values:', values);
   
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDelete = () => {
    
    console.log('Xóa khóa học có ID:', sessionId);
  };

  if (!session) return <div>Session not found</div>;

  return (
    <div>
      <Form
        initialValues={session}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item label="Session Name" name="name" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Course Name" name="courseName" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item label="Lesson" name="lesson">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Description" name="description">
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
        <Form.Item label="Created At" name="created_at">
          <Input disabled />
        </Form.Item>
      </Form>
      
      <div className='flex justify-between gap-2'>
        <div className='flex gap-2'>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
          <Button onClick={handleDelete} type="primary" danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </div>
        <div>
          <Button onClick={handleGoBack} icon={<LeftOutlined />}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailSession;
