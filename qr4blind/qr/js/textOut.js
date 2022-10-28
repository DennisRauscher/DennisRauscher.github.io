window.onload = function()
{
setTimeout(function(){ read(); }, 1000);
}

function read()
    {
    responsiveVoice.setDefaultVoice("US English Female");

    if(responsiveVoice.voiceSupport()) {
        responsiveVoice.speak(text.trim());
    }
    else
    {
        alert("No voice support!");
    }
}