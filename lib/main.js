const data = require("sdk/self").data;
const pageMod = require("sdk/page-mod");
const widgets = require("sdk/widget");
const simplePrefs = require("sdk/simple-prefs");

simplePrefs.prefs.modPatten = simplePrefs.prefs.modPatten || "*";
simplePrefs.prefs.host = simplePrefs.prefs.host || "localhost";
simplePrefs.prefs.port = simplePrefs.prefs.port || "35729";
simplePrefs.prefs.enabled = simplePrefs.prefs.enabled || false;

var mod = null;
var updateState = function(enabled, widget){
    if(enabled){
        widget.contentURL = data.url("images/reload.png");
        mod = pageMod.PageMod({
            include: simplePrefs.prefs.modPatten,
            contentScript: "var script = document.createElement(\"script\"); script.src = \"http://" + 
                            simplePrefs.prefs.host + ":" + simplePrefs.prefs.port + "/livereload.js?snipver=1\"; " + 
                           "document.body.appendChild(script);",
            contentScriptWhen: "end"
        });
    } else {
        widget.contentURL = data.url("images/reload_disabled.png");
        mod && mod.destroy();
    }
};
var widget = widgets.Widget({
    id: "LiveReload",
    label: "Grassboy LiveReload",
    contentURL: data.url("images/reload_disabled.png"),
    onClick: function() {
        simplePrefs.prefs.enabled = !simplePrefs.prefs.enabled;
        updateState(simplePrefs.prefs.enabled, this);
    }
});
updateState(simplePrefs.prefs.enabled, widget);