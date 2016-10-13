var frameTemplateHtmlDiv;

$(document).ready(function() {
   LoadFrameTemplate();   
});

function LoadFrameTemplate() {
   $.ajax({
        type: "GET",
        cache: false,
        url: "frame-template.html",
        dataType: 'html',
        success: function(data) {
           frameTemplateHtmlDiv = data;
           GetFrame('property-main');
        }
    });
}

function GetFrame(pv) {
   
   var url = pv + '.html';
   
    $.ajax({
        type: "GET",
        cache: false,
        url: url,
        dataType: 'html',
        success: function(data) {
           LoadPanel(data, pv);
        }
    });
}

function LoadPanel(data, pv) {
   // check if pv already exists, if not then add it
   if ($('#' + pv).length == 0) {
      var newDiv = frameTemplateHtmlDiv;
      newDiv = newDiv.replace("{id}", pv);
      
      //frame"<div id='" + pv + "' class='frame one-frame'>" + data + "</div>";
      $('#main-display').append(newDiv);
      
      $('#main-display div').last().html(data);
      
      var frameTitle = $('#main-display div.frame-content').last().children('span').text();
      
      $('#main-display div.frame').last().children('div.frame-top').children('div.frame-title').text(frameTitle);
      
      OrganizeFrames();
   }      
}

$(document).on('click', '.left-menu-item', function() {
   var pv = $(this).attr('pv-name');
   GetFrame(pv);
   
});

$(document).on('click', '.closeDiv', function() {
   $(this).parent().parent().parent().remove();
   OrganizeFrames();
});

$(document).on('click', '.popOut', function() {
   var w = window.open();
   var html = $(this).parent().parent().parent().children('.frame-content').html();
   $(w.document.body).html(html);
   $(this).parent().children('.closeDiv').click();
});

function OrganizeFrames() {
   // 1 frame: full size
   // 2: divide in half
   // 3: 3 columns
   // 4: 4 quadrants
   // 5: ah ah
   var frameCount = $('#main-display').children('.frame').length;
   
   $('#main-display div.frame').removeClass('one-frame two-frame three-frame four-frame');
   
   // remove clear div
   $('#clearDiv').remove();
   
   switch(frameCount) {
      case 1:
         $('#main-display div.frame').addClass('one-frame');
         break;
      case 2:
         $('#main-display div.frame').addClass('two-frame'); 
         break;
      case 3:
         $('#main-display div.frame').addClass('three-frame');  
         break;
      case 4:
         // add the two-frame class to the first two divs,             
         $('#main-display div.frame').slice(0,2).addClass('four-frame');
         // then clear div
         AddClearRow();
         // then other two frames         
         $('#main-display div.frame:last-child').prev('div').andSelf().addClass("four-frame");
         break;
      default:
         // shouldn't be here
   }   
}

function AddClearRow() {
   var clearDiv = "<div class='clear' id='clearDiv'></div>";
   $('#main-display > div.frame:nth-child(2)').after(clearDiv);   
}