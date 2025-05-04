const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    choices: ["JavaScript", "Java", "C", "Python"],
    answer: "JavaScript"
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
    answer: "Mount Everest"
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Venus", "Earth", "Mars", "Jupiter"],
    answer: "Mars"
  },
  {
    question: "What is the largest ocean on Earth?",
    choices: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    answer: "Pacific Ocean"
  }
];

const questionsContainer = document.getElementById("questions");
const scoreDisplay = document.getElementById("score");
const submitBtn = document.getElementById("submit");

scoreDisplay.textContent = "";

let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

questions.forEach((q, index) => {
  const questionDiv = document.createElement("div");

  const questionText = document.createElement("p");
  questionText.textContent = q.question;
  questionDiv.appendChild(questionText);

  q.choices.forEach(choice => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question${index}`;
    radio.value = choice;

    if (savedProgress[`question${index}`] === choice) {
      radio.checked = true;
      radio.setAttribute("checked", "true");
    }

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

const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
  scoreDisplay.textContent = `Your score is ${lastScore} out of 5.`;
}
