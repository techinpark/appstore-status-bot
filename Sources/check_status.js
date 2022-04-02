const slack = require("./slack.js");
const exec = require("child_process").exec;
const dirty = require("dirty");
const { Octokit, App } = require("octokit");
const request = require("request-promise-native");
const { prependOnceListener } = require("process");
const fs = require("fs").promises;
const env = Object.create(process.env);
const octokit = new Octokit({ auth: `token ${process.env.GH_TOKEN}` });

const main = async () => {
  await getGist();

  exec(
    "ruby Sources/fetch_app_status.rb",
    { env: env },
    function (err, stdout, stderr) {
      if (stdout) {
        var apps = JSON.parse(stdout);
        console.log(apps);
        for (let app of apps) {
          checkVersion(app);
        }
      } else {
        console.log("There was a problem fetching the status of the app!");
        console.log(stderr);
      }
    }
  );
};

const checkVersion = async (app) => {
  var appInfoKey = "appInfo-" + app.appID;
  var submissionStartKey = "submissionStart" + app.appID;

  const db = dirty("store.db");
  db.on("load", async function () {
    var lastAppInfo = db.get(appInfoKey);
    if (!lastAppInfo || lastAppInfo.status != app.status) {
      console.log("[*] status is different");
      slack.post(app, db.get(submissionStartKey));

      if (app.status == "Waiting For Review") {
        db.set(submissionStartKey, new Date());
      }
    } else {
      console.log("[*] status is same");
    }

    db.set(appInfoKey, app);

    try {
      const data = await fs.readFile("store.db", "utf-8");
      await updateGist(data);
    } catch (error) {
      console.log(error);
    }
  });
};

const getGist = async () => {
  const gist = await octokit.rest.gists
    .get({
      gist_id: process.env.GIST_ID,
    })
    .catch((error) => console.error(`[*] Unable to update gist\n${error}`));
  if (!gist) return;

  const filename = Object.keys(gist.data.files)[0];
  const rawdataURL = gist.data.files[filename].raw_url;

  const options = {
    url: rawdataURL,
  };

  const result = await request.get(options);
  try {
    await fs.writeFile("store.db", result);
    console.log("[*] file saved!");
  } catch (error) {
    console.log(error);
  }
};

const updateGist = async (content) => {
  const gist = await octokit.rest.gists
    .get({
      gist_id: process.env.GIST_ID,
    })
    .catch((error) => console.error(`[*] Unable to update gist\n${error}`));
  if (!gist) return;

  const filename = Object.keys(gist.data.files)[0];
  await octokit.rest.gists.update({
    gist_id: process.env.GIST_ID,
    files: {
      [filename]: {
        content: content,
      },
    },
  });
};

main();
