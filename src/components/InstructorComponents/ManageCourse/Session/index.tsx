import TableSession from './TableSession';
import ButtonSession from './ButtonSession';
import SearchSession from './SearchSession';

const Session = () => {
  return (
    <div className="manage-course-container">
      <div className='mt-4'>
        <ButtonSession/>
      </div>
      <div className='mt-4'>
        <SearchSession onSearch={() => {}}/>
      </div>
      <div className='mt-4'>
        <TableSession/>
      </div>
    </div>
  );
};

export default Session;