import Game from '../../src/classes/Game';
import Player from '../../src/classes/Player';
import SideGame from '../../src/classes/SideGame';
import { makeGame, makeSideGame, makePlayer } from '../testUtils/factories'
import { setupStandardGame } from '../testUtils/game';

let bestHand: SideGame;
let knockouts: SideGame;
let game: Game;
let standardPlayers: any[];

test("A player can rebuy into the game if rebuys are allowed", () => {
    // Create a game that allows rebuys
    game = makeGame({
        buyIn: 20,
        sideGames: [],
        allowRebuys: true
    });

    // Create a player and add them to the game
    const player = makePlayer({ name: "Alice", moneyGiven: 20 });
    game.addPlayer(player);

    // Simulate the player losing and rebuying into the game
    game.rebuyPlayer(player.id);

    // Check that the player's money given has increased by the rebuy cost
    expect(player.moneyGiven).toBe(40);

    // Check that the pot has increased by the rebuy cost
    expect(game.calculateTotalPot()).toBe(40);

    // Check that the player's rebuy count has increased
    expect(player.rebuys).toBe(1);
});

test("A player cannot rebuy into the game if rebuys are not allowed", () => {
    // Create a game that does not allow rebuys
    game = makeGame({
        buyIn: 20,
        sideGames: [],
        allowRebuys: false
    });

    // Create a player and add them to the game
    const player = makePlayer({ name: "Alice", moneyGiven: 20 });
    game.addPlayer(player);

    // Simulate the player losing and attempting to rebuy into the game
    game.rebuyPlayer(player.id);    

    // Check that the player's money given has not changed
    expect(player.moneyGiven).toBe(20);

    // Check that the pot has not changed
    expect(game.calculateTotalPot()).toBe(20);

    // Check that the player's rebuy count has not changed
    expect(player.rebuys).toBe(0);
});

test("A player cannot rebuy into the game if they have reached the maximum number of rebuys", () => {
    // Create a game that allows rebuys and has a max rebuy limit of 1
    game = makeGame({
        buyIn: 20,
        sideGames: [],
        allowRebuys: true,
        maxRebuysPerPlayer: 1
    });

    // Create a player and add them to the game
    const player = makePlayer({ name: "Alice", moneyGiven: 20 });
    game.addPlayer(player);

    // Simulate the player losing and rebuying into the game
    game.rebuyPlayer(player.id);

    // Simulate the player losing again and attempting to rebuy into the game
    game.rebuyPlayer(player.id);

    // Check that the player's money given has only increased by the rebuy cost once    
    expect(player.moneyGiven).toBe(40);

    // Check that the pot has only increased by the rebuy cost once
    expect(game.calculateTotalPot()).toBe(40);
    
    // Check that the player's rebuy count has only increased once
    expect(player.rebuys).toBe(1);
});