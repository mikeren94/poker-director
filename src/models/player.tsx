export interface PlayerInterface {
    id: string;
    name: string;
    email: string | null;
}

export class Player implements PlayerInterface { 
    id: string;
    name: string;
    email: string | null;
    
    constructor(name: string, email: string | null = null) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.email = email;
    }
}