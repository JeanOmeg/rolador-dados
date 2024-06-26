document.getElementById('roll-button').addEventListener('click', rollDice)

function rollDice() {
  const dice1 = document.getElementById('dice1')
  const dice2 = document.getElementById('dice2')
  const dice3 = document.getElementById('dice3')

  const randomRotation1 = getRandomRotation()
  const randomRotation2 = getRandomRotation()
  const randomRotation3 = getRandomRotation()

  dice1.style.transform = `rotateX(${randomRotation1.x}deg) rotateY(${randomRotation1.y}deg)`
  dice2.style.transform = `rotateX(${randomRotation2.x}deg) rotateY(${randomRotation2.y}deg)`
  dice3.style.transform = `rotateX(${randomRotation3.x}deg) rotateY(${randomRotation3.y}deg)`

  setTimeout(() => {
    const result1 = Math.floor(Math.random() * 6) + 1
    const result2 = Math.floor(Math.random() * 6) + 1
    const result3 = Math.floor(Math.random() * 6) + 1

    setDiceFace(dice1, result1)
    setDiceFace(dice2, result2)
    setDiceFace(dice3, result3)

    saveResult(result1, result2, result3)
  }, 1000)
}

function getRandomRotation() {
  return {
    x: Math.floor(Math.random() * 360) + 360,
    y: Math.floor(Math.random() * 360) + 360
  }
}

function setDiceFace(dice, result) {
  let x = 0, y = 0
  switch (result) {
    case 1: x = 0; y = 0; break
    case 2: x = 0; y = -90; break
    case 3: x = 90; y = 0; break
    case 4: x = -90; y = 0; break
    case 5: x = 0; y = 90; break
    case 6: x = 0; y = 180; break
  }
  dice.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`
}

function saveResult(result1, result2, result3) {
  const results = {
    dice1: result1,
    dice2: result2,
    dice3: result3
  }

  localStorage.setItem('diceResults', JSON.stringify(results))
}

function loadResult() {
  const savedResults = localStorage.getItem('diceResults')
  if (savedResults) {
    const { dice1, dice2, dice3 } = JSON.parse(savedResults)
    setDiceFace(document.getElementById('dice1'), dice1)
    setDiceFace(document.getElementById('dice2'), dice2)
    setDiceFace(document.getElementById('dice3'), dice3)
  }
}

window.onload = loadResult
