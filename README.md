[![Stories in Ready](https://badge.waffle.io/triplefingers/D7.png?label=ready&title=Ready)](https://waffle.io/triplefingers/D7)
[![Build Status](https://travis-ci.org/triplefingers/D7.svg?branch=master)](https://travis-ci.org/triplefingers/D7)

# D7
Do something every single day

# Preparation
All you have to do is npm install
- > npm install


# How to start
## When you start for the first time
- At the very first, You have to transpile ES6 written Javascript files. Run gulp and you will get bundled file of client-side-files in client/, and babel-transpiled file of server-side-files in build/. Then, nodemon automatically starts build/server.js.
  - > npm run gulp

## If you have run 'gulp' before
- If you have changes in client-side-files, do as below and it will bundle all Javascript files in client/. Then attach watcher on clinet/ and this will automatically re-bundle the files when there is any change in client-side-files.
  - > npm run webpack-watch

- If you have changes in server-side-files, run gulp again and this will work as same as above.
  - > npm run gulp

## If you want to use react-hot-loader
- You can use react-hot-loader on client-side-files in client/.
  - > npm run webpack-hot
- Aware: This cannot interact with server.

## If you just want to run server and you already transpiled client && server-side files
- start with transpiled 'build/server.js' using node
  - > npm start

## Aware
- 'npm run gulp' is same as 'gulp' because they use the same gulpfile.js in root.

## Eslint with gulp
- Can be executed with 'npm run gulp eslint' or 'gulp eslint' (latter needs 'gulp' in global)
- 'npm run gulp' also checks synthax error with eslint in cases below :
  - not indented with 2 spaces
  - not ended with semi-colons
  - not wrapped with double-quotes
