var winston = require('winston');
var Utility = require('./Utility');

winston.emitErrs = true;

var winstonLogger = new winston.Logger({
  transports: [
    // new winston.transports.File({
    //   level: 'info',
    //   filename: './logs/all-logs.log',
    //   handleExceptions: true,
    //   json: true,
    //   maxsize: 5242880, //5MB
    //   maxFiles: 5,
    //   colorize: false
    // }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: function () {
        return new Date().toISOString();
      },
      formatter: function (options) {
        switch (options.level) {
          case 'error':
            options.message += " error : ";
            break;
          default: //debug, info
            options.message += " : ";
            break;
        }
        return winston.config.colorize(options.level, options.level.toUpperCase()) + ': ' + options.timestamp()
          + ' ' + options.message + (options.meta.body || options.meta.stack || "");
      }
    })
  ],
  exitOnError: false
});

var Logger = {
  log: function (type, tag, body) {
    if (process.env.NODE_ENV != 'test')
      winstonLogger.log(type, this.formatTag(tag), { body: this.formatObject(body) });
  },
  formatTag: function (obj) {
    if (obj.includes('/')) {
      let paths = obj.split('/');
      if (paths.includes('accounts')) {
        let pathValue = paths[paths.indexOf('accounts') + 1];
        let encryptedValue = Utility.maskString(pathValue, '*', 0, 4);
        obj = obj.replace(new RegExp(pathValue, 'g'), encryptedValue);
      }
      if (paths.includes('cards')) {
        let pathValue = paths[paths.indexOf('cards') + 1];
        let encryptedValue = Utility.maskString(pathValue, '*', 0, 4);
        obj = obj.replace(new RegExp(pathValue, 'g'), encryptedValue);
      }
    }
    return obj;
  },
  formatObject: function (obj) {
    if ((typeof obj) == 'object' && !Array.isArray(obj) && obj !== null) {
      obj = JSON.parse(JSON.stringify(obj));
      if (obj.password) {
        obj.password = '[HIDDEN]';
      }
      if (obj.account_num) {
        obj.account_num = '[HIDDEN]';
      }
      if (obj.records && Array.isArray(obj.records) && obj.records.length > 0) {
        obj.records = [];
      }
      if (obj.data && Array.isArray(obj.data) && obj.data.length > 0) {
        obj.data = [{ length: obj.data.length }];
      }
      if (obj.account_number) {
        obj.account_number = Utility.maskString(obj.account_number, '*', 0, 4);
      }
      if (obj.accountNumber) {
        obj.accountNumber = Utility.maskString(obj.accountNumber, '*', 0, 4);
      }
      if (obj.decryptedNumber) {
        obj.decryptedNumber = Utility.maskString(obj.decryptedNumber, '*', 0, 4);
      }
      if (obj.encryptedNumber) {
        obj.encryptedNumber = Utility.maskString(obj.encryptedNumber, '*', 0, 4);
      }
      if (obj.encryptData) {
        obj.encryptData = '[HIDDEN]';
      }
      if (obj.encryptedData) {
        obj.encryptedData = '[HIDDEN]';
      }
      if (obj.decryptData) {
        obj.decryptData = '[HIDDEN]';
      }
      if (obj.decryptedData) {
        obj.decryptedData = '[HIDDEN]';
      }
      obj = JSON.stringify(obj);
    }
    if (Array.isArray(obj) && obj.length > 0) {
      obj = 'Array length = ' + obj.length;
    }
    return obj;
  },
}

module.exports = Logger;

module.exports.stream = {
  write: function (message, encoding) {
    logger.info(message);
  }
};
