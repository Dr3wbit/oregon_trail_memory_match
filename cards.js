const cardTypes = {

    restStop: {
        name: 'restStop',
        count: 2,
        image: 'restStop.png',
        onFirstclick: function () {
            displayEffect(chooseRandom(['This looks promising', 'this might be a safe place...', 'a nap here couldn\'t hurt, right?']));
        },
        onMatch: function () {
            shiftLifeIndicator(5);
            playMatchSound();
            displayEffect('You Feel Rested!');
        },
    },
}