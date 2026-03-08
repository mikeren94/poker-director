import { useLocation, useNavigate } from "react-router-dom";
import Game from "../classes/Game";
import { useEffect, useState } from "react";
import Player from "../classes/Player";
import Button from "../components/forms/Button";
import PlayerForm from "../components/player/PlayerForm";

const AddPlayers = () => {
    const [totalPot, setTotalPot] = useState<number>(0);
    const [sideGamePots, setSideGamePots] = useState<{
        name: string,
        pot: number
    }[]>([])

    const location = useLocation();
    const navigate = useNavigate();
    const rawGame = location.state?.game as Game;

    const [game, setGame] = useState(() =>
        Object.assign(new Game(), rawGame)
    );

    const addPlayer = () => {
        const newPlayer = new Player();

        setGame(prev => {
            const updated = Object.assign(new Game(), prev);
            updated.addPlayer(newPlayer);
            return updated;
        });
    };

    const updatePlayer = (index: number, player: Player) => {
        setGame(prev => {
            const updated = Object.assign(new Game(), prev);
            updated.players[index] = player;
            return updated;
        });
    };

    const removePlayer = (index: number) => {
        setGame(prev => {
            const updated = Object.assign(new Game(), prev);
            updated.players = updated.players.filter((_, i) => i !== index);
            return updated;
        });
    };

    useEffect(() => {
        setTotalPot(game.calculateTotalPot());
        setSideGamePots(
            game.sideGames.map(sg => ({
                name: sg.name,
                pot: game.calculateTotalPotForSideGame(sg.id)
            }))
        );
    }, [game]);

    const startGame = () => {
        // Navigate to the next page and pass the game
        navigate("/view-game", { state: { game } });
    }

    return (
        <div>
            <h1>Add Players</h1>
            <p>Total Pot: {totalPot}</p>
            <p>Buy-in: {game.buyIn}</p>
            {sideGamePots.map((sg, index) => (
                <p key={index}>{sg.name}: {sg.pot}</p>
            ))}

            <div className="mt-2">
                <Button
                    label="Add Player"
                    onClick={addPlayer}
                />
            </div>

            {game.players.map((player, index) => (
                <div key={index}>
                    <PlayerForm
                        player={player}
                        save={(player) => updatePlayer(index, player)}
                        game={game}
                        remove={() => removePlayer(index)}
                    />
                </div>
            ))}
            <div className="mt-2">
                <Button
                    label="Start Game"
                    onClick={startGame}
                />
            </div>

        </div>
    )
}

export default AddPlayers;