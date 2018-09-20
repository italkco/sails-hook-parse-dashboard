const express = require('express');
const parseDashboard = require('parse-dashboard');

module.exports = (sails) => {
  return {
    configure: function () {

      if (!sails.config.parseDashboard) {

        const help = `
        {
          mountPath: '/dashboard',
          config: {
            apps: [],
            users: [],
            ..
          },
          options: {
            ...
          }
        }
        `;

        sails.log.warn('sails-hook-parse-dashboard configure is skipped because config \'sails.config.parseDashboard\' is missing!\n\nSample of \'sails.config.parseDashboard\' is:\n' + help + '\nAvailable \'config\' and \'options\' are available here:\nhttps://github.com/parse-community/parse-dashboard\n');

        return;
      }

      // Custom middleware should be added before `session` middleware to avoid error:
      // 'TypeError: req.session.touch is not a function'
      sails.config.http.middleware.order.unshift('parseDashboard');

      // Configure dashboard from config/parse-dashboard.js
      const config = sails.config.parseDashboard.config;
      const options = sails.config.parseDashboard.options;

      // Get dashboard instance (Express application)
      const dashboard = parseDashboard(config, options);

      // Wrap the dashboard routes with prefix
      const dashboardAppWrapper = express();
      dashboardAppWrapper.use(sails.config.parseDashboard.mountPath, dashboard);

      sails.config.http.middleware['parseDashboard'] = dashboardAppWrapper;
    }
  };
}