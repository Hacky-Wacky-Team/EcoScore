import React, { useState, useEffect } from 'react';
import './styles/HomePage.css';
import { rtdb } from './firebase';
import { ref, get } from 'firebase/database'; 
import { getAuth } from 'firebase/auth'; 

function HomePage({ onNavigate }) {
  const [username, setUsername] = useState(''); 
  const [selectedProfile, setSelectedProfile] = useState('./earth.jpg'); 
  const [isProfileSelectorOpen, setIsProfileSelectorOpen] = useState(false); 
  const [dailyTip, setDailyTip] = useState(''); 
  const [funFact, setFunFact] = useState(''); 
  const [leaderboard, setLeaderboard] = useState([]); 

  const profileOptions = [
    './fish.jpg',
    './earth.jpg',
    './water.jpg',
  ]; 

  const ecoTips = [
    "Reduce water usage while brushing your teeth.",
    "Turn off lights when you leave the room.",
    "Carry a reusable water bottle.",
    "Use public transport or carpool to reduce emissions.",
    "Recycle paper, plastic, and glass waste.",
  ];

  const funFacts = [
    "Plastic can take over 400 years to decompose.",
    "Recycling one aluminum can saves enough energy to run a TV for three hours.",
    "A single tree can absorb up to 48 pounds of CO2 per year.",
    "The ocean produces more than 50% of the world's oxygen.",
    "Switching to energy-efficient light bulbs saves power and reduces waste."
  ];

  useEffect(() => {
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null; 

    if (userId) {
      const userRef = ref(rtdb, `users/${userId}/username`);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUsername(snapshot.val());
          } else {
            console.log('No username found for the user.');
          }
        })
        .catch((error) => {
          console.error('Error fetching username:', error);
        });
    } else {
      console.log('User is not logged in.');
    }

    const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)];
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    setDailyTip(randomTip);
    setFunFact(randomFact);

    fetchLeaderboard();
  }, []); 

  const fetchLeaderboard = async () => {
    try {
      const usersRef = ref(rtdb, 'users');
      const snapshot = await get(usersRef);

      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const day = new Date().toLocaleString('en-US', { weekday: 'short' }).toLowerCase(); 

        const leaderboardData = Object.values(usersData)
          .map((user) => ({
            username: user.username,
            carbon: user.carbon[day] || 0,
          }))
          .sort((a, b) => a.carbon - b.carbon); 

        setLeaderboard(leaderboardData); 
      } else {
        console.log('No users found.');
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const handleQuizClick = () => {
    onNavigate('quiz');
  };

  const handleLogoutClick = () => {
    onNavigate('login'); 
  };

  const handleStatsClick = () => {
    onNavigate('stats'); 
  };

  const toggleProfileSelector = () => {
    setIsProfileSelectorOpen(!isProfileSelectorOpen);
  };

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    setIsProfileSelectorOpen(false); 
  };

  return (
    <header className="App-header">
      <div className="nav-bar">
        <span className="navtext">EcoScore 🌍</span>
      </div>
      <div className="main-content">
        <div className="profile-container">
          <div className="profile-pic" onClick={toggleProfileSelector}>
            <img src={selectedProfile} alt="Selected Profile" />
          </div>
          {isProfileSelectorOpen && (
            <div className="profile-selector-container">
              {profileOptions.map((profile, index) => (
                <img
                  key={index}
                  src={profile}
                  alt={`Profile ${index + 1}`}
                  onClick={() => handleProfileSelect(profile)}
                  className="profile-option"
                />
              ))}
            </div>
          )}
          <div className="profile-details">
            <div className="welcome">Welcome back!</div>
            <div className="username">{username}</div>
            <div className="action-buttons">
              <button className="quiz-button" onClick={handleQuizClick}>
                Start Quiz
              </button>
              <div className="horizontal-buttons">
                <button onClick={handleLogoutClick}>Logout</button>
                <button onClick={handleStatsClick}>Stats</button>
              </div>
            </div>
          </div>
        </div>
        <div className="leaderboard">
          <h2>Lowest Emissions Today</h2>
          <ul>
            {leaderboard.map((entry, index) => (
              <li key={index}>
                <span>{entry.username}</span>
                <span>{entry.carbon} kg</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="daily-tips-container">
          <h3>🌱 Daily Eco Challenge</h3>
          <p>{dailyTip}</p>
        </div>
        <div className="fun-fact-container">
          <h3>💡 Fun Fact of the Day</h3>
          <p>{funFact}</p>
        </div>
      </div>
    </header>
  );
}

export default HomePage;
