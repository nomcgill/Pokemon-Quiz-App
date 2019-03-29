

let questionNumber = 0;

let score = 0;

function generateQuestion() {

  if (questionNumber < STORE.length) {
    return `<div class="question-${questionNumber}">
    <h2 id="scroll">${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    
    <button type="submit" class="submitButton">Am I right?</button>
    </fieldset>
    </form>
    </div>`;
  } else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(10)
  }
}

function changeQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

function changeScore() {
  score++;
}


function startQuiz() {
  $('.quizStart, body').on('click', '.startButton', function (event) {
    event.preventDefault();
    $('.quizStart').remove();
    //$('.questionAnswerForm').css('display', 'block');
    //$('.questionNumber').text(1);
    renderQuestion();
  });
}

function renderQuestion() {
  $('.questionAnswerForm').html(generateQuestion());
}

function userSelectAnswer() {
  $('.container').on('submit', '.questionAnswerForm form', function (event) {
    event.preventDefault();

    let selected = $('input:checked');
    let answer = selected.val();
    console.log(answer);
    let correctAnswer = STORE[questionNumber].correctAnswer;
    console.log(correctAnswer);

    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    }
    else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}


function ifAnswerIsCorrect() {

  userAnswerFeedbackCorrect();
  updateScore();
}

function ifAnswerIsWrong() {
  userAnswerFeedbackWrong();
}

function userAnswerFeedbackCorrect() {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;

  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="picture"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div>
  <p>
  <b>You got it right!</b></p><button type=button class="nextButton">Continue...</button></div>`);
}

function userAnswerFeedbackWrong() {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="picture"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>You got it wrong...</b><br>the correct answer is <span>"${correctAnswer}"</span>.</p><button type=button class="nextButton">Continue...</button></div>`);
}

function updateScore() {
  changeScore();
  $('.score').text(score);
}

function renderResults() {
  if (score >= 9) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Your rollout is gaining momentum!</h3><p>You got ${score} / 10.</p><p>Aren't you already a Pokémon Master?</p><button class="restartButton">Restart Quiz</button></div>`);
  } else if (score < 9 && score >= 5) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Almost there!</h3><p>You got ${score} out of 10!</p><p>Maybe get a few more gym badges and try again?</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Maybe you should level up some more, rookie.</h3><p>You got ${score} / 10.</p><p>Try again?</p><button class="restartButton">Restart Quiz</button></div>`);
  }
}

function renderNextQuestion() {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    renderQuestion();
    //userSelectAnswer();
  });
}

function restartQuiz() {
  $('main').on('click', '.restartButton', function (event) {
    score = 0;
    $('.score').text(score);

    questionNumber = 0;
    $('.questionNumber').text(questionNumber + 1);

    renderQuestion();
  });
}

function createQuiz() {
  startQuiz();
  // renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
  restartQuiz();
}

$(createQuiz);
