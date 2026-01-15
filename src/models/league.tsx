
export interface LeagueInterface {
    id: string;
    name: string;
    games: string[];
}

export class League implements LeagueInterface { 
    id: string;
    name: string;
    games: string[];

    constructor(name: string, games: string[]) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.games = games;
    }

    public addGame = (gameId: string) => {
        this.games.push(gameId);
    }
}