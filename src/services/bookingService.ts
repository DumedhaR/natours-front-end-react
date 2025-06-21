import { loadStripe } from '@stripe/stripe-js';
import axiosIns from './axiosInstance';
import axios from 'axios';
import { showAlert } from '../utills/alert';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const bookTour = async (tourId: string) => {
  try {
    // console.log(tourId);
    const res = await axiosIns.get(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log(res.data.session.id);
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId: res.data.session.id });
  } catch (err: unknown) {
    if (axios.isAxiosError(err) || err instanceof Error) {
        console.error(err);
    }
    showAlert('error', 'Something went wrong booking the tour!');
  }  
};
