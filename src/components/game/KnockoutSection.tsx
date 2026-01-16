import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { Game } from "../../models/game";

interface KnockoutProps {
    game: Game | null;
    setGame: Dispatch<SetStateAction<Game | null>>;
}

const KnockoutSection = ({ game, setGame }: KnockoutProps) => {
    if (!game) return;
    const [killer, setKiller] = useState("");
    const [victim, setVictim] = useState("");

    const record = () => {
        if (!killer || !victim || killer == victim) return;

        setGame(prev => {
            if (!prev) return prev;

            const updated = new Game(prev.name, prev.date);
            Object.assign(updated, prev);
            updated.recordKnockOut(killer, victim);
            return updated;
        })

        setKiller("");
        setVictim("");
    }

    return (
        <div className="p-4"
            style={{ backgroundColor: "rgb(var(--card-bg))", color: "rgb(var(--text))" }}>

            <h2 className="text-xl font-semibold mb-3">Record Knockout</h2>

            <div className="flex flex-col gap-3 mb-4">
                <select
                    value={killer}
                    onChange={e => setKiller(e.target.value)}
                    className="p-2 rounded border"
                    style={{
                        backgroundColor: "rgb(var(--input-bg))",
                        borderColor: "rgb(var(--border))",
                        color: "rgb(var(--text))"
                    }}
                >
                    <option value="">Killer</option>
                    {game.players.map(p => (
                        <option key={p.playerId} value={p.playerId}>
                            {p.playerId}
                        </option>
                    ))}
                </select>

                <select
                    value={victim}
                    onChange={e => setVictim(e.target.value)}
                    className="p-2 rounded border"
                    style={{
                        backgroundColor: "rgb(var(--input-bg))",
                        borderColor: "rgb(var(--border))",
                        color: "rgb(var(--text))"
                    }}
                >
                    <option value="">Victim</option>
                    {game.players.map(p => (
                        <option key={p.playerId} value={p.playerId}>
                            {p.playerId}
                        </option>
                    ))}
                </select>

                <button
                    onClick={record}
                    className="py-2 px-4 rounded font-semibold"
                    style={{
                        backgroundColor: "rgb(var(--accent))",
                        color: "rgb(var(--accent-text))"
                    }}
                >
                    Record
                </button>
            </div>

            <h3 className="text-lg font-semibold mb-2">Knockout History</h3>

            <ul className="space-y-1">
                {game.knockouts.map((k, i) => (
                    <li key={i} className="text-sm opacity-80">
                        {k.killerId} knocked out {k.victimId}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default KnockoutSection;