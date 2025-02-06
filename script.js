const numberDraw = document.getElementById("number-draw")
const numberResults = document.getElementById("number-results")

const button = numberDraw.querySelector("button")
const buttonDraw = numberResults.querySelector("button")
const numberDrawCont = document.getElementById("numbers-draw-container")


function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

function buildRandomNum(min, max, isNotRepeatNum, uniqueNum) {
  const containerNum = document.createElement("div")
  containerNum.classList.add("number-container")
  const span = document.createElement("span")


  let randomNum
  if (isNotRepeatNum) {
    let isNotNewNum
    do {
      randomNum = getRandomIntInclusive(min, max)
      isNotNewNum = uniqueNum.includes(randomNum)
    } while (isNotNewNum)

      uniqueNum.push(randomNum)
  } else {
    randomNum = getRandomIntInclusive(min, max)
  }

  span.innerText = String(randomNum)
  containerNum.appendChild(span)
  numberDrawCont.appendChild(containerNum)
}

function changeQuantityOfDraw() {
  const resultNum = document.getElementById("result-number")
  resultNum.innerText = Number(resultNum.innerText) + 1
}

function drawNumber() {
  changeQuantityOfDraw()

  let quantityNum = document.getElementById("numbers-quantity").value
  const minNum = Number(document.getElementById("min-number").value)
  const maxNum = Number(document.getElementById("max-number").value)

  const uniqueNum = []
  const isNotRepeatNum = document.getElementById("switch").Checked

  if (isNotRepeatNum && quantityNum > maxNum) {
    quantityNum = maxNum
  }

  buildRandomNum(minNum, maxNum, isNotRepeatNum, uniqueNum)

  const delayInMillisecon = 2500

  for (let index = 2; index <= quantityNum; index++) {
    setTimeout( () => buildRandomNum(minNum, maxNum, isNotRepeatNum, uniqueNum),
  delayInMillisecon * (index - 1))
  }

  setTimeout( () => (buttonDraw.style.display = "flex"), quantityNum * delayInMillisecon)
}

button.onclick = (event) => {
  event.preventDefault()

  numberDraw.style.display = "none"
  numberResults.style.display = "flex"

  drawNumber()
}

buttonDraw.onclick = (event) => {
  event.preventDefault()

  buttonDraw.style.display = "none"
  buttonDraw.style.opacity = 0
  numberDrawCont.innerHTML = ""
  drawNumber() 
}


