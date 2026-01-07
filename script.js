
const operators = ["+", "−", "×", "÷"];
const clickSound = new Audio("click.mp3.mp3");
clickSound.volume = 0.3;
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
let currentInput = "";



function handleInput(value) {
  if (value === "C") {
    clearDisplay();
  } else if (value === "=") {
    calculate();
  } else {
    appendValue(value);
  }
}

function appendValue(value) {
  const lastChar = currentInput.slice(-1);

  // Cegah operator di awal
  if (currentInput === "" && isOperator(value)) {
    return;
  }

  // Cegah operator dobel
  if (isOperator(lastChar) && isOperator(value)) {
    // ganti operator lama
    currentInput = currentInput.slice(0, -1) + value;
  } else {
    currentInput += value;
  }

  display.value = currentInput;
}


function clearDisplay() {
  currentInput = "";
  display.value = "0";
}

function calculate() {
  try {
    const expression = currentInput
      .replace("×", "*")
      .replace("÷", "/")
      .replace("−", "-");

    const result = eval(expression);
    display.value = result;
    currentInput = result.toString();
  } catch {
    display.value = "Error";
    currentInput = "";
  }
}
// Inisialisasi tampilan awal
clearDisplay();
function isOperator(char) {
  return operators.includes(char);
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    // suara klik
    clickSound.currentTime = 0;
    clickSound.play();

    // animasi klik
    button.classList.add("pressed");
    setTimeout(() => {
      button.classList.remove("pressed");
    }, 100);

    // logic kalkulator
    const value = button.textContent;
    handleInput(value);
  });
});


display.classList.add("updated");

setTimeout(() => {
  display.classList.remove("updated");
}, 120);


