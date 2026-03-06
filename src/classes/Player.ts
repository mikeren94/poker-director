import {v4 as uuidv4} from 'uuid';

// An instance of a player in a game.
class Player {
    id: string;
    name: string; // Name of the player
    moneyGiven: number; // The ammount of money they have given to the director (We will calculate the change owed based on this and the buy in cost of the game)
    selectedSideGames: string[]; // Array of side game ids 
    paid: boolean; // Determine if the player has paid their buy in yet, we know not to calculate change until they have
    changeOwed: number; // Ammount of money the player is owed in change after they have paid
    changeGiven: boolean; // Determines if the player has been given their change
    rebuys: number; // Amount of times the player has rebought into the game

    constructor(
        name: string, 
        moneyGiven: number = 0, 
        selectedSideGames: string[] = [], 
        paid: boolean = false, 
        changeOwed: number = 0, 
        changeGiven: boolean = false,
        rebuys: number = 0
    ) {
        this.id = uuidv4();
        this.name = name;
        this.moneyGiven = moneyGiven;
        this.selectedSideGames = selectedSideGames;
        this.paid = paid;
        this.changeOwed = changeOwed;
        this.changeGiven = changeGiven;
        this.rebuys = rebuys;
    }
}

export default Player;