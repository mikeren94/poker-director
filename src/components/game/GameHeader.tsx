import type { GameInterface } from "../../models/game";

interface GameHeaderProps {
    game: GameInterface
}

const GameHeader = ({ game }: GameHeaderProps) => {
    return (
        <div className="p-4"
            style={{ backgroundColor: "rgb(var(--bg))", color: "rgb(var(--text))" }}>
            <h1 className="text-2xl font-bold">{game.name}</h1>
            <p className="opacity-80 mt-1">
                Date: {game.date.toLocaleDateString()}
            </p>
        </div>
    )
}

export default GameHeader;