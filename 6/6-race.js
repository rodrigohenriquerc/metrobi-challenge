export class Race {
  subscribers = {
    reset: [],
    started: [],
    moved: [],
    finished: [],
  };

  constructor({ distance, initialAchilles, initialTortoise }) {
    this.distance = distance;

    this.achilles = initialAchilles;
    this.tortoise = initialTortoise;

    this.initialAchilles = initialAchilles;
    this.initialTortoise = initialTortoise;
  }

  start = () => {
    this.emitEvent("started");
    this.move();
  };

  move = () => {
    this.achilles += (this.tortoise - this.achilles) / 2;
    this.tortoise++;
    this.emitEvent("moved", {
      achilles: this.achilles,
      tortoise: this.tortoise,
    });

    if (this.tortoise < this.distance) {
      this.move();
    } else {
      this.emitEvent("finished");
    }
  };

  reset = () => {
    this.achilles = this.initialAchilles;
    this.tortoise = this.initialTortoise;
    this.emitEvent("reset");
  };

  addSubscriber = (subscriber, events) => {
    events.forEach((event) => {
      this.subscribers[event].push(subscriber);
    });
  };

  emitEvent = (event, data) => {
    this.subscribers[event].forEach((subscriber) => {
      subscriber.listen(event, data);
    });
  };
}
