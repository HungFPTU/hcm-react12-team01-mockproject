import TableLesson from './TableLesson';
import SearchLesson from './SearchLesson';
import ButtonLesson from './ButtonLesson';
import { Row, Col } from 'antd'; // Import Row and Col

const Lesson = () => {
  return (
    <div className="manage-course-container">
      <Row gutter={16} align="middle">
        <Col xs={24} sm={12} md={16}>
          <SearchLesson onSearch={() => { }} />
        </Col>
        <Col xs={24} sm={12} md={8} style={{ textAlign: 'right' }}>
          <ButtonLesson />
        </Col>
      </Row>
      <div className='mt-4'>
        <TableLesson />
      </div>
    </div>
  );
};

export default Lesson;