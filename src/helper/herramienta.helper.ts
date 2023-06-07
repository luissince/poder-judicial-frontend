export function formatTime(value: string) {
    var hourEnd = value.indexOf(":");
    var H = +value.substr(0, hourEnd);
    var h = H % 12 || 12;
    var ampm = H < 12 || H === 24 ? "AM" : "PM";
    return h + value.substr(hourEnd, 3) + ":" + value.substr(6, 2) + " " + ampm;
  }
  