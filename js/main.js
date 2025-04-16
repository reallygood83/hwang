document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
    });
    
    // 스크롤 시 네비게이션 활성화
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // 스크롤 시 요소 페이드인 효과
    const fadeElements = document.querySelectorAll('.section-header, .subsection, .info-box, .timeline, .image-container, .challenge-card, .role-card, .tool-category, .case-study, .mindset-item, .balance-container');
    
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Intersection Observer로 화면에 보이는 요소에 active 클래스 추가
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // 네비게이션 부드러운 스크롤 효과
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // 모바일 메뉴 열려있으면 닫기
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // 현재 위치에 맞게 초기 네비게이션 활성화
    function setInitialActiveNav() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= (sectionTop - 200) && 
                scrollPosition < (sectionTop + sectionHeight - 200)) {
                const currentId = section.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === currentId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // 페이지 로드 시 네비게이션 활성화
    setInitialActiveNav();
    
    // 헤더 스크롤 효과 - 스크롤 시 작아지는 효과
    const header = document.getElementById('main-header');
    const nav = document.getElementById('main-nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            nav.classList.add('sticky');
        } else {
            header.classList.remove('scrolled');
            nav.classList.remove('sticky');
        }
    });
    
    // 아코디언 기능
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // 현재 아코디언 아이템을 토글
            const accordionItem = this.parentElement;
            accordionItem.classList.toggle('active');
            
            // 다른 아코디언 아이템은 닫기 (선택 사항)
            // const activeItems = document.querySelectorAll('.accordion-item.active');
            // activeItems.forEach(item => {
            //     if (item !== accordionItem) {
            //         item.classList.remove('active');
            //     }
            // });
        });
    });
    
    // 페이지 로드 시 첫 번째 아코디언 아이템을 자동으로 열기 (선택 사항)
    const firstAccordionItem = document.querySelector('.accordion-item');
    if (firstAccordionItem) {
        firstAccordionItem.classList.add('active');
    }
    
    // 처음 로드 시 모든 아코디언 열기 (대안 옵션)
    // document.querySelectorAll('.accordion-item').forEach(item => {
    //     item.classList.add('active');
    // });
}); 