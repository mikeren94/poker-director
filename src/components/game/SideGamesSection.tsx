import { useState, type Dispatch, type SetStateAction } from "react";
import { SideGame } from "../../models/sideGame";
import { Game } from "../../models/game";

interface SideGamesSectionProps {
  game: Game | null;
  setGame: Dispatch<SetStateAction<Game | null>>;
}

const SideGamesSection = ({game, setGame}: SideGamesSectionProps) => {

    if (!game) return;
    
    const [name, setName] = useState("");
    const [cost, setCost] = useState("");

    const addSideGame = () => {
        if (!name.trim())  return;

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
        <div>
            <h2>Side Games</h2>

            <div>
                <input
                placeholder="Side game name"
                value={name}
                onChange={e => setName(e.target.value)}
                />
                <input
                placeholder="Cost"
                type="number"
                value={cost}
                onChange={e => setCost(e.target.value)}
                />
                <button onClick={addSideGame}>Add</button>
            </div>

            <ul>
                {game.sidegames.map(sg => (
                <li key={sg.id}>
                    {sg.name} — £{sg.cost}
                </li>
                ))}
            </ul>
        </div>
    )
}

export default SideGamesSection;