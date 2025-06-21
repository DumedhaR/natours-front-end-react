import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useUser } from '../hooks/useUser';
import NavItem from '../components/NavItem';
import { updateUser, updatePassword } from '../services/userService';
import { showAlert } from '../utills/alert'; 

const UserAccountPage: React.FC = () => {
  const { user, setUser } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [photo, setPhoto] = useState<File | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);



  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (photo) formData.append('photo', photo);
  
      const result = await updateUser(formData);
      setUser(result.data.user);
      showAlert('success', 'Profile updated successfully!');
    } catch (err: unknown) {
      let message = 'Failed, Please try again!';
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || err.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      showAlert('error', message);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return showAlert('error', 'Confirm password not matching');
    }

    setIsUpdatingPassword(true);
    try {
      const result = await updatePassword(currentPassword, newPassword, confirmPassword);
      if (result.status === 'success') {
        showAlert('success', 'Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err: unknown) {
      let message = 'Failed, Please try again!';
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || err.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      showAlert('error', message);
    } finally {
      setIsUpdatingPassword(false);
    } 
  };

  if (!user) return null;
  const isAdmin = user.role === 'admin';

  return (
    <main className="main">
      <div className="user-view">
        <nav className="user-view__menu">
          <ul className="side-nav">
            <NavItem link="#" text="Settings" icon="settings" active />
            <NavItem link="#" text="My bookings" icon="briefcase" />
            <NavItem link="#" text="My reviews" icon="star" />
            <NavItem link="#" text="Billing" icon="credit-card" />
          </ul>

          {isAdmin && (
            <div className="admin-nav">
              <h5 className="admin-nav__heading">Admin</h5>
              <ul className="side-nav">
                <NavItem link="#" text="Manage tours" icon="map" />
                <NavItem link="#" text="Manage users" icon="users" />
                <NavItem link="#" text="Manage reviews" icon="star" />
                <NavItem link="#" text="Manage bookings" icon="briefcase" />
              </ul>
            </div>
          )}
        </nav>

        <div className="user-view__content">
          {/* ACCOUNT SETTINGS FORM */}
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
            <form className="form form-user-data" onSubmit={handleUpdateProfile}>
              <div className="form__group">
                <label className="form__label" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form__input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form__group ma-bt-md">
                <label className="form__label" htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form__group form__photo-upload">
                <img
                  className="form__user-photo"
                  src={user.photo.startsWith('http') ? user.photo : `http://localhost:8000/img/users/${user.photo}`} 
                  alt="User"
                />
                <input
                  className="form__upload"
                  type="file"
                  accept="image/*"
                  id="photo"
                  name="photo"
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setPhoto(e.target.files[0]);
                    }
                  }}
                />
                <label htmlFor="photo">Choose new photo</label>
              </div>

              <div className="form__group right">
                <button type="submit" className="btn btn--small btn--green" disabled={isUpdatingProfile}>
                  {isUpdatingProfile ? 'Saving...' : 'Save settings'}
                </button>
              </div>
            </form>
          </div>

          <div className="line">&nbsp;</div>

          {/* PASSWORD FORM (not handled yet) */}
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Password change</h2>
            <form className="form form-user-password" onSubmit={handleUpdatePassword}>
              <div className="form__group">
                <label className="form__label" htmlFor="password-current">Current password</label>
                <input
                  id="password-current"
                  type="password"
                  className="form__input"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="form__group">
                <label className="form__label" htmlFor="password">New password</label>
                <input
                  id="password"
                  type="password"
                  className="form__input"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </div>

              <div className="form__group ma-bt-lg">
                <label className="form__label" htmlFor="password-confirm">Confirm password</label>
                <input
                  id="password-confirm"
                  type="password"
                  className="form__input"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="form__group right">
                <button type="submit" className="btn btn--small btn--green btn--save-password" disabled={isUpdatingPassword}>
                  {isUpdatingPassword ? 'Saving...' : 'Save password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserAccountPage;
