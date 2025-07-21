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
        <div id="discs">
        </div>
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

    for (var i in gamedatas.board) {
      var square = gamedatas.board[i];

      if (square.player !== null) {
        this.addDiscToBoard(square.x, square.y, square.player);
      }
    }

    document
      .querySelectorAll(".square")
      .forEach((square) =>
        square.addEventListener("click", (e) => this.onPlayDisc(e))
      );
  }
  public onEnteringState(stateName: string, args: any) {
    console.log("Entering state: " + stateName);

    switch (stateName) {
      case "playerTurn":
        this.updatePossibleMoves(args.args.possibleMoves);
        break;
    }
  }
  public onLeavingState(stateName: string) {
    console.log("Leaving state: " + stateName);
  }
  public onUpdateActionButtons(stateName: string, args: any) {
    console.log("Updating action buttons for state: " + stateName);
  }
  public setupNotifications() {
    console.log("Setting up notifications");
    // automatically listen to the notifications, based on the `notif_xxx` function on this class.
    this.bgaSetupPromiseNotifications();
  }

  async addDiscToBoard(x: number, y: number, playerId: number) {
    const color = this.gamedatas.players[playerId].color;

    document
      .getElementById("discs")
      .insertAdjacentHTML(
        "beforeend",
        `<div class="disc" data-color="${color}" id="disc_${x}${y}"></div>`
      );

    this.placeOnObject(`disc_${x}${y}`, "overall_player_board_" + playerId);

    const anim = this.slideToObject(`disc_${x}${y}`, "square_" + x + "_" + y);
    await this.bgaPlayDojoAnimation(anim);
  }

  updatePossibleMoves(possibleMoves) {
    // Remove current possible moves
    document
      .querySelectorAll(".possibleMove")
      .forEach((div) => div.classList.remove("possibleMove"));

    for (var x in possibleMoves) {
      for (var y in possibleMoves[x]) {
        // x,y is a possible move
        document
          .getElementById(`square_${x}_${y}`)
          .classList.add("possibleMove");
      }
    }

    this.addTooltipToClass("possibleMove", "", _("Place a disc here"));
  }

  onPlayDisc(evt) {
    // Stop this event propagation
    evt.preventDefault();
    evt.stopPropagation();

    // Get the cliqued square x and y
    // Note: square id format is "square_X_Y"
    var coords = evt.currentTarget.id.split("_");
    var x = coords[1];
    var y = coords[2];

    if (
      !document
        .getElementById(`square_${x}_${y}`)
        .classList.contains("possibleMove")
    ) {
      // This is not a possible move => the click does nothing
      return;
    }

    this.bgaPerformAction("actPlayDisc", { x: x, y: y });
  }

  async notif_playDisc(args) {
    // Remove current possible moves (makes the board more clear)
    document
      .querySelectorAll(".possibleMove")
      .forEach((div) => div.classList.remove("possibleMove"));
    await this.addDiscToBoard(args.x, args.y, args.player_id);
  }

  async notif_turnOverDiscs(args) {
    // Get the color of the player who is returning the discs
    const targetColor = this.gamedatas.players[args.player_id].color;

    // wait for the animations of all turned discs to be over before considering the notif done
    await Promise.all(
      args.turnedOver.map((disc) => this.animateTurnOverDisc(disc, targetColor))
    );
  }

  async animateTurnOverDisc(disc, targetColor) {
    const discDiv = document.getElementById(`disc_${disc.x}${disc.y}`);
    if (!this.bgaAnimationsActive()) {
      // do not play animations if the animations aren't activated (fast replay mode)
      discDiv.dataset.color = targetColor;
      return Promise.resolve();
    }

    // Make the disc blink 2 times
    const anim = dojo.fx.chain([
      dojo.fadeIn({ node: discDiv }),
      dojo.fadeIn({ node: discDiv }),
      dojo.fadeIn({
        node: discDiv,
        onEnd: () => (discDiv.dataset.color = targetColor),
      }),
      dojo.fadeIn({ node: discDiv }),
    ]); // end of dojo.fx.chain

    await this.bgaPlayDojoAnimation(anim);
  }

  async notif_newScores(args) {
    for (var player_id in args.scores) {
      var newScore = args.scores[player_id];
      this.scoreCtrl[player_id].toValue(newScore);
    }
  }
}
