import { useState, type Dispatch, type SetStateAction } from "react";
import { SideGame } from "../../models/sideGame";
import { Game } from "../../models/game";

interface SideGamesSectionProps {
    game: Game | null;
    setGame: Dispatch<SetStateAction<Game | null>>;
}

const SideGamesSection = ({ game, setGame }: SideGamesSectionProps) => {

    if (!game) return;

    const [name, setName] = useState("");
    const [cost, setCost] = useState("");

    const addSideGame = () => {
        if (!name.trim()) return;

        const sg = new SideGame(name, Number(cost) || 0);

        setGame(prev => {
            if (!prev) return prev;

            const updated = new Game(prev.name, prev.date);
            Object.assign(updated, prev);
            updated.sidegames.push(sg);
            return updated;
        })

        setName("");
        setCost("");
    }



    return (
        <div
            className="p-4"
            style={{ backgroundColor: "rgb(var(--card-bg))", color: "rgb(var(--text))" }}
        >
            <h2 className="text-xl font-semibold mb-4">Side Games</h2>

            <div className="flex flex-col gap-3 mb-4">
                <input
                    placeholder="Side game name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="p-2 rounded border"
                    style={{
                        backgroundColor: "rgb(var(--input-bg))",
                        borderColor: "rgb(var(--border))",
                        color: "rgb(var(--text))"
                    }}
                />

                <input
                    placeholder="Cost"
                    type="number"
                    value={cost}
                    onChange={e => setCost(e.target.value)}
                    className="p-2 rounded border"
                    style={{
                        backgroundColor: "rgb(var(--input-bg))",
                        borderColor: "rgb(var(--border))",
                        color: "rgb(var(--text))"
                    }}
                />

                <button
                    onClick={addSideGame}
                    className="py-2 px-4 rounded font-semibold"
                    style={{
                        backgroundColor: "rgb(var(--accent))",
                        color: "rgb(var(--accent-text))"
                    }}
                >
                    Add
                </button>
            </div>

            <ul className="space-y-2">
                {game.sidegames.map(sg => (
                    <li
                        key={sg.id}
                        className="p-2 rounded border"
                        style={{
                            backgroundColor: "rgb(var(--input-bg))",
                            borderColor: "rgb(var(--border))",
                            color: "rgb(var(--text))"
                        }}
                    >
                        {sg.name} — £{sg.cost}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SideGamesSection;