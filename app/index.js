import clock from "clock";
import document from "document";

import monospace from "../common/monospace.js";

const dom = (() => {
  const elements = {};

  return elementId => {
    if (!(elementId in elements)) {
      console.log(`Need to load ${elementId}`);

      const newElement = document.getElementById(elementId);
      elements[elementId] = newElement;

      return newElement;
    }

    return elements[elementId];
  };
})();

const padNumber = i => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};

const initClock = () => {
  clock.granularity = "seconds";

  clock.ontick = evt => {
    const now = evt.date;
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    const weekday = now.getDay();

    const hoursRatio = hours / 24;
    const hoursLineLength = 18 + 264 * hoursRatio;

    dom("line-hours-progress").x2 = hoursLineLength;

    const weekRatio = weekday / 7;
    const weekLineLength = 18 + 264 * weekRatio;

    dom("line-week-progress").x2 = weekLineLength;

    dom("txt-hours-minutes").text = `${monospace(padNumber(hours))}:${monospace(
      padNumber(minutes)
    )}`;
    dom("txt-seconds").text = monospace(padNumber(seconds));
  };
};

initClock();
