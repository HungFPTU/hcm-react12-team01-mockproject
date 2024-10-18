import TableLesson from './TableLesson';
import SearchLesson from './SearchLesson';
import ButtonLesson from './ButtonLesson';

const Lesson = () => {
  return (
    <div className="manage-course-container">
      <div className='mt-4'>
        <ButtonLesson/>
      </div>
      <div className='mt-4'>
        <SearchLesson onSearch={() => {}}/>
      </div>
      <div className='mt-4'>
        <TableLesson/>
      </div>
    </div>
  );
};

export default Lesson;