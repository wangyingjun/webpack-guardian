#!/usr/bin/env node
switch (process.argv[2]) {
    case 'dev':
        require('../src/dev')();
        break;
    case 'build':
        require('../src/build')();
        break;
    default:
    
}