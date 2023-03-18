let array_of_images = [
    '/images/dice-1.png',
    '/images/dice-2.png',
    '/images/dice-3.png',
    '/images/dice-4.png',
    '/images/dice-5.png',
    '/images/dice-6.png',
];

const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');

const score0 = document.getElementById('score--0').textContent;
const score1 = document.getElementById('score--1').textContent;

const btn_roll = document.getElementById('btn-roll-dice');
const btn_hold = document.getElementById('btn-hold')
const btn_reset = document.getElementById('btn-reset')

let current_score = 0;
let total_score = [0, 0];
let active_player = 0; 
let playing = true;

function initialize_game(){
    
    current_score = 0;
    total_score = [0, 0];
    active_player = 0; 
    playing = true;

    document.getElementById('my-dice').style.display = 'none';
    document.getElementById('score--0').textContent = 0;
    document.getElementById('score--1').textContent = 0;
    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;
    player0.classList.remove('player-winner');
    player1.classList.remove('player-winner');
    player0.classList.add('player-active');
    player1.classList.remove('player-active');
}

function roll_dice() {
    const dice_roll = array_of_images[Math.floor(Math.random() * array_of_images.length)];
    document.getElementById('my-dice').src = dice_roll;
    return dice_roll;
};

function switch_player(){
    document.getElementById(`current--${active_player}`).textContent = 0;
    current_score = 0;

    player0.classList.toggle('player-active');
    player1.classList.toggle('player-active');
    
    if(active_player === 0){
        active_player = 1;
    }else{
        active_player = 0
    };
}

btn_hold.addEventListener('click', function(){
    if(playing){
        total_score[active_player] = total_score[active_player] + current_score;
        console.log(total_score);
        document.getElementById(`score--${active_player}`).textContent = total_score[active_player];

        if(total_score[active_player] >= 20){
            playing = false;
            document.getElementById('my-dice').style.display = 'none';

            document
            .querySelector(`.player-${active_player}`)
            .classList.add('player-winner');
            document
            .querySelector(`.player-${active_player}`)
            .classList.remove('player-active');
        }
        else{
            switch_player();
        }
    }
});

btn_roll.addEventListener('click', function(){  
        if(playing){
            document.getElementById('my-dice').style.display = 'inline';
    
            let dice_side;
            let index;
        
            dice_side = roll_dice();
            index = array_of_images.indexOf(dice_side) + 1;
        
            console.log(index);
    
            if(index !== 1){
                current_score = current_score + index;
                document.getElementById(`current--${active_player}`).textContent = current_score;
            }
            else{
                switch_player();
            }
        }
    }
);

btn_reset.addEventListener('click', function(){
    initialize_game();
})