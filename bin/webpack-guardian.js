#!/usr/bin/env node
const path = require('path')
const { existsSync } = require('fs');
//process.argv [xxx, xxx, -t, configfilepath]
const configFilePath = path.resolve(process.cwd(), process.argv[4] || '.webpackrc.js')
let config = null;
if(existsSync(configFilePath)){
    config = require(configFilePath);
}
switch (process.argv[2]) {
    case 'dev':
        require('../src/dev')({config});
        break;
    case 'build':
        require('../src/build')({config});
        break;
    default:

}
