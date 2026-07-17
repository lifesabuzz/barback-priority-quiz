"use strict";

const SCORE_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzwT_2dljhlI99dY7uY6MfSMcSr_7BXKILJwXsc5_uzuwdPcI-47Wfov36flzHgGe3z4g/exec";

const businessLevels = [
  "Empty",
  "Slow",
  "Moderate",
  "Busy",
  "Slammed"
];

const tasks = [
  {
    id: 101,
    name: "Clean spill or broken glass",
    scores: {
      Empty: 10.0,
      Slow: 10.0,
      Moderate: 10.0,
      Busy: 10.0,
      Slammed: 10.0
    }
  },
  {
    id: 102,
    name: "Remove immediate safety hazard",
    scores: {
      Empty: 9.9,
      Slow: 9.9,
      Moderate: 9.9,
      Busy: 9.9,
      Slammed: 9.9
    }
  },
  {
    id: 103,
    name: "Follow management instructions",
    scores: {
      Empty: 9.8,
      Slow: 9.8,
      Moderate: 9.8,
      Busy: 9.8,
      Slammed: 9.8
    }
  },
  {
    id: 104,
    name: "Replace empty keg in use",
    scores: {
      Empty: 4.5,
      Slow: 6.8,
      Moderate: 9.3,
      Busy: 9.8,
      Slammed: 9.8
    }
  },
  {
    id: 105,
    name: "Refill empty ice well",
    scores: {
      Empty: 4.8,
      Slow: 7.4,
      Moderate: 9.5,
      Busy: 9.7,
      Slammed: 9.7
    }
  },
  {
    id: 106,
    name: "Supply critical glassware",
    scores: {
      Empty: 3.8,
      Slow: 6.6,
      Moderate: 9.2,
      Busy: 9.6,
      Slammed: 9.6
    }
  },
  {
    id: 107,
    name: "Restock depleted beer",
    scores: {
      Empty: 5.3,
      Slow: 7.2,
      Moderate: 9.0,
      Busy: 9.5,
      Slammed: 9.5
    }
  },
  {
    id: 108,
    name: "Restock depleted liquor",
    scores: {
      Empty: 5.2,
      Slow: 7.1,
      Moderate: 8.9,
      Busy: 9.4,
      Slammed: 9.4
    }
  },
  {
    id: 109,
    name: "Refill depleted mixers",
    scores: {
      Empty: 5.1,
      Slow: 7.0,
      Moderate: 8.8,
      Busy: 9.3,
      Slammed: 9.3
    }
  },
  {
    id: 110,
    name: "Run clean glassware",
    scores: {
      Empty: 2.9,
      Slow: 5.8,
      Moderate: 8.5,
      Busy: 9.1,
      Slammed: 9.1
    }
  },
  {
    id: 111,
    name: "Replace overflowing trash",
    scores: {
      Empty: 6.8,
      Slow: 7.3,
      Moderate: 7.8,
      Busy: 8.4,
      Slammed: 8.4
    }
  },
  {
    id: 112,
    name: "Refill backup beer",
    scores: {
      Empty: 7.8,
      Slow: 8.4,
      Moderate: 8.2,
      Busy: 7.8,
      Slammed: 6.8
    }
  },
  {
    id: 113,
    name: "Organize cooler",
    scores: {
      Empty: 8.7,
      Slow: 7.7,
      Moderate: 5.8,
      Busy: 2.5,
      Slammed: 0.5
    }
  },
  {
    id: 114,
    name: "Rotate inventory",
    scores: {
      Empty: 8.6,
      Slow: 7.6,
      Moderate: 5.6,
      Busy: 2.3,
      Slammed: 0.4
    }
  },
  {
    id: 115,
    name: "Polish glassware",
    scores: {
      Empty: 8.4,
      Slow: 7.4,
      Moderate: 5.4,
      Busy: 2.1,
      Slammed: 0.3
    }
  },
  {
    id: 116,
    name: "Break down cardboard",
    scores: {
      Empty: 8.0,
      Slow: 7.0,
      Moderate: 5.2,
      Busy: 2.8,
      Slammed: 0.8
    }
  },
  {
    id: 117,
    name: "Count inventory",
    scores: {
      Empty: 9.0,
      Slow: 6.5,
      Moderate: 3.5,
      Busy: 1.0,
      Slammed: 0.0
    }
  },
  {
    id: 118,
    name: "Clean floor drains",
    scores: {
      Empty: 9.6,
      Slow: 4.7,
      Moderate: 1.5,
      Busy: 0.0,
      Slammed: 0.0
    }
  },
  {
    id: 119,
    name: "Mop floors",
    scores: {
      Empty: 9.1,
      Slow: 4.3,
      Moderate: 1.0,
      Busy: 0.0,
      Slammed: 0.0
    }
  },
  {
    id: 120,
    name: "Complete deep cleaning",
    scores: {
      Empty: 9.7,
      Slow: 3.5,
      Moderate: 0.5,
      Busy: 0.0,
      Slammed: 0.0
    }
  }
];

const modifiers = [
  {
    text: "No additional conditions apply.",
    adjustment: 0.0
  },
  {
    text: "The task has been waiting for 10 minutes.",
    adjustment: 0.5
  },
  {
    text: "The issue is visible to guests.",
    adjustment: 0.7
  },
  {
    text: "The bartender is working less efficiently.",
    adjustment: 0.6
  },
  {
    text: "One drink category is blocked.",
    adjustment: 1.3
  },
  {
    text: "Bartender production is stopped.",
    adjustment: 2.0
  }
];

const elements = {
  startScreen: document.querySelector("#start-screen"),
  quizScreen: document.querySelector("#quiz-screen"),
  resultsScreen: document.querySelector("#results-screen"),
  employeeName: document.querySelector("#employee-name"),
  questionCount: document.querySelector("#question-count"),
  startButton: document.querySelector("#start-button"),
  progress: document.querySelector("#progress"),
  score: document.querySelector("#score"),
  businessLevel: document.querySelector("#business-level"),
  conditionText: document.querySelector("#condition-text"),
  answerButtons: document.querySelector("#answer-buttons"),
  feedback: document.querySelector("#feedback"),
  nextButton: document.querySelector("#next-button"),
  finalScore: document.querySelector("#final-score"),
  resultMessage: document.querySelector("#result-message"),
  restartButton: document.querySelector("#restart-button")
};

let quizState = {
  employeeName: "",
  totalQuestions: 10,
  currentQuestion: 0,
  score: 0,
  activeQuestion: null
};
async function saveScore(percentage) {
  const scoreRecord = {
    employeeName: quizState.employeeName,
    score: quizState.score,
    totalQuestions: quizState.totalQuestions,
    percentage,
    attemptId: crypto.randomUUID()
  };

  try {
    await fetch(SCORE_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(scoreRecord)
    });

    return true;
  } catch (error) {
    console.error("Score submission failed:", error);
    return false;
  }
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function selectTwoDifferentTasks() {
  const firstTask = randomItem(tasks);

  let secondTask = randomItem(tasks);

  while (secondTask.id === firstTask.id) {
    secondTask = randomItem(tasks);
  }

  return [firstTask, secondTask];
}

function calculateScore(task, businessLevel, modifier) {
  const baseScore = task.scores[businessLevel];
  const adjustedScore = baseScore + modifier.adjustment;

  return Math.min(adjustedScore, 10);
}

function generateQuestion() {
  const businessLevel = randomItem(businessLevels);
  const [taskA, taskB] = selectTwoDifferentTasks();

  const modifierA = randomItem(modifiers);
  const modifierB = randomItem(modifiers);

  const scoreA = calculateScore(taskA, businessLevel, modifierA);
  const scoreB = calculateScore(taskB, businessLevel, modifierB);

  if (scoreA === scoreB) {
    return generateQuestion();
  }

  return {
    businessLevel,
    choices: [
      {
        task: taskA,
        modifier: modifierA,
        score: scoreA
      },
      {
        task: taskB,
        modifier: modifierB,
        score: scoreB
      }
    ],
    correctTaskId: scoreA > scoreB ? taskA.id : taskB.id
  };
}

function startQuiz() {
  const employeeName = elements.employeeName.value.trim();

  if (!employeeName) {
    alert("Enter the employee name.");
    elements.employeeName.focus();
    return;
  }

  quizState = {
    employeeName,
    totalQuestions: Number(elements.questionCount.value),
    currentQuestion: 0,
    score: 0,
    activeQuestion: null
  };

  elements.startScreen.hidden = true;
  elements.resultsScreen.hidden = true;
  elements.quizScreen.hidden = false;

  showNextQuestion();
}

function showNextQuestion() {
  quizState.currentQuestion += 1;
  quizState.activeQuestion = generateQuestion();

  elements.feedback.textContent = "";
  elements.nextButton.hidden = true;
  elements.answerButtons.innerHTML = "";

  elements.progress.textContent =
    `Question ${quizState.currentQuestion} of ${quizState.totalQuestions}`;

  elements.score.textContent = `Score: ${quizState.score}`;

  elements.businessLevel.textContent =
    quizState.activeQuestion.businessLevel;

  elements.conditionText.textContent =
    "Compare the two tasks and their conditions.";

  quizState.activeQuestion.choices.forEach((choice) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "answer-button";

    button.innerHTML = `
      <strong>${choice.task.name}</strong><br>
      <small>${choice.modifier.text}</small>
    `;

    button.addEventListener("click", () => {
      selectAnswer(choice.task.id, button);
    });

    elements.answerButtons.appendChild(button);
  });
}

function selectAnswer(selectedTaskId, selectedButton) {
  const buttons = document.querySelectorAll(".answer-button");
  const question = quizState.activeQuestion;

  buttons.forEach((button) => {
    button.disabled = true;
  });

  const isCorrect = selectedTaskId === question.correctTaskId;

  if (isCorrect) {
    quizState.score += 1;
    selectedButton.classList.add("correct");
    elements.feedback.textContent = "Correct.";
  } else {
    selectedButton.classList.add("incorrect");
    elements.feedback.textContent = "Incorrect.";

    buttons.forEach((button, index) => {
      const choice = question.choices[index];

      if (choice.task.id === question.correctTaskId) {
        button.classList.add("correct");
      }
    });
  }

  elements.score.textContent = `Score: ${quizState.score}`;

  elements.nextButton.textContent =
    quizState.currentQuestion === quizState.totalQuestions
      ? "View Results"
      : "Next Question";

  elements.nextButton.hidden = false;
}

function continueQuiz() {
  if (quizState.currentQuestion >= quizState.totalQuestions) {
    showResults();
    return;
  }

  showNextQuestion();
}

async function showResults() {
  const percentage = Math.round(
    (quizState.score / quizState.totalQuestions) * 100
  );

  elements.quizScreen.hidden = true;
  elements.resultsScreen.hidden = false;

  elements.finalScore.textContent =
    `${quizState.employeeName}: ${quizState.score} of ` +
    `${quizState.totalQuestions} correct (${percentage}%).`;

  elements.resultMessage.textContent =
    percentage >= 80
      ? "Passing score. Recording result..."
      : "Additional training required. Recording result...";

  const saved = await saveScore(percentage);

  elements.resultMessage.textContent =
    percentage >= 80
      ? saved
        ? "Passing score. Result submitted."
        : "Passing score. Result could not be submitted."
      : saved
        ? "Additional training required. Result submitted."
        : "Additional training required. Result could not be submitted.";
}

function restartQuiz() {
  elements.resultsScreen.hidden = true;
  elements.startScreen.hidden = false;
  elements.employeeName.focus();
}

elements.startButton.addEventListener("click", startQuiz);
elements.nextButton.addEventListener("click", continueQuiz);
elements.restartButton.addEventListener("click", restartQuiz);
