
let cardMemory = null;
let cardsCurrentlyFlipped = 0;
let winCondition = 0;
let healthDepletionCounter = -1;
let lives = 3;
let cardClicksDisabled = false;
let score = 0;
let level = 1;
let cardsToUse = 0;

$(document).ready(initializeApplication);

function cardShuffle(cards) {
    let currentIndex = cards.length, tempValue, randomNumber;
    while (0 !== currentIndex) {
        randomNumber = Math.floor(Math.random() * (currentIndex));
        currentIndex -= 1;
        tempValue = cards[currentIndex];
        cards[currentIndex] = cards[randomNumber];
        cards[randomNumber] = tempValue;
    }
    return cards;
};

const defaultMethods = {
    onClick: () => { },
    onMatch: () => {
        shiftHealthIndicator(1)
    },
    onMissmatch: () => {
        shiftHealthIndicator(-3);
    },
    onFirstClick: () => { },
}

function initializeApplication() {
    let cards = dealCards(cardTypes, level);
    $('#gameBody').append(cards);
    let healthBar = createhealthBar(cards);
    $('#rightSideBar').append(healthBar);
    applyDefaultsToAllCardData(cardTypes, defaultMethods);
}

function dealCards(cardData) {
    let sizeAdjust = levelSizing(level);
    let card = null;
    let cardTypeArray = Object.keys(cardData);
    let cardsToAppend = [];
    for (let i = 0; i < cardTypeArray.length; i++) {
        let thisCardName = cardTypeArray[i];
        let thisCardData = cardData[thisCardName];
        for (let cardCount = 0; cardCount < thisCardData.count; cardCount++) {
            card = $('<div>', {
                class: "card",
                type: cardTypeArray[i],
                cardBack: cardData[cardTypeArray[i]].cardBack,
                cardFront: cardData[cardTypeArray[i]].cardFront,
                on: {
                    mousedown: handleCardClick,
                }
            })
                .css({
                    "margin": sizeAdjust.margin,
                    "width": sizeAdjust.width,
                    "height": sizeAdjust.height,
                    "padding": sizeAdjust.padding,
                })
            $('<image src= ' + thisCardData.cardFront + ' width = 100% height = 100%>').appendTo(card)
            cardsToAppend.push(card);
        }
    }
    cardsToAppend = levelAdjustment(cardsToAppend, level)
    cardsToUse = (cardsToAppend.length);
    let shuffledCards = cardShuffle(cardsToAppend);
    return shuffledCards;
}

function levelSizing(level) {
    let sizing = {};
    if (level === 1) {
        sizing = {
            margin: '2%',
            width: '12%',
            height: '40%',
            padding: '0% 1%',
            lifeHeight: '3.32%',
        };
    }
    else if (level === 2) {
        sizing = {
            margin: '.5%',
            width: '9%',
            height: '30%',
            padding: '0% 2.2%',
            lifeHeight: '1.84%',
        };
    }
    else if (level === 3) {
        sizing = {
            margin: '.5%',
            width: '9%',
            height: '30%',
            padding: '0% 0%',
            lifeHeight: '1.11%',
        };
    }
    return sizing
}

function levelAdjustment(cards, cardLevel) {
    if (cardLevel === 2) {
        cards = cards.slice(0, (cardLevel * 9));
        return cards;
    } else {
        cards = cards.slice(0, (cardLevel * 10));
        return cards;
    }
}

function createhealthBar(cards) {
    let healthBar = [];
    let barSize = levelSizing(level);
    for (let i = 0; i < (cards.length * 3); i++) {
        healthBar.push($('<div class="healthBar">').css({ "height": barSize.lifeHeight }));
    }
    return healthBar;
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
    if (!message) {
        message = 'Match The Cards!'
    }
    $('#mainText').text(message);
}

function handleCardClick() {
    let clickedElement = this;
    if (cardClicksDisabled) {
        return
    }
    cardClicksDisabled = true;
    let allCards = $('.card');
    let clickedCard = $(clickedElement);
    let cardType = $(clickedCard).attr('type');
    let cardFace = $(clickedCard).attr('cardFront');
    let cardBack = $(clickedCard).attr('cardBack');
    cardsCurrentlyFlipped++;
    clickedCard.children().attr('src', cardFace);
    clickedCard.addClass('disableClick');
    cardClickSound.play();
    if (cardMemory === null && cardsCurrentlyFlipped === 1) {
        cardMemory = [];
        cardMemory.push(cardType, clickedCard);
        cardTypes[cardType].onFirstClick();

        cardClicksDisabled = false;
    }
    else if (cardMemory !== null && cardsCurrentlyFlipped === 2) {
        cardMemory.push(cardType, clickedCard);
        allCards.addClass('disableClick');
        if (cardMemory[0] !== cardMemory[2]) {
            setTimeout(() => {
                cardTypes[cardType].onMissmatch();
                noMatchSound.play();
                cardMemory[1].children().attr('src', cardBack);
                cardMemory[3].children().attr('src', cardBack);
                cardMemory = null;
                cardsCurrentlyFlipped = 0;
                cardClicksDisabled = false;
            }, 800);
            score = score - 20;
        } else {
            cardTypes[cardType].onMatch();
            $("[type='" + cardMemory[0] + "']").addClass('matched');
            cardMatchSound.play();
            cardMemory = null;
            cardsCurrentlyFlipped = 0;
            score = score + 340;
            winCondition++;
            winGame();
            cardClicksDisabled = false;
        }
        if (score <= 0) {
            score = 0;
        }
    }
    $('#score').text('SCORE : ' + score);
}

function applyAilment(ailment) {
    ailmentSound.play();
    let AilmentToAppend = $('<div>', {
        class: ailment + 'Text',
        text: ailment.toUpperCase(),
    });
    $('#currentAilments').append(AilmentToAppend);
};

function shiftHealthIndicator(life) {
    let maxLoop = life
    let counter = 0;
    let health = $('.healthBar');
    let cards = $('.card');
    if (life <= 0) {
        let DamageCounter = healthDepletionCounter
        for (let i = 0; i > life; i--) {
            DamageCounter++
            $(health[DamageCounter]).addClass('damage');
        }
        (function delayLoop() {
            if (counter-- <= maxLoop) {
                cards.removeClass('disableClick');
                checkForDeath();
                return;
            } else {
                setTimeout(() => {
                    healthDepletionCounter++;
                    $(health[healthDepletionCounter]).removeClass('damage');
                    $(health[healthDepletionCounter]).addClass('depleted');
                    delayLoop();
                }, 50)
            }
        })();

    } else {
        let HealingCounter = healthDepletionCounter
        for (let i = 0; i < life; i++) {
            HealingCounter--
            $(health[HealingCounter + 1]).addClass('healing');
        }
        (function delayLoop() {
            if (counter++ >= maxLoop) {
                cards.removeClass('disableClick');
                return;
            } else {
                setTimeout(() => {
                    if (healthDepletionCounter < 0) {
                        cards.removeClass('disableClick');
                        return;
                    };
                    healthDepletionCounter--;
                    $(health[healthDepletionCounter + 1]).removeClass('healing');
                    $(health[healthDepletionCounter + 1]).removeClass('depleted');
                    delayLoop();
                }, 50)
            }
        })();
    }
}

function checkForDeath() {
    if (winCondition >= cardsToUse / 2) {
        return;
    }
    if ($('.depleted').length >= cardsToUse * 3) {
        $('#mainText').text('A Member Of Your Party Has Died, Try Again');
        $('.card').addClass('disableClick');
        lives--;
        $('#lives').text('LIVES : ' + lives);
        ailmentSound.play();
        if (lives <= 0) {
            $('#mainText').text('Everyone In Your Party Has Died, You Lose...');
            $('#announcement').text('You Lose!')
            openGameModal();
            return;
        }
        prepareNextLevel();
    }
}

function winGame() {
    let totalMatches = cardsToUse / 2;
    if (winCondition === (totalMatches)) {
        level++;
        winSound.play();
        if (level === 4) {
            $('#mainText').text('You Have Made It to Oregon! You Win!');
            $('#announcement').text('Congragulations! You Win!')
            openGameModal();
            return;
        } else {
            let difficulty = findDifficulty(level);
            $('#mainText').text('Level ' + level + '! Match The Cards!');
            $('#difficulty').text(difficulty);
            $('#level').text('LEVEL : ' + level);
            prepareNextLevel();
        }
    }
}

function findDifficulty(level) {
    if (level === 1) {
        return "EASY"
    }
    else if (level === 2) {
        return "HARD"
    }
    else if (level === 3) {
        return "DIFFICULT"
    }
}

function emptyGameBoard() {
    $('#gameBody').empty();
    $('#rightSideBar').empty();
    $('#currentAilments').empty();
    cardsCurrentlyFlipped = 0;
    cardMemory = null;
    healthDepletionCounter = -1;
    winCondition = 0;
}

function resetGame() {
    score = 0;
    level = 1;
    lives = 3;
    $('#level').text('LEVEL : 1');
    $('#score').text('SCORE : 0');
    $('#lives').text('LIVES : 3');
    $('#difficulty').text('EASY');
    $('#mainText').text('Match The Cards!');
    emptyGameBoard();
    initializeApplication();
}

function sleepTime(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function prepareNextLevel() {
    await sleepTime(2000);
    emptyGameBoard();
    initializeApplication();
}

function openGameModal() {
    $('.gameModal').addClass('modalVisibility');
    $('.card').addClass('disableClick')
}

function openTheAboutModal() {
    $('.aboutModal').addClass('modalVisibility');
    $('.card').addClass('disableClick')
}

function closeTheModal() {
    $('.aboutModal').removeClass('modalVisibility');
    $('.gameModal').removeClass('modalVisibility');
    $('.card').removeClass('disableClick');
}

function toggleMusic() {
    if (themeSong.paused) {
        themeSong.play();
        $('#muteMusicButton').text('Stop Music');
    } else {
        themeSong.pause();
        $('#muteMusicButton').text('Play Music');
    }
}