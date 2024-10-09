// src/components/RegisterInstructor/RegisterInstructor.tsx

import RegisterStudent from '../RegisterStudent/RegisterStudent';

interface RegisterInstructorProps {
    onRegisterSuccess: () => void;
}

const RegisterInstructor = ({ onRegisterSuccess }: RegisterInstructorProps) => {
    return (
        <div>
            <h3 className='text-xl font-semibold mb-2'>Instructor Registration</h3>
            <RegisterStudent onRegisterSuccess={onRegisterSuccess} />
            
        </div>
    );
};

export default RegisterInstructor;
