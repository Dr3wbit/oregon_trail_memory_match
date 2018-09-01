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
themeSong.onpause = function(){
    this.play();
};

let ailmentSound = new Audio();
ailmentSound.src = 'soundFX/ailment.wav';

let winSound = new Audio();
winSound.src = 'soundFX/win_sound.wav';
winSound.volume = .2;

let cardTypeArray = ['exhaustion','exhaustion','dysentery','dysentery','typhoid','typhoid','measles','measles','freshWater','freshWater','heartyFood','heartyFood','restStop','restStop','oxen','oxen','river','river','tree','tree','rifle','rifle','cactus','cactus','bovineSkull','bovineSkull','deer','deer','boulder','boulder'];
let cardMemory = null;
let cardsCurrentlyFlipped = 0;
let winCondition = 0;
let timerBarDepletionCounter = -1;
let totalWins = 0;
let totalDeaths = 0;


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
    onClick: ()=>{},
    onMatch: ()=>{},
    onMissmatch: ()=>{
        shiftLifeIndicator(-2);
    },
    onFirstclick: ()=>{},
    onSecondclick: ()=>{}
}

function initializeApplication(){
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
    cardTypeArray.cardShuffle();
    let cardsToAppend = [];
    for (let i = 0; i < cardTypeArray.length; i++) {
        let thisCardName = cardTypeArray[i];
        let thisCardData = cardData[thisCardName];
        for(let cardCount = 0; cardCount < thisCardData.count; cardCount++){
            winCondition++;
            card = $('<div>', {
                class: "card",
                type: cardTypeArray[i],
                on:{
                    click: handleCardClick,
                }
            });
            cardsToAppend.push(card);

        }

    }
    return cardsToAppend;
}

function createTimerBar(cards){
    let timerBar = [];
    for (let i = 0; i < (cards.length * 3); i++) {
        timerBar.push($('<div class="timerBar">'));
    }
    return timerBar;
}

function applyDefaultsToAllCardData(data, defaults){
    for(var key in data){
        applyDefaultsToObjects(data[key], defaults);
    }
}
function applyDefaultsToObjects(object, defaultValues){
    for(var key in defaultValues){
        if(object[key]=== undefined){
            object[key] = defaultValues[key];
        }
    }
}

function handleCardClick(clickInput) {
    let clickedCard = $(clickInput);
    let cardType = $(clickInput).attr('type');
    let Ailment = null;
    cardsCurrentlyFlipped++;
    clickedCard.addClass(cardType).removeClass('card');
    cardClickSound.play();
    let time = $('.timerBar');
    let i = 0;

    if (cardMemory === null && cardsCurrentlyFlipped === 1) {
        cardMemory = [];
        cardMemory.push(cardType);
        console.log('First card ' + cardType + ' was added to memory.');
        clickedCard.addClass('disableClick');

    }else if (cardMemory !== null && cardsCurrentlyFlipped === 2) {
        console.log('Second card ' + cardType + ' was added to memory.');
        cardMemory.push(cardType);

        if(cardMemory[0] !== cardMemory[1]){
            console.log('No Match: ' + cardMemory[0] + ' !== ' +cardMemory[1]);
            $('.card').addClass('disableClick');
            setTimeout (function() {
                noMatchSound.play();
                $('.card').removeClass('disableClick');
                let firstCard = cardMemory[0];
                let secondCard = cardMemory[1];
                $("[type='" + firstCard + "']").removeClass('disableClick exhaustion dysentery typhoid measles freshWater heartyFood restStop oxen river tree rifle cactus bovineSkull deer boulder').addClass('card');
                $("[type='" + secondCard + "']").removeClass('disableClick exhaustion dysentery typhoid measles freshWater heartyFood restStop oxen river tree rifle cactus bovineSkull deer boulder').addClass('card');
                cardMemory = null;
                cardsCurrentlyFlipped = 0;
                for(i=0;i<2;i++) {
                    timerBarDepletionCounter++;
                    $(time[timerBarDepletionCounter]).addClass('depleted');
                }
                $('#score').text('SCORE : ' + (9000 - $('.depleted').length * 100));
            }, 800);
        }

        else if (cardMemory[0] === cardMemory[1]) {
            console.log('Match: ' + cardMemory[0] + ' === ' +cardMemory[1]);
            $("[type='" + cardMemory[0] + "']").addClass('disableClick');
            $("[type='" + cardMemory[1] + "']").addClass('disableClick');

            if (cardMemory[0] === "exhaustion" && cardMemory[1] === "exhaustion"){
                Ailment = $('<div class="exhaustionText">');
                $('#currentAilments').append(Ailment);
                Ailment.text('Exhausted');
                $('#mainText').text('You Are Exhausted...');
                ailmentSound.play();
                for(i=0;i<15;i++) {
                    (function(i) {
                        setTimeout(function () {
                            timerBarDepletionCounter++;
                            $(time[timerBarDepletionCounter]).addClass('depleted');
                        }, 300*i);
                    })(i);
                }
            }

            else if(cardMemory[0]  === "dysentery" && cardMemory[1] === "dysentery"){
                Ailment = $('<div class="dysenteryText">');
                $('#currentAilments').append(Ailment);
                Ailment.text('Dysentery');
                $('#mainText').text('You Have Dysentery...');
                ailmentSound.play();
                for(i=0;i<15;i++) {
                    (function(i) {
                        setTimeout(function () {
                            timerBarDepletionCounter++;
                            $(time[timerBarDepletionCounter]).addClass('depleted');
                        }, 300*i);
                    })(i);
                }
            }

            else if(cardMemory[0] === "typhoid" && cardMemory[1] === "typhoid"){
                Ailment = $('<div class="typhoidText">');
                $('#currentAilments').append(Ailment);
                Ailment.text('Typhoid');
                $('#mainText').text('You Have Typhoid...');
                ailmentSound.play();
                for(i=0;i<15;i++) {
                    (function(i) {
                        setTimeout(function () {
                            timerBarDepletionCounter++;
                            $(time[timerBarDepletionCounter]).addClass('depleted');
                        }, 300*i);
                    })(i);
                }
            }

            else if(cardMemory[0] === "measles" && cardMemory[1] === "measles"){
                Ailment = $('<div class="measlesText">');
                $('#currentAilments').append(Ailment);
                Ailment.text('Measles');
                $('#mainText').text('You Have Measles...');
                ailmentSound.play();
                for(i=0;i<15;i++) {
                    (function(i) {
                        setTimeout(function () {
                            timerBarDepletionCounter++;
                            $(time[timerBarDepletionCounter]).addClass('depleted');
                        }, 300*i);
                    })(i);
                }
            }

            else if(cardMemory[0] === "freshWater" && cardMemory[1] === "freshWater"){
                $('#mainText').text('You Feel Hydrated!');
                cardMatchSound.play();
                for(i=0;i<8;i++) {
                    (function (i) {
                        setTimeout(function () {
                            $(time[timerBarDepletionCounter]).removeClass('depleted');
                            timerBarDepletionCounter--;
                        }, 300*i);
                    })(i);
                }
            }

            else if(cardMemory[0] === "heartyFood" && cardMemory[1] === "heartyFood"){
                $('#mainText').text('You Feel Full!');
                cardMatchSound.play();
                for(i=0;i<8;i++) {
                    (function (i) {
                        setTimeout(function () {
                            $(time[timerBarDepletionCounter]).removeClass('depleted');
                            timerBarDepletionCounter--;
                        }, 300*i);
                    })(i);
                }
            }

            else if(cardMemory[0] === "restStop" && cardMemory[1] === "restStop"){
                $('#mainText').text('You Feel Rested!');
                cardMatchSound.play();
                for(i=0;i<8;i++) {
                    (function (i) {
                        setTimeout(function () {
                            $(time[timerBarDepletionCounter]).removeClass('depleted');
                            timerBarDepletionCounter--;
                        }, 300*i);
                    })(i);
                }
            }

            else if(cardMemory[0] === "rifle" && cardMemory[1] === "rifle"){
                $('#mainText').text('You Gain Food From Your Hunt!');
                cardMatchSound.play();
                for(i=0;i<8;i++) {
                    (function (i) {
                        setTimeout(function () {
                            $(time[timerBarDepletionCounter]).removeClass('depleted');
                            timerBarDepletionCounter--;
                        }, 300*i);
                    })(i);
                }
            }

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

function winGame(){
    if(winCondition === 15){
        console.log('You Win');
        winSound.play();
        $('#mainText').text('You Made It to Oregon!');
        totalWins++;
        $('#totalWins').text('WINS : ' + totalWins);
        $('#score').text('SCORE : ' + (9000 - $('.depleted').length * 100));
    }
}

function resetGame(){
    $('#gameBody').empty();
    $('#rightSideBar').empty();
    $('#currentAilments').empty();
    cardsCurrentlyFlipped = 0;
    cardMemory = null;
    timerBarDepletionCounter = -1;
    winCondition = 0;
    $('#mainText').text('Match The Cards!');
    dealCards();

}

function openTheAboutModal(){
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