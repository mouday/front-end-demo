/**
 * file转Base64 DataURL
 * @param {File} file
 * @returns
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      resolve(e.target.result);
    };
  });
}

/**
 * 解析base64中的数据信息
 * @param {String} base64
 * @returns
 */
function parseBase64(base64) {
  let arr = base64.split(","),
    mime = arr[0].match(/:(.*?);/)[1];

  return {
    mime,
    data: arr[1],
  };
}

/**
 * base64转Uint8
 * @param {String} base64
 * @returns
 */
function base64ToUint8Array(base64) {
  let parsedBase64 = parseBase64(base64);

  let bstr = atob(parsedBase64.data);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return u8arr;
}

/**
 * 将base64转换为blob
 * @param {String} base64
 * @returns
 */
function base64ToBlob(base64) {
  let parsedBase64 = parseBase64(base64);
  let u8arr = base64ToUint8Array(base64);
  return new Blob([u8arr], { type: parsedBase64.mime });
}

/**
 * 将blob转换为file
 * @param {Blob} blobData
 * @returns
 */
function blobToFile(blobData) {
  let date = new Date();

  blobData.lastModifiedDate = date;
  blobData.lastModified = date.getTime();
  blobData.name = blobData.type.replace("/", ".");

  return blobData;
}

/**
 * base64 转 File
 * @param {String} base64
 * @returns
 */
function base64ToFile(base64) {
  let file = null;

  if (window.File != undefined) {
    let parsedBase64 = parseBase64(base64);
    let u8arr = base64ToUint8Array(base64);
    file = new File([u8arr], parsedBase64.mime.replace("/", "."), {
      type: parsedBase64.mime,
    });
  } else {
    file = blobToFile(base64ToBlob(base64));
  }

  return file;
}
