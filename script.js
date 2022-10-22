class Calculator {
    // We have a constructor whic is going to take all the inputs and functions for our calculator.
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear() // Call clear as soon as we start our claculator.
    }

    clear() {
        // Clears all fields of our calculator.
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        // Get our current opearand and set it to a string, then get the last value and chop it of using slice method.
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        // If we type a period and we already have a period then we shouldn't append that period.
        if (number === '.' && this.currentOperand.includes('.')) return
        // We are appending not adding thats why we convert this into a string. ie 1 + 1 should be eaqual to 11 not 2
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        // If there is no value to operateon, dont do anything if an operand is clicked.
        if (this.currentOperand === '') return
        // If we already have a previous operand, and we click an operand, then the calculator does the operation by calling the compute function. And automatically prepends the opration on the previous operand field.
        if (this.previousOperand !== '') {
        this.compute()
        }
        // Sets the clicked operand and sets 
        this.operation = operation
        // Sets the current operand to the previous operand and clears the current oprant so that we can be allowed to type in a new number.
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        // Computaion will be the result of our compute function.
        let computation
        // Create number versions of both our current and previous operands.
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // If there is no entry either previous or current entry, and we click on the equals operand, then we should return and not do anything at all.
        if (isNaN(prev) || isNaN(current)) return

        // For each operation selected, we execute the computation for that specific operation.
        switch (this.operation) {
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
            break
        case '*':
            computation = prev * current
            break
        case '÷':
            computation = prev / current
            break
        default:
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        // Integer digits is a float which is turned in into an array and we shall split it when we hit the decimal point so tkat we can have two sections of the string. One before the point and another after the point.
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
        integerDisplay = ''
        } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
        } else {
        return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
        // If we have an operation then we shall set the previous operand text to both the previous operation plus the operand.
        if (this.operation != null) {
        this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
        this.previousOperandTextElement.innerText = ''
        }
    }
}

// Initialise all variables to get all our buttons and the current and previous texts.
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// We instantiate a calculator object and pass it both the current operand and the previous operand texts.
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
// Loop through the buttons and append whatever text is clicked on to the screen
button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay();
})
})

operationButtons.forEach(button => {
button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
})
})

equalsButton.addEventListener('click', button => {
calculator.compute()
calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
calculator.clear()
calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
calculator.delete()
calculator.updateDisplay()
})