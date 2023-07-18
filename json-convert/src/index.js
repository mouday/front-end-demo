import "./style/index.less";
import "./string-polyfill.js";
import {
  convertConfig,
  convertTargetList,
  convertSourceList,
  convertMap,
} from "./convert";

function setErrorMessage(text) {
  document.getElementById("error-message").innerText = text;
}

function initSelector() {
  // 输入选项
  let input_select = document.getElementById("input-select");

  for (let item of convertSourceList) {
    let option = document.createElement("option");
    option.value = item;
    option.innerText = item;
    input_select.appendChild(option);
  }

  // 输出选项
  let output_select = document.getElementById("output-select");
  for (let item of convertTargetList) {
    let option = document.createElement("option");
    option.value = item;
    option.innerText = item;
    output_select.appendChild(option);
  }
}

function handleConvert() {
  setErrorMessage("");

  let input_value = document.getElementById("input-textarea").value;

  let input_type = document.getElementById("input-select").value;
  let output_type = document.getElementById("output-select").value || "json";

  console.log(input_type, output_type, input_value);
  if (input_type) {
    let converter = convertMap[`${input_type}-${output_type}`];
    // let output_convert_func = convertMap[`json-${output_type}`];

    try {
      // let output_value = output_convert_func(input_convert_func(input_value));
      let output_value = converter(input_value);
      document.getElementById("output-textarea").value = output_value;
    } catch (e) {
      setErrorMessage(e);
    }
  } else {
    // 自动识别类型
    let outputconvertConfig = convertConfig.filter(
      (item) => item.target == output_type
    );

    for (let config of outputconvertConfig) {
      let converter = config.converter;

      try {
        // let output_value = output_convert_func(input_convert_func(input_value));
        let output_value = converter(input_value);

        document.getElementById("output-textarea").value = output_value;
        // document.getElementById("input-select").value = config.source;
        console.log(config.source, '=>', output_type);
        break;
      } catch (e) {
        console.log(e);
      }
    }

    // let output_convert_func = convertMap[`json-${output_type}`];
  }
}

window.handleConvert = handleConvert;
// window.handleInputChange = handleConvert;

let list = [
  {
    name: "Tom",
    age: 23,
  },
  {
    name: "Jack",
    age: 24,
  },
];
document.getElementById("input-textarea").value = JSON.stringify(list);
// document.getElementById('input-textarea').value = '[["name"=>"Tom","age"=>23],["name"=>"Jack","age"=>24]]'
// console.log(js2php(list));

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM has loaded");
    initSelector();
  });
})();
