const projects = [
    {
        name: "Combat-Builders",
        url: "https://github.com/MalyshevMS/Combat-Builders",
        description: "My first 2D game built with C++ and OpenGL.",
        tags: ["cpp", "opengl"]
    },
    {
        name: "novo",
        url: "https://github.com/MalyshevMS/novo",
        description: "My first 3D engine built with C++ and OpenGL.",
        tags: ["cpp", "opengl"]
    },
    {
        name: "py3d",
        url: "https://github.com/MalyshevMS/py3d",
        description: "A simple 3D engine in console with Python.",
        tags: ["py"]
    },
    {
        name: "Maze-game",
        url: "https://github.com/MalyshevMS/Maze-game",
        description: "A simple maze game built with Python and Pygame.",
        tags: ["py"]
    },
    {
        name: "Asteroid_shooter",
        url: "https://github.com/MalyshevMS/Asteroid_shooter",
        description: "My first 2D game built with Python and Pygame.",
        tags: ["py"]
    }
];

const grid = document.getElementById('projectsGrid');
const tagsContainer = document.getElementById('tags');
const searchInput = document.getElementById('search');
const yearSpan = document.getElementById('year');
yearSpan.textContent = new Date().getFullYear();

function getAllTags(list) {
    const s = new Set();
    list.forEach(p => (p.tags || []).forEach(t => s.add(t)));
    return Array.from(s).sort();
}

function createCard(p) {
    const div = document.createElement('article');
    div.className = 'card';
    div.innerHTML = `
        <div class="top">
          <div style="flex:1;">
            <h3 class="proj-title"><a href="${p.url}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none;">${p.name}</a></h3>
            <p class="proj-desc">${p.description}</p>
          </div>
          <div style="font-size:12px;color:var(--muted);">${(p.tags || []).map(t => `<span class="tag-small">${t}</span>`).join(' ')}</div>
        </div>
        <div class="actions">
          <a class="btn primary" href="${p.url}" target="_blank">Open on GitHub</a>
        </div>`;
    return div;
}

function render(list) {
    grid.innerHTML = '';
    if (!list.length) {
        grid.innerHTML = '<p style="color:var(--muted)">Projects not found.</p>';
        return;
    }
    list.forEach(p => grid.appendChild(createCard(p)));
}

function buildTags(tags) {
    tagsContainer.innerHTML = '';
    const all = document.createElement('button');
    all.className = 'tag active';
    all.textContent = 'All';
    all.onclick = () => { setActiveTag(null); filter(); };
    tagsContainer.appendChild(all);
    tags.forEach(t => {
        const btn = document.createElement('button');
        btn.className = 'tag';
        btn.textContent = t;
        btn.onclick = () => { setActiveTag(t); filter(); };
        tagsContainer.appendChild(btn);
    });
}

function setActiveTag(tag) {
    Array.from(tagsContainer.children).forEach(el => {
        el.classList.toggle('active', el.textContent === tag || (tag === null && el.textContent === 'Все'));
    });
}

function filter() {
    const q = searchInput.value.toLowerCase();
    const activeTagEl = Array.from(tagsContainer.children).find(c => c.classList.contains('active') && c.textContent !== 'Все');
    const activeTag = activeTagEl ? activeTagEl.textContent : null;
    const filtered = projects.filter(p => {
        const m1 = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
        const m2 = !activeTag || p.tags.includes(activeTag);
        return m1 && m2;
    });
    render(filtered);
}

(function init() {
    buildTags(getAllTags(projects));
    render(projects);
    searchInput.addEventListener('input', filter);
})();