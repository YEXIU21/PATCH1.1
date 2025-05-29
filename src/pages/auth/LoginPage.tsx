import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModals from '../../components/auth/AuthModals';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <AuthModals 
      initialModal="login" 
      onClose={handleClose} 
    />
  );
};

export default LoginPage; 