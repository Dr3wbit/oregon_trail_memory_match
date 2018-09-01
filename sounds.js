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
winSound.volume = .2;