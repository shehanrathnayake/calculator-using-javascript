const btns = document.querySelectorAll(".btn")
const display = document.querySelector("#display")

let expressionStr = ''

for (let btn of btns) {
    btn.addEventListener("click", function(){

        if (isNaN(btn.value)) {
            expressionStr = summarize(expressionStr,btn.value)

        } else {
            expressionStr += btn.value
        }

        display.value = expressionStr
        
    })
}

const summarize = (expressionStr,operator)=>{
    switch (operator) {
        case 'AC' :
            expressionStr = ''
            break

        case '√' :
            if (isNaN(expressionStr)) {
                expressionStr = evaluate(expressionStr)
            } 
            expressionStr = '√'+expressionStr
            break
        
        case '=' :
            expressionStr = evaluate(expressionStr)
            break

        default :
            if (isNaN(expressionStr)) {
                expressionStr = evaluate(expressionStr)
            }
            expressionStr = expressionStr + operator
    }
    return expressionStr
}

const evaluate = (expressionStr)=>{

    if (isNaN(expressionStr)) {
        let result = 0
        const pattern = /[^\d.]+/g

        const digits = expressionStr.split(pattern).filter((x) => x !== "");
        const nonDigits = expressionStr.match(pattern);
        const operator = nonDigits[0]

        for (let i=0; i<digits.length; i++) {
            digits[i] = parseFloat(digits[i])
        }

        switch (operator) {
            case '√': result = Math.sqrt(digits[0]); break
            case '^': result = digits[0] ** digits[1]; break
            case 'x': result = digits[0] * digits[1]; break
            case '/': result = digits[0] / digits[1]; break
            case '+': result = digits[0] + digits[1]; break
            case '-': result = digits[0] - digits[1]; break
        }
        expressionStr = result.toString()
    }

    return expressionStr
}