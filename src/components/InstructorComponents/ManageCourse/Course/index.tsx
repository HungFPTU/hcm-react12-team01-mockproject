import CourseTable from './CourseTable';
import ButtonCourse from './ButtonCourse';
import SearchCourse from './SearchCourse';
import FilterCourse from './FilterCourse';
//fasdas
const Course = () => {
  return (
    <div className="manage-course-container max-w-full mx-auto px-4">

      <div className="mt-6 flex justify-between">

        <div className="flex gap-2">
          <div className="flex-1 max-w-full ">
            <SearchCourse onSearch={() => { }} />
          </div>

          <div className="flex-1">
            <FilterCourse onChange={() => { }} />
          </div>
        </div>

        <div className="flex-shrink-0">
          <ButtonCourse />
        </div>
      </div>

      <div className="mt-6">
        <CourseTable />
      </div>
    </div>
  );
};

export default Course;
