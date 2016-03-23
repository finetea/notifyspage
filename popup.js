/**
 * Copyright (c) 2013 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */

var defaultAutoLoading = "yes"

var storage = chrome.storage.sync;


function loadOption() {
	chrome.storage.sync.get('autoloading', 
		function(result) {
			if (result.autoloading == undefined || result.autoloading == "") {
				result.autoloading = defaultAutoLoading;
				//save default
				chrome.storage.sync.set({'autoloading':"yes"}, function(res){
					console.log('(saving default) setting autoloading = yes');
				});
			}
			
			var optAL = document.getElementById('autoloading');
			if (result.autoloading == 'yes') {
				optAL.checked = true;
			}
			else {
				optAL.checked = false;
			}
		});
}

function saveOption() {
	if (document.getElementById('autoloading').checked == true) {
		chrome.storage.sync.set({'autoloading':"yes"}, function(res){});
		console.log('setting autoloading = yes');
	}
	else {
		chrome.storage.sync.set({'autoloading':"no"}, function(res){});
		console.log('setting autoloading = no');
	}

	//put another option here
}

function click(e) {
	saveOption();
}


loadOption();

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});
