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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        var _this = this;
        this.setupNotifications();
        // add game board
        this.getGameAreaElement().insertAdjacentHTML("beforeend", "\n      <div id=\"board\">\n        <div id=\"discs\">\n        </div>\n      </div>\n    ");
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
        for (var i in gamedatas.board) {
            var square = gamedatas.board[i];
            if (square.player !== null) {
                this.addDiscToBoard(square.x, square.y, square.player);
            }
        }
        document
            .querySelectorAll(".square")
            .forEach(function (square) {
            return square.addEventListener("click", function (e) { return _this.onPlayDisc(e); });
        });
    };
    DigidevilTutorialReversi.prototype.onEnteringState = function (stateName, args) {
        console.log("Entering state: " + stateName);
        switch (stateName) {
            case "playerTurn":
                this.updatePossibleMoves(args.args.possibleMoves);
                break;
        }
    };
    DigidevilTutorialReversi.prototype.onLeavingState = function (stateName) {
        console.log("Leaving state: " + stateName);
    };
    DigidevilTutorialReversi.prototype.onUpdateActionButtons = function (stateName, args) {
        console.log("Updating action buttons for state: " + stateName);
    };
    DigidevilTutorialReversi.prototype.setupNotifications = function () {
        console.log("Setting up notifications");
        // automatically listen to the notifications, based on the `notif_xxx` function on this class.
        this.bgaSetupPromiseNotifications();
    };
    DigidevilTutorialReversi.prototype.addDiscToBoard = function (x, y, playerId) {
        return __awaiter(this, void 0, void 0, function () {
            var color, anim;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        color = this.gamedatas.players[playerId].color;
                        document
                            .getElementById("discs")
                            .insertAdjacentHTML("beforeend", "<div class=\"disc\" data-color=\"".concat(color, "\" id=\"disc_").concat(x).concat(y, "\"></div>"));
                        this.placeOnObject("disc_".concat(x).concat(y), "overall_player_board_" + playerId);
                        anim = this.slideToObject("disc_".concat(x).concat(y), "square_" + x + "_" + y);
                        return [4 /*yield*/, this.bgaPlayDojoAnimation(anim)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DigidevilTutorialReversi.prototype.updatePossibleMoves = function (possibleMoves) {
        // Remove current possible moves
        document
            .querySelectorAll(".possibleMove")
            .forEach(function (div) { return div.classList.remove("possibleMove"); });
        for (var x in possibleMoves) {
            for (var y in possibleMoves[x]) {
                // x,y is a possible move
                document
                    .getElementById("square_".concat(x, "_").concat(y))
                    .classList.add("possibleMove");
            }
        }
        this.addTooltipToClass("possibleMove", "", _("Place a disc here"));
    };
    DigidevilTutorialReversi.prototype.onPlayDisc = function (evt) {
        // Stop this event propagation
        evt.preventDefault();
        evt.stopPropagation();
        // Get the cliqued square x and y
        // Note: square id format is "square_X_Y"
        var coords = evt.currentTarget.id.split("_");
        var x = coords[1];
        var y = coords[2];
        if (!document
            .getElementById("square_".concat(x, "_").concat(y))
            .classList.contains("possibleMove")) {
            // This is not a possible move => the click does nothing
            return;
        }
        this.bgaPerformAction("actPlayDisc", { x: x, y: y });
    };
    DigidevilTutorialReversi.prototype.notif_playDisc = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Remove current possible moves (makes the board more clear)
                        document
                            .querySelectorAll(".possibleMove")
                            .forEach(function (div) { return div.classList.remove("possibleMove"); });
                        return [4 /*yield*/, this.addDiscToBoard(args.x, args.y, args.player_id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DigidevilTutorialReversi.prototype.notif_turnOverDiscs = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var targetColor;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        targetColor = this.gamedatas.players[args.player_id].color;
                        // wait for the animations of all turned discs to be over before considering the notif done
                        return [4 /*yield*/, Promise.all(args.turnedOver.map(function (disc) { return _this.animateTurnOverDisc(disc, targetColor); }))];
                    case 1:
                        // wait for the animations of all turned discs to be over before considering the notif done
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DigidevilTutorialReversi.prototype.animateTurnOverDisc = function (disc, targetColor) {
        return __awaiter(this, void 0, void 0, function () {
            var discDiv, anim;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        discDiv = document.getElementById("disc_".concat(disc.x).concat(disc.y));
                        if (!this.bgaAnimationsActive()) {
                            // do not play animations if the animations aren't activated (fast replay mode)
                            discDiv.dataset.color = targetColor;
                            return [2 /*return*/, Promise.resolve()];
                        }
                        anim = dojo.fx.chain([
                            dojo.fadeIn({ node: discDiv }),
                            dojo.fadeIn({ node: discDiv }),
                            dojo.fadeIn({
                                node: discDiv,
                                onEnd: function () { return (discDiv.dataset.color = targetColor); },
                            }),
                            dojo.fadeIn({ node: discDiv }),
                        ]);
                        return [4 /*yield*/, this.bgaPlayDojoAnimation(anim)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DigidevilTutorialReversi.prototype.notif_newScores = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var player_id, newScore;
            return __generator(this, function (_a) {
                for (player_id in args.scores) {
                    newScore = args.scores[player_id];
                    this.scoreCtrl[player_id].toValue(newScore);
                }
                return [2 /*return*/];
            });
        });
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
