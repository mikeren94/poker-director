import { v4 as uuidv4 } from 'uuid';
import Player from './Player';
import SideGame from './SideGame';

// An instance of a Poker game
class Game {
    id: string;
    buyIn: number; // The cost of the main game 
    sideGames: SideGame[]; // Array of side games for the game e.g. "High hand", "Knockouts"
    players: Player[]; // List of players in the game
    allowRebuys: boolean; // Determines if players are allowed to rebuy into the game after they have lost all of their chips
    maxRebuysPerPlayer: number | null; // If rebuys are allowed, this determines how many times a player can rebuy into the game, if 0 then there is no limit on rebuys
    rebuyCost: number; // If rebuys are allowed, this determines how much it costs for a player to rebuy into the game, if not set then it defaults to the buy in cost of the game
    
    private sideGameMap: Map<string, SideGame>;
    private playerMap: Map<string, Player>;

    constructor(
        buyIn: number, 
        sideGames: SideGame[] = [], 
        players: Player[] = [], 
        allowRebuys: boolean = false, 
        maxRebuysPerPlayer: number | null = null,
        rebuyCost: number = 0
    ) {
        this.id = uuidv4();
        this.buyIn = buyIn;
        this.sideGames = sideGames;
        this.players = players;
        this.allowRebuys = allowRebuys;
        this.maxRebuysPerPlayer = maxRebuysPerPlayer;
        this.rebuyCost = rebuyCost > 0 ? rebuyCost : buyIn;

        // Map side game ids to a side game
        this.sideGameMap = new Map(
            sideGames.map((sideGame) => [sideGame.id, sideGame])
        );

        // Map player ids to a player
        this.playerMap = new Map(
            players.map((player) => [player.id, player])
        );
    }

    // Add an instance of the player object to the game
    addPlayer(player: Player): void {
        // Check if the player is already in the game
        if (this.players.some((p) => p.id === player.id)) {
            return;
        }
        this.players.push(player);
        this.playerMap.set(player.id, player);
    }

    removePlayer(playerId: string): void {
        this.players = this.players.filter((p) => p.id !== playerId);
        this.playerMap.delete(playerId);
    }

    rebuyPlayer(playerId: string): void {

        if (!this.allowRebuys) {
            return;
        }

        const player = this.playerMap.get(playerId);

        if (!player) {
            return;
        }

        if (this.maxRebuysPerPlayer !== null && player.rebuys >= this.maxRebuysPerPlayer) {
            return;
        }

        player.moneyGiven += this.rebuyCost;
        player.rebuys += 1;
    }

    // Calculate the total pot for the main game based on the number of players playing
    calculateTotalPot(): number {
        let totalPot = 0;

        for (const player of this.players) {
            let moneyPaidForMainGame = this.buyIn;

            // If the player has rebought then add the rebuy cost for each rebuy they have made to the total money they have paid for the main game
            if (this.allowRebuys && player.rebuys > 0) {
                moneyPaidForMainGame += player.rebuys * this.rebuyCost;
            }
            totalPot += moneyPaidForMainGame;
        }

        return totalPot;
    }

    calculateTotalPotForSideGame(sideGameId: string): number {
        const sideGame = this.sideGameMap.get(sideGameId);

        if (!sideGame) {
            return 0;
        }

        let totalPot = 0;

        // loop through all of the players in this game that have selected this side game
        for (const player of this.players) {
            if (player.selectedSideGames.includes(sideGameId)) {
                totalPot += sideGame.cost;
            }
        }

        return totalPot;
    }

    // Calculate the total amunt of money a player is going to pay based on the buy in and the side games they have selected to play
    calculateTotalCostForPlayer(player: Player): number {
        let totalCost = this.buyIn;

        let addedSideGames: String[] = []
        for (const sideGameId of player.selectedSideGames) {
            let sg = this.sideGameMap.get(sideGameId);
            if (sg) {
                if (!addedSideGames.includes(sg.id)) {
                    addedSideGames.push(sg.id);
                    totalCost += sg.cost;
                }
            }
        }

        return totalCost;
    }
}

export default Game;