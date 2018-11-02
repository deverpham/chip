const chalk = require('chalk');
const prettyError = require('pretty-error');
const pe = new prettyError();
const path = require('path');
pe.filter(function (traceLine, lineNumber) {
    if (lineNumber == 1 && true &&
        traceLine
            .shortenedAddr
            .indexOf(path.join(__filename)) == -1)
        cpLog(chalk.gray('log at:', traceLine.shortenedAddr))
})
class Logger {
    debug(...message) {

        const mark = new Error();
        pe.render(mark)
        if (message.length == 1 && typeof message === 'object') return cpLog(this.color('white', 'debug: '), message[0])
        return cpLog('debug: ', chalk.white(...message))
    }
    log(...message) {

        const mark = new Error();
        pe.render(mark)
        if (!this) {
            const logger = new Logger();
            return logger.debug(...message);
        }
        return this.debug(...message)
    }
    warn(...message) {

        const mark = new Error();
        pe.render(mark)
        if (message.length == 1 && typeof message === 'object') return cpLog(this.color('yellow', 'warn: '), message[0])
        cpLog('warn: ', chalk.yellow(...message))
    }

    error(...message) {

        const mark = new Error();
        pe.render(mark)
        if (message.length == 1 && typeof message === 'object') return cpLog(this.color('red', 'error: '), message[0])
        cpLog('error: ', chalk.red(...message))
    }
    color(colorHex, ...message) {
        //console.log(pe.render(mark))
        return chalk[colorHex](...message)
    }
}
module.exports = new Logger();