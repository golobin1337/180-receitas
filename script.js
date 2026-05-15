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
