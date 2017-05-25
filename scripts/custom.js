$(document).ready(function(){

  //set initial state to just the about me page
  $("#articles").hide();
  $("#resume").hide();
  $("#photography").hide();

  //one to one mapping
  var navBarItems=["aboutmebutton", "articlesbutton", "resumebutton", "photographybutton"];
  var pages = ["home", "articles", "resume", "photography"];

  //function that allows navigation between pages
  function show(button)
  {
    var arrayIndex = navBarItems.indexOf(button);
    for(var i = 0; i < navBarItems.length; i++)
    {
      if(i == arrayIndex)
      {
        continue;
      }

      $("#" + pages[i]).hide()
    }

    $("#" + pages[arrayIndex]).show();
  }


  $("#aboutmebutton").click(function()
  {
      show("aboutmebutton");
  });

  $("#articlesbutton").click(function()
  {
      show("articlesbutton");

      var url = "https://extraction.import.io/query/runtime/99f65e4a-5cc3-4819-a711-eb1722c2f0a7?_apikey=700738d3a6db408386674b9cfe386061f6b4c12b960f3b8dc7b5a3164b1fed1b50b8316d818a6a5bb33b1625c92a5419e8040eebb8e53d66533275cf34dcc96b0e1b3e0fd891d79b3c4232e62d5e1cdc&url=http%3A%2F%2Fwww.alligator.org%2Fsearch%2F%3Ff%3Dhtml%26q%3DSara%2BMarino%26s%3Dstart_time%26sd%3Ddesc%26l%3D100%26t%3Darticle%252Ccollection%252Cvideo%252Cyoutube%26nsa%3Deedition";
      $.get(url, function(data)
      {
        // console.log(data);

        //fix dates
        for(var i = 0; i < data.extractorData.data[0].group.length; i++)
        {
          if((data.extractorData.data[0].group[i][ 'ASSETTEXT DATE' ][0].text).indexOf("hrs") >=0)
          {
            var date = new Date();
            data.extractorData.data[0].group[i].fixedDate = date;
            continue;
          }

          var date = new Date(data.extractorData.data[0].group[i][ 'ASSETTEXT DATE' ][0].text);
          data.extractorData.data[0].group[i].fixedDate = date;
        }

        console.log(data);

        //sort based off proper dates
        data.extractorData.data[0].group.sort(function(obj1, obj2)
        {

          if (obj2.fixedDate > obj1.fixedDate) return 1;
          if (obj2.fixedDate < obj1.fixedDate) return -1;
          return 0;
        });

        //render data
        for(var i = 0; i < data.extractorData.data[0].group.length; i++)
        {
          var row= $("<div style=\"margin-bottom: 25px;\" />");
          $("#articleList").append(row);

          //title
          row.append($("<a href=\"" +data.extractorData.data[0].group[i][ 'LINK' ][0].href +"\"><h4 class=\"light italics\" style=\"margin-bottom: 4px; margin-top: 7px;\">" + data.extractorData.data[0].group[i][ 'LINK' ][0].text + "</h5></a></td>"));

          //Date
          row.append($("<p style=\"margin-top: 0px; margin-bottom: 7px;\">" + data.extractorData.data[0].group[i][ 'ASSETTEXT DATE' ][0].text + "</p>"));

          //Tagline
          row.append($("<i>" +data.extractorData.data[0].group[i][ 'CARDLEAD DESCRIPTION' ][0].text + "</i>"));


        }

        // row.append($("<td>" + data.extractorData.data[0].group[0]. + "</td>"));

      });
  });

  $("#resumebutton").click(function()
  {
      show("resumebutton");
  });

  $("#photographybutton").click(function()
  {
      show("photographybutton");
  });

});
