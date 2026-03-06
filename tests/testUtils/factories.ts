import Game from '../../src/classes/Game';
import Player from '../../src/classes/Player';
import SideGame from '../../src/classes/SideGame';

export function makeGame({
    buyIn = 20,
    sideGames = [],
    players = [],
    allowRebuys = false,
    maxRebuysPerPlayer = null
}: {
    buyIn?: number;
    sideGames?: SideGame[];
    players?: Player[];
    allowRebuys?: boolean;
    maxRebuysPerPlayer?: number | null;
} = {}): Game {
    return new Game(buyIn, sideGames, players, allowRebuys, maxRebuysPerPlayer);
}

export function makeSideGame(
    name: string,
    cost: number
): SideGame {
    return new SideGame(name, cost);
}

export function makePlayer({
    name = 'David Tennant',
    moneyGiven = 0,
    selectedSideGames = [],
}: {
    name?: string;
    moneyGiven?: number;
    selectedSideGames?: string[];
} = {}): Player {
    return new Player(name, moneyGiven, selectedSideGames);
}