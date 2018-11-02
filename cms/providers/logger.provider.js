const chalk = require('chalk');
const prettyError = require('pretty-error');
const pe = new prettyError();
const path = require('path');
pe.filter(function (traceLine, lineNumber) {
    if (typeof cpLog == 'undefined') {
        global.cpLog = console.log
    }
    if (lineNumber == 1 && true &&
        traceLine.shortenedAddr != null &&
        traceLine
        .shortenedAddr
        .indexOf(path.join(__filename)) == -1)
        cpLog(chalk.gray('log at:', traceLine.shortenedAddr))
})
class Logger {
    debug(...message) {
        const COLOR = 'white';
        const ALIAS = 'debug: ';
        const mark = new Error();
        pe.render(mark)
        if (message.length == 1 && typeof message[0] === 'object') {
            return cpLog(this.color(COLOR, ALIAS), message[0])
        } else {
            if (message.length == 1) {
                return cpLog(this.color(COLOR, ALIAS), this.color(COLOR, message[0]))
            }
            var result = ''
            message.map(message => {
                const proxy = typeof message === 'object' ? '\n' + JSON.stringify(message, null, 2) : message
                result += this.color(COLOR, proxy)
            });

            cpLog(this.color(COLOR, ALIAS), this.color(COLOR, result))
        }
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
        const COLOR = 'yellow';
        const ALIAS = 'warn: ';
        const mark = new Error();
        pe.render(mark)
        if (message.length == 1 && typeof message[0] === 'object') {
            return cpLog(this.color(COLOR, ALIAS), message[0])
        } else {
            if (message.length == 1) {
                return cpLog(this.color(COLOR, ALIAS), this.color(COLOR, message[0]))
            }
            var result = ''
            message.map(message => {
                const proxy = typeof message === 'object' ? '\n' + JSON.stringify(message, null, 2) : message
                result += this.color(COLOR, proxy)
            });

            cpLog(this.color(COLOR, ALIAS), this.color(COLOR, result))
        }
    }

    info(...message) {
        const COLOR = 'cyan';
        const ALIAS = 'info: ';
        const mark = new Error();
        pe.render(mark)
        if (message.length == 1 && typeof message[0] === 'object') {
            return cpLog(this.color(COLOR, ALIAS), message[0])
        } else {
            if (message.length == 1) {
                return cpLog(this.color(COLOR, ALIAS), this.color(COLOR, message[0]))
            }
            var result = ''
            message.map(message => {
                const proxy = typeof message === 'object' ? '\n' + JSON.stringify(message, null, 2) : message
                result += this.color(COLOR, proxy)
            });

            cpLog(this.color(COLOR, ALIAS), this.color(COLOR, result))
        }
    }

    error(...message) {
        const COLOR = 'red';
        const ALIAS = 'error: ';
        const mark = new Error();
        pe.render(mark)
        if (message.length == 1 && typeof message[0] === 'object') {
            return cpLog(this.color(COLOR, ALIAS), message[0])
        } else {
            if (message.length == 1) {
                return cpLog(this.color(COLOR, ALIAS), this.color(COLOR, message[0]))
            }
            var result = ''
            message.map(message => {
                const proxy = typeof message === 'object' ? '\n' + JSON.stringify(message, null, 2) : message
                result += this.color(COLOR, proxy)
            });

            cpLog(this.color(COLOR, ALIAS), this.color(COLOR, result))
        }
    }

    success(...message) {
        const COLOR = 'magenta';
        const ALIAS = 'success: ';
        const mark = new Error();
        pe.render(mark)
        if (message.length == 1 && typeof message[0] === 'object') {
            return cpLog(this.color(COLOR, ALIAS), message[0])
        } else {
            if (message.length == 1) {
                return cpLog(this.color(COLOR, ALIAS), this.color(COLOR, message[0]))
            }
            var result = ''
            message.map(message => {
                const proxy = typeof message === 'object' ? '\n' + JSON.stringify(message, null, 2) : message
                result += this.color(COLOR, proxy)
            });

            cpLog(this.color(COLOR, ALIAS), this.color(COLOR, result))
        }
    }
    color(colorHex, ...message) {
        //cpLog(pe.render(mark))
        return chalk[colorHex](...message)
    }
}
module.exports = Logger