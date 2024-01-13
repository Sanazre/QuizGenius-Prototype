// JavaScript to handle adding new answer row
document
  .getElementById("add-new-answer-btn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag

    const questionRow = document.querySelector(".question-row");
    const answerRowTemplate = `
            <div class="answer-row">
                <input type="text" name="answer-text-{INDEX}">
                <select name="correct-answer-{INDEX}">
                    <option value="false">false</option>
                    <option value="true">true</option>
                </select>
            </div>
        `;

    // Find the number of existing answer rows
    const existingAnswerRows =
      questionRow.querySelectorAll(".answer-row").length;

    // Replace {INDEX} with the current index in the answerRowTemplate
    const updatedAnswerRowTemplate = answerRowTemplate.replace(
      /{INDEX}/g,
      existingAnswerRows
    );

    // Insert the updatedAnswerRowTemplate before the "Add new answer" button
    document
      .getElementById("add-new-answer-btn")
      .insertAdjacentHTML("beforebegin", updatedAnswerRowTemplate);
  });

// Global array to store questions
const questionsArray = [];

// Function to check if at least one answer is selected as true
function isAtLeastOneTrueSelected() {
  const questionForm = document.getElementById("question-form");
  const answerSelects = questionForm.querySelectorAll(
    'select[name^="correct-answer-"]'
  );
  return Array.from(answerSelects).some((select) => select.value === "true");
}

// Function to display questions after each form submission
function displayQuestions() {
  const questionsDisplay = document.getElementById("questions-display");
  questionsDisplay.innerHTML = ""; // Clear previous content

  questionsArray.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "display-question-row";

    questionDiv.innerHTML += `<p>Question ${index + 1}: ${
      question.question
    }</p>`;

    const answersList = document.createElement("ul");

    question.answers.forEach((answer) => {
      const answerItem = document.createElement("li");
      answerItem.textContent = `${answer.answer} - ${
        answer.isTrue ? "True" : "False"
      }`;
      answersList.appendChild(answerItem);
    });

    questionDiv.appendChild(answersList);
    questionsDisplay.appendChild(questionDiv);
  });
}
// Function to extract data from the form and store it in the array
function submitQuestion() {
  const questionForm = document.getElementById("question-form");

  // Check if at least one answer is selected as true
  if (!isAtLeastOneTrueSelected()) {
    alert("Please select at least one correct answer.");
    return;
  }

  const questionData = {
    id: questionsArray.length,
    question: questionForm.querySelector('input[name="question"]').value,
    answers: [],
  };

  // Extract answers from the form
  const answerRows = questionForm.querySelectorAll(".answer-row");
  answerRows.forEach((answerRow, index) => {
    const answerText = answerRow.querySelector(
      `input[name="answer-text-${index}"]`
    ).value;
    const isTrue =
      answerRow.querySelector(`select[name="correct-answer-${index}"]`)
        .value === "true";

    questionData.answers.push({
      answer: answerText,
      isTrue: isTrue,
    });
  });

  // Add the question data to the main array
  questionsArray.push(questionData);

  // Display questions after each form submission
  displayQuestions();

  // Clear form values
  questionForm.reset();
}

// Event listener for the "Submit Question" link
document
  .getElementById("submit-question-btn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    submitQuestion();
  });
