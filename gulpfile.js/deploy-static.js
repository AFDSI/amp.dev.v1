'use strict';

const {sh} = require('@lib/utils/sh.js');
const {cyan, red} = require('ansi-colors');
const {DIST, PAGES_DEST} = require('@lib/utils/project').paths;
const {NETLIFY_DEPLOY_TOKEN, DEPLOY_ENVIRONMENT} = process.env;

/** @typedef {'Staging' | 'Production'} DeploymentEnvironmentsDef */
/** @typedef {{name: string, id: string, dir: string}} DeploymentSiteDef */
/** @typedef {Record<DeploymentEnvironmentsDef, DeploymentSiteDef[]>} DeploymentConfigDef */

// Which deploy environment to use if the env variable is not set.
const DEFAULT_DEPLOY_ENVIRONMENT = 'Staging';

/** @type {DeploymentConfigDef} */
const SITES = {
  'Staging': [
    {
      name: 'bucolic-cat-e1baea.netlify.app',
      id: '69bbcc85-2aad-4a49-be6f-b6caef14bf1a',
      dir: PAGES_DEST,
    },
    {
      name: 'playground-challangerdeep.netlify.app',
      id: '71c6686d-ddf3-4be3-9f98-b716bd372a13',
      dir: `${DIST}/playground`,
    },
  ],
  'Production': [
    {
      name: 'amp.dev',
      id: 'e571c70e-d23f-4cbf-ac4e-802bb08e5261',
      dir: PAGES_DEST,
    },
    {
      name: 'playground.amp.dev',
      id: 'acead270-9404-4dde-81e4-aec0e6884869',
      dir: `${DIST}/playground`,
    },
    {
      name: 'preview.amp.dev',
      id: 'caf28d42-024a-4efb-b266-b00cf10847a3',
      dir: `${DIST}/examples`,
    },
  ],
};

async function staticDeploy() {
  const deployEnvironment = DEPLOY_ENVIRONMENT ?? DEFAULT_DEPLOY_ENVIRONMENT;
  if (!(deployEnvironment in SITES)) {
    console.error(
      red('Deploy environment'),
      cyan(deployEnvironment),
      red('was specified but is not a valid environment')
    );
    console.info('Valid environments are:', Object.keys(SITES));
    process.exit(1);
  }

  for (const {name, id, dir} of SITES[deployEnvironment]) {
    console.log('Deploying', cyan(dir), 'to', cyan(name));

    await sh(
      `npx netlify deploy --prod --auth ${NETLIFY_DEPLOY_TOKEN} --dir ${dir} --site ${id}`,
      {workingDir: dir}
    );
  }
}

exports.staticDeploy = staticDeploy;
