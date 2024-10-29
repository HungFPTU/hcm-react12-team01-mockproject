interface Course {
    id: number;
    title: string;
    author: string;
    imageUrl?: string;
    sessions: number;
    lessons: number;
    duration: string;
}

interface CourseItemProps {
    course: Course;
    onGoToDetail?: (id: number) => void;
}

function CourseItem ({ course, onGoToDetail } :CourseItemProps) {
    return (
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition-all mx-4 overflow-hidden">
            <div className="relative">
                <img
                    src={course.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                    <span className="bg-gray-200 text-sm px-3 py-1 rounded-full">
                        {course.sessions} sessions
                    </span>
                    <span className="bg-gray-200 text-sm px-3 py-1 rounded-full">
                        {course.lessons} lessons
                    </span>
                    <span className="bg-gray-200 text-sm px-3 py-1 rounded-full">
                        {course.duration}
                    </span>
                </div>

                <h3 className="text-lg font-semibold mb-2 truncate">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-4 truncate">{course.author}</p>

                <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-medium transition-colors"
                    onClick={() => onGoToDetail?.(course.id)}
                >
                    Learn
                </button>
            </div>
        </div>
    );
};

export default CourseItem;
