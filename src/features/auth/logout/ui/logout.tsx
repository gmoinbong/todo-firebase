import { Button } from '@/shared/ui';
import React, { FC, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/shared/config/firebase';
import { useNavigate } from 'react-router-dom';

export const Logout: FC = () => {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsPending(true);
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      text={isPending ? 'Logging out...' : 'Logout'}
      onClick={handleLogout}
    />
  );
};