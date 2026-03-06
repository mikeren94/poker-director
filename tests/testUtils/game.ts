import { makeSideGame, makeGame, makePlayer } from "./factories";
import Game from "../../src/classes/Game";

export function setupStandardGame() {
    const bestHand = makeSideGame("Best hand", 5);
    const knockouts = makeSideGame("Knockouts", 5);

    const game = makeGame({
        buyIn: 20,
        sideGames: [bestHand, knockouts]
    });

    return { game, bestHand, knockouts };
}

export function addPlayersToGame(game: Game, players: any[]) {
    for (const player of players) {
        let p = makePlayer(player);
        game.addPlayer(p);
    }
}