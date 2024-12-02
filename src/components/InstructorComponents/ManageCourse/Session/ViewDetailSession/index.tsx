import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions } from 'antd';
import { Session } from '../../../../../model/admin/response/Session.response';
import { SessionService } from '../../../../../services/SessionService/session.service';
import { toast } from 'react-toastify';


const ViewDetailSession = () => {
  const { id } = useParams<{ id: string }>();

  const [session, setSession] = useState<Session | null>(null);
  // const navigate = useNavigate();
  const hasMounted = useRef(false);

  const fetchSessionDetails = useCallback(
    async (id: string) => {
      try {
        const res = await SessionService.getSessionById(id)
        const sessionData = res.data?.data as Session;
        console.log(res)
        console.log("sessionData>>", sessionData)
        if (sessionData) {
          setSession(sessionData);
        } else {
          toast.error("No page data available for this session.");
        }
      } catch{
        toast.error("Failed to fetch session details. Please try again.");
      }
    },
    []
  );

  useEffect(() => {
    console.log("SESSIONID>>>>>>>", id)
    if (hasMounted.current) return;
    hasMounted.current = true;
    if (id) {
      fetchSessionDetails(id);
    }
  }, [id, fetchSessionDetails]);


  if (!session) return <div>Session not found</div>;



  return (
    <Descriptions title="Course Details" bordered column={1}>
      <Descriptions.Item label="Title">{session.name}</Descriptions.Item>
      <Descriptions.Item label="course_id">{session.course_id}</Descriptions.Item>
      <Descriptions.Item label="Description">{session.description}</Descriptions.Item>
      <Descriptions.Item label="Position Order">{session.position_order}</Descriptions.Item>
      <Descriptions.Item label="Created At">{new Date(session.created_at).toLocaleDateString()}</Descriptions.Item>
      <Descriptions.Item label="Updated At">{new Date(session.updated_at).toLocaleDateString()}</Descriptions.Item>
    </Descriptions>
  );
};

export default ViewDetailSession;
