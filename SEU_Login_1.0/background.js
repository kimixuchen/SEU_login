// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
	var username;
	var password;
	chrome.storage.sync.get('username', function(data) {
		username = data.username;
	});
	chrome.storage.sync.get('password', function(data) {
		password = data.password;
	});
	$.ajax({
		type: "GET",
		url: "https://w.seu.edu.cn/portal/init.php", // URL of the Perl script
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		cache: false,
		// script call was *not* successful
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
			login(username, password);
		}, // error 
		// script call was successful 
		// data contains the JSON values returned by the Perl script 
		success: function(init){
			if (init.login) { // login was successful
				logout();
			} // if
			else { // script returned error
				login(username, password);
			} //else
		} // success
	}); // ajax

	
});


//Login SEU
function login(username, password){

	$.ajax({
		type: "POST",
		url: "https://w.seu.edu.cn/portal/login.php", // URL of the PHP script
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		cache: false,
		// send username and password as parameters to the Perl script
		data: {username:username, password:password},
		// script call was *not* successful
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
			alert("Internal Error, Login Failed!");
			
		}, // error 
		// script call was successful 
		// data contains the JSON values returned by the Perl script 
		success: function(login){
			if(login.error){
				alert("Internal Error, Login Failed!");
			}
			else{
				setLoginLogo();
			}
		} // success
	}); // ajax
}

//Logout
function logout(){
        $.ajax({
            type: "POST",
            url: "https://w.seu.edu.cn/portal/logout.php", // URL of the PHP script
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            // script call was *not* successful
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert("Internal Error, Logout Failed!");
            }, // error 
            // script call was successful 
            // data contains the JSON values returned by the Perl script 
            success: function(logout){
                setLogoutLogo();
            } // success
        }); // ajax

}


function setLoginLogo(){
	chrome.browserAction.setIcon({
		path : {
		"19": "icon.png"
		}
	});
}

function setLogoutLogo(){
	chrome.browserAction.setIcon({
		path : {
		"19": "icon_disable.png"
		}
	});
}