import type { Dispatch, SetStateAction } from "react";
import { Game } from "../../models/game";
import type { GamePlayer } from "../../models/gamePlayer";

interface PlayersTableProps {
  game: Game | null;
  setGame: Dispatch<SetStateAction<Game | null>>;
}

const PlayersTable = ({ game, setGame }: PlayersTableProps) => {
    if (!game) return;

    const updatePlayer = (
        playerId: string,
        updater: (p: GamePlayer) => void
    ) => {
        setGame(prev => {
            if (!prev) return prev;
            const updated = new Game(prev.name, prev.date);
            Object.assign(updated, prev);

            const gp = updated.players.find(p => p.playerId === playerId);
            if (!gp) return updated; // safety

            updater(gp);

            return updated;
        });
    };

    return (
        <div>
            <h2>Players</h2>

            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Buy-ins</th>
                        <th>Side Games</th>
                        <th>Total Paid</th>
                        <th>Change Owed</th>
                        <th>Rebuy</th>
                    </tr>
                </thead>

                <tbody>
                    {game.players.map(gp => {
                        const cost = game.calculatePlayerCost(gp.playerId);
                        const change = gp.totalPaid - cost;

                        return (
                            <tr key={gp.playerId}>
                                <td>{gp.playerId}</td>

                                <td>{gp.buyIns}</td>

                                <td>
                                    {game.sidegames.map(sg => (
                                        <label key={sg.id}>
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
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={gp.totalPaid}
                                        onChange={e =>
                                            updatePlayer(gp.playerId, (p: GamePlayer) => {
                                                p.totalPaid = Number(e.target.value);
                                            })
                                        }
                                    />
                                </td>

                                <td>{change >= 0 ? `£${change}` : `Owes £${-change}`}</td>

                                <td>
                                    <button
                                        onClick={() =>
                                            updatePlayer(gp.playerId, (p: GamePlayer) => p.addRebuy())
                                        }
                                    >
                                        Rebuy
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

    )
}

export default PlayersTable;