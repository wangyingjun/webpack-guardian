
const getProdWebpackConfig = require('../config/webpack.build.config');
const mergeConfig = require('./mergeConfig')


module.exports = (config) => {
    if(Array.isArray(config)){
        return config.map( itemConfig => mergeConfig(itemConfig, getProdWebpackConfig(itemConfig)))
    }

    return mergeConfig(config, getProdWebpackConfig(config))
};