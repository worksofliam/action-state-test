const core = require('@actions/core');
const wait = require('./wait');
const randomFile = require(`./randomFile`);

// most @actions toolkit packages have async methods
async function run() {
  try {
    core.info(`Hello world ${randomFile.someData}`);

    if (randomFile.someData) {
      core.info(`We have data: ${randomFile.someData}`);
    } else {
      randomFile.someData = `Hello world`;
      core.info(`No data. Setting some`);
    }

    const ms = core.getInput('milliseconds');
    core.info(`Now waiting ${ms} milliseconds ...`);

    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    await wait(parseInt(ms));
    core.info((new Date()).toTimeString());

    core.setOutput('time', new Date().toTimeString());

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
