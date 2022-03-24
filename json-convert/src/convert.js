function isJs(data) {
  try {
    str2js(data);
  } catch (e) {
    return false;
  }
  return true;
}

function isPhp(data) {
  let language_keywords = ['{'];
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

function json2php(data) {
  let replace_map = {
    '{': '[',
    '}': ']',
    '": ': '"=> ',
  };

  for (let [key, value] of Object.entries(replace_map)) {
    data = data.replaceAll(key, value);
  }
  return data;
}

function php2json(data) {
  let replace_map = {
    '=>': ':',
  };

  for (let [key, value] of Object.entries(replace_map)) {
    data = data.replaceAll(key, value);
  }
  return data;
}

export const convert_map = {
  'js-json': (data) => {
    if (isJs(data)) {
      data = str2js(data);
      return js2json(str2js(data));
    } else {
      return data;
    }
  },

  'php-json': php2json,

  'json-json': (data) => {
    return js2json(json2js(data));
  },

  'json-php': json2php,
};
