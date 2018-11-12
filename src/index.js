const express = require('express');
const parseDashboard = require('parse-dashboard');

module.exports = (sails) => {
  return {
    configure: function () {

      sails.log.info('sails.hook.parseDashboard:configure:started');

      if (!sails.config.parseDashboard) {

        const help = `
        {
          mountPath: '/dashboard',
          parseDashboardConfig: {
            config: {
              apps: [],
              users: [],
              ..
            },
            options: {
              ...
            }
          }
        }
        `;

        sails.log.warn('sails-hook-parse-dashboard configure is skipped because config \'sails.config.parseDashboard\' is missing!\n\nSample of \'sails.config.parseDashboard\' is:\n' + help + '\nSetup instructions for \'parseDashboardConfig\' are available here:\nhttps://github.com/parse-community/parse-dashboard\n');

        return;
      }

      // Custom middleware should be added before `session` middleware to avoid error:
      // 'TypeError: req.session.touch is not a function'
      sails.config.http.middleware.order.unshift('parseDashboard');

      // Configure dashboard from config/parse-dashboard.js
      const parseDashboardConfig = sails.config.parseDashboard.parseDashboardConfig;

      // Get parse dashboard instance
      const parseDashboardInstance = parseDashboard(parseDashboardConfig);

      // Wrap the dashboard routes with prefix (Express application)
      const parseDashboardAppWrapper = express();
      parseDashboardAppWrapper.use(sails.config.parseDashboard.mountPath, parseDashboardInstance);

      // Set the Parse Dashboard wrapper (Express application) as global Sails.js middleware
      sails.config.http.middleware['parseDashboard'] = parseDashboardAppWrapper;

      sails.log.info('sails.hook.parsedashboard:configure:finished');
    }
  };
}