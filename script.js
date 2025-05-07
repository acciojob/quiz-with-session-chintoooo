// === Define correct answers ===
// The values here correspond to the value attributes of correct radio buttons
const correctAnswers = {
  q1: "2", // Question 1 correct: Option 3 (4)
  q2: "1", // Question 2 correct: Option 2 (Paris)
  q3: "3", // Question 3 correct: Option 4 (Jupiter)
  q4: "0", // Question 4 correct: Option 1 (Water)
  q5: "2"  // Question 5 correct: Option 3 (30)
};

// === Load saved progress and score on page load ===
window.addEventListener("DOMContentLoaded", () => {
  const savedProgress = JSON.parse(sessionStorage.getItem("progress"));
  if (savedProgress) {
    for (const [questionId, answerValue] of Object.entries(savedProgress)) {
      const selector = `input[name="${questionId}"][value="${answerValue}"]`;
      const radio = document.querySelector(selector);
      if (radio) {
        radio.checked = true;
      }
    }
  }

  const storedScore = localStorage.getItem("score");
  if (storedScore !== null) {
    document.getElementById("score").textContent = `Your score is ${storedScore} out of 5.`;
  }
});

// === Save answer on option change ===
const allRadioButtons = document.querySelectorAll('input[type="radio"]');
allRadioButtons.forEach(radio => {
  radio.addEventListener("change", () => {
    let progress = JSON.parse(sessionStorage.getItem("progress")) || {};
    progress[radio.name] = radio.value;
    sessionStorage.setItem("progress", JSON.stringify(progress));
  });
});

// === Handle quiz submission ===
document.getElementById("submit").addEventListener("click", () => {
  let score = 0;
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};

  for (const [questionId, selectedValue] of Object.entries(progress)) {
    if (correctAnswers[questionId] === selectedValue) {
      score++;
    }
  }

  document.getElementById("score").textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});
