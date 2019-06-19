# Ark Detective Plugin

This plugin logs all incoming requests made to P2P and API plugins.

⚠️ This plugin logs a lot of messages ⚠️

Due to logging a lot of things we suggest you modify the settings for the winston logger otherwise
you might not have logs that will be few days old.

## Installation

#### For production:

`yarn global add @deadlock-delegate/detective`

#### For development:
```bash
cd ~/ark-core/plugins
git clone https://github.com/deadlock-delegate/detective
lerna bootstrap
```

### Registration

Open `~/.config/ark-core/{mainnet|devnet|testnet}/plugins.js` and add the following at the end (it has to be bellow p2p and api).

```js
'@deadlock/detective': {}
```

like so:

```js
module.exports = {
  '@arkecosystem/core-event-emitter': {},
  '@arkecosystem/core-config': {},
  ...
  '@deadlock/detective': {},  // this is the newly added line
}
```

### Configuration

```js
module.exports = {
  '@arkecosystem/core-event-emitter': {},
  '@arkecosystem/core-config': {},
  ...
  '@deadlock/detective': {
    enabled: true, // disable/enable the plugin (default: true)
    api: false, // include api request logs (default: true)
    excludeIPs: ['127.0.0.1'], // exclude requests from these IPs (default: [])
    headers: false, // log the headers (default: true)
    p2p: false, // include p2p request logs (default: true)
    payload: false, // log the POST/PUT/PATCH payloads (default: true)
    requestID: true, // show the requestID (default: false)
  },
}
```

## Credits

- [roks0n](https://github.com/roks0n)
- [dmvt](https://github.com/dmvt)
- [All Contributors](../../../../contributors)

## License

[MIT](LICENSE) © roks0n
