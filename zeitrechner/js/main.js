var zeitrechnerApp = angular.module('zeitrechnerApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
zeitrechnerApp.controller('RechnerController', function RechnerController($scope) {
  $scope.timeparts = [
    {
      von: '00:00',
      bis: '00:00',
      breaks: '00:00',
      resH: '0',
      resM: '0',
      resOnlyM: '0'
    }
  ];

  $scope.quotePerMinte = 0;
  $scope.totalDone = 0;
  $scope.totalMinutes = 0;
  $scope.res = 0;

  $scope.calc = function(index)
  {
     var hours = parseInt($(".Time2_"+index).val().split(':')[0], 10) - parseInt($(".Time1_"+index).val().split(':')[0]) - parseInt($(".Time3_"+index).val().split(':')[0], 10);
     var minutes = parseInt($(".Time2_"+index).val().split(':')[1], 10) - parseInt($(".Time1_"+index).val().split(':')[1]) - parseInt($(".Time3_"+index).val().split(':')[1], 10);

     while(minutes < 0)
     {
       hours--;
       minutes = 60 + minutes;
     }

     if(!hours)
     {
      hours = 0;
     }
     if(!minutes)
     {
      minutes = 0;
     }

     $scope.timeparts[index].resH = hours;
     $scope.timeparts[index].resM = minutes;

     return hours + "h " + minutes + "m / " +  pad(hours) + ":" + pad(minutes);
  }

  $scope.calcMin = function(index)
  {
     var hours = parseInt($(".Time2_"+index).val().split(':')[0], 10) - parseInt($(".Time1_"+index).val().split(':')[0]) - parseInt($(".Time3_"+index).val().split(':')[0], 10);
     var minutes = parseInt($(".Time2_"+index).val().split(':')[1], 10) - parseInt($(".Time1_"+index).val().split(':')[1]) - parseInt($(".Time3_"+index).val().split(':')[1], 10);

     while(minutes < 0)
     {
       hours--;
       minutes = 60 + minutes;
     }

     if(!hours)
     {
       hours = 0;
     }
     if(!minutes)
     {
       minutes = 0;
     }

     $scope.timeparts[index].resOnlyM = hours * 60 + minutes;

     return hours * 60 + minutes;
  }

  $scope.resultTot = function()
  {
    var totalH = 0, totalM = 0;

    for(var i = 0; i < $scope.timeparts.length; i++)
    {
      totalH += $scope.timeparts[i].resH;
      totalM += $scope.timeparts[i].resM;
    }

    totalH += Math.floor(totalM/60);
    totalM = totalM%60;

    $scope.totalMinutes = totalH * 60 + totalM;

    return totalH + "h " + totalM + "m";
  }

  $scope.resultQuote = function()
  {
    return parseFloat(($scope.totalDone / ($scope.quotePerMinte * $scope.totalMinutes)) * 100 + "").toFixed(2);
  }

  $scope.createNew = function()
  {
    $scope.timeparts.push({
      von: '00:00',
      bis: '00:00',
      breaks: '00:00'
    });
  }

  $scope.del = function(index)
  {
    $scope.timeparts.splice(index, 1);
  }
});


function convertTime(from, to)
{
  //create date format
  var diff = Math.abs(new Date("01/01/2007 " + to) - new Date("01/01/2007 " + from));
  var resH = Math.ceil(diff/(1000 * 3600));
  var resM = Math.ceil(diff/(1000 * 60));
  if(resH/10 < 1)
  {
      resH = "0"+resH;
  }
  if(resM/10 < 1)
  {
      resM = "0"+resM;
  }

  var res = resH + ":" + resM;
  console.log(res);
  return res;
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

window.onload = function(){
  $('.payWall').fadeOut(0);
  $('.payWall').fadeIn(200);
};

function anmelden()
{
  var username = $("#val_name").val();
  var password = $("#val_passwd").val();

  if(username == "karmen" && password == "zeit")
  {
    $('.payWall').fadeOut(200);
  }
  else
  {
      alert("Falsches Password oder Nutzernamen!");
  }
}
