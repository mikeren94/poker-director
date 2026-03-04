import {v4 as uuidv4} from 'uuid';
import Player from './Player';
import SideGame from './SideGame';

// An instance of a Poker game
class Game {
    id: string;
    buyIn: number; // The cost of the main game 
    sideGames: SideGame[]; // Array of side games for the game e.g. "High hand", "Knockouts"
    players: Player[]; // List of players in the game

    constructor(buyIn: number, sideGames: SideGame[] = [], players: Player[] = []) {
        this.id = uuidv4();
        this.buyIn = buyIn;
        this.sideGames = sideGames;
        this.players = players;
    }
}

export default Game;