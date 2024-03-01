import React, { useCallback, useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { validateDeclaration } from "../type/pila";

export default function CodeEditor() {
  const [validationResult, setValidationResult] = useState(null);

  const handleChange = useCallback((value) => {
    const result = validateDeclaration(value);
    setValidationResult(result);
  }, []);
  

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="lg:text-left max-w-max mb-[1000px]">
        <CodeMirror
            
            value=''
            height="400px"
            width="600px"
            theme="dark"
            className="py-2 static flex items-center"
          
            onChange={handleChange}
          />
         
         {validationResult && (
  <div className={`bg-${validationResult.esValida ? "green" : "red"}-100 text-pink-500 p-4 mt-4 rounded-md shadow-md`}>
    <p className="text-center">
      {validationResult.esValida
        ? "Cadena válida"
        : `Cadena no válida: ${validationResult.reportarError}`}
    </p>
    {validationResult.infostack.map((item, index) => (
      <div key={index} className="mt-2">{item}</div>
    ))}
  </div>
)}
</div>

        <div className="mb-[800px] pr-40">
          <div className="w-24 rounded">
            <h1 className="text-5xl font-bold text-primary">Tabla Predictiva</h1>
          </div>

          <p className="py-6">Gramática 7. Larissa Hilario Clemente</p>

          <div className="mockup-code w-14">
            <pre data-prefix="1"><code>S = I A B V</code></pre>
            <pre data-prefix="2"><code>A = automata</code></pre>
            <pre data-prefix="3"><code>{"V = }"}</code></pre>
            <pre data-prefix="4"><code>B = AL F</code></pre>
            <pre data-prefix="5"><code>AL = G : SM RA ;</code></pre>
            <pre data-prefix="6"><code>G = alfabeto</code></pre>
            <pre data-prefix="7"><code>SM = a..z or 0..9</code></pre>
            <pre data-prefix="8"><code>RA = , SM RA or ε</code></pre>
            <pre data-prefix="9"><code>F = C : N R ;</code></pre>
            <pre data-prefix="10"><code>C = aceptacion</code></pre>
            <pre data-prefix="11"><code>N = qD</code></pre>
            <pre data-prefix="12"><code>D = 0...9</code></pre>
            <pre data-prefix="13"><code>R = , N R or ε</code></pre>
            <pre data-prefix="14"><code>I = {"{"}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
}
// Función de debounce
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}