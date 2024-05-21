# Basic One-Way Example

This example demos a basic host application loading remote component.

- `app1` is the host application.
- `app2` standalone application which exposes `Button` component.

Both applications share the lodash dependency.

The idea is that it should be possible to pre-load all the remotes and get the remote to initialize with the higher version of lodash available in any remote.

Right now this demo is not working due to this issue when calling `loadShare`: `TypeError: shareInfoRes.get is not a function`

# Running Demo

Open two terminals, run `npm ci` and `npm run start` in each of this folders:

- `app1`
- `app2`

*Note: Not using `pnpm` because it was not an easy task to install two different versions of lodash but keep the package.json files "compatible" with any version*

- [localhost:3001](http://localhost:3001/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)
