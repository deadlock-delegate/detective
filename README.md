# Ark Detective Plugin

This plugin logs all incoming requests made to P2P and API plugins.

⚠️ This plugin logs a lot of messages ⚠️

Due to logging a lot of things we suggest you modify the settings for the winston logger otherwise
you might not have logs that will be few days old.

## Installation

### Clone

```bash
cd ~/ark-core/plugins
git clone https://github.com/deadlock-delegate/detective
lerna bootstrap
```

### Registration

Open `~/.ark/config/plugins.js` and add the following at the end (it has to be bellow p2p and api).

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

No configuration is needed.

## Credits

- [roks0n](https://github.com/roks0n)
- [All Contributors](../../../../contributors)

## License

[MIT](LICENSE) © roks0n
