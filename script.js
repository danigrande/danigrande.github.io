(function () {
    var params = new URLSearchParams(window.location.search);
    if (params.has('notrack')) {
        localStorage.setItem('umami.disabled', 1);
        params.delete('notrack');
        var query = params.toString();
        history.replaceState(null, '', window.location.pathname + (query ? '?' + query : '') + window.location.hash);
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('open');
        });
    }

    document.querySelectorAll('.dropdown-toggle').forEach(function (toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            this.parentElement.classList.toggle('open');
        });
    });
});

function trackEvent(name, data) {
    if (window.umami && typeof window.umami.track === 'function') {
        window.umami.track(name, data);
    }
}

document.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (!link) {
        return;
    }

    var href = link.getAttribute('href') || '';

    if (href.indexOf('linkedin.com') !== -1) {
        trackEvent('cta-linkedin');
    } else if (href === '#projects') {
        trackEvent('cta-view-projects');
    } else if (/^(project-|ai-strategy|evals-|spec-driven|llm-agentic)/.test(href)) {
        trackEvent('page-link', { target: href });
    }
});
