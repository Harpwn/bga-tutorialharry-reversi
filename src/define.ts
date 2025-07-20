define([
    "dojo","dojo/_base/declare",
    "ebg/core/gamegui",
    "ebg/counter",
    "ebg/stock"
],
function (dojo, declare) {
    return declare("bgagame.digideviltutorialreversi", ebg.core.gamegui, new DigidevilTutorialReversi());             
});