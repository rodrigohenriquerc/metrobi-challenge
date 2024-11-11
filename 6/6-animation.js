const $lane = document.querySelectorAll(".lane")[0];
const $achilles = document.querySelector(".achilles");
const $tortoise = document.querySelector(".tortoise");

const runnerWidth = $achilles.clientWidth;
const lanePadding = getComputedStyle($lane).padding;

export class Animation {
  count = 0;

  subscribers = {
    finished: [],
  };

  constructor({ distance, initialAchilles, initialTortoise }) {
    this.distance = distance;
    this.initialAchilles = initialAchilles;
    this.initialTortoise = initialTortoise;

    $achilles.style.left = this.percentage(this.initialAchilles);
    $tortoise.style.left = this.percentage(this.initialTortoise);
  }

  animate = ({ achilles, tortoise }) => {
    this.count++;

    setTimeout(() => {
      $achilles.style.left = this.calc(this.percentage(achilles));
      $tortoise.style.left = this.calc(this.percentage(tortoise));

      this.count--;

      if (this.count === 0) {
        this.emitEvent("finished");
      }
    }, this.count * 100);
  };

  percentage = (position) => {
    return `${(position / this.distance) * 100}%`;
  };

  calc = (str) => {
    return `calc(${str} - ${runnerWidth / 2}px - ${lanePadding})`;
  };

  reset = () => {
    $achilles.style.left = this.percentage(this.initialAchilles);
    $tortoise.style.left = this.percentage(this.initialTortoise);
  };

  listen = (event, data) => {
    const effects = {
      moved: () => this.animate(data),
      reset: this.reset,
    };

    return effects[event]?.();
  };

  addSubscriber = (subscriber, events) => {
    events.forEach((event) => {
      this.subscribers[event].push(subscriber);
    });
  };

  emitEvent = (event) => {
    this.subscribers[event].forEach((subscriber) => {
      subscriber.listen(event);
    });
  };
}
