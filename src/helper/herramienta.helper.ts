import Base64 from "../model/interfaces/base64";

export function formatTime(value: string) {
  var hourEnd = value.indexOf(":");
  var H = +value.substr(0, hourEnd);
  var h = H % 12 || 12;
  var ampm = H < 12 || H === 24 ? "AM" : "PM";
  return h + value.substr(hourEnd, 3) + ":" + value.substr(6, 2) + " " + ampm;
}

export async function imageBase64(ref: File): Promise<Base64> {
  let file = ref;
  if (file) {
    let read = await readDataURL(file);
    let base64String = read.replace(/^data:.+;base64,/, '');
    let extension = getExtension(file.name);
    let { width, height } = await imageSizeData(read);
    const respuesta: Base64 = {
      base64String: base64String,
      extension: extension,
      width: width,
      height: height
    }
    return respuesta;
  } else {
    return null;
  }
}


export function readDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    let blob = file.slice();
    var reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result.toString());
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function imageSizeData(data: string): Promise<{ width: number, height: number }> {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = data;
    image.onload = function () {
      var height = image.height;
      var width = image.width;
      resolve({ width, height });
    };
    image.onerror = reject;
  });
}

export function getExtension(filename: string) {
  return filename.split("?")[0].split("#")[0].split(".").pop();
}

export function keyNumberVersion(event: React.KeyboardEvent<HTMLInputElement>) {
  const { key } = event;
  const validInput = /^[0-9.]$/;

  if (!validInput.test(key) && key !== 'Backspace' && key !== 'Tab') {
    event.preventDefault();
  }
}

export function keyNumberPhone(event: React.KeyboardEvent<HTMLInputElement>) {
  const { key } = event;
  const allowedCharacters = /[0-9-()+]/;

  if (!allowedCharacters.test(key) && key !== 'Backspace' && key !== 'Tab') {
    event.preventDefault();
  }

  const inputValue = event.currentTarget.value;
  const hasDash = inputValue.includes('-');
  const hasOpeningParenthesis = inputValue.includes('(');
  const hasClosingParenthesis = inputValue.includes(')');
  const hasPlusSign = inputValue.includes('+');

  if ((key === '-' && hasDash) ||
      (key === '(' && hasOpeningParenthesis) ||
      (key === ')' && hasClosingParenthesis) ||
      (key === '+' && hasPlusSign)) {
    event.preventDefault();
  }
}

export function currentDate() {
  let date = new Date();
  let formatted_date =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 > 9
      ? date.getMonth() + 1
      : "0" + (date.getMonth() + 1)) +
    "-" +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate());
  return formatted_date;
}

export function currentTime() {
  let time = new Date();
  let formatted_time =
    (time.getHours() > 9 ? time.getHours() : "0" + time.getHours()) +
    ":" +
    (time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes()) +
    ":" +
    (time.getSeconds() > 9 ? time.getSeconds() : "0" + time.getSeconds());
  return formatted_time;
}