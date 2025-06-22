import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { signup } from '../services/authService';
import axios from 'axios';
import { showAlert } from '../utills/alert';

type FormValues = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignupPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const password = watch('password');

  const onSubmit = async (data: FormValues) => {
    setLoading(true); 
    try {
      const result = await signup(data);
      if(result.status === 'success'){
            setUser(result.data.user);
            showAlert('success', 'Signup successful');
            navigate('/me');
        } 
    } catch (err: unknown) {
        let message = 'Signup failed, Please try again';
        if (axios.isAxiosError(err)) {
          message = err.response?.data?.message || err.message || message;
        } else if (err instanceof Error) {
          message = err.message;
        }
        
        showAlert('error', message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Create your account!</h2>
        <form className="form form--signup" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="form__group">
            <label className="form__label" htmlFor="name">Your name</label>
            <input
              className="form__input"
              id="name"
              {...register('name', {
                required: 'User name is required',
                minLength: {
                  value: 4,
                  message: 'User name must be at least 4 characters long',
                },
                maxLength: {
                  value: 20,
                  message: 'User name must be at most 20 characters long',
                },
                pattern: {
                  value: /^[a-zA-Z0-9._\- ]+$/,
                  message:
                    'User name can only contain letters, numbers, dots (.), underscores (_), and hyphens (-)',
                },
              })}
            />
            {errors.name && <small className='form__error'>{errors.name.message}</small>}
          </div>

          {/* Email */}
          <div className="form__group">
            <label className="form__label" htmlFor="email">Email address</label>
            <input
              className="form__input"
              id="email"
              type="email"
              {...register('email', {
                required: 'User email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please provide a valid email address',
                },
              })}
            />
            {errors.email && <small className='form__error'>{errors.email.message}</small>}
          </div>

          {/* Password */}
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">Password</label>
            <input
              className="form__input"
              id="password"
              type="password"
              {...register('password', {
                required: 'Please provide a password',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
              })}
            />
            {errors.password && <small className='form__error'>{errors.password.message}</small>}
          </div>

          {/* Password Confirm */}
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="passwordConfirm">Confirm password</label>
            <input
              className="form__input"
              id="passwordConfirm"
              type="password"
              {...register('passwordConfirm', {
                required: 'Please confirm your password',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
                validate: value =>
                  value === password || 'Passwords do not match',
              })}
            />
            {errors.passwordConfirm && (
              <small className='form__error'>{errors.passwordConfirm.message}</small>
            )}
          </div>

          <div className="form__group">
            <button 
                className="btn btn--green" 
                type="submit" 
                disabled={loading}> 
                {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignupPage;
