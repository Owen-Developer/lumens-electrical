
function createHtml(){
    let menu = document.createElement("div");
    menu.classList.add("menu-container");
    menu.innerHTML = `
        <div class="menu-header">
            <img src="images/logo.png" class="header-logo" />
            <img src="images/logo_txt.png" class="header-logo-txt" />

            <div class="menu-icon" onclick="closeMenu()">
                <i class="fa-solid fa-x menu-x"></i>
            </div>
        </div>

        <div class="menu-label">Browse Our Pages</div>
        <div class="menu-nav">
            <a onclick="closeMenu()" href="index.html" class="menu-link">Home</a>
            <a onclick="closeMenu()" href="about.html" class="menu-link">About Us</a>
            <a onclick="closeMenu()" href="gallery.html" class="menu-link">Gallery</a>
            <a onclick="closeMenu()" href="solar.html" class="menu-link">Solar PV</a>
            <a onclick="closeMenu()" href="contact.html" class="menu-link">Contact</a>
            <a onclick="closeMenu()" href="terms.html" class="menu-link">Terms</a>
        </div>

        <div class="menu-social">
            <a href="https://www.instagram.com/lumens.electrical/" target="_blank" class="menu-social-wrapper"><i class="fa-brands fa-instagram"></i></a>
            <a href="tel:+4407502999058" class="menu-social-wrapper" target="_blank"><i class="fa-solid fa-phone"></i></a>
            <a href="mailto:hello@lumens-electrical.co.uk" target="_blank" class="menu-social-wrapper"><i class="fa-solid fa-envelope"></i></a>
        </div>
        <div class="menu-copy">© 2025, Lumens Electrical. All rights reserved.</div>
    `;

    let header = document.createElement("div");
    header.classList.add("header");
    header.innerHTML = `
        <div class="header-logo-flex">
            <img src="images/logo.png" class="header-logo" />
            <img src="images/logo_txt.png" class="header-logo-txt" />
        </div>

        <div class="header-nav">
            <a href="index.html" class="header-link">Home</a>
            <a href="about.html" class="header-link">About Us</a>
            <a href="gallery.html" class="header-link">Gallery</a>
            <a href="solar.html" class="header-link">Solar PV</a>
            <a href="contact.html" class="header-link">Contact Us</a>
            <a href="terms.html" class="header-link">Terms</a>
        </div>

        <a href="contact.html" class="btn-header">Get in Touch</a>

        <div class="header-menu" onclick="openMenu()">
            <div class="menu-line line1"></div>
            <div class="menu-line line2"></div>
            <div class="menu-line line3"></div>
        </div>
    `;

    let footer = document.createElement("div");
    footer.classList.add("foot-container");
    footer.innerHTML = `
        <div class="foot-flex width">
            <div class="foot-col foot-col-left">
                <div class="foot-logo-flex">
                    <img src="images/logo.png" class="foot-logo" />
                    <img src="images/logo_txt.png" class="foot-logo-txt" />
                </div>
                <div class="foot-para">Lumens Electrical delivers premium, reliable electrical solutions with expert workmanship and trusted service.</div>
                <div class="foot-social">
                    <a class="foot-social-icon" target="_blank" href="https://www.instagram.com/lumens.electrical/"><i class="fa-brands fa-instagram foot-social-icon"></i></a>
                    <a class="foot-social-icon" target="_blank" href="https://www.facebook.com/106385734637991?ref=_xav_ig_profile_page_web"><i class="fa-brands fa-facebook-f foot-social-icon"></i></a>
                    <a href="tel:+4407502999058" target="_blank" class="foot-social-icon"><i class="fa-solid fa-phone foot-social-icon"></i></a>
                    <a href="mailto:hello@lumens-electrical.co.uk" target="_blank" class="foot-social-icon"><i class="fa-solid fa-envelope foot-social-icon"></i></a>
                </div>
            </div>
            <div class="foot-col">
                <div class="foot-label">Useful Links</div>
                <a href="index.html" class="foot-link">Home</a>
                <a href="about.html" class="foot-link">About us</a>
                <a href="gallery.html" class="foot-link">Gallery</a>
                <a href="solar.html" class="foot-link">Solar PV</a>
                <a href="contact.html" class="foot-link">Contact</a>
                <a href="terms.html" class="foot-link">Terms</a>
            </div>
            <div class="foot-col">
                <div class="foot-label">Get in Touch</div>
                <a target="_blank" href="contact.html" class="foot-link">Message Us</a>
                <a target="_blank" href="tel:+4407502999058" class="foot-link">Call Us</a>
                <a target="_blank" href="mailto:hello@lumens-electrical.co.uk" class="foot-link">Email Us</a>
                <a target="_blank" href="https://www.instagram.com/lumens.electrical/" class="foot-link">Instagram</a>
                <a target="_blank" href="https://www.facebook.com/106385734637991?ref=_xav_ig_profile_page_web" class="foot-link">Facebook</a>
            </div>
        </div>
        <div class="foot-hr"></div>

        <div class="foot-copy width">© Lumens Electrical 2025. Website by <a href="https://nextdesignwebsite.com" target="_blank" style="text-decoration: underline; border-top: 0;" class="foot-copy">NextDesign</a>.</div>
    `;

    document.body.prepend(header);
    document.body.prepend(menu);
    document.body.appendChild(footer);
}
createHtml();

const menuContainer = document.querySelector(".menu-container");

function openMenu(){
    menuContainer.style.opacity = "1";
    menuContainer.style.pointerEvents = "auto";
}
function closeMenu(){
    menuContainer.style.opacity = "0";
    menuContainer.style.pointerEvents = "none";
}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.transform = "translateY(0px)";
          entry.target.style.opacity = "1";

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
});
document.querySelectorAll(".scroll-target").forEach(target => {
    observer.observe(target);
});

function startAnimation(){
    document.querySelectorAll(".starter").forEach((el, idx) => {
        setTimeout(() => {
            el.style.opacity = "1";
            el.style.top = "0px";
        }, 250 * (idx + 1));
    });
}
setTimeout(startAnimation, 100);

let heroIdx = 0;
setInterval(() => {
    heroIdx++;
    if(heroIdx == document.querySelectorAll(".hero-img").length) heroIdx = 0;
    document.querySelectorAll(".hero-img").forEach((img, idx) => {
        img.style.opacity = "0";
        if(idx == heroIdx){
            setTimeout(() => {
                img.style.opacity = "1";
            }, 100);
        }
    });
}, 4000);

if(document.querySelector("form")){
  document.querySelector(".form-form").addEventListener("submit", function(e) {
      e.preventDefault();
      const form = e.target;
      const data = new FormData(form);
      fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
      }).then(response => {
      if (response.ok) {
          form.reset();
      } else {
          console.error("NOT OKAY");
      }
      });
  });
}