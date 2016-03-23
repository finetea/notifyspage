/**
 * Copyright (c) 2013 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */


var storage = chrome.storage.sync;

function format_log(log) {
	var log_list = log.split("\n", 100);	//discard more than 99 items
	var log_new = "";

	log_list.forEach(function(entry) {
		log_new = log_new + "\n<BR>\n" + entry;
	});

	return log_new;
}

function loadLogs() {
	chrome.storage.sync.get('click_log',
		function(result) {
			var div_log = document.getElementById('div_log');
			if (result.click_log == undefined || result.click_log == "") {
				//no log
				div_log.innerHTML = "No log";
			}
			else {
				div_log.innerHTML = format_log(result.click_log);
			}
		});
}




document.addEventListener('DOMContentLoaded', function () {
	loadLogs();
});
