const cardTypes = {

    exhaustion: {
        name: 'exhaustion',
        count: 2,
        image: 'exhaustion.png',
        onFirstClick: function () {
            displayEffect('You Are Tired');
        },
        onMatch: function () {
            applyAilment('exhaustion');
            shiftHealthIndicator(-16);
            displayEffect('You Are Exhausted...');
        },
    },
    
    dysentery: {
        name: 'dysentery',
        count: 2,
        image: 'dysentery.png',
        onFirstClick: function () {
            displayEffect('Your Stomach Hurts');
        },
        onMatch: function () {
            applyAilment('dysentery');
            shiftHealthIndicator(-16);
            displayEffect('You Have Dysentery...');
        },
},
    
    typhoid: {
        name: 'typhoid',
        count: 2,
        image: 'typhoid.png',
        onFirstClick: function () {
            displayEffect('That Water Tasted Funny...');
        },
        onMatch: function () {
            applyAilment('typhoid');
            shiftHealthIndicator(-16);
            displayEffect('You Have Typhoid...');
        },
    },
    
    measles: {
        name: 'measles',
        count: 2,
        image: 'measles.png',
        onFirstClick: function () {
            displayEffect('You Dont Feel So Good');
        },
        onMatch: function () {
            applyAilment(' measles');
            shiftHealthIndicator(-16);
            displayEffect('You Have Measles...');
        },
    },
    
    freshWater: {
        name: 'freshWater',
        count: 2,
        image: 'freshWater.png',
        onFirstClick: function () {
            displayEffect('You See a Well In The Distance...');
        },
        onMatch: function () {
            shiftHealthIndicator(8);
            
            displayEffect('You Feel Hydrated From Fresh Water!');
        },
    },
    
    heartyFood: {
        name: 'heartyFood',
        count: 2,
        image: 'heartyFood.png',
        onFirstClick: function () {
            displayEffect('You Look For Food...');
        },
        onMatch: function () {
            shiftHealthIndicator(8);
            
            displayEffect('You Feel Full From A Hearty Meal!');
        },
    },
    
    restStop: {
        name: 'restStop',
        count: 2,
        image: 'restStop.png',
        onFirstClick: function () {
            displayEffect('You See A Town In The Distance');
        },
        onMatch: function () {
            shiftHealthIndicator(8);
            
            displayEffect('You Feel Safe And Rested!');
        },
    },
    
    oxen: {
        name: 'oxen',
        count: 2,
        image: 'oxen.png',
        onFirstClick: function () {
            displayEffect();
        },
        onMatch: function () {
            displayEffect();
        },
    },
    
    river: {
        name: 'river',
        count: 2,
        image: 'river.png',
        onFirstClick: function () {
            displayEffect();
        },
        onMatch: function () {
            displayEffect();
        },
    },
    
    tree: {
        name: 'tree',
        count: 2,
        image: 'tree.png',
        onFirstClick: function () {
            displayEffect();
        },
        onMatch: function () {
            displayEffect();
        },
    },
    
    rifle: {
        name: 'rifle',
        count: 2,
        image: 'rifle.png',
        onFirstClick: function () {
            displayEffect('You Spot A Wild Animal');
        },
        onMatch: function () {
            shiftHealthIndicator(8);
            
            displayEffect('You Gain Food From A Hunt!');
        },
    },
    
    cactus: {
        name: 'cactus',
        count: 2,
        image: 'cactus.png',
        onFirstClick: function () {
            displayEffect( );
        },
        onMatch: function () {
            displayEffect();
        },
    },
    
    bovineSkull: {
        name: 'bovineSkull',
        count: 2,
        image: 'bovineSkull.png',
        onFirstClick: function () {
            displayEffect();
        },
        onMatch: function () {
            displayEffect();
        },
    },
    
    deer: {
        name: 'deer',
        count: 2,
        image: 'deer.png',
        onFirstClick: function () {
            displayEffect();
        },
        onMatch: function () {
            displayEffect();
        },
    },
    
    boulder: {
        name: 'boulder',
        count: 2,
        image: 'boulder.png',
        onFirstClick: function () {
            displayEffect();
        },
        onMatch: function () {
            displayEffect();
        },
    },
}