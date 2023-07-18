function isJs(data) {
  try {
    str2js(data);
  } catch (e) {
    return false;
  }
  return true;
}

function isPhp(data) {
  let language_keywords = ["{"];
  for (let keyword of language_keywords) {
    if (data.includes(keyword)) {
      return false;
    }
  }
  return true;
}

function str2js(data) {
  return eval(data);
}

function json2js(data) {
  return JSON.parse(data);
}

function js2json(data) {
  return JSON.stringify(data, null, 2);
}

/**
 * 查询字符串转json
 *
 * @param {*} querystring
 * @returns
 */
function querystring2js(querystring) {
  let searchParams = new URLSearchParams(querystring);
  let data = {};

  for (let [key, value] of searchParams.entries()) {
    data[key] = value;
  }
  return data;
}

function json2php(data) {
  let replace_map = {
    "{": "[",
    "}": "]",
    '": ': '"=> ',
  };

  for (let [key, value] of Object.entries(replace_map)) {
    data = data.replaceAll(key, value);
  }
  return data;
}

function php2json(data) {
  let replace_map = {
    "=>": ":",
  };

  for (let [key, value] of Object.entries(replace_map)) {
    data = data.replaceAll(key, value);
  }
  return data;
}

export const convertConfig = [
  {
    source: "querystring",
    target: "json",
    converter: (data) => {
      return js2json(querystring2js(data));
    },
  },

  {
    source: "js",
    target: "json",
    converter: (data) => {
      return js2json(str2js(data));
    },
  },
  {
    source: "php",
    target: "json",
    converter: php2json,
  },
  {
    source: "json",
    target: "json",
    converter: (data) => {
      return js2json(json2js(data));
    },
  },
  {
    source: "json",
    target: "php",
    converter: (data) => {
      return json2php(js2json(json2js(data)));
    },
  },
];

const convert_map = {};
const convert_source_list = new Set();
const convert_target_list = new Set();

for (let config of convertConfig) {
  convert_map[`${config.source}-${config.target}`] = config.converter;
  convert_source_list.add(config.source);
  convert_target_list.add(config.target);
}

export const convertMap = convert_map;
export const convertSourceList = convert_source_list;
export const convertTargetList = convert_target_list;
