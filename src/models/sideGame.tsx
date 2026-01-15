export interface SideGameInterface {
    id: string;
    name: string;
    cost: number;
}

export class SideGame implements SideGameInterface {
    id: string;
    name: string;
    cost: number;

    constructor(name: string, cost:number) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.cost = cost
    }
}