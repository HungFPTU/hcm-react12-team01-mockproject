export interface CreateLessonResponse{
    name: string;
    course_id: string;
    session_id: string;
    lesson_type: string;
    description: string;
    video_url: string;
    image_url?: string;
    full_time: number;
    position_order: number;
}