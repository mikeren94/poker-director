export interface GamePlayerInterface {
    playerId: string;
    knockedOutBy: string | null;
    knockouts: number;
    sideGames: string[];
    buyIns: number;
    totalPaid: number;
    changeGiven: boolean;
}

export class GamePlayer implements GamePlayerInterface { 
    playerId: string;
    knockedOutBy: string | null;
    sideGames: string[] = [];
    knockouts: number;
    buyIns: number = 1;
    totalPaid: number = 0;
    changeGiven: boolean = false;
    
    constructor(
        playerId: string, 
        knockedOutBy: string | null = null, 
    ) {
        this.playerId = playerId;
        this.knockedOutBy = knockedOutBy;
        this.knockouts = 0;
    }

    public optIntoSideGame = (sideGameId: string) => {
        this.sideGames.push(sideGameId);
    }

    public optOutOfSideGame = (sideGameId: string) => {
        this.sideGames = this.sideGames.filter(sideGame => sideGame !== sideGameId);
    }

    public incrementKnockouts = () => {
        this.knockouts++;
    }

    public addPayment = (amount: number) => {
        this.totalPaid += amount;
    }

    public addRebuy = () => {
        this.buyIns++;
    }
}