import { Empty } from "antd";
import SubscribedItem from "../item";
import { SubscribedInstructor } from "../SubscribedInstructor";

interface SubscribedListProps {
  instructors: SubscribedInstructor[];
}

const SubscribedList = ({ instructors }: SubscribedListProps) => {
  if (instructors.length === 0) {
    return (
      <Empty
        className="text-center text-gray-500"
        description="No data available"
      />
    );
  }
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {instructors.map((instructor) => (
          <SubscribedItem
            key={instructor.id}
            name={instructor.name}
            phone={instructor.phone}
            email={instructor.email}
            avatarUrl={instructor.avatarUrl}
            onUnsubscribe={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default SubscribedList;
