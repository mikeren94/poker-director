import { useEffect, useState } from "react";
import Input from "../forms/Input";
import Player from "../../classes/Player";
import type Game from "../../classes/Game";
import Checkbox from "../forms/Checkbox";
import { handleNumberChange } from "../../utils/numberInput";
import Button from "../forms/Button";
interface PlayerFormProps {
    player: Player;
    save: (player: Player) => void;
    remove: () => void;
    game: Game;
}

const PlayerForm = ({ player, save, remove, game }: PlayerFormProps) => {
    const [updatingPlayer, setUpdatingPlayer] = useState<Player>(player);

    // Array of strings of selected side game ids
    const [totalCost, setTotalCost] = useState<number>(0);

    useEffect(() => {
        setUpdatingPlayer(player);
    }, [player]);

    const toggleSideGame = (sideGameId: string) => {
        updatePlayer({
            selectedSideGames: updatingPlayer.selectedSideGames.includes(sideGameId)
                ? updatingPlayer.selectedSideGames.filter(id => id !== sideGameId)
                : [...updatingPlayer.selectedSideGames, sideGameId]
        });
    };

    useEffect(() => {
        setTotalCost(game.calculateTotalCostForPlayer(player))
    }, [player])

    useEffect(() => {
        const paid = Number(updatingPlayer.moneyGiven);

        if (!paid) {
            updatePlayer({ changeOwed: 0 });
            return;
        }

        if (paid > totalCost) {
            updatePlayer({ changeOwed: paid - totalCost });
        } else {
            updatePlayer({ changeOwed: 0 });
        }

    }, [updatingPlayer.moneyGiven])

    const updatePlayer = (patch: Partial<Player>) => {
        const updated = { ...updatingPlayer, ...patch };
        setUpdatingPlayer(updated);
        save(updated);
    };

    if (!updatingPlayer || !game) return;

    return (
        <>
            <Input
                value={player.name}
                onChange={(e) => updatePlayer({ name: e.target.value })}
                label="Name"
            />
            {game.sideGames.map((sg, index) => (
                <Checkbox
                    key={index}
                    value={player.selectedSideGames.indexOf(sg.id) > -1}
                    onChange={() => toggleSideGame(sg.id)}
                    label={sg.name}
                />
            ))}
            {
                totalCost > player.moneyGiven && (
                    <p>Money owed: {totalCost - player.moneyGiven}</p>

                )
            }
            <Input
                value={player.moneyGiven.toString()}
                onChange={(e) =>
                    handleNumberChange(e, (num) => updatePlayer({ moneyGiven: Number(num) }))
                }

                label="Money paid"
            />
            {player.changeOwed > 0 && (
                <>
                    <p>Change owed: {player.changeOwed}</p>
                    <Checkbox
                        value={player.changeGiven}
                        onChange={() => updatePlayer({ changeGiven: !updatingPlayer.changeGiven })}
                        label="Change given?"
                    />
                </>
            )}
            <Button
                onClick={remove}
                label="Remove Player"
            />
        </>
    )
}

export default PlayerForm;