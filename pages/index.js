const projects = [
    {
        title: "HanamiBot",
        description: "A powerful Discord bot developed for osu!",
        image: "https://yorunoken.s-ul.eu/vzVcxxIs",
        imageAlt: "HanamiBot screenshot",
        github: "https://github.com/yorunoken/HanamiBot",
        website: "https://hanami.yorunoken.com",
    },
    {
        title: "Hanami Manga",
        description: "A newly designed manga website written using Next.js!",
        image: "https://yorunoken.s-ul.eu/5gTl3ROv",
        imageAlt: "Hanami Manga screenshot",
        github: "https://github.com/yorunoken/hanami-manga",
    },
    {
        title: "Nightscout Sibionics Uploader",
        description: "A program that uploads Sibionics GS1 data to Nightscout",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
        imageAlt: "nbu",
        github: "https://github.com/yorunoken/nightscout-sibionics-uploader",
    },
    {
        title: "YAUS",
        description: "Yet another URL shortener.",
        image: "https://yorunoken.s-ul.eu/G7WEWTA0",
        imageAlt: "YAUS screenshot",
        github: "https://github.com/yorunoken/YAUS",
        website: "https://short.yorunoken.com",
    },
    {
        title: "DMU",
        description:
            "DMU (Discord Mass Uploader) is a tool that allows users to upload large files to Discord without needing Discord nitro.",
        image: "https://yorunoken.s-ul.eu/NfBW96tK",
        imageAlt: "DMU screenshot",
        github: "https://github.com/yorunoken/discord-mass-uploader",
    },
    {
        title: "Calissaydim",
        description:
            "A fun website to find out what universities you could've landed if you had studied instead of playing games.",
        image: "https://yorunoken.s-ul.eu/lBk5GuSB",
        imageAlt: "Calissaydim screenshot",
        github: "https://github.com/yorunoken/calissaydim",
        website: "https://calissaydim.com.tr",
    },
    {
        title: "fun APIs",
        description: "Random API things that I add in my free time :>",
        image: "https://yorunoken.s-ul.eu/0BBr9h9e",
        imageAlt: "fun APIs screenshot",
        github: "https://github.com/yorunoken/fun-api",
        website: "https://fun.yorunoken.com",
    },
    {
        title: "Hatsune Miku GRUB",
        description: "A Grub theme of Hatsune Miku",
        image: "https://raw.githubusercontent.com/yorunoken/HatsuneMiku/refs/heads/main/background.png",
        imageAlt: "Hatsune Miku GRUB screenshot",
        github: "https://github.com/yorunoken/HatsuneMiku",
    },
    {
        title: "dotfiles",
        description: "My dotfiles for my Arch Linux setup.",
        image: "https://raw.githubusercontent.com/yorunoken/dotfiles/refs/heads/main/screenshots/2.png",
        imageAlt: "dotfiles screenshot",
        github: "https://github.com/yorunoken/dotfiles",
    },
];

function renderProjects() {
    const projectsContainer = document.getElementById("projects-container");

    projects.forEach((project) => {
        const projectHTML = `
            <div class="project-card">
                <img
                    src="${project.image}"
                    alt="${project.imageAlt}"
                    class="project-image"
                >
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-links">
                        <a href="${project.github}" target="_blank" class="project-link github-link">GitHub</a>
                        ${project.website ? `<a href="${project.website}" target="_blank" class="project-link website-link">Website</a>` : ""}
                    </div>
                </div>
            </div>
        `;

        projectsContainer.innerHTML += projectHTML;
    });
}

function updateGlucoseValue(value, trend, time) {
    const glucoseNumber = document.getElementById("glucose-number");
    const glucoseTrend = document.getElementById("glucose-trend");
    const timestamp = document.getElementById("glucose-timestamp");

    glucoseNumber.classList.remove("glucose-low", "glucose-normal", "glucose-high");

    if (value < 70) {
        glucoseNumber.classList.add("glucose-low");
    } else if (value > 180) {
        glucoseNumber.classList.add("glucose-high");
    } else {
        glucoseNumber.classList.add("glucose-normal");
    }

    glucoseNumber.textContent = value;

    let trendArrow = "";
    let trendLabel = "";

    switch (trend) {
        case "SingleUp":
            trendArrow = "↑";
            trendLabel = "Rising rapidly";
            break;
        case "FortyFiveUp":
            trendArrow = "↗";
            trendLabel = "Rising";
            break;
        case "Flat":
            trendArrow = "→";
            trendLabel = "Stable";
            break;
        case "FortyFiveDown":
            trendArrow = "↘";
            trendLabel = "Falling";
            break;
        case "SingleDown":
            trendArrow = "↓";
            trendLabel = "Falling rapidly";
            break;
        default:
            trendArrow = "--";
            trendLabel = "No trend";
    }

    glucoseTrend.innerHTML = `
        <span class="trend-arrow">${trendArrow}</span>
        <span class="trend-label">${trendLabel}</span>
    `;

    timestamp.textContent = `Last updated: ${time.toLocaleTimeString()}`;
}

async function simulateGlucoseReading() {
    const res = await fetch("/api/getLastGlucose");
    const entries = await res.json();
    const lastEntry = entries[0];

    updateGlucoseValue(lastEntry.sgv, lastEntry.direction, new Date(lastEntry.dateString));
}

document.addEventListener("DOMContentLoaded", async () => {
    renderProjects();
    await simulateGlucoseReading();
    setInterval(simulateGlucoseReading, 300000);
});
