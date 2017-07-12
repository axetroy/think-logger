const Base = require('./base');

module.exports = class DateFileLogger extends Base {
  constructor(config, clusterMode) {
    super(config);

    const lConfig = Object.assign({}, config);
    // eslint-disable-next-line prefer-const
    let {level, filename, pattern, alwaysIncludePattern, absolute, layouts} = lConfig;
    level = level ? level.toUpperCase() : 'ALL';

    // combine config for date file appender, common config for log4js
    config = Object.assign({
      appenders: [
        {type: 'dateFile', level, filename, pattern, alwaysIncludePattern, absolute, layouts}
      ]
    }, lConfig);

    // check cluster mode
    config = this.isCluster(config, clusterMode);

    this._logger = this.getLogger(config);
  }
};
