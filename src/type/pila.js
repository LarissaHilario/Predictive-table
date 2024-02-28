import { algoritmoAnalisis } from "./grammar"; 

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

