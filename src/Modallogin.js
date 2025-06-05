import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import GoogleSignIn from './GoogleSignIn';
import { useToast } from "@chakra-ui/react";
import './ModalLoginStyles.css';

function ModalLogin({ show, onHide }) {
  const [activeView, setActiveView] = useState('signin'); // 'signin' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registered, setRegistered] = useState(false);
  const toast = useToast();
  
  // Reset form when modal is opened or closed
  useEffect(() => {
    if (show) {
      // Reset form when modal is opened
      resetForm();
    }
  }, [show]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
    setAgreeTerms(false);
    setError(null);
  };

  const switchView = (view) => {
    setActiveView(view);
    resetForm();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }
    
    axios
      .post("https://backend-retrend.onrender.com/login", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('authemail', response.data.email);
        localStorage.setItem('authname', response.data.name);
        localStorage.setItem('authphone', response.data.phone);
        localStorage.setItem('authpicture', response.data.picture || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
        onHide();
        window.location.href = '/';
      })
      .catch((error) => {
        setLoading(false);
        if(error.response && error.response.status === 404){
          setError('User not found');
        }
        else if(error.response && error.response.status === 400){
          setError('Incorrect password');
        } else {
          setError('Server error, please try again');
        }
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    if (!agreeTerms) {
      setError('You must agree to the terms');
      setLoading(false);
      return;
    }
    
    axios
      .post("https://backend-retrend.onrender.com/register", {
        email,
        password,
        name,
      })
      .then((response) => {
        setRegistered(true);
        setLoading(false);
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        // Automatically switch to login form after successful registration
        setTimeout(() => {
          switchView('signin');
          setRegistered(false);
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        if(error.response && error.response.status === 409){
          setError('User already exists, please login');
        } else {
          setError('Server error, please try again');
        }
      });
  };

  // If the modal is not shown, don't render anything
  if (!show) return null;

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered
      dialogClassName="modal-login-dialog"
      contentClassName="modal-login-content"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body className="p-0">
        <div className="modal-login-container">
          <div className="modal-login-right">
            <div className="modal-login-form">
              <button 
                className="modal-close-btn" 
                onClick={onHide}
                type="button"
                aria-label="Close"
              >
                &times;
              </button>
              
              {/* Logo */}
              <div className="login-logo-container">
                <img 
                  src="/honey (4 x 3 in) (1.8 x 0.9 in).png" 
                  alt="RETREND" 
                  className="login-logo"
                />
              </div>
              {activeView === 'signin' ? (
                <>
                  <h2>Sign In</h2>
                  <p className="login-subtitle">Welcome back to Retrend</p>
                  
                  <div className="modal-social-container">
                    <GoogleSignIn />
                  </div>
                  <span className="modal-login-divider">or use your email</span>
                  <form onSubmit={handleLogin} className="login-form">
                    <div className="modal-login-input-group">
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="modal-login-input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                      />
                      <div 
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="modal-login-options">
                      <div className="remember-me">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                      </div>
                      <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>Forgot password?</a>
                    </div>
                    {error && <div className="modal-login-error">{error}</div>}
                    <button 
                      type="submit" 
                      className="modal-login-button"
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Sign In'}
                    </button>
                  </form>
                  <div className="modal-mobile-switch">
                    <p>Don't have an account? <a href="#" onClick={(e) => {e.preventDefault(); switchView('signup');}}>Sign Up</a></p>
                  </div>
                </>
              ) : (
                <>
                  <h2>Create Account</h2>
                  <p className="login-subtitle">Join the Retrend community</p>
                  
                  <div className="modal-social-container">
                    <GoogleSignIn />
                  </div>
                  <span className="modal-login-divider">or use your email</span>
                  <form onSubmit={handleRegister} className="login-form">
                    <div className="modal-login-input-group">
                      <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="modal-login-input-group">
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="modal-login-input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                      />
                      <div 
                        className="modal-password-toggle"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="modal-login-input-group">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={loading}
                      />
                      <div 
                        className="password-toggle"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="modal-terms-checkbox">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        required
                      />
                      <label htmlFor="terms">I have read and agree to the terms</label>
                    </div>
                    {error && <div className="modal-login-error">{error}</div>}
                    <button 
                      type="submit" 
                      className="modal-login-button"
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Sign Up'}
                    </button>
                  </form>
                  <div className="modal-mobile-switch">
                    <p>Already have an account? <a href="#" onClick={(e) => {e.preventDefault(); switchView('signin');}}>Sign In</a></p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalLogin;
