
let winScore = 100
let scores = [0, 0]
let roundScore = 0
let activePlayer = 0 // 0 first player, 1 second player
let lastDice = 0

const initGame = () => {
   scores = [0, 0]
   roundScore = 0
   activePlayer = 0 // 0 first player, 1 second player
   lastDice = 0

   Array.from(document.querySelectorAll('.dice')).map(e => e.style.display = 'none')
   document.getElementById('name--0').innerText = 'Player 1' 
   document.getElementById('name--1').innerText = 'Player 2' 
   document.querySelector('#score--0').textContent = '0'
   document.querySelector('#score--1').textContent = '0'
   document.querySelector('#current--0').textContent = '0'
   document.querySelector('#current--1').textContent = '0'
   
   document.querySelector('.player--0').classList.remove('player--winner')
   document.querySelector('.player--1').classList.remove('player--winner')
   document.querySelector('.player--0').classList.remove('player--active')
   document.querySelector('.player--1').classList.remove('player--active')
   document.querySelector('.player--0').classList.add('player--active')
   
   document.querySelector('.btn--hold').style.display = 'block'
   document.querySelector('.btn--roll').style.display = 'block'
}
initGame()

document.getElementById('score--0').textContent = '0'
document.getElementById('score--1').textContent = '0'
document.getElementById('current--0').textContent = '0'
document.getElementById('current--1').textContent = '0'

const changePlayer = () => {
   roundScore = 0
   Array.from(document.querySelectorAll('.dice')).map(e => e.style.display = 'none')
   document.querySelector('#current--' + activePlayer).textContent = 0
   activePlayer = activePlayer ? 0 : 1
   document.querySelector('.player--1').classList.toggle('player--active')
   document.querySelector('.player--0').classList.toggle('player--active')
}

document.querySelector('.btn--roll').addEventListener('click', () => {
   let dice1 = Math.floor(Math.random() * 6) + 1
   let dice2 = Math.floor(Math.random() * 6) + 1
   // Display the result
   document.querySelector('#current--' + activePlayer).innerHTML = dice1 + dice2
   Array.from(document.querySelectorAll('.dice')).map(e => e.style.display = 'block')

   document.getElementById('dice-1').src = 'dice-' + dice1 + '.png'
   document.getElementById('dice-2').src = 'dice-' + dice2 + '.png'

   // if there are two 6 in a row, the player lose his score
   if ((dice1 + dice2) === 12 && lastDice === 12) {
      scores[activePlayer] = 0
      document.getElementById('score--' + activePlayer).textContent = scores[activePlayer]
      dice1 = 0
      dice2 = 0
      changePlayer()
   }// update the round score if the rolled number was NOT a 1
   else if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2
      document.querySelector('#current--' + activePlayer).textContent = roundScore
   } else {
      changePlayer()
   }

   lastDice = dice1 + dice2
})

document.querySelector('.btn--hold').addEventListener('click', () => {
   scores[activePlayer] += roundScore
   roundScore = 0

   // update general score of active player
   const playerScore = document.getElementById('score--' + activePlayer)
   playerScore.textContent = scores[activePlayer]

   if (scores[activePlayer] >= winScore) {
      document.getElementById('name--' + activePlayer).innerText = 'Winner' 
      document.querySelector('.player--' + activePlayer).classList.add('player--winner')
      document.querySelector('.player--' + activePlayer).classList.remove('player--active')
      document.querySelector('.btn--hold').style.display = 'none'
      document.querySelector('.btn--roll').style.display = 'none'
      return document.querySelector('.dice').style.display = 'none'
   } 
   changePlayer()
})

// new game button
document.querySelector('.btn--new').addEventListener('click', initGame)

// set win score
document.querySelector('.btn--win-score').addEventListener('click', () => {
   const score = document.querySelector('.input-win-score').value
   if (score) winScore = score
})
