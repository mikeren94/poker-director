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

test("A player that knocks out another player is tracked in the knockouts", () => {
    // Create a game that allows knockouts
    game = makeGame({
        buyIn: 20,
        sideGames: [],
        trackKnockouts: true
    });

    // Add two players to the game
    const player1 = makePlayer({
        name: "Alice"
    });

    const player2 = makePlayer({
        name: "Bob"
    });

    game.addPlayer(player1);
    game.addPlayer(player2);

    game.recordKnockout(player1.id, player2.id)

    // There should be exactly 1 knockout in the game
    expect(game.knockouts.length).toBe(1);

    const knockout = game.knockouts[0];

    // The killer and victim ids should match the players passed to the player
    expect(knockout.killerId).toBe(player1.id);
    expect(knockout.victimId).toBe(player2.id);

    // Ensure that a timestamp exists on the knockout
    expect(knockout.timestamp).toBeInstanceOf(Date);
});

test("A player can only knock out an active player", () => {
    // Create a game that allows knockouts
    game = makeGame({
        buyIn: 20,
        sideGames: [],
        trackKnockouts: true
    });

    // Add two players to the game
    const player1 = makePlayer({
        name: "Alice"
    });

    const player2 = makePlayer({
        name: "Bob"
    });


    game.addPlayer(player1);
    game.addPlayer(player2);

    game.recordKnockout(player1.id, player2.id);
    game.recordKnockout(player1.id, player2.id);

    expect(game.knockouts.length).toBe(1);
})

test("Knocked out players are listed in the order they were knocked out", () => {
    game = makeGame({
        buyIn: 20,
        sideGames: [],
        trackKnockouts: true
    });

    const p1 = makePlayer({ name: "Alice" });
    const p2 = makePlayer({ name: "Bob" });
    const p3 = makePlayer({ name: "Charlie" });

    game.addPlayer(p1);
    game.addPlayer(p2);
    game.addPlayer(p3);

    // Knockout order:
    // Bob knocks out Alice
    game.recordKnockout(p2.id, p1.id);
    // Charlie knocks out Bob
    game.recordKnockout(p3.id, p2.id);

    const knockedOut = game.getKnockedOutPlayers();

    expect(knockedOut.length).toBe(2);
    expect(knockedOut[0].id).toBe(p1.id);
    expect(knockedOut[1].id).toBe(p2.id);

    const active = game.getActivePlayers();

    expect(active.length).toBe(1);
    expect(active[0].id).toBe(p3.id);
});

test("A player cannot knock themselves out", () => {
    // Create a game that allows knockouts
    game = makeGame({
        buyIn: 20,
        sideGames: [],
        trackKnockouts: true
    });

    // Add two players to the game
    const player1 = makePlayer({
        name: "Alice"
    });

    const player2 = makePlayer({
        name: "Bob"
    });

    game.addPlayer(player1);
    game.addPlayer(player2);

    game.recordKnockout(player1.id, player1.id)

    // There should be no knockouts tracked in the game
    expect(game.knockouts.length).toBe(0);
});

test("Both players must exist in the game to register a knockout", () => {
    // Create a game that allows knockouts
    game = makeGame({
        buyIn: 20,
        sideGames: [],
        trackKnockouts: true
    });

    // Add two players to the game
    const player1 = makePlayer({
        name: "Alice"
    });

    const player2 = makePlayer({
        name: "Bob"
    });

    game.addPlayer(player1);

    game.recordKnockout(player1.id, player2.id)

    // There should be no knockouts tracked in the game
    expect(game.knockouts.length).toBe(0);
})

test("knockouts are not recorded in a game that doesn't track knockouts", () => {
        // Create a game that allows knockouts
    game = makeGame({
        buyIn: 20,
        sideGames: [],
        trackKnockouts: false
    });

    // Add two players to the game
    const player1 = makePlayer({
        name: "Alice"
    });

    const player2 = makePlayer({
        name: "Bob"
    });

    game.addPlayer(player1);
    game.addPlayer(player2);

    game.recordKnockout(player1.id, player2.id)

    // There should be no knockouts in the game
    expect(game.knockouts.length).toBe(0);
})