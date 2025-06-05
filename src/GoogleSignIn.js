import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';
import axios from 'axios';
import { API_BASE_URL } from "./utils/config"; // Import the API base URL

function GoogleSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Get user information from the result
      const user = result.user;
      console.log("Firebase auth successful:", user.email);
      
      const idToken = await user.getIdToken();
      console.log("ID token obtained, length:", idToken.length);
      
      // Send the token to your backend
      console.log("Sending token to backend...");
      const response = await axios.post(`${API_BASE_URL}/google-auth`, {
        credential: idToken,
      });
      
      console.log("Backend response:", response.data);
      
      // Handle the response from the server
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('authemail', response.data.email);
      localStorage.setItem('authname', response.data.name);
      localStorage.setItem('authphone', response.data.phone || "");
      localStorage.setItem('authpicture', response.data.picture || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
      
      console.log("Authentication complete, redirecting...");
      window.location.href = '/';
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setError(error.message || "Authentication failed");
      
      if (error.response) {
        console.error("Server response error:", error.response.data);
        setError(`Server error: ${error.response.data.message || error.response.statusText}`);
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      {error && <div className="alert alert-danger mb-3">{error}</div>}
      <button 
        onClick={handleGoogleSignIn}
        className="google-btn"
        disabled={loading}
      >
        {loading ? (
          <span className="google-btn-content">
            <span className="spinner"></span> Signing in...
          </span>
        ) : (
          <span className="google-btn-content">
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg" className="google-icon">
              <g>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                <path d="M1 1h22v22H1z" fill="none"/>
              </g>
            </svg>
            <span>Sign in with Google</span>
          </span>
        )}
      </button>
    </div>
  );
}

export default GoogleSignIn;