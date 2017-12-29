# Coin Tracker

Track :money_with_wings: in your menu bar.

# Running Coin Tracker

1. Run `npm install` to install dependencies
1. Run `git submodule update --init --recursive` to install submodule required for icons
1. Run `yarn start` to start the coin tracker application in development mode.

# Production Builds

This project uses
[electron\_-builder](https://github.com/badams/electron-builder) to build `.app`
releases.

1. Set `GH_TOKEN` in your terminal.
1. Run `yarn release` to create a full release that is pushed to Github.

To test a release you can use `yarn run pack` to create a production build that
is not pushed to Github.

## Screenshots

![coin-tracker screenshot](https://user-images.githubusercontent.com/342554/34344394-7e18e318-e9b3-11e7-89f4-9de5a2bbfbd1.png)
