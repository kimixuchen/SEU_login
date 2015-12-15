$(document).ready(function(){
    
    var intervalID;
    
    function timeShow(tCount){
        var temp = tCount;
        var seconds = parseInt(temp%60);
        temp =  parseInt(temp/60);
        var minutes = parseInt(temp%60);
        temp =  parseInt(temp/60);
        var hours = parseInt(temp%24);
        temp =  parseInt(temp/24);
        var days = temp;
        var timeShow = (days>0?(days+'天 '):'')
                + (hours<10?'0':'') + hours
                + ':' + (minutes<10?'0':'') +minutes
                + ':' + (seconds<10?'0':'') +seconds;                                                                          
       return timeShow;                
    }
    
    function getUrl() {
        var search = window.location.search;
        var pos = search.indexOf('=');
        var url = decodeURIComponent(search.substring(pos+1));
        return url;
    }

    $(window).load(function() {
        $.ajax({
            type: "GET",
            url: "init.php", // URL of the Perl script
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            // script call was *not* successful
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                $('form#loginForm').show();
                $('form#logoutForm').hide();   
            }, // error 
            // script call was successful 
            // data contains the JSON values returned by the Perl script 
            success: function(init){
                if (init.login) { // script returned error
                    var tCount = init.login_time;                
                    $('span#login_username').text(init.login_username);
                    $('span#login_ip').text(init.login_ip);
                    $('span#login_location').text(init.login_location);
                    $('span#login_time').text(timeShow(tCount));
		    
			$('span#login_index').text(init.login_index);
			
		    $('span#login_expire').text(init.login_expire);
		    $('span#login_remain').text(init.login_remain);
                    $('form#logoutForm').show();
                    $('form#loginForm').hide();
                    $('div#loginResult').text(init.login);
                    $('div#loginResult').addClass("success");
                    $('div#loginResult').css("background", "#e6efc2");
                    $('div#loginResult').css("color", "#264409");
                    $('div#loginResult').css("border-color", "#c6d880");
                    $('div#loginResult').fadeOut(2000);                                           
                    intervalID = self.setInterval(function(){                                                  
                        $('span#login_time').text(timeShow(++tCount));
                    }, 1000);
                } // if
                else { // login was successful
                    $('span#init_ip').text('登录IP: '+init.login_ip);
                    $('span#init_location').text('当前登录位置: '+init.login_location);
                    $('form#loginForm').show();
                    $('form#logoutForm').hide();
                } //else
            } // success
        }); // ajax
    });
  

    $("form#loginForm").submit(function() { // loginForm is submitted
        var username = $('#username').val(); // get username
        var password = $('#password').val(); // get password

        if (username && password) { // values are not empty
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
                    /*$('div#loginResult').text("responseText: " + XMLHttpRequest.responseText 
                        + ", textStatus: " + textStatus 
                        + ", errorThrown: " + errorThrown);*/
                    $('div#loginResult').text("Internal Error, Login Failed!");
                    $('div#loginResult').addClass("error");
                }, // error 
                // script call was successful 
                // data contains the JSON values returned by the Perl script 
                success: function(login){
                    if (login.error) { // script returned error
                        $('div#loginResult').text(login.error);
                        $('div#loginResult').addClass("error");
                        $('div#loginResult').css("background", "#fbe3e4");
                        $('div#loginResult').css("color", "#8a1f11");
                        $('div#loginResult').css("border-color", "#fbc2c4");
                    } // if
                    else { // login was successful
                        var tCount = login.login_time;
                        var redirectCount = 3;
                        $('span#login_username').text(login.login_username);
                        $('span#login_ip').text(login.login_ip);
                        $('span#login_location').text(login.login_location);
                        $('span#login_time').text(timeShow(tCount));
						
			$('span#login_index').text(login.login_index);
						
			$('span#login_expire').text(login.login_expire);
			$('span#login_remain').text(login.login_remain);
                        $('span#login_url').text(redirectCount+' 秒后跳转到您的页面');
                        $('span#login_url').css("font-size", "9pt");
                        $('span#login_url').css("color", "#888888");
                        $('form#loginForm').hide();
                        $('form#logoutForm').show();
                        $('div#loginResult').text(login.success);
                        $('div#loginResult').addClass("success");
                        $('div#loginResult').css("background", "#e6efc2");
                        $('div#loginResult').css("color", "#264409");
                        $('div#loginResult').css("border-color", "#c6d880");
                        $('div#loginResult').fadeOut(2000);                          
                        intervalID = self.setInterval(function(){                                                  
                            $('span#login_time').text(timeShow(++tCount));
                            if(redirectCount) {
                                $('span#login_url').text(redirectCount+' 秒后跳转到您的页面');
                                $('span#login_url').css("font-size", "9pt");
                                $('span#login_url').css("color", "#888888");
                                redirectCount--;
                            }
                            else {
                                window.location.href=getUrl(); 
                            }
                        }, 1000);
                    } //else
                } // success
            }); // ajax
        } // if
        else {
            $('div#loginResult').text("用户名和密码均不能为空");
            $('div#loginResult').addClass("error");
            $('div#loginResult').css("background", "#fbe3e4");
            $('div#loginResult').css("color", "#8a1f11");
            $('div#loginResult').css("border-color", "#fbc2c4");
        } // else
        $('div#loginResult').fadeIn();
        return false;
    });
  
    $("form#logoutForm").submit(function() { // logoutForm is submitted
        $.ajax({
            type: "POST",
            url: "logout.php", // URL of the PHP script
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            // script call was *not* successful
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                /*$('div#loginResult').text("responseText: " + XMLHttpRequest.responseText 
                    + ", textStatus: " + textStatus 
                    + ", errorThrown: " + errorThrown);*/
                $('div#loginResult').text("Internal Error, Logout Failed!");
                $('div#loginResult').addClass("error");
            }, // error 
            // script call was successful 
            // data contains the JSON values returned by the Perl script 
            success: function(logout){
                if (logout.error) { // script returned error
                    $('div#loginResult').text(logout.error);
                    $('div#loginResult').addClass("error");
                    $('div#loginResult').css("background", "#fbe3e4");
                    $('div#loginResult').css("color", "#8a1f11");
                    $('div#loginResult').css("border-color", "#fbc2c4");
                } // if
                else { // logout was successful
                    self.clearInterval(intervalID); //清计时器
                    $('span#init_ip').text('登录IP: '+logout.login_ip);
                    $('span#init_location').text('当前登录位置: '+logout.login_location);                   
                    $('form#loginForm').show();
                    $('form#logoutForm').hide();
                    $('div#loginResult').text(logout.success);
                    $('div#loginResult').addClass("success");
                    $('div#loginResult').css("background", "#e6efc2");
                    $('div#loginResult').css("color", "#264409");
                    $('div#loginResult').css("border-color", "#c6d880");
                    $('div#loginResult').fadeOut(2000);
                } //else
            } // success
        }); // ajax
        $('div#loginResult').fadeIn();
        return false;
    });
});

