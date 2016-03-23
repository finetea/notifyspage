/**
 * Copyright (c) 2013 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */

function truncate_log(log) {
	var log_list = log.split("\n", 99);	//discard more than 99 items
	var log_new = log_list.join("\n");
	return log_new;
}

function write_log(link_url) {
	chrome.storage.sync.get('click_log', 
		function(result) {
			if (result.click_log == undefined || result.click_log == "") {
				result.click_log = "";
			}

			var now = new Date();

			var log_org = truncate_log(result.click_log);

			var log_new = "[" + now.toUTCString() + "] " + link_url + "\n" + log_org;

			chrome.storage.sync.set({'click_log':log_new}, function(res){
				console.log(log_new);
			});
		});
}

function click_links() {
	console.log('click links');
	var links = document.links;

	for(var i=0; i<links.length; i++) {
		if(links[i].href.indexOf('accepted-Sa') > 0) {
			links[i].click();
			console.log('clicked [' + links[i].href + ']');
			write_log(links[i].href);
		}
	}
}

//load option and click links if autoloading is yes
chrome.storage.sync.get('autoloading', 
	function(result) {
		//set option value 'autoloading' as 'yes'
		if (result.autoloading == undefined || result.autoloading == "" || result.autoloading == 'yes') {
			//click all the links	
			click_links();

			if (result.autoloading == undefined || result.autoloading == "") {
				//save default
				chrome.storage.sync.set({'autoloading':"yes"}, function(res){
					console.log('(saving default) setting autoloading = yes');
				});
			}
		}
		else {
			console.log('autoloading might be no. skipping clicks.');
		}

	});

