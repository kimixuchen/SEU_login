$(document).ready(
				function(){

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
					} // success
				}); // ajax
				}
);