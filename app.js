// JS2 week1 - Browser environment, DOM manipulation, DOM event listeners

//  create a form to insert a quiz question. It should take a question and 4 options for answers.
//There should be a way to mark which answer is correct in the form, but you should only be able to select one correct answer.

//  implement one of the two (or both!):

// a. add a button that randomizes the order of the 4 option inputs once they have been filled in.

// b. color the input for the "correct" answer option in green and the "wrong" ones in red. Make sure it's still readable.

//  optional bonus: make sure the question is not longer than 140 characters.

function randomizeOptions() {
  var optionsContainer = document
    .getElementById("quizForm")
    .querySelectorAll('input[type="text"]');
  var optionsArray = Array.from(optionsContainer);

  // Shuffle the options array
  optionsArray.sort(() => Math.random() - 0.5);

  // Update input values with shuffled array
  optionsArray.forEach((option, index) => {
    option.value = `Shuffled Option ${index + 1}`;
  });
}

document
  .getElementById("quizForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Reset colors
    document
      .querySelectorAll('input[type="text"]')
      .forEach((input) =>
        input.classList.remove("correct-answer", "wrong-answer")
      );

    // Get correct answer from the selected option
    var correctAnswer = document.getElementById("correctAnswer").value;

    // Color correct answer in green and wrong answers in red
    document.querySelectorAll('input[type="text"]').forEach((input) => {
      if (input.id === correctAnswer) {
        input.classList.add("correct-answer");
      } else {
        input.classList.add("wrong-answer");
      }
    });
  });
