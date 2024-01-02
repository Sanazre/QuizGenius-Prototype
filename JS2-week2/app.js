let questions = []; // Array of all questions
const form = document.getElementById("quiz-form");
const questionsWrapper = document.getElementById("questions-wrapper");
let idCounter = 1; // Increamenting each question ID

// this function handles adding each question after submitting
function submitQuestion() {
  const formElements = form.elements;
  const formElementsArray = Array.from(formElements);
  const answers = formElements["answers"].value.split(",");
  let correctAnswer = false;

  questions.push(
    creatQuestionObject(
      formElements["question"].value,
      createAnswersArray(answers)
    )
  );

  createQuestionElement(questions);

  idCounter++;
}

// creating question object
function creatQuestionObject(question, answers) {
  return {
    id: idCounter,
    question,
    answers,
  };
}

// create answers array
function createAnswersArray(answers) {
  let answersArray = [];
  answers.forEach((answer) => {
    answersArray.push({
      text: answer.replace(" ", ""),
      isCorrect: false,
    });
  });
  answersArray[
    Math.floor(Math.random() * answersArray.length)
  ].isCorrect = true;
  return answersArray;
}

// creating question element
function createQuestionElement(questions) {
  questionsWrapper.innerHTML = "";
  questions.forEach((question) => {
    const questionElementwrapper = document.createElement("div");
    const printedQuiz = document.createElement("h4");
    const answersElementWrapper = document.createElement("ul");
    const answerElement = document.createElement("li");

    questionElementwrapper.className = "printed-quiz";
    printedQuiz.innerHTML = question.question;

    questionElementwrapper.appendChild(printedQuiz);

    question.answers.forEach((answerItem) => {
      let tempAnswer = answerElement.cloneNode(true);
      tempAnswer.innerHTML = answerItem.text;
      answersElementWrapper.appendChild(tempAnswer);
    });

    questionsWrapper.appendChild(questionElementwrapper);
    questionsWrapper.appendChild(answersElementWrapper);
  });
}
