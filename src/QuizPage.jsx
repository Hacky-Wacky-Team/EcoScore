import React, { useState } from "react";
import { rtdb } from "./firebase";
import { ref, set, get } from "firebase/database"; 
import "./styles/QuizPage.css";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const userId = auth.currentUser ? auth.currentUser.uid : null; 

console.log("userid")
console.log(userId)

const questions = [
  { name: "transportation", label: "How many kilometers did you drive in a gas vehicle?", description: "1 = 0 km; 10 = 200+ km" },
  { name: "waste", label: "How much waste did you generate?", description: "1 = less than 1 kg; 10 = 10+ kg" },
  { name: "water", label: "How much water did you use?", description: "1 = less than 50 L; 10 = 500+ L" },
  { name: "meat", label: "How much meat did you eat today?", description: "1 = no meat; 10 = 500+ g" },
  { name: "vegetables", label: "How many servings of vegetables did you eat today?", description: "1 = 0 servings; 10 = 10+ servings" },
  { name: "AC", label: "How long did you use your home air conditioning?", description: "1 = less than 1 hour; 10 = 8+ hours" },
  { name: "energy", label: "How much energy did you consume today?", description: "1 = less than 5 kWh; 10 = 50+ kWh" },
];

const treeMessages = [
  "Watch your tree grow as you complete your log!",
  "Making progress...",
  "The leaves are coming in!",
  "Helping the planet one step at a time!",
  "I wonder what's next...",
  "Flowers are blooming!",
  "Thanks for completing the quiz! Your tree is fully grown!",
];

function QuizPage({ onNavigate }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(
    Object.fromEntries(questions.map((q) => [q.name, 5])) 
  );
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const {
    transportation,
    waste,
    water,
    meat,
    vegetables,
    AC,
    energy,
  } = answers;

  const isLastQuestion = currentQuestion === questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;
  const carbon = transportation * 4 + waste * 6 + water * 1.25 + meat * 13.5 + vegetables * 0.1 + AC * 4.8 + energy * 20;

  const handleSubmit = async () => {
    const userId = auth.currentUser ? auth.currentUser.uid : null; 
    console.log("userid after submit")
    console.log(userId)

    if (!userId) {
      alert("User ID is missing! Please log in.");
      return;
    }
  
    console.log("userid after submit after checking")
    console.log(userId)
    const today = new Date();
    const dayOfWeek = today.getDay(); 
  
    const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const todayStr = daysOfWeek[dayOfWeek];
  
    try {
      const carbon = transportation * 4 + waste * 6 + water * 1.25 + meat * 13.5 + vegetables * 0.1 + AC * 4.8 + energy * 20;
      
      const userRef = ref(rtdb, `users/${userId}/carbon/${todayStr}`);
      await set(userRef, carbon);

      const trees = ref(rtdb, `users/${userId}/trees`);
      const treeData = await get(trees);
      console.log("treeData")
      console.log(trees)
      if (treeData.exists()) {
        const treeCount = treeData.val();
        console.log("treeCount")
        console.log(treeCount)
        await set(trees, treeCount + 1);
      } else {
        await set(trees, 1);
      }

      setQuizSubmitted(true); // Mark the quiz as submitted
    } catch (error) {
      console.error("Error saving carbon emission:", error);
      alert("There was an error submitting your data. Please try again.");
    }
  };

  return (
    <div className="quiz-container">
      {!quizSubmitted && <h1>Carbon Footprint Quiz</h1>}
      {quizSubmitted ? (
        <div className="answer">
          <p>Today you produced: </p>
          <h1>{carbon}kg of CO₂</h1>
          <p>Congrats you earned 1 tree!</p>
          <button className="go-home-button" onClick={() => onNavigate("home")}>
            Go to Home
          </button>
        </div>
      ) : (
        <div className="form-container">
          <form className="quiz-form">
            <div className="progress-indicator">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="quiz-question">
              <label>{questions[currentQuestion].label}</label>
              <p className="question-description">{questions[currentQuestion].description}</p>
              <input
                className="slider"
                type="range"
                name={questions[currentQuestion].name}
                min="1"
                max="10"
                value={answers[questions[currentQuestion].name]}
                onChange={handleChange}
              />
              <div className="slider-value">
                Selected: {answers[questions[currentQuestion].name]}
              </div>
            </div>
            <div className="navigation-buttons">
              {!isFirstQuestion && (
                <button type="button" onClick={handleBack} className="nav-button">
                  Back
                </button>
              )}
              {isLastQuestion ? (
                <button type="button" onClick={handleSubmit} className="nav-button">
                  Submit
                </button>
              ) : (
                <button type="button" onClick={handleNext} className="nav-button">
                  Next
                </button>
              )}
            </div>
          </form>
          <div className="tree-pic-container">
            <img
              className="tree-pic"
              src={`./TreePhotos/${currentQuestion + 1}.png`}
              alt={`Tree ${currentQuestion + 1}`}
            />
            <div className="tree-text">{treeMessages[currentQuestion]}</div>
          </div>
        </div>
      )}

      {!quizSubmitted && (
        <button className="home-button" onClick={() => onNavigate("home")}>
          Go Back
        </button>
      )}
    </div>
  );
}

export default QuizPage;
