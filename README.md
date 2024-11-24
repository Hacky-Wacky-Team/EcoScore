# EcoScore 🌎
<img width="250" alt="ecoscore logo" src="https://github.com/user-attachments/assets/27090176-4f07-42a6-99e0-d77b9d18f249">

> [!IMPORTANT]
> Track and calculate your carbon footprint, earn trees when you complete your daily carbon footprint log and compete with people globally!

## What does this do?
Everyday, over 1,300 tonnes of CO2 are produced per second. With this in mind, we created EcoScore, an online digital platform that allows users to track and record their carbon footprint in a fun and interactive way! Everyday, users are prompted to complete a short carbon footprint quiz where EcoScore’s algorithm computes their daily carbon footprint. As users complete their daily quizzes, they also earn “trees” which slowly grow as they complete each question. These “trees” provide users with the incentive to complete their daily quizzes, and they can view the amount of trees they’ve collected in their stats page. EcoScore also allows users to compete with other people around the world through its daily leaderboard that is updated each day. This further incentivizes users to lower their carbon footprint as they attempt to climb the leaderboard.

We see EcoScore as a tool to incentivize users to be mindful of their carbon footprint. Throughout the designing and coding process, we kept this goal in mind, purposefully designing the quiz, leaderboard, and stats page to align with our values. We understand that it can be difficult to commit to reducing your carbon footprint, especially in a world that is so heavily industrialized. Thus, our incentives encourage users to take active steps in reducing their footprint without making it seem like a chore. We also provide users with tips and goals throughout the day, providing motivation for users to reach their goals.

## Homepage
<img width="700" alt="ecoscore homepage" src="https://github.com/user-attachments/assets/639bf4ec-f26f-4545-9a85-de27a3b66872">

## Quiz
<img width="700" alt="ecoscore quizpage" src="https://github.com/user-attachments/assets/33ca041f-8384-4021-a0e1-1f9701f4139e">

## Stats
<img width="700" alt="ecoscore statspage" src="https://github.com/user-attachments/assets/c7187635-b7dc-4208-98af-f004c8122dc3">


## How it was built 🛠️
Using React, Javascript, CSS, and HTML, we built EcoScore. The frontend was created using react and styled with CSS, while the backend uses a real-time database and authentication on Firebase to store user’s data. After registering for the first time, all the user’s data gets sent to Firebase, securely storing their data. In the user’s data, we also store their daily carbon footprint and amount of trees collected. This data is then grabbed from Firebase and stored in variables in the code so that we can access them whenever we need. In terms of the quiz, we also created this through react. At the beginning, we researched many questions regarding the calculations of carbon footprint so that we could create an accurate algorithm for EcoScore. We wanted to implement as few questions as possible so that users wouldn’t feel too overwhelmed by the amount of questions being asked, thus, we chose to stick with 7 questions that encompass a wide range of daily activities. After picking the questions, we then assigned “weight” values to each category, making the calculation process easier. The final value of the carbon footprint is then stored into a variable and uploaded into Firebase. For the rest of the frontend, we spent a lot of time working on the CSS so that EcoScore was intuitive for all users. This included changing the font, changing the app’s colors, and reorganizing the different sections.

## Our Future 🚀
EcoScore has the potential to evolve beyond its current capabilities. By integrating a friends feature, EcoScore can evolve into a social media like app, transforming into a more interactive, community-driven platform– encouraging users to not only track and reduce their carbon emissions, but to also engage in friendly competition and collaboration. This could provide powerful social incentives, making sustainability a shared, rewarding experience. Furthermore, EcoScore even has the potential to be used globally. With its easy to use interface and design, people from all backgrounds can easily navigate the app. By simplifying the process of reducing one’s environmental impact, EcoScore could become a universally accessible tool that allows people around the world to live more sustainably.

