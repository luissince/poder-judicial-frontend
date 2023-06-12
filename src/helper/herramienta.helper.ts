import Base64 from "../model/interfaces/base64";

export function formatTime(value: string) {
  var hourEnd = value.indexOf(":");
  var H = +value.substr(0, hourEnd);
  var h = H % 12 || 12;
  var ampm = H < 12 || H === 24 ? "AM" : "PM";
  return h + value.substr(hourEnd, 3) + ":" + value.substr(6, 2) + " " + ampm;
}

export async function imageBase64(ref: FileList): Promise<Base64> {
  let files = ref;
  if (files.length !== 0) {
    let read = await readDataURL(files);
    let base64String = read.replace(/^data:.+;base64,/, '');
    let extension = getExtension(files[0].name);
    let { width, height } = await imageSizeData(read);
    const respuesta: Base64 ={
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


export function readDataURL(files: FileList): Promise<string> {
  return new Promise((resolve, reject) => {
    let file = files[0];
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
