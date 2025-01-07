// CompleteSignup.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/superbase';
import { useNavigate } from 'react-router-dom';

const CompleteSignup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const completeSignup = async () => {
      try {
        // Get the current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        if (!user) {
          navigate('/');
          return;
        }

        // Get the pending user details
        const pendingDetails = JSON.parse(localStorage.getItem('pendingUserDetails'));
        if (!pendingDetails) {
          navigate('/home');
          return;
        }

        // Create the profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: user.id,
              email: pendingDetails.email,
              first_name: pendingDetails.first_name,
              last_name: pendingDetails.last_name,
              phone: pendingDetails.phone,
            },
          ]);

        if (profileError) throw profileError;

        // Clear the pending details
        localStorage.removeItem('pendingUserDetails');

        // Redirect to home
        navigate('/home');
      } catch (error) {
        setError(error.message);
      }
    };

    completeSignup();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error completing signup: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-gray-600">Completing your registration...</div>
    </div>
  );
};

export default CompleteSignup;