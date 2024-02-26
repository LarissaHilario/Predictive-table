
function algoritmoAnalisis(declaration) {
  let tokens = declaration.match(/[\w]+|[\{\}\:\;\,]/g).filter(token => token.length > 0);
  if (!validarTokens(tokens)) {
      return { result: false, stackContent: ["Entrada inválida debido a tokens mal formados."] };
  }

  let stack = tokens.length > 0 ? generarStack(tokens[0]) : [];
  let stackContent = [];
  let tokenIndex = 0;

  while (stack.length > 0 && tokenIndex <= tokens.length) {
    const X = stack.pop();
    const currentToken = tokens[tokenIndex];

    if (esCategoria(X, currentToken)) {
      tokenIndex++;
    } else if (X === currentToken) {
        tokenIndex++;
    } else if (obtenerNT(X)) {
        const production = obtenerProduccion(X, currentToken);
        if (production.length > 0) {
          if (production[0] === 'ε' && production.length === 1) {

          } else {
            stack.push(...production.reverse());
            stackContent.push(`Push: ${production.join(', ')}`);

          }
        } else {
          return { result: false, stackContent: stackContent.concat(`Error: No hay producción para ${X} con ${currentToken}`) };
        }
    } else {
        return { result: false, stackContent: stackContent.concat(`Error: Se esperaba ${X}, se encontró ${currentToken}`) };
    }
}

const isValid = tokenIndex === tokens.length && stack.length === 0; 
return { result: isValid, stackContent };
}

function esCategoria(categoria, token) {
  if (categoria === 'a-z' && /^[a-z]$/i.test(token)) {
      return true;
  } else if (categoria === '0-9' && /^\d$/.test(token)) {
      return true;
  }
  else if (categoria === 'q0-9' && /^q\d+$/.test(token)) {  // Added this line
    return true;
  }
  return false;
}

function generarStack(declaration) {
  switch (declaration) {
    case '{': return ['S'];
    default: return []; 
  }
}

const tablaPredictiva = {
  "S,{": ["I", "A", "B", "V"],
  "A,automata": ["automata"],
  "V,}": ["}"],
  "B,alfabeto": ["AL", "F"],
  "AL,alfabeto": ["G", ":", "SM", "RA", ";"],
  "G,alfabeto": ["alfabeto"],
  "SM,a-z": ["a-z"],
  "SM,0-9": ["0-9"],
  "RA,," : ["," , "SM", "RA"],
  "RA,;": ["ε"],
  "F,aceptacion": ["C", ":", "N", "R", ";"],
  "C,aceptacion": ["aceptacion"],
  "N,q0-9": ["q0-9"],
  "R,,": [",", "N", "R"],
  "R,;": ["ε"],
  "I,{": ["{"],
};


function obtenerProduccion(noTerminal, simboloEntrada) {
  let clave = `${noTerminal},${simboloEntrada}`;
  if (/^[a-z]$/i.test(simboloEntrada)) {
    clave = `${noTerminal},a-z`;
  } else if (/^\d$/.test(simboloEntrada)) {
    clave = `${noTerminal},0-9`;
  }  else if (/^q\d+$/.test(simboloEntrada)) {
    clave = `${noTerminal},q0-9`;
  }

  if (tablaPredictiva[clave]) {
    return tablaPredictiva[clave];
  } else {
    console.log(`No hay producción para ${noTerminal} con ${simboloEntrada}`);
    return [];
  }
}



function obtenerNT(simbolo) {
return /[A-Z]/.test(simbolo);
}

function esTokenValido(token) {
  const palabrasReservadas = ['automata', 'alfabeto', 'aceptacion'];
  const palabraReservada = palabrasReservadas.includes(token);
  const identificador = /^[a-zA-Z_]\w*$/.test(token) || /^q\d+$/.test(token); 
  const numero = /^\d+$/.test(token);
  const signo = [ ':', ';', ','].includes(token);
  const simboloBloque = ['{', '}'].includes(token);
  return palabraReservada || simboloBloque || identificador || numero || signo;
}


function validarTokens(tokens) {
  return tokens.every(esTokenValido);
}

export function validateVariableDeclaration(input) {
  const declarationWithSpaces = input.trim();
  const { result, stackContent } = algoritmoAnalisis(declarationWithSpaces);

  const validationMessage = {
    success: result,
    message: result ? 'Cadena válida' : 'Cadena no válida',
    stackContent: stackContent
  };

  console.log("Cadena:", validationMessage.message);
  console.log("Pila:", validationMessage.stackContent);

  return validationMessage;
}







/*export function validateVariableDeclaration(value) {
  const declarationWithSpaces = value.trim();
  const { result, stackContent } = algoritmoAnalisis(declarationWithSpaces);
  
  const validationMessage = {
    success: result,
    message: result ? 'Cadena válida' : 'Cadena no válida',
    stackContent: stackContent
  };
  
  console.log(validationMessage);
  
  return validationMessage;
  
  
  }*/