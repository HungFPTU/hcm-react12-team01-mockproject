import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserService } from "../../services/UserService/user.service";

const InstructorDetail = () => {
  const { id: instructorId } = useParams<{ id: string }>();
  const [instructorDetails, setInstructorDetails] = useState<any>(null);

  useEffect(() => {
    const fetchInstructorDetails = async () => {
      if (!instructorId) {
        console.error("Instructor ID is undefined");
        return;
      }

      try {
        const response = await UserService.getUserDetails(instructorId);
        setInstructorDetails(response.data.data);
      } catch (error) {
        console.error("Failed to fetch instructor details:", error);
      }
    };

    fetchInstructorDetails();
  }, [instructorId]);

  return (
    <div className="flex-1 pt-16 mt-4 p-4 overflow-auto">
      {instructorDetails ? (
        <div className="p-8 bg-gray-100 min-h-screen overflow-y-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img src={instructorDetails.avatar_url} alt="No Image" className="w-32 h-32 rounded-full border-4 border-white -mt-16 mb-5 shadow-lg"/>
                        <div className="ml-8">
                            <h1 className="text-3xl font-bold">Name: {instructorDetails.name}</h1>
                            <p className="text-gray-600">Email: {instructorDetails.email}</p>
                            <p className="text-gray-600 mt-2">Phone: {instructorDetails.phone_number }</p>
                        </div>    
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg" >
                        Subscribe
                    </button>
                </div>
            </div>
            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                <h1>About me</h1>
                <div className="mt-4 text-lg">{instructorDetails.description}</div>
            </div>
        </div>
      ) : (
        <p className="text-lg text-gray-600">Loading instructor details...</p>
      )}
    </div>
  );
};

export default InstructorDetail;
