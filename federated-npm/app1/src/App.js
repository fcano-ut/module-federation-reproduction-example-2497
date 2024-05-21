import React from 'react';
import { loadRemote } from '@module-federation/enhanced/runtime';
import lodashPackageJson from 'lodash/package.json'

const RemoteButton = React.lazy(() => loadRemote('app2/Button'));

const App = () => (
  <div>
    <h1>Basic Host-Remote</h1>
    <h2>App 1</h2>
    <p>Lodash version {lodashPackageJson.version}</p>
    <React.Suspense fallback="Loading Button">
      <RemoteButton />
    </React.Suspense>
  </div>
);

export default App;
