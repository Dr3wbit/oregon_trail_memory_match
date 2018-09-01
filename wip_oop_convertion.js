let cardClickSound = new Audio();
cardClickSound.src = 'soundFX/card_clicked.wav';
cardClickSound.volume = 0.1;

let noMatchSound = new Audio();
noMatchSound.src = 'soundFX/no_match.wav';
noMatchSound.volume = .5;

let cardMatchSound = new Audio();
cardMatchSound.src = 'soundFX/match-made.wav';
cardMatchSound.volume = .2;

let themeSong = new Audio();
themeSong.src = 'soundFX/main_song.mp3';
themeSong.volume = .2;
themeSong.onpause = function () {
    this.play();
};

let ailmentSound = new Audio();
ailmentSound.src = 'soundFX/ailment.wav';

let winSound = new Audio();
winSound.src = 'soundFX/win_sound.wav';
winSound.volume = .2;

let cardTypeArray = ['exhaustion', 'exhaustion', 'dysentery', 'dysentery', 'typhoid', 'typhoid', 'measles', 'measles', 'freshWater', 'freshWater', 'heartyFood', 'heartyFood', 'restStop', 'restStop', 'oxen', 'oxen', 'river', 'river', 'tree', 'tree', 'rifle', 'rifle', 'cactus', 'cactus', 'bovineSkull', 'bovineSkull', 'deer', 'deer', 'boulder', 'boulder'];
let cardMemory = null;
let cardsCurrentlyFlipped = 0;
let winCondition = 0;
let timerBarDepletionCounter = -1;
let totalWins = 0;
let totalDeaths = 0;
let cardClicksDisabled = false;


$(document).ready(initializeApplication);

Array.prototype.cardShuffle = function () {

    let arrayValue = this.length;
    let randomNumber;
    let tempValue;
    while (--arrayValue > 0) {
        randomNumber = Math.floor(Math.random() * (arrayValue + 1));
        tempValue = this[arrayValue];
        this[arrayValue] = this[randomNumber];
        this[randomNumber] = tempValue;
    }
};

const defaultMethods = {
    onClick: () => { },
    onMatch: () => { },
    onMissmatch: () => {
        shiftHealthIndicator(-2);
    },
    onFirstClick: () => { },
    onSecondClick: () => { }
}

function initializeApplication() {
    let cards = dealCards(cardTypes);
    $('#gameBody').append(cards);
    let timerBar = createTimerBar(cards);
    $('#rightSideBar').append(timerBar);
    applyDefaultsToAllCardData(cardTypes, defaultMethods);
    // themeSong.play();
}

function dealCards(cardData) {
    console.log('Dealing Cards ...');
    let card = null;
    let cardTypeArray = Object.keys(cardData);
    let cardsToAppend = [];
    for (let i = 0; i < cardTypeArray.length; i++) {
        let thisCardName = cardTypeArray[i];
        let thisCardData = cardData[thisCardName];
        for (let cardCount = 0; cardCount < thisCardData.count; cardCount++) {
            winCondition++;
            card = $('<div>', {
                class: "card",
                type: cardTypeArray[i],
                on: {
                    click: handleCardClick,
                }
            });
            cardsToAppend.push(card);

        }

    }
    cardsToAppend.cardShuffle();
    return cardsToAppend;
}

function createTimerBar(cards) {
    let timerBar = [];
    for (let i = 0; i < (cards.length * 3); i++) {
        timerBar.push($('<div class="timerBar">'));
    }
    return timerBar;
}

function applyDefaultsToAllCardData(data, defaults) {
    for (var key in data) {
        applyDefaultsToObjects(data[key], defaults);
    }
}
function applyDefaultsToObjects(object, defaultValues) {
    for (var key in defaultValues) {
        if (object[key] === undefined) {
            object[key] = defaultValues[key];
        }
    }
}

function displayEffect(message) {
    $('#mainText').text(message);
}

function handleCardClick() {
    let clickedElement = this;
    if (cardClicksDisabled) {
        return
    }
    let clickedCard = $(clickedElement);
    let cardType = $(clickedCard).attr('type');
    cardsCurrentlyFlipped++;
    clickedCard.addClass(cardType);
    cardClickSound.play();
    let i = 0;

    if (cardMemory === null && cardsCurrentlyFlipped === 1) {
        cardMemory = [];
        cardMemory.push(cardType);
        clickedCard.addClass('disableClick');
        cardTypes[clickedCard.attr('type')].onFirstClick();

    } else if (cardMemory !== null && cardsCurrentlyFlipped === 2) {
        cardTypes[clickedCard.attr('type')].onSecondClick();
        cardMemory.push(cardType);

        if (cardMemory[0] !== cardMemory[1]) {
            displayEffect('pick a card!');
            $('.card').addClass('disableClick');
            cardClicksDisabled = true
            setTimeout(() => {
                cardTypes[clickedCard.attr('type')].onMissmatch();
                cardClicksDisabled = false;
                noMatchSound.play();
                $('.card').removeClass('disableClick');
                let firstCard = cardMemory[0];
                let secondCard = cardMemory[1];
                $("[type='" + firstCard + "']").removeClass(firstCard).addClass('card');
                $("[type='" + secondCard + "']").removeClass(secondCard).addClass('card');
                cardMemory = null;
                cardsCurrentlyFlipped = 0;
            }, 800);
        }

        else if (cardMemory[0] === cardMemory[1]) {
            cardTypes[clickedCard.attr('type')].onMatch();
            $("[type='" + cardMemory[0] + "']").addClass('disableClick');
            $("[type='" + cardMemory[1] + "']").addClass('disableClick');
            cardMatchSound.play();
            cardMemory = null;
            cardsCurrentlyFlipped = 0;
            winCondition++;
            winGame();
        }
    }

    if ($('.depleted').length >= cardTypeArray.length * 3) {
        console.log('You Lose');
        $('#mainText').text('You Have Died...');
        $('#score').text('SCORE : ' + (9000 - $('.depleted').length * 100));
        $('.card').addClass('disableClick');
        totalDeaths++;
        $('#totalDeaths').text('DEATHS : ' + totalDeaths);
        ailmentSound.play();
    }
}

function shiftHealthIndicator(life) {
    let time = $('.timerBar');
    if (life <= 0) {
        for (let i = 0; i > life; i--) {
            timerBarDepletionCounter++;
            $(time[timerBarDepletionCounter]).addClass('depleted');
        }

    } else {
        for (let i = 0; i < life; i++) {

            timerBarDepletionCounter--;
            $(time[timerBarDepletionCounter]).removeClass('depleted');

        }
    }
    $('#score').text('SCORE : ' + (9000 - $('.depleted').length * 100));

}

function winGame() {
    if (winCondition === 15) {
        console.log('You Win');
        winSound.play();
        $('#mainText').text('You Made It to Oregon!');
        totalWins++;
        $('#totalWins').text('WINS : ' + totalWins);
        $('#score').text('SCORE : ' + (9000 - $('.depleted').length * 100));
    }
}

function resetGame() {
    $('#gameBody').empty();
    $('#rightSideBar').empty();
    $('#currentAilments').empty();
    cardsCurrentlyFlipped = 0;
    cardMemory = null;
    timerBarDepletionCounter = -1;
    winCondition = 0;
    $('#mainText').text('Match The Cards!');
    initializeApplication();

}

function openTheAboutModal() {
    let aboutMeModal = $('.aboutModal');
    let openModal = $('#aboutMeButton');
    aboutMeModal.addClass('modalVisibility');
    $('.card').addClass('disableClick')

}

function closeTheModal() {
    let aboutMeModal = $('.aboutModal');
    let closeModal = $('#closeModalButton');
    aboutMeModal.removeClass('modalVisibility');
    $('.card').removeClass('disableClick');
}

function muteMusic() {
    themeSong.muted = true;
}