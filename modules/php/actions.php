<?php

trait ActionTrait
{
    public function actPlayDisc(int $x, int $y): void
    {
        $player_id = intval($this->getActivePlayerId());

        // Now, check if this is a possible move
        $board = $this->getBoard();
        $turnedOverDiscs = $this->getTurnedOverDiscs($x, $y, $player_id, $board);

        if (count($turnedOverDiscs) > 0) {
            // This move is possible!

            $sql = "UPDATE board SET board_player='$player_id'
                    WHERE ( board_x, board_y) IN ( ";

            foreach ($turnedOverDiscs as $turnedOver) {
                $sql .= "('" . $turnedOver['x'] . "','" . $turnedOver['y'] . "'),";
            }
            $sql .= "('$x','$y') ) ";

            $this->DbQuery($sql);
            // Update scores according to the number of disc on board
            $sql = "UPDATE player
                    SET player_score = (
                    SELECT COUNT( board_x ) FROM board WHERE board_player=player_id
                    )";
            $this->DbQuery($sql);

            // Statistics
            $this->incStat(count($turnedOverDiscs), "turnedOver", $player_id);
            if (($x == 1 && $y == 1) || ($x == 8 && $y == 1) || ($x == 1 && $y == 8) || ($x == 8 && $y == 8))
                $this->incStat(1, 'discPlayedOnCorner', $player_id);
            else if ($x == 1 || $x == 8 || $y == 1 || $y == 8)
                $this->incStat(1, 'discPlayedOnBorder', $player_id);
            else if ($x >= 3 && $x <= 6 && $y >= 3 && $y <= 6)
                $this->incStat(1, 'discPlayedOnCenter', $player_id);

            // Notify
            $this->notify->all("playDisc", clienttranslate('${player_name} plays a disc and turns over ${returned_nbr} disc(s)'), array(
                'player_id' => $player_id,
                'player_name' => $this->getActivePlayerName(),
                'returned_nbr' => count($turnedOverDiscs),
                'x' => $x,
                'y' => $y
            ));

            $this->notify->all("turnOverDiscs", '', array(
                'player_id' => $player_id,
                'turnedOver' => $turnedOverDiscs
            ));

            $newScores = $this->getCollectionFromDb("SELECT player_id, player_score FROM player", true);
            $this->notify->all("newScores", "", array(
                "scores" => $newScores
            ));
            // Then, go to the next state
            $this->gamestate->nextState('playDisc');
        } else
            throw new \BgaSystemException("Impossible move");
    }

    public function actPass(): void
    {
        // Retrieve the active player ID.
        $player_id = (int)$this->getActivePlayerId();

        // Notify all players about the choice to pass.
        $this->notify->all("pass", clienttranslate('${player_name} passes'), [
            "player_id" => $player_id,
            "player_name" => $this->getActivePlayerName(), // remove this line if you uncomment notification decorator
        ]);

        // at the end of the action, move to the next state
        $this->gamestate->nextState("pass");
    }
}
