export default class ReversiAnimations {
    constructor(private GameGui: GameGui) {
  }

  async animateTurnOverDisc(disc, targetColor) {
    const discDiv = document.getElementById(`disc_${disc.x}${disc.y}`);
    if (!this.GameGui.bgaAnimationsActive()) {
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

    await this.GameGui.bgaPlayDojoAnimation(anim);
  }

}