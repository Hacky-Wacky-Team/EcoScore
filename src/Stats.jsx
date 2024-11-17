import React, { useEffect, useState } from "react";
import "./styles/Stats.css";
import { rtdb } from "./firebase"; 
import { ref, get } from "firebase/database";
import { getAuth } from "firebase/auth";

const auth = getAuth();

function StatsPage({ onNavigate }) {
  const [username, setUsername] = useState(''); 
  const [carbon, setCarbon] = useState(''); 
  const [trees, setTrees] = useState(''); 
  const userId = auth.currentUser ? auth.currentUser.uid : null; 

  const [dailyTip, setDailyTip] = useState(''); 

  const ecoTips = [
    "Reduce water usage while brushing your teeth.",
    "Turn off lights when you leave the room.",
    "Carry a reusable water bottle.",
    "Use public transport or carpool to reduce emissions.",
    "Recycle paper, plastic, and glass waste.",
  ];

  const [carbonData, setCarbonData] = useState({
    mon: 0,
    tue: 0,
    wed: 0,
    thu: 0,
    fri: 0,
    sat: 0,
    sun: 0,
  });

  useEffect(() => {
    if (!userId) return;

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

      const today = new Date();
      const dayOfWeek = today.getDay(); 
      const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      const todayStr = daysOfWeek[dayOfWeek];

      const carbonRef = ref(rtdb, `users/${userId}/carbon/${todayStr}`);
      get(carbonRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setCarbon(snapshot.val());
          } else {
            console.log('No carbon data found for the user.');
          }
        })
        .catch((error) => {
          console.error('Error fetching carbon data:', error);
        });

      const treesRef = ref(rtdb, `users/${userId}/trees`);
      get(treesRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setTrees(snapshot.val());
          } else {
            console.log('No tree data found for the user.');
          }
        })
        .catch((error) => {
          console.error('Error fetching tree data:', error);
        });

    } else {
      console.log('User is not logged in.');
      setUsername('Error fetching username');
    }

    const fetchCarbonData = async () => {
      const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
      const data = {};

      for (const day of daysOfWeek) {
        const dayRef = ref(rtdb, `users/${userId}/carbon/${day}`);
        const snapshot = await get(dayRef);
        data[day] = snapshot.exists() ? snapshot.val() : 0;
      }

      setCarbonData(data);
    };

    fetchCarbonData();
  }, [userId]);

  useEffect(() => {
    const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)];
    setDailyTip(randomTip);
  }, []);

  const pastData = [
    { day: "Mon", carbon: carbonData.mon },
    { day: "Tue", carbon: carbonData.tue },
    { day: "Wed", carbon: carbonData.wed },
    { day: "Thu", carbon: carbonData.thu },
    { day: "Fri", carbon: carbonData.fri },
    { day: "Sat", carbon: carbonData.sat },
    { day: "Sun", carbon: carbonData.sun }
  ];

  const handleBackClick = () => {
    onNavigate("home"); 
  };

  return (
    <div className="stats-page">
      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-details">
          <h2>Hey {username}!</h2>
        </div>
        <div className="profile-pic">
          <img src="./earth.jpg" alt="Profile" />
        </div>
        <div className="today-carbon">
          <div className="carbon-header">
            <div>
              <h2>Today's Carbon</h2>
              <h1>{carbon}kg</h1>
            </div>
            <img src="./smoke.png" alt="smoke" className="smoke-image" />
          </div>
        </div>
        <div className="tree-collected">
          <div className="carbon-header">
            <div>
              <h2>Trees Collected</h2>
              <h1>{trees} trees</h1>
            </div>
            <img src="./TreePhotos/7.png" alt="smoke" className="tree-image" />
          </div>
        </div>
      </div>

      {/*The Past Data Section*/}
      <div className="past-data-section">
        <h3>Past Data 📈</h3>
        <div className="graph-container">
          <div className="bar-graph">
            {pastData.map((entry, index) => (
              <div key={index} className="bar-container">
                <div className="bar-label">{entry.day}</div>
                <div
                  className="bar"
                  style={{
                    width: `${entry.carbon * 1.3}px`, 
                  }}
                >
                  <span className="carbon-value">{entry.carbon} kg</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Tips Section */}
        <h3>Tips 💡</h3>
        <div className="tips-section">
          <p>{dailyTip}</p>
        </div>
      </div>

      {/*The Back Button*/}
      <button className="stats-back-button" onClick={handleBackClick}>
        Go Back
      </button>
    </div>
  );
}

export default StatsPage;
