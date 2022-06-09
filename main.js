"use strict";

const lettersContainer = document.querySelector(".letters");

const letters = "abcdefghijklmnopqrstuvwxyz";

const generateArray = Array.from(letters);

const hangmanPicture = document.querySelector(".hangman-picture");

const letterGuessContainer = document.querySelector(".letter-guess");

const failSound = document.getElementById("fail");
const sucessSound = document.getElementById("sucess");

let wrongAttempts = 0;
let gamestate = false;

generateArray.forEach((letter) => {
  const span = document.createElement("span");

  const letterText = document.createTextNode(letter);

  span.appendChild(letterText);

  span.className = "letter-box";

  lettersContainer.appendChild(span);
});

const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

const objKeys = Object.keys(words);

let chosenWord = undefined;
let randomValue = undefined;

function init() {
  const randomKey = objKeys[Math.floor(Math.random() * objKeys.length)];

  const randomValueKey =
    words[randomKey][Math.floor(Math.random() * words[randomKey].length)];

  const category = document.querySelector(".category span");

  category.textContent = randomKey;

  // make an array from tthe chosen word

  const arrayOfWords = Array.from(randomValueKey);

  chosenWord = arrayOfWords;
  randomValue = randomValueKey;

  chosenWord.forEach((character) => {
    const span = document.createElement("span");

    if (character === " ") {
      span.className = "space";
    }
    letterGuessContainer.appendChild(span);
  });
}

init();

const spanLetter = document.querySelectorAll(".letter-box");

spanLetter.forEach((letter) => {
  letter.addEventListener("click", (e) => {
    gamestate = false;
    e.target.classList.add("clicked");

    const clickedLetter = e.target.textContent;

    compareWords(clickedLetter);
    isLetterWrong();
    hasWon();
  });
});

function compareWords(clickedLetter) {
  chosenWord.forEach((letter, index) => {
    if (letter.toLowerCase() === clickedLetter) {
      gamestate = true;

      // add the letter to the right index of the word
      letterGuessContainer.childNodes[index].textContent = letter;
    }
  });
}

function isLetterWrong() {
  if (gamestate === false) {
    wrongAttempts++;

    failSound.play();
    hangmanPicture.classList.add(`wrong-${wrongAttempts}`);

    if (wrongAttempts === 8) {
      lettersContainer.classList.add("game-over");

      createMessageForResult(`game over the word was ${randomValue}`);
    }
  } else {
    sucessSound.play();
  }
}

function hasWon() {
  const allLetters = Array.from(
    document.querySelectorAll(".letter-guess span")
  );

  // if all of the letters are shown on the screen
  const areShown = allLetters.every(
    (letter, index) => letter.textContent === chosenWord[index].trim()
  );
  if (areShown === true) {
    createMessageForResult("Congratulations! you have won the game");
  }
}

function createMessageForResult(result) {
  const div = document.createElement("div");
  const restart = document.createElement("button");
  const restartText = document.createTextNode("Restart");

  const divText = document.createTextNode(result);

  restart.appendChild(restartText);
  div.className = "popup";
  div.appendChild(divText);
  div.append(restart);

  document.body.appendChild(div);

  // reset everything and restart the game
  restart.addEventListener("click", () => {
    resetAll();
    init();
  });
}

function resetAll() {
  const popUp = document.querySelector(".popup");

  popUp.remove();

  letterGuessContainer.innerHTML = "";

  hangmanPicture.className = "hangman-picture";
  wrongAttempts = 0;
  gamestate = false;

  spanLetter.forEach((span) => span.classList.remove("clicked"));
  lettersContainer.classList.remove("game-over");
}
