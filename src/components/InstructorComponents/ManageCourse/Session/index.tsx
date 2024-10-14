import React from 'react';
import TableSession from './TableSession';
// import ButtonSession from './ButtonSession';
import SearchSession from './SearchSession';
// import Course from '../../../components/InstructorComponents/ManageCourse/Course';
const Session = () => {
  return (
    <div className="manage-course-container">
      <h1>Session</h1>
      {/* <div className='mt-4'>
        <ButtonSession/>
      </div> */}
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