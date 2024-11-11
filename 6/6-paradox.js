import { Race } from "./6-race.js";
import { Button } from "./6-button.js";
import { Animation } from "./6-animation.js";

const INITIAL_DATA = {
  distance: 50,
  initialAchilles: 0,
  initialTortoise: 10,
};

const race = new Race(INITIAL_DATA);
const animation = new Animation(INITIAL_DATA);
const button = new Button({
  onStartRaceHandler: race.start,
  onResetRaceHandler: race.reset,
});

race.addSubscriber(animation, ["moved", "reset"]);
race.addSubscriber(button, ["started", "reset"]);
animation.addSubscriber(button, ["finished"]);
