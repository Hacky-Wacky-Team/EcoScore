import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth'; 
import HomePage from './HomePage';
import QuizPage from './QuizPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import StatsPage from './Stats'; 

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null); // To track logged-in user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); 
        setCurrentPage('home'); 
      } else {
        setUser(null); // No user is logged in
        setCurrentPage('login'); 
      }
    });

    return () => unsubscribe(); 
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = (userData) => {
    setUser(userData); 
    setCurrentPage('home'); 
  };

  const handleSignup = () => {
    setCurrentPage('login'); 
  };

  return (
    <div>
      {currentPage === 'login' && (
        <LoginPage onLogin={handleLogin} onSignup={() => navigateTo('signup')} />
      )}
      {currentPage === 'signup' && (
        <SignupPage onSignup={handleSignup} onLogin={() => navigateTo('login')} />
      )}
      {currentPage === 'home' && user && <HomePage onNavigate={navigateTo} user={user} />}
      {currentPage === 'quiz' && user && (
        <QuizPage onNavigate={navigateTo} userId={user.uid} />
      )}
      {currentPage === 'stats' && user && <StatsPage onNavigate={navigateTo} />} {/* New */}
    </div>
  );
}

export default App;
