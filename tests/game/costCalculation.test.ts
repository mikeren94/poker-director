import Game from '../../src/classes/Game';
import Player from '../../src/classes/Player';
import SideGame from '../../src/classes/SideGame';
import { makeGame, makeSideGame, makePlayer } from '../testUtils/factories'
import { setupStandardGame } from '../testUtils/game';

let bestHand: SideGame;
let knockouts: SideGame;
let game: Game;
let standardPlayers: any[];

beforeEach(() => {
  ({ game, bestHand, knockouts } = setupStandardGame());
});

test("Calculates the total cost when a player selects valid side games", () => {
    // Create a player who selects both side games to play
    const player = makePlayer({
        name: "Alice",
        selectedSideGames: [bestHand.id, knockouts.id]
    });

    const total = game.calculateTotalCostForPlayer(player);

    // The total cost should be the buy in plus the cost of both side games
    expect(total).toBe(30);
})

test("Calculates the total cost when a player selects no side games", () => {
    // Create a player who selects no side games to play
    const player = makePlayer({
        name: "Bob",
        selectedSideGames: []
    });

    const total = game.calculateTotalCostForPlayer(player);

    // The total cost should just be the buy in since they haven't selected any side games
    expect(total).toBe(20);
})

test("Calculates the total cost when a player selects an invalid side game", () => {
    // Create a player who selects one valid side game and one invalid side game to play
    const player = makePlayer({
        name: "Charlie",
        selectedSideGames: [bestHand.id, "invalid-side-game-id"]
    });

    const total = game.calculateTotalCostForPlayer(player);

    // The total cost should be the buy in plus the cost of the valid side game
    expect(total).toBe(25);
});

test("Calculates the total cost when a player selects the same side game multiple times", () => {

    // Create a player who selects one valid side game and one invalid side game to play
    const player = makePlayer({
        name: "Charlie",
        selectedSideGames: [bestHand.id, bestHand.id]
    });

    const total = game.calculateTotalCostForPlayer(player);

    // The total cost should be the buy in plus the cost of the valid side game, we should ignore the duplicate selection
    expect(total).toBe(25);

});
