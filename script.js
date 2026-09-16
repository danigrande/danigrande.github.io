document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.dropdown-toggle').forEach(function (toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            this.parentElement.classList.toggle('open');
        });
    });

    var accordions = document.querySelectorAll('.accordion');

    accordions.forEach(function (accordion) {
        var header = accordion.querySelector('.accordion-header');
        var body = accordion.querySelector('.accordion-body');
        var inner = accordion.querySelector('.accordion-body-inner');

        if (!header || !body || !inner) {
            return;
        }

        header.addEventListener('click', function () {
            var isOpen = accordion.classList.contains('active');

            accordions.forEach(function (a) {
                a.classList.remove('active');
                var b = a.querySelector('.accordion-body');
                if (b) {
                    b.style.maxHeight = '0';
                }
            });

            if (!isOpen) {
                accordion.classList.add('active');
                body.style.maxHeight = inner.scrollHeight + 32 + 'px';
            }
        });
    });

    window.addEventListener('resize', function () {
        document.querySelectorAll('.accordion.active').forEach(function (accordion) {
            var body = accordion.querySelector('.accordion-body');
            var inner = accordion.querySelector('.accordion-body-inner');
            if (body && inner) {
                body.style.maxHeight = inner.scrollHeight + 32 + 'px';
            }
        });
    });
});
