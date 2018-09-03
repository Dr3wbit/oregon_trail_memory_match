const cardTypes = {
    
    dysentery: {
        name: 'dysentery',
        count: 2,
        cardBack: '/oregon-trail/images/cardBack.png',
        cardFront: '/oregon-trail/images/dysentery.png',
        onFirstClick: function () {
            displayEffect('Your Stomach Hurts');
        },
        onMatch: function () {
            applyAilment('dysentery');
            shiftHealthIndicator(-16);
            displayEffect('You Have Dysentery...');
        },
},
    
    freshWater: {
        name: 'freshWater',
        count: 2,
        cardBack: '/oregon-trail/images/cardBack.png',
        cardFront: '/oregon-trail/images/freshWater.png',
        onFirstClick: function () {
            displayEffect('You See a Well In The Distance...');
        },
        onMatch: function () {
            shiftHealthIndicator(8);
            
            displayEffect('You Feel Hydrated From Fresh Water!');
        },
    },
    
    oxen: {
        name: 'oxen',
        count: 2,
        cardBack: '/oregon-trail/images/cardBack.png',
        cardFront: '/oregon-trail/images/oxen.png',
        onFirstClick: function () {
            displayEffect();
        },
    },
    
    tree: {
        name: 'tree',
        count: 2,
        cardBack: '/oregon-trail/images/cardBack.png',
        cardFront: '/oregon-trail/images/tree.png',
        onFirstClick: function () {
            displayEffect();
        },
    },
    
    cactus: {
        name: 'cactus',
        count: 2,
        cardBack: '/oregon-trail/images/cardBack.png',
        cardFront: '/oregon-trail/images/cactus.png',
        onFirstClick: function () {
            displayEffect( );
        },
    },

    rifle: {
        name: 'rifle',
        count: 2,
        cardBack: '/oregon-trail/images/cardBack.png',
        cardFront: '/oregon-trail/images/rifle.png',
        onFirstClick: function () {
            displayEffect('You Spot A Wild Animal');
        },
        onMatch: function () {
            shiftHealthIndicator(8);
            
            displayEffect('You Gain Food From A Hunt!');
        },
    },
    
    bovineSkull: {
        name: 'bovineSkull',
        count: 2,
        cardBack: '/oregon-trail/images/cardBack.png',
        cardFront: '/oregon-trail/images/bovineSkull.png',
        onFirstClick: function () {
            displayEffect();
        },
    },
    
    deer: {
        name: 'deer',
        count: 2,
        cardBack: '/oregon-trail/images/cardBack.png',
        cardFront: '/oregon-trail/images/deer.png',
        onFirstClick: function () {
            displayEffect();
        },
    },

    exhaustion: {
        name: 'exhaustion',
        count: 2,
        cardBack: '/oregon-trail/images/cardBack.png',
        cardFront: '/oregon-trail/images/exhaustion.png',
        onFirstClick: function () {
            displayEffect('You Are Tired');
        },
        onMatch: function () {
            applyAilment('exhaustion');
            shiftHealthIndicator(-16);
            displayEffect('You Are Exhausted...');
        },
    },
    
    boulder: {
        name: 'boulder',
        count: 2,
        cardBack: '/oregon-trail/images/cardBack.png',
        cardFront: '/oregon-trail/images/boulder.png',
        onFirstClick: function () {
            displayEffect();
        },
    },

    restStop: {
        name: 'restStop',
        count: 2,
        cardBack: '/oregon-trail/images/cardBack.png',
        cardFront: '/oregon-trail/images/restStop.png',
        onFirstClick: function () {
            displayEffect('You See A Town In The Distance');
        },
        onMatch: function () {
            shiftHealthIndicator(8);
            
            displayEffect('You Feel Safe And Rested!');
        },
    },

    typhoid: {
        name: 'typhoid',
        count: 2,
        cardBack: '/oregon-trail/images/cardBack.png',
        cardFront: '/oregon-trail/images/typhoid.png',
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
        cardBack: '/oregon-trail/images/cardBack.png',
        cardFront: '/oregon-trail/images/measles.png',
        onFirstClick: function () {
            displayEffect('You Dont Feel So Good');
        },
        onMatch: function () {
            applyAilment(' measles');
            shiftHealthIndicator(-16);
            displayEffect('You Have Measles...');
        },
    },

    river: {
        name: 'river',
        count: 2,
        cardBack: '/oregon-trail/images/cardBack.png',
        cardFront: '/oregon-trail/images/river.png',
        onFirstClick: function () {
            displayEffect();
        },
    },

    heartyFood: {
        name: 'heartyFood',
        count: 2,
        cardBack: '/oregon-trail/images/cardBack.png',
        cardFront: '/oregon-trail/images/heartyFood.png',
        onFirstClick: function () {
            displayEffect('You Look For Food...');
        },
        onMatch: function () {
            shiftHealthIndicator(8);
            
            displayEffect('You Feel Full From A Hearty Meal!');
        },
    },
}