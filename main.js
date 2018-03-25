var cardClickSound = new Audio();
cardClickSound.src = 'soundFX/card_clicked.wav';
cardClickSound.volume = 0.1;

var noMatchSound = new Audio();
noMatchSound.src = 'soundFX/no_match.wav';
noMatchSound.volume = .5;

var cardMatchSound = new Audio();
cardMatchSound.src = 'soundFX/match-made.wav';
cardMatchSound.volume = .2;

var themeSong = new Audio();
themeSong.src = 'soundFX/main_song.mp3';
themeSong.volume = .2;
themeSong.onpause = function(){
    this.play();
};

var ailmentSound = new Audio();
ailmentSound.src = 'soundFX/ailment.wav';

var winSound = new Audio();
winSound.src = 'soundFX/win_sound.wav';
winSound.volume = .5;

var cardTypeArray = ['exhaustion','exhaustion','dysentery','dysentery','typhoid','typhoid','measles','measles','freshWater','freshWater','heartyFood','heartyFood','restStop','restStop','oxen','oxen','river','river','tree','tree','rifle','rifle','cactus','cactus','bovineSkull','bovineSkull','deer','deer','boulder','boulder'];
var cardMemory = null;
var cardsCurrentlyFlipped = 0;
var winCondition = 0;
var timerBarDepletionCounter = -1;
var totalWins = 0;
var totalDeaths = 0;


$(document).ready(dealCards);

Array.prototype.cardShuffle = function () {

    var arrayValue = this.length;
    var randomNumber;
    var tempValue;
    while (--arrayValue > 0) {
        randomNumber = Math.floor(Math.random() * (arrayValue + 1));
        tempValue = this[arrayValue];
        this[arrayValue] = this[randomNumber];
        this[randomNumber] = tempValue;
    }
};

function dealCards() {
    console.log('Dealing Cards ...');
    var card = null;
    var timerBar = null;
    cardTypeArray.cardShuffle();
    for (i = 0; i < cardTypeArray.length; i++) {
        card = ($('<div>', {
            class: "card",
            type: cardTypeArray[i],
            onclick: 'revealCardFace(this)'
        }));

        $('#gameBody').append(card);
    }
    for (i = 0; i < (cardTypeArray.length * 3); i++) {
        timerBar = $('<div class="timerBar">');
        $('#rightSideBar').append(timerBar);
    }
    themeSong.play();
}

function revealCardFace(clickInput) {
    var clickedCard = $(clickInput);
    var cardType = $(clickInput).attr('type');
    cardsCurrentlyFlipped++;
    clickedCard.addClass(cardType).removeClass('card');
    cardClickSound.play();
    var time = $('.timerBar');

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
                var firstCard = cardMemory[0];
                var secondCard = cardMemory[1];
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
                $('#mainText').text('You Are Exhausted...');
                ailmentSound.play();
                for(i=0;i<10;i++) {
                    (function(i) {
                        setTimeout(function () {
                            timerBarDepletionCounter++;
                            $(time[timerBarDepletionCounter]).addClass('depleted');
                        }, 500*i);
                    })(i);
                }
            }

            else if(cardMemory[0]  === "dysentery" && cardMemory[1] === "dysentery"){
                $('#mainText').text('You Have Dysentery...');
                ailmentSound.play();
                for(i=0;i<10;i++) {
                    (function(i) {
                        setTimeout(function () {
                            timerBarDepletionCounter++;
                            $(time[timerBarDepletionCounter]).addClass('depleted');
                        }, 500*i);
                    })(i);
                }
            }

            else if(cardMemory[0] === "typhoid" && cardMemory[1] === "typhoid"){
                $('#mainText').text('You Have Typhoid...');
                ailmentSound.play();
                for(i=0;i<10;i++) {
                    (function(i) {
                        setTimeout(function () {
                            timerBarDepletionCounter++;
                            $(time[timerBarDepletionCounter]).addClass('depleted');
                        }, 500*i);
                    })(i);
                }
            }

            else if(cardMemory[0] === "measles" && cardMemory[1] === "measles"){
                $('#mainText').text('You Have Measles...');
                ailmentSound.play();
                for(i=0;i<10;i++) {
                    (function(i) {
                        setTimeout(function () {
                            timerBarDepletionCounter++;
                            $(time[timerBarDepletionCounter]).addClass('depleted');
                        }, 500*i);
                    })(i);
                }
            }

            else if(cardMemory[0] === "freshWater" && cardMemory[1] === "freshWater"){
                $('#mainText').text('You Feel Hydrated!');
                cardMatchSound.play();
                for(i=0;i<6;i++) {
                    (function (i) {
                        setTimeout(function () {
                            $(time[timerBarDepletionCounter]).removeClass('depleted');
                            timerBarDepletionCounter--;
                        }, 500*i);
                    })(i);
                }
            }

            else if(cardMemory[0] === "heartyFood" && cardMemory[1] === "heartyFood"){
                $('#mainText').text('You Feel Full!');
                cardMatchSound.play();
                for(i=0;i<6;i++) {
                    (function (i) {
                        setTimeout(function () {
                            $(time[timerBarDepletionCounter]).removeClass('depleted');
                            timerBarDepletionCounter--;
                        }, 500*i);
                    })(i);
                }
            }

            else if(cardMemory[0] === "restStop" && cardMemory[1] === "restStop"){
                $('#mainText').text('You Feel Rested!');
                cardMatchSound.play();
                for(i=0;i<6;i++) {
                    (function (i) {
                        setTimeout(function () {
                            $(time[timerBarDepletionCounter]).removeClass('depleted');
                            timerBarDepletionCounter--;
                        }, 500*i);
                    })(i);
                }
            }

            else if(cardMemory[0] === "rifle" && cardMemory[1] === "rifle"){
                $('#mainText').text('You Gain Food From Your Hunt!');
                cardMatchSound.play();
                for(i=0;i<6;i++) {
                    (function (i) {
                        setTimeout(function () {
                            $(time[timerBarDepletionCounter]).removeClass('depleted');
                            timerBarDepletionCounter--;
                        }, 500*i);
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
    cardsCurrentlyFlipped = 0;
    cardMemory = null;
    timerBarDepletionCounter = -1;
    winCondition = 0;
    $('#mainText').text('Match The Cards!');
    dealCards();

}

function openTheAboutModal(){
    var aboutMeModal = $('.aboutModal');
    var openModal = $('#aboutMeButton');
    aboutMeModal.addClass('modalVisibility');
    $('.card').addClass('disableClick')

}

function closeTheModal() {
    var aboutMeModal = $('.aboutModal');
    var closeModal = $('#closeModalButton');
    aboutMeModal.removeClass('modalVisibility');
    $('.card').removeClass('disableClick');
}

function muteMusic() {
    themeSong.muted = true;
}