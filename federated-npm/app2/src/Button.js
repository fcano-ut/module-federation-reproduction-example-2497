import React from 'react';
import lodashPackageJson from 'lodash/package.json';

const Button = () => <button>
  App 2 Button
  - Lodash version {lodashPackageJson.version}  
</button>;

export default Button;
