/**
 * --------------------------------------------------------------------------
 * ROCKSTAR INTERACTION SYSTEM - INTEGRATED MASTER SCRIPT (FIXED NAV VERSION)
 * --------------------------------------------------------------------------
 */
document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================
    // 00. GLOBAL ENGINE INITIALIZE (단 하나의 스크롤 컨트롤러)
    // ==========================================
    const controller = new ScrollMagic.Controller();
    
    // 네비게이션 액티브 싱크를 위해 Scene들을 수집할 마스터 객체
    const masterScenes = {};

    // ==========================================
    // 01. HERO SECTION (최초 시네마틱 등장 + 스크롤 락 방어 시스템)
    // ==========================================
    const heroIntroTl = gsap.timeline();

    heroIntroTl
        .to(".hero-characters", { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" })
        .to(".hero-section .main-logo", { opacity: 1, duration: 0.5, ease: "power2.out" }, ">") 
        .to(".hero-section .main-title", { opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2")
        .to(".hero-section .sub-text", { opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2")
        .to(".hero-section .description-text", { opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2")
        .to(".hero-section .duration-box", { opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2")
        .fromTo(".hero-section .highlight-date", 
            { scale: 1 }, { scale: 1.03, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 }, "-=0.05"
        );

    const heroScrollTl = gsap.timeline();
    heroScrollTl
        .to(".hero-characters", { scale: 1.3, opacity: 0, ease: "none", duration: 1.5 }, 0)
        .to(".hero-section .hero-bg-layer", { opacity: 0, ease: "none", duration: 1.5 }, 0) 
        .to(".morph-target", {
            x: 50,
            scale: 0.95,
            letterSpacing: "-1.5px",
            duration: 0.8,
            ease: "power1.inOut"
        }, 1.5)
        .to(".row-1", { opacity: 0, y: -25, duration: 0.4, ease: "power1.in" }, 2.3)
        .to(".row-2", { opacity: 0, y: -25, duration: 0.4, ease: "power1.in" }, 2.7)
        .to(".row-3", { opacity: 0, y: -25, duration: 0.4, ease: "power1.in" }, 3.1)
        .to(".row-4", { opacity: 0, y: -25, duration: 0.4, ease: "power1.in" }, 3.5)
        .to(".row-last", { opacity: 1, duration: 3.9 }, 0)
        .to(".row-last", { opacity: 0, y: -30, scale: 0.9, duration: 0.5, ease: "power1.in" }, 3.9)
        .to({}, { duration: 1.0 }, 4.4);

    const heroScene = new ScrollMagic.Scene({
        triggerElement: "#hero-pinned-trigger",
        triggerHook: 0,
        duration: "400%" 
    })
    .setPin("#hero-pinned-trigger .hero-sticky-viewport", { pushFollowers: true }) 
    .setTween(heroScrollTl)
    .addTo(controller);

    masterScenes["#hero-pinned-trigger"] = heroScene;

    heroScene.on("update", function() {
        const progress = heroScene.progress();
        const triggerStart = heroScene.triggerPosition();
        if (progress > 0 && progress < 0.98) {
            if (window.scrollY > triggerStart + heroScene.duration()) {
                window.scrollTo(0, triggerStart + heroScene.duration() - 2);
            }
        }
    });

    heroScene.on("progress", function(event) {
        if (event.progress >= 0.99) {
            gsap.set(".hero-characters, .hero-section .hero-bg-layer, .row-1, .row-2, .row-3, .row-4, .row-last", { opacity: 0 });
        } else if (event.progress <= 0) {
            gsap.set(".hero-characters, .hero-section .hero-bg-layer", { opacity: 1 });
        }
    });


    // ==========================================================================
    // 02. BENEFIT CARD SECTION (이벤트 소개)
    // ==========================================================================
    const benefitTl = gsap.timeline();
    gsap.set(".benefit-header h3, .benefit-header h2, .benefit-divider, .benefit-date", { opacity: 0, y: 30 });
    gsap.set(".benefit-card .card-inner", { rotateY: 0 });

    benefitTl
        .to(".benefit-header h3", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
        .to(".benefit-header h2", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
        .to(".benefit-divider", { opacity: 1, y: 0, scaleX: 1, duration: 0.5, ease: "power2.out" }, "-=0.3")
        .to(".benefit-date", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
        .to(".benefit-card .card-inner", {
            rotateY: 180,
            duration: 1.0,
            stagger: 0.35,
            ease: "power2.inOut"
        }, "+=0.2")
        .to({}, { duration: 1.5 }); 

    const benefitScene = new ScrollMagic.Scene({
        triggerElement: "#benefit-pinned-trigger",
        triggerHook: 0,       
        duration: "350%"       
    })
    .setPin("#benefit-pinned-trigger", { pushFollowers: true }) 
    .setTween(benefitTl)
    .addTo(controller);

    masterScenes["#benefit-pinned-trigger"] = benefitScene;


    // ==========================================
    // 03. MONEY-SECTION (초기 자금)
    // ==========================================
    const moneyTimeline = new gsap.timeline();
    moneyTimeline
        .to(".money-section .bed-background", { opacity: 1, duration: 1.5, ease: "power1.inOut" })
        .to(".money-num", { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.5")
        .to(".money-title", { opacity: 1, duration: 1.0, ease: "power2.out" })
        .to(".money-section .image-side", { right: "0%", opacity: 1, duration: 1.6, ease: "power2.out" }, "-=1.0")
        .to(".money-p", { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.4")
        .to(".money-notice", { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.3");

    const moneyScene = new ScrollMagic.Scene({
        triggerElement: "#money-trigger",
        triggerHook: 0,
        duration: "250%"
    })
    .setPin("#money-trigger")
    .setTween(moneyTimeline)
    .addTo(controller);

    masterScenes["#money-trigger"] = moneyScene;


    // ==========================================
    // 04. PROPERTY-SECTION (비즈니스 거점 상단)
    // ==========================================
    const propertyTimeline = new gsap.timeline();
    propertyTimeline
        .to(".property-section", { opacity: 1, duration: 1, ease: "power1.inOut" })
        .to(".property-section .character-wrapper", { bottom: "0px", opacity: 1, duration: 1.2, ease: "power2.out" })
        .to(".property-section .gradient-overlay", { right: "-50%", opacity: 1, duration: 2.0, ease: "power2.out" }, "-=0.2")
        .to(".property-section .character-wrapper", { right: "15%", duration: 1.8, ease: "power2.out" }, "-=1.5")
        .to(".property-content-right .section-number", { opacity: 1, translateY: 0, duration: 0.6, ease: "power2.out" }, "-=1.0") 
        .to(".property-content-right h2", { opacity: 1, translateY: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .to(".property-content-right .desc", { opacity: 1, translateY: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");

    const propertyScene = new ScrollMagic.Scene({
        triggerElement: "#property-trigger",
        triggerHook: 0,
        duration: "220%" 
    })
    .setPin(".property-section")
    .setTween(propertyTimeline)
    .addTo(controller);

    masterScenes["#property-trigger"] = propertyScene;


    // ==========================================
    // 04-B. MAP INTERACTIVE SECTION (비즈니스 거점 하단 지도 고정 구역)
    // ==========================================
    const mapTimeline = gsap.timeline();
    mapTimeline
        .to(".map-interactive-section .property-selector .title", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
        .to(".map-interactive-section .property-item", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.4 }, "+=0.1")
        .to(".map-interactive-section .map-wrapper", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "+=0.1")
        .to({}, { duration: 1.2 });

    const mapScene = new ScrollMagic.Scene({
        triggerElement: "#map-pin-trigger",
        triggerHook: 0,
        duration: "250%"   
    })
    .setPin(".map-interactive-section", { pushFollowers: true })
    .setTween(mapTimeline)
    .addTo(controller);

    masterScenes["#map-pin-trigger"] = mapScene;


    // ==========================================
    // 05. INTERACTIVE MAP & ACCORDION
    // ==========================================
    const propertyItems = document.querySelectorAll(".property-item");
    const mapCanvas = document.querySelector(".map-inner-canvas");
    const markers = document.querySelectorAll(".marker");

    const mapCoordinates = {
        alta: { transform: "translate(-10%, -10%) scale(1.6)" },
        maze: { transform: "translate(15%, 15%) scale(1.8)" },
        railyard: { transform: "translate(-25%, -20%) scale(1.5)" },
        default: { transform: "translate(0, 0) scale(1)" }
    };

    propertyItems.forEach(item => {
        item.addEventListener("click", function() {
            const targetProp = this.getAttribute("data-target");
            const isActive = this.classList.contains("active");

            propertyItems.forEach(el => el.classList.remove("active"));
            markers.forEach(mk => mk.classList.remove("scale-up"));

            if (!isActive) {
                this.classList.add("active");
                const targetMarker = document.querySelector(`.marker[data-prop="${targetProp}"]`);
                if (targetMarker) targetMarker.classList.add("scale-up");
                if (mapCanvas && mapCoordinates[targetProp]) {
                    mapCanvas.style.transform = mapCoordinates[targetProp].transform;
                }
            } else {
                if (mapCanvas) mapCanvas.style.transform = mapCoordinates["default"].transform;
            }
        });
    });


    // ==========================================
    // 06. VEHICLE INTRO — scroll-scrubbed, reversible reveal
    // ==========================================
    const vehicleIntro = document.querySelector(".vehicle-intro-section");
    if (vehicleIntro && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const canPinVehicleIntro = () => window.innerWidth >= 900 && window.innerHeight >= 600;
        const sizeVehicleIntro = () => {
            const navigation = document.querySelector(".sticky-nav");
            vehicleIntro.style.setProperty("--intro-nav-height", `${navigation ? navigation.offsetHeight : 0}px`);
            vehicleIntro.style.setProperty("--intro-screen-height", `${window.innerHeight}px`);
            vehicleIntro.classList.toggle("vehicle-scroll-stage", canPinVehicleIntro());
        };
        sizeVehicleIntro();
        const vehicleIntroTimeline = gsap.timeline({ defaults: { ease: "none" } });
        vehicleIntroTimeline
            .fromTo(vehicleIntro.querySelector(".image-right"),
                { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.8 })
            .fromTo(vehicleIntro.querySelector(".section-number"),
                { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.55 })
            .fromTo(vehicleIntro.querySelector(".text-left h2"),
                { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55 })
            .fromTo(vehicleIntro.querySelector(".text-left p"),
                { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55 });

        const vehicleIntroScene = new ScrollMagic.Scene({
            triggerElement: "#vehicle-intro-section",
            triggerHook: canPinVehicleIntro() ? 0 : 0.85,
            duration: () => window.innerHeight * (canPinVehicleIntro() ? 1.8 : 0.6),
            reverse: true,
            tweenChanges: false
        })
        .setTween(vehicleIntroTimeline)
        .addTo(controller);

        let vehicleIsPinned = canPinVehicleIntro();
        if (vehicleIsPinned) vehicleIntroScene.setPin(vehicleIntro, { pushFollowers: true });
        window.addEventListener("resize", () => {
            const shouldPin = canPinVehicleIntro();
            if (vehicleIsPinned && !shouldPin) vehicleIntroScene.removePin(true);
            sizeVehicleIntro();
            vehicleIntroScene.triggerHook(shouldPin ? 0 : 0.85);
            if (!vehicleIsPinned && shouldPin) vehicleIntroScene.setPin(vehicleIntro, { pushFollowers: true });
            vehicleIsPinned = shouldPin;
            vehicleIntroScene.refresh();
            controller.update(true);
        });

        masterScenes["#vehicle-intro-section"] = vehicleIntroScene;
    }

    // Vehicle carousel
    const track = document.getElementById("image-track");
    if (track) {
        const originalSlides = track.querySelectorAll(".slide");
        const prevBtn = document.querySelector(".prev-btn");
        const nextBtn = document.querySelector(".next-btn");
        
        const brandTxt = document.getElementById("fixed-brand");
        const modelTxt = document.getElementById("fixed-model");
        const classTxt = document.getElementById("fixed-class");
        
        const barSpeed = document.getElementById("bar-speed");
        const barAccel = document.getElementById("bar-accel");
        const barBrake = document.getElementById("bar-brake");
        const barTraction = document.getElementById("bar-traction");
        
        const valSpeed = document.getElementById("val-speed");
        const valAccel = document.getElementById("val-accel");
        const valBrake = document.getElementById("val-brake");
        const valTraction = document.getElementById("val-traction");

        const getSlideWidth = () => originalSlides[0].getBoundingClientRect().width; 
        const slideCount = originalSlides.length;
        let currentIndex = 1; 
        let isTransitioning = false;

        if (slideCount > 0) {
            const firstClone = originalSlides[0].cloneNode(true);
            const lastClone = originalSlides[slideCount - 1].cloneNode(true);
            firstClone.classList.remove("active");
            lastClone.classList.remove("active");
            
            track.appendChild(firstClone);
            track.insertBefore(lastClone, track.firstChild);

            let allSlides = track.querySelectorAll(".slide");
            
            const syncSpecsAndText = (activeSlide) => {
                if (brandTxt) brandTxt.textContent = activeSlide.getAttribute("data-brand");
                if (modelTxt) modelTxt.textContent = activeSlide.getAttribute("data-model");
                if (classTxt) classTxt.textContent = activeSlide.getAttribute("data-class");

                if (barSpeed) barSpeed.style.width = activeSlide.getAttribute("data-spec1") + "%";
                if (barAccel) barAccel.style.width = activeSlide.getAttribute("data-spec2") + "%";
                if (barBrake) barBrake.style.width = activeSlide.getAttribute("data-spec3") + "%";
                if (barTraction) barTraction.style.width = activeSlide.getAttribute("data-spec4") + "%";

                if (valSpeed) valSpeed.textContent = activeSlide.getAttribute("data-val1");
                if (valAccel) valAccel.textContent = activeSlide.getAttribute("data-val2");
                if (valBrake) valBrake.textContent = activeSlide.getAttribute("data-val3");
                if (valTraction) valTraction.textContent = activeSlide.getAttribute("data-val4");
            };

            const updateSlider = (useAnimation = true) => {
                track.style.transition = useAnimation ? "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)" : "none";
                const slideWidth = getSlideWidth();
                const centerOffset = (track.parentElement.clientWidth / 2) - (slideWidth / 2);
                const transformX = -(currentIndex * slideWidth) + centerOffset;
                track.style.transform = `translateX(${transformX}px)`;

                allSlides.forEach((slide, idx) => {
                    if (idx === currentIndex) {
                        slide.classList.add("active");
                        syncSpecsAndText(slide);
                    } else {
                        slide.classList.remove("active");
                    }
                });
            };

            updateSlider(false);

            track.addEventListener("transitionend", function(event) {
                if (event.target !== track || event.propertyName !== "transform") return;
                isTransitioning = false;
                if (currentIndex === slideCount + 1) {
                    track.style.transition = "none";
                    currentIndex = 1;
                    const slideWidth = getSlideWidth();
                    const centerOffset = (track.parentElement.clientWidth / 2) - (slideWidth / 2);
                    track.style.transform = `translateX(${-(currentIndex * slideWidth) + centerOffset}px)`;
                }
                if (currentIndex === 0) {
                    track.style.transition = "none";
                    currentIndex = slideCount;
                    const slideWidth = getSlideWidth();
                    const centerOffset = (track.parentElement.clientWidth / 2) - (slideWidth / 2);
                    track.style.transform = `translateX(${-(currentIndex * slideWidth) + centerOffset}px)`;
                }
                allSlides.forEach((slide, idx) => {
                    if (idx === currentIndex) slide.classList.add("active");
                    else slide.classList.remove("active");
                });
            });

            if (nextBtn) {
                nextBtn.addEventListener("click", () => {
                    if (isTransitioning) return;
                    isTransitioning = true;
                    currentIndex++;
                    updateSlider(true);
                });
            }

            if (prevBtn) {
                prevBtn.addEventListener("click", () => {
                    if (isTransitioning) return;
                    isTransitioning = true;
                    currentIndex--;
                    updateSlider(true);
                });
            }

            window.addEventListener("resize", () => {
                isTransitioning = false;
                if (currentIndex === slideCount + 1) currentIndex = 1;
                if (currentIndex === 0) currentIndex = slideCount;
                updateSlider(false);
            });
        }
    }


    // ==========================================
    // 08. WEEKLY NEWS HORIZONTAL DRAG & WHEEL CONTROL (주간 업데이트)
    // ==========================================
    if (typeof initializePodiumReveal === "function") initializePodiumReveal(controller);

    const slider = document.querySelector(".weekly-grid-wrapper");
    if (slider) {
        let isDown = false; 
        let startX;         
        let scrollLeft;     
        let velX = 0;
        let momentumID = null;
        let lastX = 0;

        const updateMomentum = () => {
            if (isDown) return;
            slider.scrollLeft += velX;
            velX *= 0.92;
            if (Math.abs(velX) > 0.5) {
                momentumID = requestAnimationFrame(updateMomentum);
            }
        };

        slider.addEventListener("mousedown", (e) => {
            if (e.button !== 0) return;
            isDown = true;
            cancelAnimationFrame(momentumID); 
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            lastX = e.pageX;
            velX = 0;
        });

        slider.addEventListener("mousemove", (e) => {
            if (!isDown) return; 
            e.preventDefault(); 
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.5; 
            slider.scrollLeft = scrollLeft - walk;
            velX = lastX - e.pageX; 
            lastX = e.pageX;
        });

        window.addEventListener("mouseup", () => {
            if (!isDown) return;
            isDown = false;
            cancelAnimationFrame(momentumID);
            momentumID = requestAnimationFrame(updateMomentum);
        });

        slider.addEventListener("mouseleave", () => {
            if (!isDown) return;
            isDown = false;
            cancelAnimationFrame(momentumID);
            momentumID = requestAnimationFrame(updateMomentum);
        });

        slider.addEventListener("wheel", (e) => {
            if (e.shiftKey && e.deltaY !== 0) {
                e.preventDefault();
                slider.scrollBy({ left: e.deltaY * 1.5, behavior: "smooth" });
            }
        });
    }


    // ==========================================
    // 09. INTEGRATED SCROLL REVEAL ENGINE
    // ==========================================
    const countTarget = document.querySelector(".count-target");
    let countAnimationID = null;
    let priceTimeoutID = null;
    let missionTimeoutIDs = []; 
    let careerTimeoutIDs = [];  
    let plateTimeoutIDs = [];   

    function animatePriceValue(start, end, duration) {
        const startTime = performance.now();
        function updateNumber(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuad = progress * (2 - progress);
            const currentValue = Math.floor(start - (start - end) * easeOutQuad);
            if (countTarget) countTarget.textContent = currentValue.toLocaleString();
            if (progress < 1) countAnimationID = requestAnimationFrame(updateNumber);
            else if (countTarget) countTarget.textContent = end.toLocaleString();
        }
        countAnimationID = requestAnimationFrame(updateNumber);
    }

    function triggerWeeklyNewsAnimation(section) {
        const title = section.querySelector(".section-heading-title");
        if (title) title.classList.add("reveal-active");
        const cards = Array.from(section.querySelectorAll(".feature-card"));
        cards.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
        cards.forEach((card, index) => {
            setTimeout(() => { card.classList.add("card-active"); }, (index + 1) * 110);
        });
    }

    function triggerMissionCreatorAnimation(section) {
        missionTimeoutIDs.forEach(id => clearTimeout(id));
        missionTimeoutIDs = [];
        section.classList.add("reveal-active");
        const lines = section.querySelectorAll(".desc-line");
        lines.forEach((line, index) => {
            const tId = setTimeout(() => { line.classList.add("line-active"); }, 800 + (index * 150));
            missionTimeoutIDs.push(tId);
        });
        const btn = section.querySelector(".btn-more");
        if (btn) {
            const bId = setTimeout(() => { btn.classList.add("btn-active"); }, 800 + (lines.length * 150) + 200);
            missionTimeoutIDs.push(bId);
        }
    }

    function triggerCareerProgressionAnimation(section) {
        careerTimeoutIDs.forEach(id => clearTimeout(id));
        careerTimeoutIDs = [];
        section.classList.add("reveal-active");
        const careerDescLines = section.querySelectorAll(".career-description .career-desc-line");
        careerDescLines.forEach((line, index) => {
            const tId = setTimeout(() => { line.classList.add("line-active"); }, 800 + (index * 150));
            careerTimeoutIDs.push(tId);
        });
        const btnMore = section.querySelector(".btn-more");
        if (btnMore) {
            const btnId = setTimeout(() => { btnMore.classList.add("btn-active"); }, 800 + (careerDescLines.length * 150) + 200);
            careerTimeoutIDs.push(btnId);
        }
    }

    function triggerLicensePlateAnimation(section) {
        plateTimeoutIDs.forEach(id => clearTimeout(id));
        plateTimeoutIDs = [];
        section.classList.add("reveal-active");
        const plateDescLines = section.querySelectorAll(".plate-description .plate-desc-line");
        plateDescLines.forEach((line, index) => {
            const tId = setTimeout(() => { line.classList.add("line-active"); }, 800 + (index * 150));
            plateTimeoutIDs.push(tId);
        });
        const btnMore = section.querySelector(".plate-content .btn-more");
        if (btnMore) {
            const btnId = setTimeout(() => { btnMore.classList.add("btn-active"); }, 800 + (plateDescLines.length * 150) + 200);
            plateTimeoutIDs.push(btnId);
        }
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const cl = entry.target.classList;
            const isSpecial = cl.contains("mission-creator-section") || cl.contains("career-progression-section") || cl.contains("license-plate-section") || cl.contains("feedback-banner-section") || cl.contains("newsletter-section");
            
            if (entry.isIntersecting) {
                if (!isSpecial) cl.add("reveal-active");

                if (cl.contains("weekly-news-section")) triggerWeeklyNewsAnimation(entry.target);
                if (cl.contains("mission-creator-section")) triggerMissionCreatorAnimation(entry.target);
                if (cl.contains("career-progression-section")) triggerCareerProgressionAnimation(entry.target);
                if (cl.contains("license-plate-section")) triggerLicensePlateAnimation(entry.target);
                if (cl.contains("feedback-banner-section")) cl.add("reveal-active");
                if (cl.contains("newsletter-section")) cl.add("reveal-active");
                
                if (cl.contains("price-details-card")) {
                    clearTimeout(priceTimeoutID);
                    cancelAnimationFrame(countAnimationID);
                    priceTimeoutID = setTimeout(() => { animatePriceValue(36790, 18390, 600); }, 1000);
                }
            } else {
                if (!isSpecial) cl.remove("reveal-active");
                
                if (cl.contains("weekly-news-section")) {
                    const title = entry.target.querySelector(".section-heading-title");
                    if (title) title.classList.remove("reveal-active");
                    entry.target.querySelectorAll(".feature-card").forEach(card => card.classList.remove("card-active"));
                }
                if (cl.contains("mission-creator-section")) {
                    cl.remove("reveal-active");
                    missionTimeoutIDs.forEach(id => clearTimeout(id));
                    entry.target.querySelectorAll(".desc-line").forEach(line => line.classList.remove("line-active"));
                    const btn = entry.target.querySelector(".btn-more");
                    if (btn) btn.classList.remove("btn-active");
                }
                if (cl.contains("career-progression-section")) {
                    cl.remove("reveal-active");
                    careerTimeoutIDs.forEach(id => clearTimeout(id));
                    entry.target.querySelectorAll(".career-desc-line").forEach(line => line.classList.remove("line-active"));
                    const btn = entry.target.querySelector(".btn-more");
                    if (btn) btn.classList.remove("btn-active");
                }
                if (cl.contains("license-plate-section")) {
                    cl.remove("reveal-active");
                    plateTimeoutIDs.forEach(id => clearTimeout(id));
                    entry.target.querySelectorAll(".plate-desc-line").forEach(line => line.classList.remove("line-active"));
                    const btn = entry.target.querySelector(".plate-content .btn-more");
                    if (btn) btn.classList.remove("btn-active");
                }
                if (cl.contains("feedback-banner-section") || cl.contains("newsletter-section")) {
                    cl.remove("reveal-active");
                }
                if (cl.contains("price-details-card")) {
                    clearTimeout(priceTimeoutID);
                    cancelAnimationFrame(countAnimationID);
                    if (countTarget) countTarget.textContent = "36,790"; 
                }
            }
        });
    }, { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.15 });

    const textElements = document.querySelectorAll(".scroll-reveal-text");
    const leftImages = document.querySelectorAll(".stack-img-frame");
    const rightPackageImage = document.querySelector(".showcase-thumbnail-frame"); 
    const priceCard = document.querySelector(".price-details-card");
    const weeklySection = document.querySelector(".weekly-news-section"); 
    const missionSection = document.querySelector(".mission-creator-section");
    const careerSection = document.querySelector(".career-progression-section");
    const plateSection = document.querySelector(".license-plate-section"); 
    const feedbackSection = document.querySelector(".feedback-banner-section");
    const newsletterSection = document.querySelector(".newsletter-section");

    textElements.forEach(el => revealObserver.observe(el));
    leftImages.forEach(el => revealObserver.observe(el));
    if (rightPackageImage) revealObserver.observe(rightPackageImage);
    if (priceCard) revealObserver.observe(priceCard);
    if (weeklySection) revealObserver.observe(weeklySection); 
    if (missionSection) revealObserver.observe(missionSection);
    if (careerSection) revealObserver.observe(careerSection);
    if (plateSection) revealObserver.observe(plateSection); 
    if (feedbackSection) revealObserver.observe(feedbackSection);
    if (newsletterSection) revealObserver.observe(newsletterSection);


    // ==========================================
    // 10. SCROLLMAGIC PINNED CTA SECTION
    // ==========================================
    const ctaTimeline = new gsap.timeline();
    ctaTimeline
        .to(".pinned-cta-section .black-gradient-side", { opacity: 1, duration: 0.8 })
        .to(".cta-inner-content .fade-el", { opacity: 1, translateY: 0, duration: 0.6, stagger: 0.25 });

    new ScrollMagic.Scene({
        triggerElement: "#cta-pin-trigger",
        triggerHook: 0,
        duration: "120%" 
    })
    .setPin(".pinned-cta-section")
    .setTween(ctaTimeline)
    .addTo(controller);


    // ==========================================
    // 11. DYNAMIC SEARCH SYSTEM
    // ==========================================
    const searchWrapper = document.getElementById("searchWrapper");
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.querySelector(".search-input");

    if (searchWrapper && searchBtn && searchInput) {
        searchBtn.addEventListener("click", (e) => {
            if (!searchWrapper.classList.contains("active")) {
                e.preventDefault();
                searchWrapper.classList.add("active");
                searchInput.focus();
            } else {
                if (searchInput.value.trim() === "") {
                    e.preventDefault();
                    searchWrapper.classList.remove("active");
                }
            }
        });

        document.addEventListener("click", (e) => {
            if (!searchWrapper.contains(e.target)) {
                searchWrapper.classList.remove("active");
            }
        });
    }

    // ==========================================================================
    // 12. [★통합 및 오작동 해결] 네비게이션 고도화 클릭 및 스크롤 감시 통합 제어
    // ==========================================================================
    const navLinks = document.querySelectorAll(".nav-menu a");
    const stickyNav = document.querySelector(".sticky-nav");
    const getNavHeight = () => stickyNav ? stickyNav.offsetHeight : 0;

    // 실시간 스크롤 시 불빛 연동 활성화 (ScrollMagic Scene 기반)
    Object.keys(masterScenes).forEach((id) => {
        const targetLink = document.querySelector(`.nav-menu a[href="${id}"]`);
        if (targetLink) {
            masterScenes[id].on("enter", () => {
                navLinks.forEach((l) => l.classList.remove("active"));
                targetLink.classList.add("active");
            });
            masterScenes[id].on("leave", (event) => {
                if (event.scrollDirection === "REVERSE") {
                    targetLink.classList.remove("active");
                    const index = Array.from(navLinks).indexOf(targetLink);
                    if (index > 0) navLinks[index - 1].classList.add("active");
                }
            });
        }
    });

    // 클릭 시 완벽 목적지 점프 브릿지 시스템
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (!targetElement) return;

            const targetScene = masterScenes[targetId];

            if (targetScene) {
                // [CASE A] ScrollMagic 고정(Pin) 섹션인 경우 처리
                const sectionStartPos = targetScene.scrollOffset();
                const sectionDuration = targetScene.duration();

                // 인터랙션이 끝나고 고정이 풀리기 바로 직전 타이밍 연출
                const targetPosition = sectionStartPos + sectionDuration - getNavHeight() + 50;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            } else {
                // [CASE B] 첫 애마, 주간 업데이트 등 일반 섹션인 경우 처리
                // ScrollMagic이 아닌 순수 절대 위치를 계산하여 상단 네비바 오프셋만 빼고 부드럽게 이동
                const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;
                const targetPosition = elementTop - getNavHeight() - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });

                // 액티브 강제 갱신
                navLinks.forEach((l) => l.classList.remove("active"));
                link.classList.add("active");
            }
        });
    });
});
