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

test("A player can be removed from a game", () => {
    const player = makePlayer({ name: "Alice" });   
    game.addPlayer(player);
    game.removePlayer(player.id);
    expect(game.players).not.toContain(player);
})