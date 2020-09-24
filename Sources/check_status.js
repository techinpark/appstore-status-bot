var exec = require("child_process").exec; 

exec('ruby get-app-status.rb', function (err, stdout, stderr) {
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