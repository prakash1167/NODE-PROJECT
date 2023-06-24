/*let editHomepage = (e) => {
    e.preventDefault();
    
    var  bg_color=document.getElementById('bg-color${counter}');
    var  text_align=document.getElementById('flex');
    var  font_size=document.getElementById('fontSizeSelect(event,${counter})');
    var  font_weight=document.getElementById('button inline-block');
    var   text_color=document.getElementById(' text-color${counter}');
   
    var  input_logo_image=document.getElementById('logo${counter}');
    var   store_name=document.getElementById(' slideTitle${counter}');
    var   content=document.getElementById(' slideDesc${counter}');
    var  input_slide_image=document.getElementById('img${counter}');
    
    var reqPayload = {
        
        bg_color:bg_color.value ,
        text_color:text_color.value ,
        font_size: font_size.value,
        font_weight:font_weight.value ,
        text_align:text_align.value ,
        logo_image: input_logo_image.value,
        slides: [{
            store_name:store_name.value ,
            content:content.value ,
            slide_image:input_slide_image.value
        }]
    };
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            var resObj = JSON.parse(xhr.responseText);
            consol.log(resObj);
        }
    };
    xhr.open('POST', '/admin/homepage-editor');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(reqPayload));
};*/