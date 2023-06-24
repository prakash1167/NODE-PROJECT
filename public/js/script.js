
var widgetsCollection = document.getElementById("col1");  
var counter=0;
counter_images =0    
counter_images+=1;

function changeTextColor(e,id){
  var color_new=$("#text-color"+id).val();
  $("#text"+id).css('color', color_new);
  console.log(id);
  console.log(color_new);
  const colorCode = document.getElementById("colorCode"+id);
  colorCode.innerHTML = color_new;
}

function changeBgColor(e,id){
  var color_bg=$("#bg-color"+id).val();
  $("#setbg"+id).css('background-color', color_bg);
  console.log(id);
  console.log(color_bg);
    const bgCode = document.getElementById("bgCode"+id);
    bgCode.innerHTML = color_bg;  
}

function changeImage(id) {
  console.log("img"+id);
  var new_image = prompt("Please enter the URL for the image",$("#img"+id).attr("src"));

  $("#img"+id).attr("src", new_image);
  $("#logo"+id).attr("src", new_image);
  $("#slideImg"+id).attr("src", new_image);

}

// function changeText(id){
// $(".text"+id).dblclick(function(event){
//     console.log(event.target);
//     componente=event.target
//       var nuevo_texto = prompt("Please enter the text",$("#"+componente.id).text());
//       console.log(event.target);
//       $("#"+componente.id).text(nuevo_texto);
//   });
// };

function alignLeft(id){
  $('#text'+id).css({ 'text-align': 'left' });
};//Left align
function alignRight(id){
  $('#text'+id).css({ 'text-align': 'right' });
};//Right align
function alignCenter(id){
  $('#text'+id).css({ 'text-align': 'center' });
};//Center align

function clickNormal(id){
  console.log(id)
  $('#text'+id).css({ 'font-weight': 'normal' });
};//Font normal

function clickBold(id){
  console.log(id)
  $('#text'+id).css({ 'font-weight': 'bold' });
};//Font bold

function addSlide(id){
  $("#hero-banner"+id ).append(slide_item);
  // $('.widget'+id).remove();
}

function clickDelete(id){
  $("#text"+id ).remove();
  $('.widget'+id).remove();
}

function fontSizeSelect(event,id) {
  var selectElement = event.target;
  var value = selectElement.value;
  console.log(value);
  console.log(id);
  
  $('#text'+id).css("font-size", value + "px");
}

$(document).on("click",".slide-item-row h4",function() {
  $(this).closest(".slide-item-row").find(".slide-group").slideToggle();
});
