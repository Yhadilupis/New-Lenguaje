let nomenclaturaV = /^:*\s*[a-z]+[0-9]*\s*=\s*(true|false|[0-9]+|[0-9]*\.[0-9]+|\*[^*]*\*|\{[^}]*\}|;[^;]*;)$/;
let regexControlStructure = /^¡(si)\s*\{\s*(\d+)\s*(>|<|>=|<=|==|!=)\s*(\d+)\s*\}\!\[\s*([^]*?)\s*\]\s*¡no!\[\s*([^]*?)\s*\]$/;
let nomenclaturaFor = /^F\(\s*([a-zA-Z_]\w*)\s*:\s*([0-9]+)\s*,\s*([a-zA-Z_]\w*)\s*(==|!=|<=|>=|<|>)\s*([0-9]+)\s*,\s*([a-zA-Z_]\w*)\s*\+\+\)\s*\[\s*([\s\S]*?)\s*\]$/;
let regexFunction = /^fun\s+([a-zA-Z_]\w*)\s*\(\)\[\s*([\s\S]*?)\s*\]$/;
let regexVariableAssignment = /^([a-zA-Z_]\w*)\s*=\s*([^;]+)\s*$/;
let regexReturnStatement = /^return\s+([^;]+)\s*$/;



function validar() {
    
    let text = document.getElementById('texto').value.trim();

    resultV = isVariable(text)
    if(resultV){
        alert("La declaracion de variable es correcta");
        return
    }

    resutStruc = isControlStructure(text)
    if(resutStruc){
        alert("La declaracion de if es correcta");
        return
    }


    resultFor = isFor(text)
    if(resultFor){
        alert("La estructura de bucle es correcta");
        return
    } 

    resultFn = isFunction(text)
    if(resultFn){
        alert("La declaracion de la funcion es correcta");
        return
    }

    alert("La cadena no es correcta");
}

function isVariable(text){
    if(nomenclaturaV.test(text)){
        return true
    }else{
        return false
    }
}


function isFor(text) {
    let match = text.match(nomenclaturaFor);
    if (match) {
        let variable = match[1];
        let initialValue = match[2];
        let conditionVariable = match[3];
        let conditionOperator = match[4];
        let conditionValue = match[5];
        let incrementVariable = match[6];
        let loopBody = match[7];
        
        console.log("Variable:", variable);
        console.log("Valor Inicial:", initialValue);
        console.log("Condición:", conditionVariable, conditionOperator, conditionValue);
        console.log("Variable de Incremento:", incrementVariable);
        console.log("Cuerpo del bucle:", loopBody);

        return true;
    }
    return false;
}

function isFunction(text) {
    let match = text.match(regexFunction);
    if (match) {
        let functionName = match[1];
        let functionBody = match[2];

        console.log("Nombre de la función:", functionName);
        console.log("Cuerpo de la función:", functionBody);

        let statements = functionBody.split(/\n/);

        for (let statement of statements) {
            statement = statement.trim();
            if (regexVariableAssignment.test(statement)) {
                console.log("Asignación de variable:", statement);
            } else if (regexReturnStatement.test(statement)) {
                console.log("Declaración de retorno:", statement);
            } else {
                console.log("Declaración no reconocida:", statement);
            }
        }

        return true;
    }
    return false;
}

function isControlStructure(text) {
    let regexControlStructure = /^¡si\s*\{\s*(\d+)\s*(>|<|>=|<=|==|!=)\s*(\d+)\s*\}\!\[\s*([^]*?)\s*\]$/;

    let match = text.match(regexControlStructure);
    if (match) {
        let conditionValue1 = match[1];
        let operator = match[2];
        let conditionValue2 = match[3];
        let codeBlock = match[4];
        console.log("Valor de la condición:", conditionValue1, operator, conditionValue2);
        console.log("Código dentro de los corchetes:", codeBlock);
        return true;
    }
    return false;
}

/*function isControlStructure(text) {

    let match = text.match(regexControlStructure);
    if (match) {
        let controlType = match[1];
        let conditionValue1 = match[2];
        let operator = match[3];
        let conditionValue2 = match[4];
        let codeBlock1 = match[5];
        let codeBlock2 = match[6];
        
        console.log("Tipo de estructura de control:", controlType);
        console.log("Valor de la condición:", conditionValue1, operator, conditionValue2);
        console.log("Código dentro del bloque '¡si!':", codeBlock1);
        console.log("Código dentro del bloque '¡no!':", codeBlock2);
        
        return true;
    }
    return false;
}*/

