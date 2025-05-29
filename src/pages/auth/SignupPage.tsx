import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModals from '../../components/auth/AuthModals';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <AuthModals 
      initialModal="signup" 
      onClose={handleClose} 
    />
  );
};

export default SignupPage; 