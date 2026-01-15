import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { Game } from "../../models/game";

interface KnockoutProps {
  game: Game | null;
  setGame: Dispatch<SetStateAction<Game | null>>;
}

const KnockoutSection = ({game, setGame}: KnockoutProps) => {
    if (!game) return;
    const [killer, setKiller] = useState("");
    const [victim,setVictim] = useState("");

    const record = () => {
        if (!killer || !victim || killer == victim) return;

        setGame(prev => {
            if (!prev) return prev;
        
            const updated = new Game(prev.name, prev.date);
            Object.assign(updated, prev);
            updated.recordKnockOut(killer,victim);
            return updated;
        })

        setKiller("");
        setVictim("");
    }
    
    return (
        <div>
            <h2>Record Knockout</h2>

            <select value={killer} onChange={e => setKiller(e.target.value)}>
                <option value="">Killer</option>
                {game.players.map(p => (
                <option key={p.playerId} value={p.playerId}>
                    {p.playerId}
                </option>
                ))}
            </select>
            <select value={victim} onChange={e => setVictim(e.target.value)}>
            <option value="">Victim</option>
            {game.players.map(p => (
            <option key={p.playerId} value={p.playerId}>
                {p.playerId}
            </option>
            ))}
        </select>

        <button onClick={record}>Record</button>

        <h3>Knockout History</h3>
        <ul>
            {game.knockouts.map((k, i) => (
            <li key={i}>
                {k.killerId} knocked out {k.victimId}
            </li>
            ))}
        </ul>
    </div>

    )
}

export default KnockoutSection;