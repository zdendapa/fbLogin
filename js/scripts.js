
var fbAppID = "207808999413453";

function onDeviceReady()
{
    alert("onDeviceReady");
    fbInit();

}

function fbInit()
{
    try {
        FB.init({
            appId: fbAppID,
            nativeInterface: CDV.FB,
            useCachedDialogs: false
        });

        FB.getLoginStatus(function(response) {
            if (response.status == 'connected') {
                //alert('logged in');
            } else {
                doFBlogout();
            }
        });

    } catch (e) {
        log("Error facebook inicializace:" +e);
        return;
    }

}


function doFBLogin() {
    log("doFBLogin start");
    FB.getLoginStatus(function(response) {
        log("getLoginStatus");
        if (response.status === 'connected') {
            alert("fbLogin connected");
            enterFBapp(response);
        } else {
            FB.login(function(response)
            {
                log("login start");
                if (response.authResponse) {
                    enterFBapp(response);
                }
                else
                {// user cancelled login zustat na strance
                    log("user cancelled login");
                }
            }, {
                scope: 'email'
            });
        }
    });
}

function doFBlogout()
{
    FB.logout(function(){
        alert("loged out");
    });
}



function fbStatusShow() {
    FB.getLoginStatus(function(response) {
        if (response.status == 'connected') {
            alert('logged in');
        } else {
            alert('not logged in');
        }
    });
}


function enterFBapp(response) {
    FB.api('/me', function(response)
    {
        log("enterFBapp");
        // fake
        //response = new Object();
        //response.id = "15090712";
        //response.id = "1509071250";
        // fake end
        log(response.id + response.first_name + response.last_name + response.gender);
        alert(response.id + response.first_name + response.last_name + response.gender);
        /*
        $.ajax({
            type: "POST",
            url: appServerUrlPreffix + "/api/loginFB.json",
            data: {
                firstname: response.first_name,
                gender: response.gender,
                id: response.id,
                last_name: response.last_name
            },
            dataType: "json",
            success: function(data) {
                if (data.msg) alert(data.msg);
                if (data.status == "ok" && data.goto=="student.html")
                {
                    console.log("prihlaseni ok");
                    transition("#page-registracePrihlaseniOK","fade");
                    nacistDataPoPrihlaseni();
                    $("#registracePrihlaseniOKdiv").text("Přihlášení proběhlo úspěšně");
                    pageNext = "";

                    return;
                }
                if (data.status == "ok")
                {
                    console.log("prihlaseni ok - k doregistraci");
                    registraceDoplnit(response);
                }
                if (data.status == "error") {
                    alertZobraz("Nelze přihlásit pomcí facebooku ")
                }
                return;
            },
            error: function(data) {
                console.log(data);
                alert('chyba ověření se serverem:' + data);
            }
        });
        */
    });

}
function log(msg)
{

}