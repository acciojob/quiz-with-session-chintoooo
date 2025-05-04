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

// Ensure scoreDisplay is empty at first (for Cypress Test 1)
scoreDisplay.textContent = "";

// Load progress from sessionStorage (for Cypress Test 2)
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions and restore selections
questions.forEach((q, index) => {
  const questionDiv = document.createElement("div"); // Each question in <div>
  const questionText = document.createElement("p");
  questionText.textContent = `${index + 1}. ${q.question}`;
  questionDiv.appendChild(questionText);

  q.options.forEach(option => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question${index}`; // radio group by question
    radio.value = option;

    // Restore selection if exists
    if (savedProgress[`question${index}`] === option) {
      radio.checked = true;
    }

    // Save on change
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

// On Submit button click (for Cypress Test 3)
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

// Display last score on page load (Optional: supports Cypress Test 3 after refresh)
const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
  scoreDisplay.textContent = `Your score is ${lastScore} out of 5.`;
}
