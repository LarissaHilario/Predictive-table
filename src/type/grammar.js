function isNotTerminal(simbolo) {
  return /[A-Z]/.test(simbolo);
}

function handlerstack(accion, X, tokens, prompter, stack, infostack) {
  const mensaje = `${accion}: ${X}, Cadena: ${tokens.slice(prompter).join(" ")}`;
  infostack.push(mensaje);
  if (accion === "Pop") stack.pop();
}

function reportError(mensaje, X, currentToken, infostack) {
  const reportError = `Error: ${mensaje} "${X}" con "${currentToken}".`;
  infostack.push(reportError);
  return { esValida: false, infostack, reportError: reportError };
}

function getProduction(noTerminal, next) {
  const producciones = {
    "S": /^{$/.test(next) ?["I", "A", "B", "V"] : null,
    "B": /[a]/.test(next) ?["AL", "F"]: null,
    "AL": /[a]/.test(next) ?["G", ":", "SM", "RA", ";"]: null,
    "RA": /,/.test(next) ? [",", "SM", "RA"] : ["ε"],
    "F": /[a]/.test(next) ? ["C", ":", "N", "R", ";"]: null,
    "R": /,/.test(next) ? [",", "N", "R"] : ["ε"],
    "A": /[a]/.test(next) ?["automata"] : null,
    "G": /[a]/.test(next) ?["alfabeto"] : null,
    "C": /[a]/.test(next) ? ["aceptacion"] : null,
    "V": /^}$/.test(next) ? [next] : null,
    "I":  /^{$/.test(next) ? [next] : null,
    "SM": /[a-z0-9]/.test(next) ? [next] : null,
    "N": /^q[0-9]$/.test(next) ? [next] : null
  };

  return producciones[noTerminal] || null;
}

export {
  
  isNotTerminal,
  handlerstack,
  reportError,
  getProduction
};