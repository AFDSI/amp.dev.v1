# amp.dev.v1

## Fork & clone the repository

Install dependencies via NPM:

```sh
$ cd amp.dev
$ npm install
```

## Develop

Bootstrap local environment.
Set a valid [GitHub access token](https://github.com/settings/tokens) in an environment variable named `AMP_DOC_TOKEN`

This command enables import from GitHub to run flawlessly. Import occurs by running following command.

```sh
$ npm run bootstrap
```

**Tip**: Due to bad network conditions or GitHub's API rate-limiting there might be errors during import.
Try running the above command with the `-- --queue-imports` flag to prevent them.

Start developing in local environment with command below.
Task will take care of building and copying all files, watching them for changes, and rebuilding them when needed.
Beware that changes to the [Express](https://expressjs.com/) backend require the Gulp task to be restarted.

```sh
$ npm run develop
```

This command prints to shell and will most likely end on `Server ready. Press ctrl-c to quit.`.
Seeing this line means everything went fine so far unless otherwise stated in the logs; the site should be available at [http://localhost:8080/](http://localhost:8080/). Service running on port `8081` is only Grow rendering the pages.

## Maintenance

### Documents

Made changes to a lot of Grow documents at once and not quite sure if all references are still valid?
You can run `npm run lint:grow` to pick up broken ones.

### Run a test build

To run a local test build that does all the minifying and vends the static pages instead of proxying them through to Grow you can run:

```sh
$ npm run build:local
$ npm run start:local
```

**Tip**: For more rapid local testing, it may be preferable to only build a subset of specified locales.
Run the following command with `--locales` being a comma seperated list of locale abbreviations you want to build, e.g. `en,fr` or even just `en`.

```sh
npm run build:local -- --locales <list of locales>
```

## Build

**Caution**: starting a build will automatically clean all locations of possible remainings from previous builds.
Make sure you don't have anything there that you want to keep - additionally check your working copy for eventual unintended local changes.

```sh
npm run build:local -- --locales <list of locales>
```

To perform a build run following command with `--env` being one of the following valid environments: `development`, `local`, `staging` or `production`:

```sh
$ npx gulp build --env <environment>
```

## Deployment

The amp.dev site uses GitHub Actions for automated deployments to both staging and production environments.

### Deployment Environments

- **Staging**:
- **Production**:

### How to Deploy

Deployments are triggered through GitHub Actions workflows:

1. **Staging Deployment**: 
   - Triggered automatically on pushes to `main` branch
   - Automatically builds and deploys to staging environment
   - View workflow status with "Staging" badge at top of this README

2. **Production Deployment**:
   - **Manual deployment only** - no automatic triggers
   - Must be manually triggered through GitHub Actions

### Manual Deployment

To manually trigger a deployment (required for production):

1. Navigate to [deploy workflow](https://github.com/ampproject/amp.dev/actions/workflows/deploy.yaml) in GitHub actions tab.
2. Click "Run workflow" and choose branch you want to deploy
3. Confirm the deployment

**Note**: Ensure changes have been properly tested in staging environment before deploying to production.

