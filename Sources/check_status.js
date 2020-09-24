var exec = require("child_process").exec; 
var env = Object.create(process.env);

exec('ruby fetch_app_status.rb', {env : env}, function (err, stdout, stderr) {
    if (stdout) {
        //console.log(stdout)
        var versions = JSON.parse(stdout);
        console.log(versions)
    }
    else {
        console.log("There was a problem fetching the status of the app!");
        console.log(stderr);
    }
});