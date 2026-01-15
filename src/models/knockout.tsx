export interface KncokoutInterface {
    id: string;
    killerId: string;
    victimId: string;
    time: Date | null;
}

export class Knockout implements KncokoutInterface { 
    id: string;
    killerId: string;
    victimId: string;
    time: Date | null;

    constructor(killerId: string, victimId: string) {
        this.id = crypto.randomUUID();
        this.killerId = killerId;
        this.victimId = victimId;
        this.time = new Date();
    }
}