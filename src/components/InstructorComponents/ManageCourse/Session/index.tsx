import TableSession from './TableSession';
import ButtonSession from './ButtonSession';
import SearchSession from './SearchSession';
import { Row, Col } from 'antd'; // Import Row and Col

const Session = () => {
  return (
    <div className="manage-course-container">
      <Row gutter={16} align="middle"> {/* Use Row for horizontal layout */}
        <Col xs={24} sm={12} md={16}> {/* Adjust column widths as needed */}
          <SearchSession onSearch={() => { }} />
        </Col>
        <Col xs={24} sm={12} md={8} style={{ textAlign: 'right' }}>
          <ButtonSession />
        </Col>
      </Row>
      <div className='mt-4'>
        <TableSession />
      </div>
    </div>
  );
};

export default Session;