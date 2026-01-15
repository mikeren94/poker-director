import type { GameInterface } from "../../models/game";

interface GameHeaderProps {
    game: GameInterface
}

const GameHeader = ({game}: GameHeaderProps) => {
    return (
        <div>
            <h1>{game.name}</h1>
            <p>Date: {game.date.toLocaleDateString()}</p>
        </div>
    )
}

export default GameHeader;