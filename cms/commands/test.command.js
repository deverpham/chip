const program = require('commander');
const exec = require('shell-exec')
const exectSh = require('exec-sh');
const createTestFile = require('./functions/create_test_file.js');
program
    .version('0.1.2')
    .description('Node Testing Tool')
program
    .action((file, type) => {
        if (!file || typeof file === 'object') {
            console.log('missing file path')
            return;
        }
        if (!type || typeof type === 'object') type = 'text'
        console.log(`nyc --reporter=${type} --report-dir ./coverage mocha ` + file)
        exectSh(`nyc --report-dir ./coverage --reporter=${type} mocha  ` + file, {

        }, err => {
            if (err) {
                console.log("Exit code: ", err.code);
            }
        })
        if (type == 'html') {
            console.log('serve coverage')
            exectSh(`serve coverage`, res => {
                console.log(res)
            })
        }
    })
program
    .command('g')
    .description('generate all test file for js')
    .action(createTestFile)
program.parse(process.argv)