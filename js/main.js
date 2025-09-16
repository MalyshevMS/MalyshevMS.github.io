document.getElementById("calculator").addEventListener("submit", checkForm)

function checkForm(event) {
    event.preventDefault();
    var el = document.getElementById("calculator");

    var num1 = Number(el.num1.value);
    var num2 = Number(el.num2.value);
    var operation = el.operation.value;
    var res = null;

    switch(operation) {
        case "+":
            res = num1 + num2;
            break;
        case "-":
            res = num1 - num2;
            break;
        case "*":
            res = num1 * num2;
            break;
        case "/":
            res = num1 / num2;
            break;
    }
    document.getElementById("res").innerHTML = "Result: " + res;
}