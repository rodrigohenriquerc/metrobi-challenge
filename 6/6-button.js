export class Button {
  constructor({ onStartRaceHandler, onResetRaceHandler }) {
    const el = document.querySelector("button");

    el.addEventListener("click", onStartRaceHandler);

    this.el = el;
    this.onStartRaceHandler = onStartRaceHandler;
    this.onResetRaceHandler = onResetRaceHandler;
  }

  listen = (event) => {
    const effects = {
      started: () => {
        this.el.disabled = true;
        this.el.textContent = "RUNNING...";
      },
      finished: () => {
        this.el.removeEventListener("click", this.onStartRaceHandler);
        this.el.addEventListener("click", this.onResetRaceHandler);

        this.el.disabled = false;
        this.el.textContent = "RESET";
        this.el.classList.add("reset-button");
      },
      reset: () => {
        this.el.removeEventListener("click", this.onResetRaceHandler);
        this.el.addEventListener("click", this.onStartRaceHandler);

        this.el.textContent = "RUN";
        this.el.classList.remove("reset-button");
      },
    };

    return effects[event]?.();
  };
}
