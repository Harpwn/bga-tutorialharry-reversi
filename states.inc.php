<?php
declare(strict_types=1);

use Bga\GameFramework\GameStateBuilder;
use Bga\GameFramework\StateType;

require_once("modules/php/constants.inc.php");

/*
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. ANY CHANGES MADE DIRECTLY MAY BE OVERWRITTEN.
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * DigidevilTutorialReversi implementation : © Harry Billington digidevil4@gmail.com
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 */

/**
 * TYPE CHECKING ONLY, this function is never called.
 * If there are any undefined function errors here, you MUST rename the action within the game states file, or create the function in the game class.
 * If the function does not match the parameters correctly, you are either calling an invalid function, or you have incorrectly added parameters to a state function.
 */
if (false) {
	/** @var digideviltutorialreversi $game */
	
}

$machinestates = [
    ST_BGA_GAME_SETUP => GameStateBuilder::gameSetup(ST_PLAYER_PLAY_DISC)->build(),
    
    ST_PLAYER_PLAY_DISC => GameStateBuilder::create()
        ->name('playerTurn')
        ->description(clienttranslate('${actplayer} must play a disc'))
		->descriptionmyturn(clienttranslate('${you} must play a disc'))
        ->type(StateType::ACTIVE_PLAYER)
        ->args('argPlayerTurn')
        ->possibleactions([
            'actPlayDisc',
        ])
        ->transitions([
            'playDisc' => ST_NEXT_PLAYER,
        ])
        ->build(),
    
    ST_NEXT_PLAYER => GameStateBuilder::create()
        ->name('nextPlayer')
        ->type(StateType::GAME)
        ->action('stNextPlayer')
        ->updateGameProgression(true)
        ->transitions([
            'nextTurn' => ST_PLAYER_PLAY_DISC, 
            'cantPlay' => ST_NEXT_PLAYER,
            'endGame' => ST_END_GAME,
        ])
        ->build(),
];