import Game from '../../src/classes/Game';
import Player from '../../src/classes/Player';
import SideGame from '../../src/classes/SideGame';
import { makeGame, makeSideGame, makePlayer } from '../testUtils/factories'
import { addPlayersToGame, setupStandardGame } from '../testUtils/game';

let bestHand: SideGame;
let knockouts: SideGame;
let game: Game;
let standardPlayers: any[];

beforeEach(() => {
    ({ game, bestHand, knockouts } = setupStandardGame());

    standardPlayers = [
        { name: "Alice", selectedSideGames: [bestHand.id, knockouts.id] },
        { name: "Bob", selectedSideGames: [] },
        { name: "Charlie", selectedSideGames: [bestHand.id, "invalid-side-game-id"] },
        { name: "David", selectedSideGames: [bestHand.id, bestHand.id] }
    ];
});

test("Calculates the total pot based on the buy in and the side games they have selected to play", () => {
    addPlayersToGame(game, standardPlayers);

    const totalPot = game.calculateTotalPot();

    // The total pot should be the sum of the buyIn for each player
    expect(totalPot).toBe(80);
})

test("Calcculates the total pot of a side game for a provided tournament", () => {

    addPlayersToGame(game, standardPlayers);

    const totalCostForBestHand = game.calculateTotalPotForSideGame(bestHand.id);

    // The total cost for the best hand side game should be 5 for each player that selected it, we should ignore the invalid selection and the duplicate selection
    expect(totalCostForBestHand).toBe(15);
});