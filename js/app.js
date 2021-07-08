const allCards = document.querySelectorAll('.card');
// pick cards
let icons = [];
let numberOfMove = 0;
let numberOfStars = 5;
let secounds = 0;
let timerHolder;

document.querySelector("#buttonPlayAgain").addEventListener("click", restartGame);
document.querySelector("#buttonCancel").addEventListener("click", closeWinBox);
document.querySelector(".restart").addEventListener("click", restartGame);

beginGame();
restartGame();


function beginGame() {
    allCards.forEach(card => {
        card.addEventListener("click", cardClick); // when card clicked run function cardclick
        let cardName = card.children[0]; // find all card name
        icons.push(cardName.className) // push to list
    });
}


function restartGame() {
    closeWinBox();
    secounds = 0;


    numberOfMove = 0;
    numberOfStars = 5;
    shuffleCards();
    starsAndMoves();
    starTimer();

    allCards.forEach(card => {
        card.className = "card";
    });
}


function starTimer() {
    function cs(value) {
        return value > 9 ? value : "0" + value;
    }
    if (! timerHolder) {


        timerHolder = setInterval(function () {

            document.getElementById("seconds").innerHTML = cs(++ secounds % 60);
            document.getElementById("minutes").innerHTML = cs(parseInt(secounds / 60, 10));
        }, 1000);
    };
}


function stopTimer() {
    clearInterval(timerHolder)
    timerHolder = null;

}

function closeWinBox() {
    document.querySelector("#winBox").close();

}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function shuffleCards() {
    icons = shuffle(icons);
    // shuffle the icons of the array
    // shuffle on html
    let x = 0;
    allCards.forEach(card => {
        let cardName = card.children[0];
        cardName.className = icons[x];
        x++;
    });

}


let openCards = [];
// funtion to flib the card
function cardClick() {

    if (openCards.length < 2) {
        this.classList.add('open', 'show');
        openCards.push(this)
    }

    if (openCards.length == 2) {
        setTimeout(matchCards, 800);
    }

};


// check the card matching
function matchCards() {
    // check we got two cards
    if (openCards.length == 2) {
        let first = openCards[0];
        let second = openCards[1];
        // now compare two cards
        let firstclid = first.children[0].className;
        let secondclid = second.children[0].className;
        console.log(firstclid, "-----------", secondclid);

        if (firstclid == secondclid) {
            first.classList.add('match');
            second.classList.add('match');
        } else {
            first.className = 'card';
            second.className = 'card';
        } openCards = [];
        starsAndMoves();
    }
    // count number of card not match yet
    const unopenCard = document.querySelectorAll(".card:not(.match)");
    if (unopenCard.length == 0) {
        showWinBox();
    }

};


// if the player win show this box
function showWinBox() {
    document.querySelector("#nMoves").innerText = numberOfMove - 1;

    let winDialog = document.querySelector("#winBox");
    winDialog.showModal();
    stopTimer();


}


function starsAndMoves() {


    // add one to number of move the player
    // update numbe of moves
    const NME = document.querySelector(".moves");
    NME.innerText = numberOfMove;
    numberOfMove++;
    // update number of stars
    let starsElement = document.querySelector('.stars');
    starsElement.innerHTML = "";

    for (let i = 0; i < numberOfStars; i++) {
        let star = "<li><i class='fa fa-star'></i></li>";
        starsElement.innerHTML += star;
    }


    if (numberOfMove <= 16) {
        numberOfStars = 5;
    } else if (numberOfMove <= 20) {
        numberOfStars = 4;

    } else if (numberOfMove <= 25) {
        numberOfStars = 3;
    } else if (numberOfMove <= 30) {
        numberOfStars = 2;
    } else if (numberOfMove <= 40) {
        numberOfStars = 1;
    } else {
        numberOfStars = 0;
    }


}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
