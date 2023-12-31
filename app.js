// JS2 week1 - Browser environment, DOM manipulation, DOM event listeners

//  create a form to insert a quiz question. It should take a question and 4 options for answers.
//There should be a way to mark which answer is correct in the form, but you should only be able to select one correct answer.

//  implement one of the two (or both!):

// a. add a button that randomizes the order of the 4 option inputs once they have been filled in.

// b. color the input for the "correct" answer option in green and the "wrong" ones in red. Make sure it's still readable.

//  optional bonus: make sure the question is not longer than 140 characters.
//const allTextInputs = document.querySelectorAll('input[type="text"]');

const form = document.getElementById("quizForm");
const allTextInputs = form.querySelectorAll('input[type="text"]');

function randomizeOptions() {
  const optionsArray = Array.from(allTextInputs);

  // Shuffle the options array
  optionsArray.sort(() => Math.random() - 0.5);

  // Update input order within the form
  optionsArray.forEach((option) => {
    form.appendChild(option); // Move the input to the end of the form
  });
}

function resetColors() {
  allTextInputs.forEach((input) =>
    input.classList.remove("correct-answer", "wrong-answer")
  );
}

function handleFormSubmit(event) {
  event.preventDefault();

  resetColors(); // Call the resetColors function

  const correctAnswerIndex =
    document.getElementById("correctAnswer").selectedIndex;

  allTextInputs.forEach((input, index) => {
    if (index === correctAnswerIndex) {
      input.classList.add("correct-answer");
    } else {
      input.classList.add("wrong-answer");
    }
  });
}
