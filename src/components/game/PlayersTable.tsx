import type { Dispatch, SetStateAction } from "react";
import { Game } from "../../models/game";
import type { GamePlayer } from "../../models/gamePlayer";

interface PlayersTableProps {
    game: Game | null;
    setGame: Dispatch<SetStateAction<Game | null>>;
}

const PlayersTable = ({ game, setGame }: PlayersTableProps) => {
    if (!game) return null;

    const updatePlayer = (
        playerId: string,
        updater: (p: GamePlayer) => void
    ) => {
        setGame(prev => {
            if (!prev) return prev;

            const updated = new Game(prev.name, prev.date);
            Object.assign(updated, prev);

            const gp = updated.players.find(p => p.playerId === playerId);
            if (!gp) return updated;

            updater(gp);
            return updated;
        });
    };

    return (
        <div
            className="p-4 flex flex-col gap-4"
            style={{
                backgroundColor: "rgb(var(--card-bg))",
                color: "rgb(var(--text))"
            }}
        >
            <h2 className="text-xl font-semibold mb-2">Players</h2>

            {game.players.length == 0 ? (
                <p>No Players added</p>
            ) : (
                <>
                    {game.players.map(gp => {
                        const cost = game.calculatePlayerCost(gp.playerId);
                        const change = gp.totalPaid - cost;

                        return (
                            <div
                                key={gp.playerId}
                                className="p-4 rounded-lg shadow flex flex-col gap-3"
                                style={{
                                    backgroundColor: "rgb(var(--input-bg))",
                                    color: "rgb(var(--text))",
                                    border: "1px solid rgb(var(--border))"
                                }}
                            >
                                {/* Player Name */}
                                <div className="text-lg font-semibold">{gp.playerId}</div>

                                {/* Buy-ins */}
                                <div className="text-sm opacity-80">
                                    Buy-ins: <span className="font-medium">{gp.buyIns}</span>
                                </div>

                                {/* Side Games */}
                                <div className="text-sm opacity-80">
                                    Side Games:
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {game.sidegames.map(sg => (
                                            <label
                                                key={sg.id}
                                                className="flex items-center gap-2 text-sm"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={gp.sideGames.includes(sg.id)}
                                                    onChange={() =>
                                                        updatePlayer(gp.playerId, (p: GamePlayer) => {
                                                            if (p.sideGames.includes(sg.id)) {
                                                                p.optOutOfSideGame(sg.id);
                                                            } else {
                                                                p.optIntoSideGame(sg.id);
                                                            }
                                                        })
                                                    }
                                                />
                                                {sg.name}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Total Paid */}
                                <div className="text-sm opacity-80 flex items-center gap-2">
                                    Total Paid:
                                    <input
                                        type="number"
                                        value={gp.totalPaid}
                                        onChange={e =>
                                            updatePlayer(gp.playerId, (p: GamePlayer) => {
                                                p.totalPaid = Number(e.target.value);
                                            })
                                        }
                                        className="p-1 rounded border w-24"
                                        style={{
                                            backgroundColor: "rgb(var(--card-bg))",
                                            borderColor: "rgb(var(--border))",
                                            color: "rgb(var(--text))"
                                        }}
                                    />
                                </div>

                                {/* Change */}
                                <div className="text-sm opacity-80">
                                    Change:{" "}
                                    <span className="font-medium">
                                        {change >= 0 ? `£${change}` : `Owes £${-change}`}
                                    </span>
                                </div>

                                {/* Rebuy Button */}
                                <button
                                    onClick={() =>
                                        updatePlayer(gp.playerId, (p: GamePlayer) => p.addRebuy())
                                    }
                                    className="py-2 px-4 rounded font-semibold text-sm"
                                    style={{
                                        backgroundColor: "rgb(var(--accent))",
                                        color: "rgb(var(--accent-text))"
                                    }}
                                >
                                    Rebuy
                                </button>
                            </div>
                        );
                    })}
                </>
            )}

        </div>
    );
};

export default PlayersTable;