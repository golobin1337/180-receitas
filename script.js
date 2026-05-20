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
        stickyCta.classList.toggle('visible', heroGone && !pricingVisible);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
}
