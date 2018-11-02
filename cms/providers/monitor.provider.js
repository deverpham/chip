const now = require('performance-now');
const usage = require('usage');

/**
 * getHealthServer
 * @return {object}
 */
function getUsageNow() {
    const pid = process.pid
    return new Promise((resolve, reject) => {
        usage.lookup(pid, {
            keepHistory: false
        }, function (err, result) {
            if (err) {
                console.log(err)
                reject(err);
            }
            var memory = Math.floor(result.memory / 1000000)
            var cpu = result.cpu;
            resolve({
                memory,
                cpu
            })
        });
    })
}
/**
 * A Module to check Performance
 */
class Monitor {
    constructor(healthCheck = false) {
        this.healthCheck = healthCheck
    }
    async _listenHealth() {
        try {
            const info = await getUsageNow();
            this.previousHealth = info
        } catch (err) {
            console.error(err);
        }
    }
    async start() {
        this.startPoint = now();
        if (this.healthCheck) {
            await this._listenHealth();
        }
    }
    /**
     * Report Performance
     * @return {object}
     */
    async analytic() {
        const totalTime = now() - this.startPoint;
        const lastHealth = await getUsageNow();
        if (this.previousHealth) {
            return {
                totalTime,
                memory: lastHealth.memory - this.previousHealth.memory,
                cpu: lastHealth.cpu - this.previousHealth.cpu
            }
        }
        return {
            totalTime
        }

    }
}
module.exports = Monitor