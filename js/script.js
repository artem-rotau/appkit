'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // Scroll (Header update)
    const header = document.querySelector('#header');

    document.addEventListener('scroll', () => {
        if (window.scrollY) {
            header.classList.add('header__scroll');
        }
        else if (window.scrollY + 'px' == 0 + 'px') {
            header.classList.remove('header__scroll');
        }

    });



    // Navigation
    function navigation(classSelector, idSelector) {
        const links = document.querySelectorAll(classSelector),
              section = document.querySelector(idSelector);

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
    
                window.scroll({
                    left: 0,
                    top: section.offsetTop,
                    behavior: 'smooth',
                });
            });
        });
    }
    navigation('.link__about', '#section_about');
    navigation('.link__testimonials', '#section_customers');
    navigation('.link__features', '#section_features');
    navigation('.link__team', '#section_team');
    navigation('.link__pricing', '#section_pricing');
    navigation('.link__contact', '#section_contact');



    function scrollLinkActive(classSelector, idSelector1, idSelector2) {
        const links = document.querySelectorAll(classSelector),
              section1 = document.querySelector(idSelector1),
              section2 = document.querySelector(idSelector2);

        links.forEach(link => {
            window.addEventListener('scroll', (e) => {
                e.preventDefault();
                if(section1.offsetTop) {
                    link.classList.add('active__scroll');
                    // Hidden Nav
                    link.classList.add('active');
                }
                if (window.scrollY < section1.offsetTop || window.scrollY >= section2.offsetTop) {
                    link.classList.remove('active__scroll');
                    // Hidden Nav
                    link.classList.remove('active');
                }
            });
        });
    }
    scrollLinkActive('.link__about', '#section_about', '#section_customers');
    scrollLinkActive('.link__testimonials', '#section_customers', '#section_features');
    scrollLinkActive('.link__features', '#section_features', '#section_team');
    scrollLinkActive('.link__team', '#section_team', '#section_pricing');
    scrollLinkActive('.link__pricing', '#section_pricing', '#section_contact');



    // Separate function for last link
    function showMyBlock() {
        let footer = document.querySelector('.footer'),
            contact = document.querySelectorAll('.link__contact'),
            pricing = document.querySelectorAll('.link__pricing');

        if(footer.getBoundingClientRect().top < document.documentElement.clientHeight) {
            contact.forEach(item => {
                item.classList.add('active__scroll');
                // Hidden Nav
                item.classList.add('active');
            });
            pricing.forEach(item => {
                item.classList.remove('active__scroll');
                // Hidden Nav
                item.classList.remove('active');
            });
        }
        else {
            contact.forEach(item => {
                item.classList.remove('active__scroll');
                // Hidden Nav
                item.classList.remove('active');
            });
        }
    }
    showMyBlock();
    window.addEventListener('scroll', showMyBlock);



    // HEADING BLOCK AND SLIDER
    function changeBgImg(roundBtn, bgImg, bgActive, btnActive) {
        const bg = document.querySelectorAll(bgImg),
              btns = document.querySelectorAll(roundBtn);

        let slideIndex = 1;

        function showSlides(n) {
            if (n > bg.length) {
                slideIndex = 1;
            }

            if (n < 1) {
                slideIndex = bg.length;
            }
        }
        showSlides(slideIndex);

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        setInterval(() => {
            plusSlides(1);
            hideMyBlock();
            showMyBlock(slideIndex - 1);
        }, 7000);


        function hideMyBlock() {
            bg.forEach(item => {
                item.classList.remove(bgActive);
            });

            btns.forEach(btn => {
                btn.classList.remove(btnActive);
            });
        }

        function showMyBlock(i = 0) {
            bg[i].classList.add(bgActive);
            btns[i].classList.add(btnActive);
        }
        showMyBlock();


        btns.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                hideMyBlock();
                showMyBlock(i);
            });
        });
    }
    changeBgImg('.round__btn', '.heading__background', 'active_bg', 'active');



    // HAMBURGER
    const hamburger = document.querySelector('.hamburger'),
          hiddenNav = document.querySelector('.hidden__nav');
        
    hamburger.addEventListener('click', hamburgerBtn);

    function hamburgerBtn() {
        if (hiddenNav.style.display == 'none') {
            hiddenNav.style.display = 'block';
        } else {
            hiddenNav.style.display = 'none';
        }
    }
    hamburgerBtn();

    function hiddenLinks(classSelector) {
        const links = document.querySelectorAll(classSelector);

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                hiddenNav.style.display = 'none';
            });
        });
    }
    hiddenLinks('.header__link');

    
    // FEATURES BLOCK

    // FEATURES Tabs Active

    function tabs(sectionItem, linkItem, imageItem, imgActive, activeClass, imagesLink) {
        const section = document.querySelector(sectionItem),
              link = document.querySelectorAll(linkItem),
              image = document.querySelectorAll(imageItem),
              imgsLink = document.querySelectorAll(imagesLink) ;

        function hideMyElem() {
            image.forEach(item => {
                item.classList.remove(imgActive);
            });

            link.forEach(item => {
                item.classList.remove(activeClass);
            });
        }

        function showMyElem(i = 0) {
            image[i].style.display = 'block';
            image[i].classList.add(imgActive);
            link[i].classList.add(activeClass);
        }

        hideMyElem();
        showMyElem();

        section.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;

            if (target && (target.classList.contains(linkItem.replace(/\./, '')) ||
            target.parentNode.classList.contains(linkItem.replace(/\./, '')))) {
                link.forEach((item, i) => {
                    if (target == item || target.parentNode == item) {
                        hideMyElem();
                        showMyElem(i);
                    }
                });
            }
        });

        imgsLink.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
            });
        });

    }
    tabs('.features__list', '.features__list__item', '.features__img', 'features__img-active', 'active_link', '.features__img__link');

});
