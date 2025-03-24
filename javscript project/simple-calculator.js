
function calculator(num1, num2, operator){
    let result;
    if(operator === "+"){
        result = num1 + num2;
    }else if(operator === "-"){
        result = num1 - num2;
    }else if(operator === "*"){
        result = num1 * num2;
    }else if(operator === "/"){
        result = num1 / num2;
    }else{
        return "invalid operator";
    }
    return result;
}

console.log(calculator(3, 5, "+"));
console.log(calculator(2, 2, "*"));