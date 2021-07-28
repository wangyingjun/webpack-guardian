const getDevWebpackConfig = require('../config/webpack.dev.config');
const mergeConfig = require('./mergeConfig')


module.exports = (config) => {
    if(Array.isArray(config)){
        return config.map( itemConfig => mergeConfig(itemConfig, getDevWebpackConfig(itemConfig)))
    }

    return mergeConfig(config, getDevWebpackConfig(config))
};
