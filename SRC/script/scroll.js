document.addEventListener("DOMContentLoaded", function () {
    const studies = document.querySelectorAll(".study");

    function revealOnScroll() {
        studies.forEach((study, index) => {
            const studyTop = study.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (studyTop < windowHeight * 0.85) {
                setTimeout(() => {
                    study.classList.add("show");
                }, index * 500); // Delays each animation by 500ms
            }
        });
    }

    // Trigger animation when scrolling
    window.addEventListener("scroll", revealOnScroll);

    // Fallback: If user doesn't scroll, reveal sections after 5 seconds
    setTimeout(() => {
        studies.forEach((study, index) => {
            setTimeout(() => {
                study.classList.add("show");
            }, index * 500);
        });
    }, 5000);

    // Initial check in case sections are already in view
    revealOnScroll();
});
