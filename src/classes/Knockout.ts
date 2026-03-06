class Knockout {
    killerId: string;
    victimId: string;
    timestamp: Date;

    constructor (
        killerId: string,
        victimId: string,
        timestamp: Date = new Date()
    ) {
        this.killerId = killerId,
        this.victimId = victimId,
        this.timestamp = timestamp
    }
}

export default Knockout;