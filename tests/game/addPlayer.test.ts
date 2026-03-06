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

test("A player can be added to a game", () => {
    const player = makePlayer({ name: "Alice" });   
    game.addPlayer(player);
    expect(game.players).toContain(player);
})

test("Adding the same player twice does not duplicate the player in the game", () => {
    const player = makePlayer({ name: "Alice" });   
    game.addPlayer(player);
    game.addPlayer(player);

    // The player should only be added once to the game
    expect(game.players).toEqual([player]);
})