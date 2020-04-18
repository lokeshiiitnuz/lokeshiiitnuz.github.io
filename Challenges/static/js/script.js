function ageInDays() {
  var birthYear = prompt("Please mention Your DOB in DD/MM/YYYY:");
  var a = birthYear.slice(3, 5);
  var b = birthYear.slice(0, 2);
  var c = birthYear.slice(6, 11);
  birthYear = a + "/" + b + "/" + c;
  const date1 = new Date(birthYear);
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  var h1 = document.createElement("h1");
  var yeara = Math.floor(diffDays / 365);
  var textAnswer = document.createTextNode(
    "You are " +
      diffDays +
      " days old. And you have lived " +
      yeara +
      " years so far..!!"
  );

  h1.setAttribute("id", "diffDays");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
  document.getElementById("diffDays").remove();
}

function generateCat() {
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src = "https://i.gifer.com/VspG.gif";
  div.appendChild(image);
}

function rpsGame(yourChoice) {
  var botChoice;
  botChoice = numberToChoice(randToRpsInt());
  console.log("Computer Chose:" + botChoice);
  var results;
  var humanChoice;
  humanChoice = yourChoice.id;
  results = dicideWinner(humanChoice, botChoice);
  console.log("Final score:" + results);
  var message;
  message = finalMessage(results);
  console.log(message);
  rpsFrontEnd(yourChoice.id, botChoice, message);
}
function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}
function numberToChoice(number) {
  return ["rock", "paper", "scissors"][number];
}

function dicideWinner(yourChoice, computerChoice) {
  var rpsDataBase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };
  var yourScore = rpsDataBase[yourChoice][computerChoice];
  var computerScore = rpsDataBase[computerChoice][yourChoice];
  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { msg: "You lost!", color: "red" };
  } else if (yourScore === 0.5) {
    return { msg: "You tied", color: "yellow" };
  } else return { msg: "You won!!", color: "green" };
}

function rpsFrontEnd(humanImageChoice, botImageChoice, m) {
  var imageDataBase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  var humanDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var messageDiv = document.createElement("div");

  humanDiv.innerHTML =
    "<img src='" +
    imageDataBase[humanImageChoice] +
    "'width=150 height=150 style='box-shadow:0px 10px 50px rgba(37,50,233,1);'>";
  messageDiv.innerHTML =
    "<h1 style='color:" +
    m["color"] +
    ";font-size:60px;padding:30px'>" +
    m["msg"] +
    "</h1>";
  botDiv.innerHTML =
    "<img src='" +
    imageDataBase[botImageChoice] +
    "'width=150 height=150 style='box-shadow:0px 10px 50px rgba(243,38,24,1);'>";

  document.getElementById("flex-box-rps-div").appendChild(humanDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

// Challenge 4 code

var all_buttons = document.getElementsByTagName("button");
// console.log(all_buttons);
var copyAllButtons = [];
// console.log("LLLLLLLLLLLLLLL" + all_buttons);

for (let i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}
// console.log(copyAllButtons);
const copyAllButtons2 = copyAllButtons;

function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === "red") {
    buttonsRed();
  } else if (buttonThingy.value === "green") {
    buttonsGreen();
  } else if (buttonThingy.value === "reset") {
    buttonsReset();
  } else if (buttonThingy.value === "random") {
    buttonsRandom();
  }
}

function buttonsRed() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-danger");
  }
}
function buttonsGreen() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
}

function buttonsReset() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

function buttonsRandom() {
  var c = {
    "0": "btn-danger",
    "1": "btn-warning",
    "2": "btn-success",
    "3": "btn-primary",
  };

  for (let i = 0; i < all_buttons.length; i++) {
    var a = c[Math.floor(Math.random() * 4)];
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(a);
    console.log(a);
  }
}

// Challenge 5: Blackjacks

let blackjackGame = {
  you: { scoreSpan: "#your-blackjack-result", div: "#your-box", score: 0 },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A", "J", "Q", "K"],
  cardsMap: {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 10,
    Q: 10,
    K: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  turnsOver: false,
  x: 0,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const hitSound = new Audio("./static/sounds/swish.m4a");
const winSound = new Audio("./static/sounds/cash.mp3");
const lossSound = new Audio("./static/sounds/aww.mp3");

document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);
document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);

document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", dealerLogic);

function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}

function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `./static/images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  if (blackjackGame["turnsOver"] === true) {
    blackjackGame["isStand"] = false;
    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");
    let dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");
    for (i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }
    for (i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }
    YOU["score"] = 0;
    DEALER["score"] = 0;
    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#your-blackjack-result").style.color = "white";
    document.querySelector("#dealer-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").style.color = "white";
    document.querySelector("#blackjack-result").textContent = "Let's play";
    document.querySelector("#blackjack-result").style.color = "black";
    blackjackGame["turnsOver"] = true;
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomIndex];
}

function updateScore(card, activePlayer) {
  if (card === "A") {
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUSTS!!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function dealerLogic() {
  blackjackGame["isStand"] = true;
  while (DEALER["score"] <= 15 && blackjackGame["isStand"] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }
  blackjackGame["turnsOver"] = true;
  let winner = computeWinner();
  showResult(winner);
}

//compute winner and return who just won
//updates the wins,draws and losses
function computeWinner() {
  let winner;
  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      blackjackGame["wins"]++;
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      blackjackGame["losses"]++;
      winner = DEALER;
    }
  } else if (YOU["score"] == DEALER["score"]) {
    blackjackGame["draws"]++;
    winner = "draw";
    console.log("drq");
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    blackjackGame["losses"]++;
    winner = DEALER;
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    blackjackGame["draws"]++;
    winner = "draw";
  }

  return winner;
}

function showResult(winner) {
  let message, messageColor;
  if (blackjackGame["turnsOver"] === true) {
    if (winner == YOU) {
      document.querySelector("#wins").textContent = blackjackGame["wins"];
      message = "You Won!!";
      messageColor = "green";
      winSound.play();
    } else if (winner === DEALER) {
      document.querySelector("#losses").textContent = blackjackGame["losses"];
      message = "You lost!!";
      messageColor = "red";
      lossSound.play();
    } else if (winner == "draw") {
      document.querySelector("#draws").textContent = blackjackGame["draws"];
      message = "You drew!!";
      messageColor = "black";
    }
    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
  }
  if (
    blackjackGame["wins"] + blackjackGame["losses"] + blackjackGame["draws"] ==
    7
  ) {
    if (blackjackGame["wins"] > blackjackGame["losses"]) {
      message = "You won the tournement...! congratulations";
      messageColor = "green";
    } else if (blackjackGame["wins"] < blackjackGame["losses"]) {
      message = "Ooops! You have lost the tournement...! Try again";
      messageColor = "red";
    } else {
      message = "Well..!!. You have managed a draw";
      messageColor = "black";
    }

    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
    blackjackGame["wins"] = 0;
    blackjackGame["losses"] = 0;
    blackjackGame["draws"] = 0;
    document.querySelector("#wins").textContent = blackjackGame["wins"];
    document.querySelector("#losses").textContent = blackjackGame["losses"];
    document.querySelector("#draws").textContent = blackjackGame["draws"];
  }
}
