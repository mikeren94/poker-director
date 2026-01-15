import { GamePlayer } from "./gamePlayer";
import type { Knockout } from "./knockout";
import { SideGame } from "./sideGame";

export interface GameInterface {
    id: string;
    name: string;
    date: Date;
    players: GamePlayer[];
    leagueId: string | null;
    sidegames: SideGame[];
    knockouts: Knockout[];
    buyIn: number;

    // Methods
    addPlayer(player: GamePlayer): void;
    addSideGame(sideGame: SideGame): void;
    removeSideGame(sideGameId: string): void;
    recordKnockOut(killerId: string, victimId: string): void;
    rebuy(playerId: string): void;
    calculatePlayerCost(playerId: string): number;
    calculateChange(playerId: string): number;
}


export class Game implements GameInterface {
    id: string;
    name: string;
    date: Date;
    players: GamePlayer[] = [];
    leagueId: string | null = null;
    sidegames: SideGame[] = [];
    knockouts: Knockout[];
    buyIn: number = 0;

    constructor(name: string, date: Date) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.date = date;
        this.knockouts = [];
    }

    public addPlayer = (player: GamePlayer) => {
        this.players.push(player);
    }

    public addSideGame = (sideGame: SideGame) => {
        this.sidegames.push(sideGame);
    }

    public removeSideGame = (sideGameId: string) => {
        this.sidegames = this.sidegames.filter(sideGame => sideGame.id !== sideGameId);
    }

    public recordKnockOut = (killerId: string, victimId: string) => {
        const victim = this.findGamePlayer(victimId);
        const killer = this.findGamePlayer(killerId);

        if (!victim) {
            throw new Error(`Victim with id ${victimId} not found in this game`);
        }

        if (!killer) {
            throw new Error(`Killer with id ${killerId} not found in this game`);
        }

        victim.knockedOutBy = killerId;
        killer.incrementKnockouts();
    }

    private findGamePlayer = (playerId: string): GamePlayer | undefined => {
        return this.players.find(p => p.playerId === playerId);
    }

    public rebuy = (playerId: string) => {
        const gp = this.players.find(p => p.playerId === playerId);
        if (!gp) throw new Error("Player not found in game");

        gp.addRebuy();
    }

    public calculatePlayerCost = (playerId: string): number => {
        const gp = this.players.find(p => p.playerId === playerId);
        if (!gp) throw new Error("Player not found in game");

        const buyInCost = this.buyIn * gp.buyIns;

        const sideGameCost = gp.sideGames
            .map(id => this.sidegames.find(sg => sg.id == id)?.cost || 0)
            .reduce((a, b) => a + b, 0);

        return buyInCost + sideGameCost;
    }

    public calculateChange = (playerId: string): number => {
        const gp = this.players.find(p => p.playerId === playerId);
        if (!gp) throw new Error("Player not found in game");

        const cost = this.calculatePlayerCost(playerId);
        if (cost <= 0) {
            gp.changeGiven = true;
        }
        return gp.totalPaid - cost;
    }
}