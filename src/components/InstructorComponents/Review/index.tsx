import SearchReview from "./SearchReview";
import TableReview from "./TableReview";

const Review = () => {
  return (
    <div className="manage-course-container">
      <div className="mt-4">
        <SearchReview onSearch={() => {}} />
      </div>
      <div className="mt-4">
        <TableReview />
      </div>
    </div>
  );
};

export default Review;
