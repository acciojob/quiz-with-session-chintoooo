const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    choices: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What year was JavaScript created?",
    choices: ["1995", "2000", "1990", "2005"],
    answer: "1995"
  },
  {
    question: "Which company developed React?",
    choices: ["Google", "Microsoft", "Facebook", "Apple"],
    answer: "Facebook"
  },
  {
    question: "What does CSS stand for?",
    choices: ["Cascading Style Sheets", "Colorful Style Sheets", "Creative Style System", "Computer Style Sheets"],
    answer: "Cascading Style Sheets"
  }
];

const questionsContainer = document.getElementById("questions");
const scoreDisplay = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// Ensure scoreDisplay is empty at first
scoreDisplay.textContent = "";

// Load progress from sessionStorage
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions and restore selections
questions.forEach((q, index) => {
  const questionDiv = document.createElement("div"); // Each question in <div>

  const questionText = document.createElement("p");
  questionText.textContent = q.question; // <-- NO numbering anymore
  questionDiv.appendChild(questionText);

  q.choices.forEach(choice => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question${index}`;
    radio.value = choice;

    // Restore selection
    if (savedProgress[`question${index}`] === choice) {
      radio.checked = true;
      radio.setAttribute("checked", "true");  // <-- Needed for Cypress test
    }

    // Save on change
    radio.addEventListener("change", (e) => {
      savedProgress[`question${index}`] = e.target.value;
      sessionStorage.setItem("progress", JSON.stringify(savedProgress));
    });

    label.appendChild(radio);
    label.appendChild(document.createTextNode(choice));
    questionDiv.appendChild(label);
  });

  questionsContainer.appendChild(questionDiv);
});

// Submit button click
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

// Display last score on load (optional)
const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
  scoreDisplay.textContent = `Your score is ${lastScore} out of 5.`;
}
