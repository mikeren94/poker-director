import { useLocation, useNavigate } from "react-router-dom";
import Game from "../classes/Game";
import { useEffect, useState } from "react";
import Button from "../components/forms/Button";

const ViewGame = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const rawGame = location.state?.game as Game;
    const [showKnockoutForm, setShowKnockoutForm] = useState<boolean>(false);
    const [victimId, setVictimId] = useState<string>("");
    const [killerId, setKillerId] = useState<string>("");

    const [game, setGame] = useState(() =>
        Object.assign(new Game(), rawGame)
    );

    const checkForKnockoutForm = (playerId: string) => {

        setVictimId(playerId);

        if (game.trackKnockouts) {
            setShowKnockoutForm(true);
        } else {
            processKnockout();
        }
    }

    const processKnockout = () => {
        setShowKnockoutForm(false);
        game.recordKnockout(victimId, killerId);

        setGame(prev => {
            const updated = Object.assign(new Game(), prev);
            updated.recordKnockout(victimId, killerId);
            return updated;
        });
    }

    useEffect(() => {
        console.log(game)
    }, [game])

    return (
        <>
            {showKnockoutForm && (
                <div>
                    <p>Select killer</p>
                    <select
                        value={killerId}
                        onChange={(e) => setKillerId(e.target.value)}
                    >
                        <option value="">-- Select a player --</option>

                        {game.players.map((player) => (
                            <option key={player.id} value={player.id}>
                                {player.name}
                            </option>
                        ))}
                    </select>
                    <Button
                        label="Save knockout"
                        onClick={processKnockout}
                    />
                </div>
            )}
            <p>Players:</p>
            {game.players.filter(player => !player.knockedOut).map((player, index) => (
                <div key={index}>
                    <p>{player.name}</p>
                    {!player.knockedOut && (
                        <Button
                            label="Knock out"
                            onClick={() => checkForKnockoutForm(player.id)}
                        />
                    )}
                </div>
            ))}
        </>
    )
}

export default ViewGame;