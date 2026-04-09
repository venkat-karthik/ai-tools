// DOM Elements
const toolsGrid = document.getElementById('toolsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const addToolBtn = document.getElementById('addToolBtn');
const modal = document.getElementById('addToolModal');
const closeBtn = document.querySelector('.close');
const addToolForm = document.getElementById('addToolForm');

// State
let tools = [];
let currentFilter = 'all';
let searchQuery = '';

// Boot: seed defaults if needed, then load all tools + subscribe to new ones
async function init() {
    toolsGrid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:4rem;">Loading tools...</p>';

    await seedDefaultTools();

    tools = await fetchTools();

    // Fallback to local data if Supabase returns nothing
    if (!tools || tools.length === 0) {
        tools = aiTools;
    }

    renderTools();

    // Real-time: append any tool added by another user
    subscribeToTools(newTool => {
        const alreadyExists = tools.some(t => t.id === newTool.id);
        if (!alreadyExists) {
            tools.push(newTool);
            renderTools();
        }
    });
}

init();

// Event Listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.category;
        renderTools();
    });
});

searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderTools();
});

addToolBtn.addEventListener('click', () => { modal.style.display = 'block'; });
closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

addToolForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = addToolForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Adding...';

    const newTool = {
        name: document.getElementById('toolName').value.trim(),
        url: document.getElementById('toolUrl').value.trim(),
        category: document.getElementById('toolCategory').value,
        description: document.getElementById('toolDescription').value.trim()
    };

    try {
        const saved = await addToolToSupabase(newTool);
        tools.push(saved);
        renderTools();
        addToolForm.reset();
        modal.style.display = 'none';
        showNotification('Tool added successfully! Visible to everyone now.');
    } catch (err) {
        console.error('Failed to add tool:', err);
        showNotification('Failed to add tool. Please try again.', true);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Add Tool';
    }
});

// Render Tools
function renderTools() {
    const filteredTools = tools.filter(tool => {
        const matchesFilter = currentFilter === 'all' || tool.category === currentFilter;
        const matchesSearch = (tool.name || '').toLowerCase().includes(searchQuery) ||
                              (tool.description || '').toLowerCase().includes(searchQuery);
        return matchesFilter && matchesSearch;
    });

    toolsGrid.innerHTML = '';

    filteredTools.forEach((tool, index) => {
        toolsGrid.appendChild(createToolCard(tool, index));
    });

    if (filteredTools.length === 0) {
        toolsGrid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:4rem;">No tools found. Try a different search or filter.</p>';
    }
}

// Create Tool Card with Flip Effect
function createToolCard(tool, index) {
    const card = document.createElement('div');
    card.className = 'tool-card';
    card.style.animationDelay = `${index * 0.05}s`;

    const categoryColors = {
        ide: '#6366f1', presentation: '#8b5cf6', video: '#ec4899',
        productivity: '#10b981', automation: '#f59e0b', content: '#06b6d4',
        marketing: '#ef4444', design: '#a855f7', learning: '#14b8a6',
        deployment: '#f97316', api: '#84cc16'
    };

    const categoryIcons = {
        ide: '💻', presentation: '📊', video: '🎬', productivity: '⚡',
        automation: '⚙️', content: '✍️', marketing: '📈', design: '🎨',
        learning: '📚', deployment: '🚀', api: '🔌'
    };

    const color = categoryColors[tool.category] || '#6366f1';
    card.style.setProperty('--card-color', color);

    card.innerHTML = `
        <div class="card-content">
            <div class="card-back">
                <div class="card-back-content">
                    <span class="tool-icon">${categoryIcons[tool.category] || '🔧'}</span>
                    <h3 class="tool-name">${tool.name}</h3>
                    <span class="tool-badge" style="background:${color}">${tool.category}</span>
                </div>
            </div>
            <div class="card-front">
                <span class="tool-badge" style="background:${color}">${tool.category}</span>
                <p class="tool-description">${tool.description || ''}</p>
                ${tool.url
                    ? `<a href="${tool.url}" target="_blank" class="tool-link" onclick="event.stopPropagation()">Visit Tool →</a>`
                    : '<span class="tool-link" style="opacity:0.5;cursor:not-allowed;">No URL</span>'}
            </div>
        </div>
    `;

    card.addEventListener('click', function () { this.classList.toggle('flipped'); });
    return card;
}

// Show Notification
function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 2rem; right: 2rem;
        background: ${isError ? '#ef4444' : 'var(--success)'};
        color: white; padding: 1rem 2rem; border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3); z-index: 10000;
        animation: slideInRight 0.4s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } }
`;
document.head.appendChild(style);
