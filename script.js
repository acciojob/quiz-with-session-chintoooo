// script.js

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What year was JavaScript created?",
    options: ["1995", "2000", "1990", "2005"],
    answer: "1995"
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Microsoft", "Facebook", "Apple"],
    answer: "Facebook"
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Colorful Style Sheets", "Creative Style System", "Computer Style Sheets"],
    answer: "Cascading Style Sheets"
  }
];

const questionsContainer = document.getElementById("questions");
const scoreDisplay = document.getElementById("score");
const submitBtn = document.getElementById("submit");

const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions and restore selections
questions.forEach((q, index) => {
  const questionDiv = document.createElement("div");
  const questionText = document.createElement("p");
  questionText.textContent = `${index + 1}. ${q.question}`;
  questionDiv.appendChild(questionText);

  q.options.forEach(option => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question${index}`;
    radio.value = option;

    if (savedProgress[`question${index}`] === option) {
      radio.checked = true;
    }

    radio.addEventListener("change", () => {
      savedProgress[`question${index}`] = option;
      sessionStorage.setItem("progress", JSON.stringify(savedProgress));
    });

    label.appendChild(radio);
    label.appendChild(document.createTextNode(option));
    questionDiv.appendChild(label);
  });

  questionsContainer.appendChild(questionDiv);
});

// Handle Submit
submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, index) => {
    const selected = savedProgress[`question${index}`];
    if (selected === q.answer) {
      score++;
    }
  });

  const scoreText = `Your score is ${score} out of 5.`;
  scoreDisplay.textContent = scoreText;
  localStorage.setItem("score", score);
});

// Display last score on page load (optional but useful)
const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
  scoreDisplay.textContent = `Your score is ${lastScore} out of 5.`;
}
