import { v4 as uuidv4 } from 'uuid';

// Side games for a specific poker game, e.g. "High hand", "Knockouts"
class SideGame {
    id: string;
    name: string;
    cost: number;

    constructor(name: string, cost: number) {
        this.id = uuidv4();
        this.name = name;
        this.cost = cost;
    }
}

export default SideGame;