var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// @ts-ignore
GameGui = (function () {
    // this hack required so we fake extend GameGui
    function GameGui() { }
    return GameGui;
})();
// Note: it does not really extend it in es6 way, you cannot call super you have to use dojo way
var DigidevilTutorialReversi = /** @class */ (function (_super) {
    __extends(DigidevilTutorialReversi, _super);
    function DigidevilTutorialReversi() {
        return _super.call(this) || this;
    }
    DigidevilTutorialReversi.prototype.setup = function (gamedatas) {
        this.setupNotifications();
        // add game board
        this.getGameAreaElement().insertAdjacentHTML("beforeend", "\n      <div id=\"board\">\n      </div>\n    ");
        var board = document.getElementById("board");
        var hor_scale = 64.8;
        var ver_scale = 64.4;
        for (var x = 1; x <= 8; x++) {
            for (var y = 1; y <= 8; y++) {
                var left = Math.round((x - 1) * hor_scale + 10);
                var top_1 = Math.round((y - 1) * ver_scale + 7);
                // we use afterbegin to make sure squares are placed before discs
                board.insertAdjacentHTML("afterbegin", "<div id=\"square_".concat(x, "_").concat(y, "\" class=\"square\" style=\"left: ").concat(left, "px; top: ").concat(top_1, "px;\"></div>"));
            }
        }
    };
    DigidevilTutorialReversi.prototype.onEnteringState = function (stateName, args) {
        console.log("Entering state: " + stateName);
    };
    DigidevilTutorialReversi.prototype.onLeavingState = function (stateName) {
        console.log("Leaving state: " + stateName);
    };
    DigidevilTutorialReversi.prototype.onUpdateActionButtons = function (stateName, args) {
        console.log("Updating action buttons for state: " + stateName);
    };
    DigidevilTutorialReversi.prototype.setupNotifications = function () {
        console.log("Setting up notifications");
    };
    return DigidevilTutorialReversi;
}(GameGui));
define([
    "dojo", "dojo/_base/declare",
    "ebg/core/gamegui",
    "ebg/counter",
    "ebg/stock"
], function (dojo, declare) {
    return declare("bgagame.digideviltutorialreversi", ebg.core.gamegui, new DigidevilTutorialReversi());
});
