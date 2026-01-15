import { useState } from "react";
import { Game } from "../models/game";
import GameHeader from "../components/game/GameHeader";
import SideGamesSection from "../components/game/SideGamesSection";
import PlayersTable from "../components/game/PlayersTable";
import KnockoutSection from "../components/game/KnockoutSection";

export default function GamePage() {
  // TEMP: In the real app you'll load this from storage
  const [game, setGame] = useState<Game | null>(null);

  setGame(new Game('Saturday poker', new Date()));

  if (!game) {
    return <div>No game loaded yet</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <GameHeader game={game} />

      <SideGamesSection game={game} setGame={setGame} />

      <PlayersTable game={game} setGame={setGame} />

      <KnockoutSection game={game} setGame={setGame} />
    </div>
  );
}