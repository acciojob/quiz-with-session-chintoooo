// Define correct answers (for scoring)
// Example: question 1's correct answer is "2" (option index 2)
const correctAnswers = {
  q1: "2",
  q2: "1",
  q3: "3",
  q4: "0",
  q5: "2"
};

// Load saved progress from sessionStorage on page load
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

  // Load final score from localStorage (if exists)
  const storedScore = localStorage.getItem("score");
  if (storedScore !== null) {
    document.getElementById("score").textContent = `Your score is ${storedScore} out of 5.`;
  }
});

// Handle option selection and save to sessionStorage
const allRadioButtons = document.querySelectorAll('input[type="radio"]');
allRadioButtons.forEach(radio => {
  radio.addEventListener("change", () => {
    // Get current progress or initialize empty
    let progress = JSON.parse(sessionStorage.getItem("progress")) || {};
    progress[radio.name] = radio.value;
    sessionStorage.setItem("progress", JSON.stringify(progress));
  });
});

// Handle quiz submission
document.getElementById("submit").addEventListener("click", () => {
  let score = 0;
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};

  // Calculate score
  for (const [questionId, selectedValue] of Object.entries(progress)) {
    if (correctAnswers[questionId] === selectedValue) {
      score++;
    }
  }

  // Display and store score
  document.getElementById("score").textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);

  // Optional: Clear sessionStorage progress after submission
  // sessionStorage.removeItem("progress");
});
