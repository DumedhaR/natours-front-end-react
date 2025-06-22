import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosIns from '../services/axiosInstance';
import { showAlert } from '../utills/alert';

const BookingSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) return;

    const confirmBooking = async () => {
      try {
        await axiosIns.post('/api/v1/bookings/save-booking-session', { sessionId });
        showAlert('success', 'Booking confirmed');
      } catch (err: unknown) {
        let message = 'Booking confirmation failed';
        if (axios.isAxiosError(err)) {
          message = err.response?.data?.message || err.message || message;
        } else if (err instanceof Error) {
          message = err.message;
        }
        showAlert('error', message);
      } finally {
        setLoading(false);
        navigate('/');
      }
    };

    confirmBooking();
  }, [searchParams, navigate]);

  return (
    <main className="main">
      <div className="container">
        <h1 className="heading-primary">Booking Successful!</h1>
        <p className="text">
          {loading
            ? 'Verifying your payment, please wait...'
            : 'Redirecting you...'}
        </p>
      </div>
    </main>
  );
};

export default BookingSuccess;
