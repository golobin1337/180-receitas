function redirectWithParams(destination) {
    const currentParams = window.location.search;
    if (!currentParams) {
        window.location.href = destination;
        return;
    }

    if (destination.includes("?")) {
        window.location.href = destination + "&" + currentParams.substring(1);
    } else {
        window.location.href = destination + currentParams;
    }
}

function scrollFeedback(btn, dir) {
    const track = btn.parentElement.querySelector('.fc-track');
    const slide = track.querySelector('.fc-slide');
    const amount = slide ? slide.getBoundingClientRect().width + 16 : 260;
    track.scrollBy({ left: amount * dir, behavior: 'smooth' });
}

document.querySelectorAll('.fc-track').forEach(track => {
    const advance = () => {
        const slide = track.querySelector('.fc-slide');
        if (!slide) return;
        const amount = slide.getBoundingClientRect().width + 16;
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
        track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + amount, behavior: 'smooth' });
    };

    let autoplay = setInterval(advance, 4000);
    const pause = () => clearInterval(autoplay);
    const resume = () => { clearInterval(autoplay); autoplay = setInterval(advance, 4000); };

    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resume);
    track.addEventListener('touchstart', pause, { passive: true });
    track.addEventListener('touchend', resume);
});

function toggleFaq(btn) {
    const answer = btn.nextElementSibling;
    const isOpen = answer.classList.contains('open');

    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-btn').forEach(b => b.classList.remove('open'));

    if (!isOpen) {
        answer.classList.add('open');
        btn.classList.add('open');
    }
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const stickyCta = document.getElementById('sticky-cta');
const hero = document.querySelector('.hero');
const pricing = document.getElementById('comprar');
if (stickyCta && hero) {
    const onScroll = () => {
        const heroGone = hero.getBoundingClientRect().bottom < 0;
        const pricingVisible = pricing && pricing.getBoundingClientRect().top < window.innerHeight;
        const show = heroGone && !pricingVisible;
        stickyCta.classList.toggle('visible', show);
        document.body.style.paddingBottom = show ? '72px' : '';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
}
