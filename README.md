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
};
```

`mountPath` is routes prefix for Express middleware  
`config` is config parameter for Parse Dashboard  
`options` is options parameter for Parse Dashboard  

Available `config` and `options` are available at https://github.com/parse-community/parse-dashboard

## License

[MIT](./LICENSE)