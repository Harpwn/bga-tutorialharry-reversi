// @ts-ignore
GameGui = (function () {
  // this hack required so we fake extend GameGui
  function GameGui() {}
  return GameGui;
})();

// Note: it does not really extend it in es6 way, you cannot call super you have to use dojo way
class DigidevilTutorialReversi<
  DigidevilTutorialReversiGamedatas
> extends GameGui {
  constructor() {
    super();
  }

  public setup(gamedatas: any) {
    this.setupNotifications();

    // add game board
    this.getGameAreaElement().insertAdjacentHTML(
      "beforeend",
      `
      <div id="board">
      </div>
    `
    );

    const board = document.getElementById("board");
    const hor_scale = 64.8;
    const ver_scale = 64.4;
    for (let x = 1; x <= 8; x++) {
      for (let y = 1; y <= 8; y++) {
        const left = Math.round((x - 1) * hor_scale + 10);
        const top = Math.round((y - 1) * ver_scale + 7);
        // we use afterbegin to make sure squares are placed before discs
        board.insertAdjacentHTML(
          `afterbegin`,
          `<div id="square_${x}_${y}" class="square" style="left: ${left}px; top: ${top}px;"></div>`
        );
      }
    }
  }
  public onEnteringState(stateName: string, args: any) {
    console.log("Entering state: " + stateName);
  }
  public onLeavingState(stateName: string) {
    console.log("Leaving state: " + stateName);
  }
  public onUpdateActionButtons(stateName: string, args: any) {
    console.log("Updating action buttons for state: " + stateName);
  }
  public setupNotifications() {
    console.log("Setting up notifications");
  }
}
