const keyWords = ["var", "let", "number", "string", "const"];
const symbo = [";", ""];
const operators = ["+", "-", "=", "*", "/"];
const char = ["\n"];
import parse from 'html-react-parser'
export function convertCodeToText(text: string) {
      let div =''
      const inputCheck = new RegExp(/\{\{\w*\}\}/g);
      const semecolen = new RegExp(/[;]/g);
      const code = text.split(" ");
      while (code.length > 0) {
        if (keyWords.includes(code[0]))
          div += `<span class="keyword">${code[0]}</span>`;
        else if (semecolen.test(code[0])) {
          div += `<span class="operators">;</span><br><br>`;
        } else if (symbo.includes(code[0]))
          div += `<span class="symbo">${code[0]}</span>`;
        else if (operators.includes(code[0]))
          div += `<span class="operators">${code[0]}</span>`;
        else if (char.includes(code[0])) div += `<br>`;
        else if (inputCheck.test(code[0])) {
          inputCheck.test(code[0]);
          div += `<input id="${code[0].replace(/([{}])*/g, "")}">`;
        } else div += `<span >${code[0]}</span>`;

        code.splice(0, 1);
      }
      return parse(`<section class="code_editor">${div}</section>`);
  }

