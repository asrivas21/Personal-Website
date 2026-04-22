(function () {
    var intro = document.querySelector('.intro');
    var board = document.querySelector('.board');
    var crawl = document.querySelector('.crawl');
    var hint  = document.querySelector('.hint');

    var skillsSection  = document.querySelector('#skills-section');
    var skillsBanner   = skillsSection.querySelector('.banner');
    var skillsRule     = skillsSection.querySelector('.rule');
    var skillsGrid     = skillsSection.querySelector('.skills-grid');

    var projectsSection = document.querySelector('#projects-section');
    var projectsBanner  = projectsSection.querySelector('.banner');
    var projectsRule    = projectsSection.querySelector('.rule');
    var projectsGrid    = projectsSection.querySelector('.projects-grid');

    var experienceSection = document.querySelector('#experience-section');
    var experienceBanner  = experienceSection.querySelector('.banner');
    var experienceRule    = experienceSection.querySelector('.rule');
    var experienceList    = experienceSection.querySelector('.timeline');

    var contactSection = document.querySelector('#contact-section');
    var contactBanner  = contactSection.querySelector('.banner');
    var contactRule    = contactSection.querySelector('.rule');
    var contactGrid    = contactSection.querySelector('.contact-grid');

    // Crawl travels from top: 100% (off-screen bottom) to top: -250% (off-screen top).
    var CRAWL_START = 100;
    var CRAWL_END = -250;

    // Scroll-progress phase boundaries (0..1)
    var CRAWL_DONE      = 0.14;
    var BOARD_FADE      = [0.12, 0.18];
    var INTRO_OUT       = [0.00, 0.05];
    var HINT_OUT        = [0.02, 0.05];

    // Skills phases
    var SKILLS_IN       = [0.16, 0.22];
    var SKILLS_BANNER   = [0.18, 0.25];
    var SKILLS_RULE     = [0.24, 0.30];
    var SKILLS_GRID     = [0.28, 0.35];
    var SKILLS_OUT      = [0.37, 0.43]; // fades out as projects come in

    // Projects phases
    var PROJECTS_IN     = [0.39, 0.45];
    var PROJECTS_BANNER = [0.41, 0.47];
    var PROJECTS_RULE   = [0.45, 0.50];
    var PROJECTS_GRID   = [0.48, 0.56];
    var PROJECTS_OUT    = [0.57, 0.63]; // fades out as experience comes in

    // Experience phases
    var EXPERIENCE_IN     = [0.60, 0.66];
    var EXPERIENCE_BANNER = [0.61, 0.67];
    var EXPERIENCE_RULE   = [0.65, 0.70];
    var EXPERIENCE_LIST   = [0.68, 0.78];
    var EXPERIENCE_OUT    = [0.80, 0.85]; // fades out as contact comes in

    // Contact phases
    var CONTACT_IN     = [0.82, 0.88];
    var CONTACT_BANNER = [0.84, 0.90];
    var CONTACT_RULE   = [0.89, 0.93];
    var CONTACT_GRID   = [0.91, 1.00];

    function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
    function phase(p, range) {
        return clamp01((p - range[0]) / (range[1] - range[0]));
    }

    function reveal(sectionBanner, sectionRule, sectionGrid, bannerRange, ruleRange, gridRange, progress) {
        var bp = phase(progress, bannerRange);
        sectionBanner.style.opacity = bp;
        sectionBanner.style.transform = 'translateY(' + (-30 * (1 - bp)) + 'px)';

        sectionRule.style.width = (phase(progress, ruleRange) * 320) + 'px';

        var gp = phase(progress, gridRange);
        sectionGrid.style.opacity = gp;
        sectionGrid.style.transform = 'translateY(' + (30 * (1 - gp)) + 'px)';
    }

    function update() {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var progress = max > 0 ? window.scrollY / max : 0;
        progress = clamp01(progress);

        // Opening crawl
        var crawlP = clamp01(progress / CRAWL_DONE);
        crawl.style.top = (CRAWL_START + (CRAWL_END - CRAWL_START) * crawlP) + '%';

        intro.style.opacity = 1 - phase(progress, INTRO_OUT);
        hint.style.opacity  = 1 - phase(progress, HINT_OUT);
        board.style.opacity = 1 - phase(progress, BOARD_FADE);

        // Skills: fade in, then fade out to make room for projects
        skillsSection.style.opacity = clamp01(phase(progress, SKILLS_IN) - phase(progress, SKILLS_OUT));
        reveal(skillsBanner, skillsRule, skillsGrid,
            SKILLS_BANNER, SKILLS_RULE, SKILLS_GRID, progress);

        // Projects: fade in after skills have cleared, then fade out for experience
        projectsSection.style.opacity = clamp01(phase(progress, PROJECTS_IN) - phase(progress, PROJECTS_OUT));
        reveal(projectsBanner, projectsRule, projectsGrid,
            PROJECTS_BANNER, PROJECTS_RULE, PROJECTS_GRID, progress);

        // Experience: fade in after projects have cleared, then fade out for contact
        experienceSection.style.opacity = clamp01(phase(progress, EXPERIENCE_IN) - phase(progress, EXPERIENCE_OUT));
        reveal(experienceBanner, experienceRule, experienceList,
            EXPERIENCE_BANNER, EXPERIENCE_RULE, EXPERIENCE_LIST, progress);

        // Contact: fade in after experience has cleared; enable link clicks when mostly visible
        var contactP = phase(progress, CONTACT_IN);
        contactSection.style.opacity = contactP;
        contactSection.style.pointerEvents = contactP > 0.5 ? 'auto' : 'none';
        reveal(contactBanner, contactRule, contactGrid,
            CONTACT_BANNER, CONTACT_RULE, CONTACT_GRID, progress);
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
})();
