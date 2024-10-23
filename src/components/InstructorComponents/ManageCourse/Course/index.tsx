import CourseTable from './CourseTable';
import ButtonCourse from './ButtonCourse';
import SearchCourse from './SearchCourse';
import FilterCourse from './FilterCourse';

const Course = () => {
  return (
    <div className="manage-course-container">
      <div className='mt-4'>
        <ButtonCourse/>
      </div>
      <div className='mt-4'>
        <SearchCourse onSearch={() => {}}/>
      </div>
      <div className='mt-4'>
        <FilterCourse onChange={() => {}}/>
      </div>
      <div className='mt-4'>
        <CourseTable/>
      </div>
    </div>
  );
}
export default Course;