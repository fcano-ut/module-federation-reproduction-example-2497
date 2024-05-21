import { init, loadShare, preloadRemote } from '@module-federation/enhanced/runtime';

async function preloadApp() {
  init({
    name: 'app1',
    remotes: [{
      name: 'app2',
      entry: 'http://localhost:3002/mf-manifest.json',
    }]
  });

  try {
    await preloadRemote([{
      nameOrAlias: 'app2',
      depsRemote: [
        {nameOrAlias: 'lodash'},
      ],
    }]);
  } catch (e) {
    console.error(`Error pre-loading app2:`, e);
  }

  try {
    await loadShare('lodash');
  } catch (e) {
    console.error(`Error loading share lodash:`, e);
  }
}


preloadApp()
  .then(() => {
    import('./bootstrap');
  });
