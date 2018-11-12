# sails-hook-parse-dashboard

Sails hook for integrating [Parse Dashboard](https://github.com/parse-community/parse-dashboard)

## Getting Started

Install it via npm:

```shell
npm install sails-hook-parse-dashboard
```

Configure `config/parse-dashboard.js` in your project:

```javascript
module.exports.parseDashboard = {

  mountPath: '/dashboard',

  parseDashboardConfig: {
    config: {
      apps: [
        ...
      ],
      users: [
        ...
      ],
      useEncryptedPasswords: true || false,
      trustProxy: true || false
      ...
    },

    options: {
      allowInsecureHTTP: true || false,
      ...
    }
  }
};
```

`mountPath` is routes prefix for Express middleware  
`parseDashboardConfig` is configuration object for Parse Dashboard  

Setup instructions for `parseDashboardConfig` are available here https://github.com/parse-community/parse-dashboard

## License

[MIT](./LICENSE)