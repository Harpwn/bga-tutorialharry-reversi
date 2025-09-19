<?php
declare(strict_types=1);

use Bga\GameFramework\GameStateBuilder;
use Bga\GameFramework\StateType;

require_once("modules/php/constants.inc.php");

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