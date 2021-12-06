import './style/index.less';
import './string-polyfill.js';
import { convert_map } from './convert';

function setErrorMessage(text) {
  document.getElementById('error-message').innerText = text;
}

function handleConvert() {
  setErrorMessage('');

  // 自动识别类型
  let input_value = document.getElementById('input-textarea').value;

  let input_type = document.getElementById('input-select').value || 'js';
  let output_type = document.getElementById('output-select').value || 'json';
  console.log(input_type, output_type, input_value);

  let input_convert_func = convert_map[`${input_type}-json`];

  let output_convert_func = convert_map[`json-${output_type}`];

  try {
    let output_value = output_convert_func(input_convert_func(input_value));
    document.getElementById('output-textarea').value = output_value;
  } catch (e) {
    setErrorMessage(e);
  }
}

window.handleConvert = handleConvert;
// window.handleInputChange = handleConvert;

let list = [
  {
    name: 'Tom',
    age: 23,
  },
  {
    name: 'Jack',
    age: 24,
  },
];
document.getElementById('input-textarea').value = JSON.stringify(list);
// document.getElementById('input-textarea').value = '[["name"=>"Tom","age"=>23],["name"=>"Jack","age"=>24]]'
// console.log(js2php(list));
