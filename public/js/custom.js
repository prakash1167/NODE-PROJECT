$(document).on("click","#topbar-promo",function() {
  left_component=`
    <div class="widgets-item widget${counter}">
      <div class="tooltipcontainer">
        <div class="widget-list-item">
          <label>Select bg color</label>
          <div class="flex items-center">
            <input id="bg-color${counter}" type="color" value="#000000" onchange="changeBgColor(event,${counter})">
            <div id="bgCode${counter}" class="code">#000000</div>
          </div>
        </div>
        <div class="widget-list-item">
          <label>Select text color</label>
          <div class="flex items-center">
            <input id="text-color${counter}" type="color" value="#ffffff" onchange="changeTextColor(event,${counter})">
            <div id="colorCode${counter}" class="code">#ffffff</div>
          </div>
        </div>
        <div class="field-input widget-list-item">
          <label>Select font size</label>
          <select onchange="fontSizeSelect(event,${counter})" >
            <option value="12">XS</option>
            <option value="14">S</option>
            <option value="16" selected>M</option>
            <option value="18">LG</option>
            <option value="20">XL</option>
          </select>
        </div>
        <div class="widget-list-item">
          <label>Font weight</label>
          <button class="button inline-block" onclick="clickNormal(${counter})">Normal</button>
          <button class="button inline-block" onclick="clickBold(${counter})">Bold</button>
        </div>
        <div class="mt-20">
          <label>Align text</label>
          <div class="flex">
            <a href="#" class="" onclick="alignLeft(${counter})">Left</a>
            <a href="#" class="" onclick="alignCenter(${counter})">Center</a>
            <a href="#" class="" onclick="alignRight(${counter})">Right</a>
          </div>
        </div>
        <div class="mt-20">
          <button class="button inline-block" onclick="clickDelete(${counter})">Remove Widget</button>
        </div>
      </div>
    </div>
  `;
  right_component=`
    <div class="widgets-item widget${counter}">
      <div class="top-header" id="setbg${counter}" onchange="changeBgColor(event,${counter})>
        <div class="container">
          <div class="info-bar">
            <p id="text${counter}" onclick="changeText(${counter})" class="text">Free shipping for orders over $80 . Sign up and get 10% off* your first order.</p>
          </div>
        </div>
      </div>
    </div>
  `;  
  
  $( "#col1" ).append(right_component);
  $(this).closest("li").append(left_component);
  //$("#text"+counter).draggable();
  counter+=1;
  
});//Top promo bar

$(document).on("click","#main-header",function() {
  left_component=`
    <div class="widgets-item widget${counter}">
      <div class="widget-list-item">
        <label>Logo image</label>
        <div id="img-draggable${counter}" class="tooltip-img resizable${counter}">
          <img src="../images/wigo-logo-img.png" id="img${counter}" alt="">
          <a href="javascript:void(0)" onclick="changeImage(${counter})">Change image</a>
        </div>
      </div>
      <div class="mt-20">
        <button class="button inline-block" onclick="clickDelete(${counter})">Remove widget</button>
      </div>  
    </div>
  `;
  right_component =`
    <div class="widgets-item widget${counter}">
        <header class="header bg-white" id="header">
          <div class="container">
            <div class="page-header" id="text${counter}">
              <div class="header-left">
                <div class="logo-image">
                    <a href="#">
                      <img id="logo${counter}" src="../images/wigo-logo-img.png" width="70" height="36" alt="Wigo Store">
                    </a>
                </div>
                <div class="header-menu">
                  <nav class="navigation">
                    <ul>
                      <li><a href="collections.html">Collections</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div class="header-right">
                <div class="header-items">
                    <span class="sign-in">
                      <svg width="22px" height="22px" viewBox="-1 -1 21 20">
                    <g transform="translate(0.968750, -0.031250)" stroke="none" stroke-width="1" fill="currentColor" fill-rule="nonzero">
                      <path d="M9,7.5 C10.704,7.5 12.086,6.157 12.086,4.5 C12.086,2.843 10.704,1.5 9,1.5 C7.296,1.5 5.914,2.843 5.914,4.5 C5.914,6.157 7.296,7.5 9,7.5 Z M9,9 C6.444,9 4.371,6.985 4.371,4.5 C4.371,2.015 6.444,0 9,0 C11.556,0 13.629,2.015 13.629,4.5 C13.629,6.985 11.556,9 9,9 Z M1.543,18 L0,18 L0,15 C0,12.377 2.187,10.25 4.886,10.25 L14.143,10.25 C16.273,10.25 18,11.929 18,14 L18,18 L16.457,18 L16.457,14 C16.457,12.757 15.421,11.75 14.143,11.75 L4.886,11.75 C3.04,11.75 1.543,13.205 1.543,15 L1.543,18 Z"></path>
                    </g>
                </svg>
                <div class="head-link bg-white">
                  <a class="main-menu-link" href="login.html">Login</a>
                  <a href="register.html">Register</a>
                </div>
                    </span>
                  
                  <span class="cart-link">
                      <a href="cart.html">
                          <svg width="24px" height="24px" viewBox="0 -2 37 35">
                      <g transform="translate(0.500000, 0.500000)" stroke="none" fill="currentColor" fill-rule="nonzero">
                        <path d="M0.2,11 L9.5,29 L26.4,29 L35.7,11 L0.2,11 Z M24.5,26 L11.5,26 L4.8,14 L31.2,14 L24.5,26 L24.5,26 Z M18.5,3 C22.7,3 25.5,6.3 25.5,8.5 L28.5,8.5 C28.5,4.5 24.2,0 18.5,0 C12.8,0 8.5,4.5 8.5,8.5 L11.5,8.5 C11.5,6.3 14.3,3 18.5,3 Z"></path>
                      </g>
                  </svg>
                      </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>  
          
          
    </div>
  `;
  
  $( "#col1" ).append(right_component);
  $(this).closest("li").append(left_component);

  //$("#text"+counter).draggable();
  counter+=1;

});//Main header

$(document).on("click","#hero-banner",function() {
  left_component=`
    <div class="widgets-item widget${counter}">
      <div class="tooltipcontainer">
        <div class="slide-items-row">
          
        </div>
        <div class="mt-20">
          <button class="button button--hollow inline-block" id="add-slide">Add Slide</button>
        </div>
        <div class="mt-20">
          <button class="button inline-block" onclick="clickDelete(${counter})">Remove widget</button>
        </div>
      </div>
    </div>
  `;
  right_component=`
    <div class="widgets-item widget${counter}">
      <section class="banner-section">
        <div class="container">
          <div class="hero-banner slideshow-container" id="hero-banner${counter}">
            <div class="mySlides fade" style="display:block">
              <img id="slideImg${counter}" src="../images/banner-01.jpg" alt="">
              <div class="slide-description">
                <h2 id="slideTitle${counter}">Wigo Stores 01</h2>
                <p id="slideDesc${counter}">Find what you love, Love what you find</p>
                <a id="slideBtn${counter}" href="#" class="button button--hollow justify-end inline-block">SHOP NOW</a>
              </div>
            </div>
            <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>
          </div>
          <div class="dots">
            <span class="dot" onclick="currentSlide(2)"></span> 
          </div>
        </div>
      </section>          
    </div>
  `;  
  slide_item=`
    <div class="slide-item-row">
      <h4>Slide</h4>
      <div class="slide-group">
        <div class="widget-list-item">
          <div id="img-draggable${counter}" class="tooltip-img resizable">
            <img src="../images/banner-01.jpg" id="img${counter}" alt="">
            <a href="javascript:void(0)" onclick="changeImage(${counter})">Change image</a>
          </div>
        </div>
        <div class="widget-list-item">
          <label>Title</label>
          <div id="slide-title${counter}" class="form-container">
            <input type="text" class="" />
          </div>
        </div>
        <div class="widget-list-item">
          <label>Description</label>
          <div id="slide-description${counter}" class="form-container">
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>
        </div>
        <div class="widget-list-item">
          <label>Button text</label>
          <div id="slide-button${counter}" class="form-container">
            <input type="text" class="" />
          </div>
        </div>
      </div>
    </div>
  `;
  
  $( "#col1" ).append(right_component);
  $(this).closest("li").append(left_component);
  $(".slide-items-row").append(slide_item);
  counter+=1;

});//Hero Banner

$(document).on("click","#add-slide",function() {
  slide_item=`
    <div class="slide-item-row">
      <h4>Slide</h4>
      <div class="slide-group">
        <div class="widget-list-item">
          <div id="img-draggable${counter}" class="tooltip-img resizable">
            <img src="../images/banner-02.jpg" id="img${counter}" alt="">
            <a href="javascript:void(0)" onclick="changeImage(${counter})">Change image</a>
          </div>
        </div>
        <div class="widget-list-item">
          <label>Title</label>
          <div id="slide-title${counter}" class="form-container">
            <input type="text" class="" />
          </div>
        </div>
        <div class="widget-list-item">
          <label>Description</label>
          <div id="slide-description${counter}" class="form-container">
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>
        </div>
        <div class="widget-list-item">
          <label>Button text</label>
          <div id="slide-button${counter}" class="form-container">
            <input type="text" class="" />
          </div>
        </div>
      </div>
    </div>
  `;
  dot=`
    <span class="dot" onclick="currentSlide(2)"></span> 
  `;
  slide_item_right=`
    <div class="mySlides fade">
      <img id="slideImg${counter}" src="../images/banner-02.jpg" alt="">
      <div class="slide-description">
        <h2>Wigo Stores 01</h2>
        <p>Find what you love, Love what you find</p>
        <a href="#" class="button button--hollow justify-end inline-block">SHOP NOW</a>
      </div>
    </div>
  `;
  $(".hero-banner").prepend(slide_item_right);
  $(".dots").prepend(dot);
  $(this).closest("li").find(".slide-items-row").append(slide_item);
  counter+=1;
});