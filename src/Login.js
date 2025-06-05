import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import GoogleSignIn from './GoogleSignIn';
import { useToast } from "@chakra-ui/react";
import './LoginStyles.css';

function Login() {
  const [err, setErr] = useState();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const toast = useToast();
  
  // Add resize listener to check for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Clear errors when switching forms
  useEffect(() => {
    setErr(undefined);
  }, [isRightPanelActive]);

  // Prevent event propagation to parent elements
  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  // Prevent default and propagation for form submissions
  const handleFormSubmit = (e, callback) => {
    e.preventDefault();
    e.stopPropagation();
    callback(e);
  };

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
    // Reset form fields when switching to signup
    if (isMobile) {
      setEmail('');
      setPassword('');
    }
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
    // Reset form fields when switching to signin
    if (isMobile) {
      setEmail('');
      setPassword('');
      setName('');
      setConfirmPassword('');
      setAgreeTerms(false);
    }
  };
  
  // Handle form toggle click in mobile view
  const handleMobileFormToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRightPanelActive(!isRightPanelActive);
    
    // Reset form fields and errors when switching forms
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
    setAgreeTerms(false);
    setErr(undefined);
  };

  // Handle input clicks and changes
  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const handleInputChange = (e, setter) => {
    e.stopPropagation();
    setter(e.target.value);
  };

  function handleRegister(event) {
    event.preventDefault();
    setLoading(true);
    
    if (password !== confirmPassword) {
      setErr('password-mismatch');
      setLoading(false);
      return;
    }
    
    if (!agreeTerms) {
      setErr('terms-required');
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
        console.log(response.data);
        setRegistered(true);
        setLoading(false);
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        // Automatically switch to login form after successful registration
        setTimeout(() => {
          setIsRightPanelActive(false);
          setRegistered(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if(error.response && error.response.status === 409){
          setErr(409);
        } else {
          setErr('server-error');
        }
      });
  }

  function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    
    if (!email || !password) {
      setErr('fields-required');
      setLoading(false);
      return;
    }
    
    axios
      .post("https://backend-retrend.onrender.com/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('authemail', response.data.email);
        localStorage.setItem('authname', response.data.name);
        localStorage.setItem('authphone', response.data.phone);
        localStorage.setItem('authpicture', response.data.picture || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
        window.location.href = '/';
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if(error.response && error.response.status === 404){
          setErr(404);
        }
        else if(error.response && error.response.status === 400){
          setErr(400);
        } else {
          setErr('server-error');
        }
      });
  }

  const togglePasswordVisibility = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="login-blue-container">
      <div className="login-boxes-container">
        <div className={`login-box ${!isRightPanelActive ? 'active' : ''}`}>
          <h2 className="login-heading">Login</h2>
          
          <form onSubmit={(e) => handleFormSubmit(e, handleLogin)}>
            <div className="login-field-wrapper">
              <div className="field-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
                required 
                disabled={loading}
              />
            </div>
            
            <div className="login-field-wrapper">
              <div className="field-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Confirm a password" 
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
                required 
                disabled={loading}
              />
              <button 
                type="button"
                className="toggle-password"
                onClick={(e) => togglePasswordVisibility(e)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            
            <div className="login-options-row">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" onClick={(e) => e.preventDefault()} className="forgot-link">Forgot password?</a>
            </div>
            
            {(err === 404 || err === 400 || err === 'fields-required' || err === 'server-error') && (
              <div className="login-error-alert">
                {err === 404 && "User not found"}
                {err === 400 && "Incorrect password"}
                {err === 'fields-required' && "Please fill in all fields"}
                {err === 'server-error' && "Server error, please try again"}
              </div>
            )}
            
            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Login Now'}
            </button>
            
            <div className="switch-form-text">
              Don't have an account? <a href="#" onClick={(e) => {e.preventDefault(); handleSignUpClick()}}>Signup now</a>
            </div>
          </form>
        </div>
        
        {/* Registration/Signup form */}
        <div className={`login-box ${isRightPanelActive ? 'active' : ''}`}>
          <h2 className="login-heading">Registration</h2>
          
          <form onSubmit={(e) => handleFormSubmit(e, handleRegister)}>
            <div className="login-field-wrapper">
              <div className="field-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={name}
                onChange={(e) => handleInputChange(e, setName)}
                required 
                disabled={loading}
              />
            </div>
            
            <div className="login-field-wrapper">
              <div className="field-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
                required 
                disabled={loading}
              />
            </div>
            
            <div className="login-field-wrapper">
              <div className="field-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Create a password" 
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
                required 
                disabled={loading}
              />
              <button 
                type="button"
                className="toggle-password"
                onClick={(e) => togglePasswordVisibility(e)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            
            <div className="login-field-wrapper">
              <div className="field-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <input 
                type={showConfirmPassword ? 'text' : 'password'} 
                placeholder="Confirm a password" 
                value={confirmPassword}
                onChange={(e) => handleInputChange(e, setConfirmPassword)}
                required 
                disabled={loading}
              />
              <button 
                type="button"
                className="toggle-password"
                onClick={(e) => toggleConfirmPasswordVisibility(e)}
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            
            <div className="terms-checkbox">
              <input 
                type="checkbox" 
                id="terms" 
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                disabled={loading}
              />
              <label htmlFor="terms">I accept all terms & conditions</label>
            </div>
            
            {(err === 409 || err === 'password-mismatch' || err === 'terms-required' || err === 'server-error') && (
              <div className="login-error-alert">
                {err === 409 && "User already exists"}
                {err === 'password-mismatch' && "Passwords do not match"}
                {err === 'terms-required' && "You must agree to the terms"}
                {err === 'server-error' && "Server error, please try again"}
              </div>
            )}
            {registered && <div className="login-success-alert">Registration successful!</div>}
            
            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Register Now'}
            </button>
            
            <div className="switch-form-text">
              Already have an account? <a href="#" onClick={(e) => {e.preventDefault(); handleSignInClick()}}>Login now</a>
            </div>
          </form>
        </div>
        
        {/* Arrow animation for desktop view */}
        <div className="form-transition-arrow">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Login;
