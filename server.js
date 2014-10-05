var Chrome = require('chrome-remote-interface');
var fs = require("fs");
var exec = require('child_process').exec;

var FOLDER = 'public';

var url2scriptId = { };
var onFsChange;

function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

exec('./node_modules/http-server/bin/http-server');
fs.watch(FOLDER,function(event,file){
	if(onFsChange){
		onFsChange(file);
  }
});

Chrome(function (chrome) {

	chrome.on('Debugger.scriptParsed', function (script) {
		url2scriptId[script.url] = script.scriptId;
	});
	chrome.Debugger.disable();
	chrome.Debugger.enable();

	onFsChange = function(file){
		console.log('file',file);
		if(endsWith(file,'.js')){
			var scriptId;
			for(url in url2scriptId){
				console.log(url,url2scriptId[url]);
				if(endsWith(url,file)){
					scriptId = url2scriptId[url];
				}
			}
			if(typeof scriptId !== 'undefined'){
				console.log('try to update script',scriptId);
				console.log('readingFIle',FOLDER+'/'+file);
				fs.readFile(FOLDER+'/'+file,{encoding:'utf8'},function(err,contents){
					console.log('scriptId',scriptId,'contents',contents);
					chrome.Debugger.setScriptSource({
						scriptId: scriptId,
						scriptSource: contents
					});
				});
			}else{
				console.log('could not find script id');
			}
		}
	};

}).on('error', function () {
	console.error('Cannot connect to Chrome',arguments);
});
