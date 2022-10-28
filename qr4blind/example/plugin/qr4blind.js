var jsFileLocation;
var ignore_exp = /<(.+) qr-ignore(|="")>(.|\n)*?<\/\1>/igm;

if(window.addEventListener){
  window.addEventListener('load', loadAndInit)
}else{
  window.attachEvent('onload', loadAndInit)
}

//Wird nach dem laden der Seite ausgeführt
function loadAndInit()
{
    //Findet seinen eigenen relativen Pfad raus
    jsFileLocation = document.getElementById('qr4blindSRC').getAttribute('src');
    jsFileLocation = jsFileLocation.replace('qr4blind.js', '');

    //Falls JQuery noch nicht geladen ist, laden wir es rein
    if(!window.jQuery)
    {
            var filename = jsFileLocation+"external/jquery-3.1.0.min.js";
            var fileref = document.createElement('script');
            fileref.setAttribute("type","text/javascript");
            fileref.setAttribute("src", filename);
            fileref.onload = function()
            {
                loadQRApi();
            }
            document.getElementsByTagName("head")[0].appendChild(fileref);
    }
    else
    {
        loadQRApi();
    }
}

//Lädt die QRCode erzeuger API
function loadQRApi()
{
    //Fügt die CSS-Datei für die QR-Code-Styles hinzu.
    $("head").append($("<link id='qr4blindSTYLESHEET' rel='stylesheet' href='" + jsFileLocation + "style.css' type='text/css' media='all' />"));

    var filename = jsFileLocation+"external/qrcode.min.js";
    var fileref = document.createElement('script');
    fileref.setAttribute("type","text/javascript");
    fileref.setAttribute("src", filename);
    fileref.onload = function()
    {
        loadText();
    }
    document.getElementsByTagName("head")[0].appendChild(fileref);
}

//Lädt den gesammten text der Webseite
function loadText()
{
    //Hohlt sich den gesammten text der Webseite (evtl. verbesserbar)
    var allText; //= $('body').text().trim();

    $('[qr-rel]').each(function(){
        var html = "<p>" + $(this).html().replace(ignore_exp, '') + "</p>";

        allText = allText ? allText + $(html).text().trim() :  $(html).text().trim();
    });

    allText = allText.replace(/\r?\n|\r/g, '').replace(/ /g,'#REM#');
    allText = allText.replace(/(#REM#)+/g, ' ');

    var lang = $('#qr4blindSRC').attr('lang');

    switch(lang)
    {
        case "de":
          lang = "DE";
        break;

        case "en":
          lang = "EN";
        break;

        default:
          lang = "EN";
        break;
    }

    //allText = allText.replace('       ','');

    console.log(allText);
    //Sended einen Request ans Backend mit dem Text und der eigenen URL
    $.post( "http://qr4blind.dennisrauscher.de/qr/", {req: "PUT", text: allText, url: window.location.href, lang: lang}, function( data ){
        if(data == -1)
        {

        }
        else if(data == -2)
        {

        }
        else if(data == -3)
        {

        }
        else
        {
            console.log(data);
            generateQR(data);
        }
    });
}

//Fügt das DIV hinzu und generiert einen QR-Code aus dem Link vom Backend
function generateQR(data)
{
    var cDark = $('#qr4blindSRC').attr('colorDark');
    var cLight = $('#qr4blindSRC').attr('colorLight');

    if(!cDark)
    {
      cDark = "#000000";
    }

    if(!cLight)
    {
      cLight = "#FFFFFF";
    }

    if(cLight == 'none')
    {
      cLight = "rgba(0, 0, 0, 0.0)";
    }

    if(cDark == 'none')
    {
      cDark = "rgba(0, 0, 0, 0.0)"
    }

    $('body').append('<div id="qr4blindQR" class="qr4blindQR-style"></div>');

    setTimeout(function(){
      new QRCode(document.getElementById("qr4blindQR"),
      {
        text: data,
        width: $('#qr4blindQR').width(),
        height: $('#qr4blindQR').height(),
        colorDark : cDark,
        colorLight : cLight,
        correctLevel : QRCode.CorrectLevel.H
      });
    }, 200);

    checkMode();

    //Play sound
    var snd = new Audio(jsFileLocation + "fx/access.wav");
    snd.play();
}

function checkMode()
{
  var mode = $('#qr4blindSRC').attr('mode');

  switch(mode)
  {
    case "screen":
      $('#qr4blindSTYLESHEET').attr('media', 'screen');
    break;

    case "print":
      $('#qr4blindQR').css('display', 'none');
      $('#qr4blindSTYLESHEET').attr('media', 'all');

          if ('matchMedia' in window) {
            window.matchMedia('print').addListener(function (media) {
              $('#qr4blindQR').css('display', 'block');
              window.onfocus=function(){
                  $('#qr4blindQR').css('display', 'none');
              }
            });
          }
          else
          {
            window.onbeforeprint = function () {
              $('#qr4blindQR').css('display', 'block');
              window.onfocus=function(){
                  $('#qr4blindQR').css('display', 'none');
              }
            }
          }

    break;

    case "both":
      $('#qr4blindSTYLESHEET').attr('media', 'all');
    break;
  }
}
