## SOUNCLOUD-CLONE

SoundCloud-clone is an online audio distribution platform and music sharing website that enables its users to upload, promote, and share audio. This app is a Manchester Codes projects which aims to replicate some functionalities of the largest music streaming services in the world.

## Table of Contents

1.  Features
2.  Dependencies
3.  Setup
4.  Commands
5.  Attribution

**Features**

**Dependancies**

- [react](https://reactjs.org/)
- [axios](https://www.npmjs.com/package/axios)
- [proptypes](https://www.npmjs.com/package/prop-types)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [js-cookie](https://www.npmjs.com/package/js-cookie)
- [jwt-decode](https://www.npmjs.com/package/jwt-decode)

**Dev Dependancies**

- [prettier](https://www.npmjs.com/package/prettier)
- [eslint](https://www.npmjs.com/package/eslint)

## Setup

**Install Dependancies**

1.  Clone the repo to a local file.

```
$ git clone https://github.com/ngiannotta84/soundcloud-clone.git
```

2.  Install all dependancies.

```
$ npm i
```

## Commands

```
$ npm start
```

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000/) to view it in the browser.
The page will reload if you make edits.  
You will also see any lint errors in the console.

```
$ npm test

```

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```
$ npm build

```

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

```
$ npm run lint:fix

```

Runs eslint on all files to format code.

```
$ npm run prettier

```

runs prettier on all files to formal code.

```
$ npm run predeploy

```

helps to bundle the react app. This command is run automatically when running deploy.

```
$ npm run deploy

```

Generates a production build of the app and deploys it to GitHub pages.

**Attribution**
Created by **Nicola Giannotta, Perry Baran**.
