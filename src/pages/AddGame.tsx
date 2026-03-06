import { useState } from "react";
import Input from "../components/forms/Input";
import Checkbox from "../components/forms/Checkbox";
import Button from "../components/forms/Button";
import SideGameForm from "../components/forms/sidegame/SideGameForm";

import Game from "../classes/Game";
import SideGame from "../classes/SideGame";

const AddGame = () => {

    const [buyIn, setBuyIn] = useState<number | "">("");
    const [allowRebuy, setAllowRebuy] = useState<boolean>(false);
    const [trackKnockouts, setTrackKnockouts] = useState<boolean>(false);
    const [rebuyCost, setRebuyCost] = useState<number | "">("");
    const [maxRebuys, setMaxRebuys] = useState<number | "">("");
    const [sideGames, setSideGames] = useState<{ name: string; cost: number | "" }[]>([]);

    const addSideGame = () => {
        setSideGames([...sideGames, { name: "", cost: "" }]);
    }

    const updateSideGame = (index: number, name: string, cost: number | "") => {
        const updated = [...sideGames];
        updated[index] = { name, cost };
        setSideGames(updated);
    };

    const removeSideGame = (index: number) => {
        setSideGames(sideGames.filter((_, i) => i !== index));
    }

    // Save the entered values to an instance of the game class
    const saveGame = () => {
        // Loop through the side games we've added and create instances of a side game class for them
        let addedSideGames: SideGame[] = [];

        for (const sg of sideGames) {
            let newSideGame = new SideGame(sg.name, Number(sg.cost));
            addedSideGames.push(newSideGame);
        }

        // Set a new object of the game class
        const game = new Game(
            Number(buyIn),
            addedSideGames,
            [], // no players yet
            allowRebuy,
            Number(maxRebuys),
            Number(rebuyCost),
            trackKnockouts
        );

        console.log(game);
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-xs">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div>
                        <Input
                            value={buyIn.toString()}
                            onChange={(e) => setBuyIn(Number(e.target.value))}
                            placeholder="20"
                            label="Buy In"
                        />
                    </div>
                    <div className="mt-2">
                        <Checkbox
                            value={allowRebuy}
                            onChange={(e) => setAllowRebuy(!allowRebuy)}
                            label="Allow Rebuys"
                        />
                    </div>
                    <div>
                        <Checkbox
                            value={trackKnockouts}
                            onChange={(e) => setTrackKnockouts(!trackKnockouts)}
                            label="Track Knockouts"
                        />
                    </div>
                    {allowRebuy && (
                        <>
                            <div>
                                <Input
                                    value={rebuyCost.toString()}
                                    onChange={(e) => setRebuyCost(Number(e.target.value))}
                                    label="Rebuy Cost"
                                    placeholder="20"
                                />
                            </div>
                            <div>
                                <Input
                                    value={maxRebuys.toString()}
                                    onChange={(e) => setMaxRebuys(Number(e.target.value))}
                                    label="Max rebuys"
                                    placeholder="2"
                                />
                            </div>
                        </>
                    )}
                    <div className="mt-2">
                        <Button
                            label="Add Side Game"
                            onClick={addSideGame}
                        />
                    </div>

                    {sideGames.map((sg, index) => (
                        <div key={index}>
                            <SideGameForm
                                name={sg.name}
                                cost={sg.cost}
                                save={(name, cost) => updateSideGame(index, name, cost)}
                                remove={() => removeSideGame(index)}
                            />
                        </div>
                    ))}
                    <div className="mt-2">
                        <Button
                            label="Save game"
                            onClick={saveGame}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddGame;