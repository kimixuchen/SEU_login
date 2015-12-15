// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  
  login();
});

//Login SEU
function login(){
	var username = '220151555'
	var password = '192837a'
	$.ajax({
		type: "POST",
		url: "login.php", // URL of the PHP script
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
			alert('success');
		} // success
	}); // ajax
}

//Logout
function logout(){
        $.ajax({
            type: "POST",
            url: "logout.php", // URL of the PHP script
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
                
            } // success
        }); // ajax

}