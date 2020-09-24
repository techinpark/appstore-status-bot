var exec = require("child_process").exec; 
var dirty = require('dirty');
var db = dirty('store.db');

var env = Object.create(process.env);

exec('ruby Sources/fetch_app_status.rb', {env : env}, function (err, stdout, stderr) {
    if (stdout) {
        //console.log(stdout)
        var app = JSON.parse(stdout);
        checkVersion(app);
    }
    else {
        console.log("There was a problem fetching the status of the app!");
        console.log(stderr);
    }
});


function checkVersion(app) {

    var appInfoKey = "appInfo-" + app.appID; 
    var submissionStartKey = "submissionStart" + app.appID; 

    var lastAppInfo = db.get(appInfoKey); 
    if(!lastAppInfo || lastAppInfo.status != app.status) {

        console.log("status is different");

        if(app.status == "Waiting For Review") {
            db.set(submissionStartKey, new Date());
        }
    } 
    else {
       console.log("status is same");  
    }

    db.set(appInfoKey, app);
}