const Logger = require('./logger.provider');
const logger = new Logger();

logger.info('hello')
const person = {
    name: {
        l: 'pham',
        f: 'thinh'
    },
    age: 30
}
logger.info(person);
logger.info('howa reyou |', 'today |', person)