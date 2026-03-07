import { useLocation } from "react-router-dom";
import Game from "../classes/Game";
import { useState } from "react";
import Player from "../classes/Player";
import Button from "../components/forms/Button";
import PlayerForm from "../components/player/PlayerForm";

const AddPlayers = () => {
    const location = useLocation();
    const rawGame = location.state?.game as Game;
    // Rehydrate the class instance
    const game = Object.assign(new Game(), rawGame);

    const [players, setPlayers] = useState<Player[]>([])

    const addPlayer = () => {
        let newPlayer = new Player();
        setPlayers([...players, newPlayer])
    }

    const updatePlayer = (index: number, player: Player) => {
        const updated = [...players];
        updated[index] = player;
        setPlayers(updated)
    }

    const removePlayer = (index: number) => {
        setPlayers(players.filter((_, i) => i !== index));
    }

    return (
        <div>
            <h1>Add Players</h1>
            <p>Buy-in: {game.buyIn}</p>
            <p>Side games: {game.sideGames.length}</p>

            <div className="mt-2">
                <Button
                    label="Add Player"
                    onClick={addPlayer}
                />
            </div>

            {players.map((player, index) => (
                <div key={index}>
                    <PlayerForm
                        player={player}
                        save={(player) => updatePlayer(index, player)}
                        game={game}
                        remove={() => removePlayer(index)}
                    />
                </div>
            ))}
        </div>
    )
}

export default AddPlayers;