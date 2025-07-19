// ╔═╗╔╗╔╦ ╦╔═╗╔╗╔╔═╗╔═╗╔╦╗  ╔═╗╔═╗╔═╗╔╦╗╦ ╦╦═╗╔═╗╔═╗
// ║╣ ║║║╠═╣╠═╣║║║║  ║╣  ║║  ╠╣ ║╣ ╠═╣ ║ ║ ║╠╦╝║╣ ╚═╗
// ╚═╝╝╚╝╩ ╩╩ ╩╝╚╝╚═╝╚═╝═╩╝  ╚  ╚═╝╩ ╩ ╩ ╚═╝╩╚═╚═╝╚═╝

class EnhancedFeatures {
    constructor() {
        this.currentSearchEngine = 'google';
        this.searchEngines = {
            google: 'https://www.google.com/search?q=',
            duckduckgo: 'https://duckduckgo.com/?q=',
            bing: 'https://www.bing.com/search?q=',
            youtube: 'https://www.youtube.com/results?search_query='
        };
        this.init();
    }

    init() {
        this.setupConnectionStatus();
        this.setupThemeToggle();
        this.setupFullscreenToggle();
        this.setupWeatherRefresh();
        this.setupEnhancedSearch();
        this.setupKeyboardShortcuts();
        this.setupSearchEngines();
    }

    // Statut de connexion
    setupConnectionStatus() {
        const statusIndicator = document.getElementById('statusIndicator');
        const statusText = document.getElementById('statusText');

        const updateConnectionStatus = () => {
            if (navigator.onLine) {
                statusIndicator.classList.add('online');
                statusText.textContent = 'En ligne';
            } else {
                statusIndicator.classList.remove('online');
                statusText.textContent = 'Hors ligne';
            }
        };

        window.addEventListener('online', updateConnectionStatus);
        window.addEventListener('offline', updateConnectionStatus);
        updateConnectionStatus();
    }

    // Basculement de thème
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const body = document.body;

        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('darktheme')) {
                body.classList.remove('darktheme');
                body.classList.add('lighttheme');
                themeIcon.setAttribute('data-lucide', 'moon');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.remove('lighttheme');
                body.classList.add('darktheme');
                themeIcon.setAttribute('data-lucide', 'sun');
                localStorage.setItem('theme', 'dark');
            }
            lucide.createIcons();
        });

        // Charger le thème sauvegardé
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.remove('darktheme');
            body.classList.add('lighttheme');
            themeIcon.setAttribute('data-lucide', 'moon');
        }
    }

    // Plein écran
    setupFullscreenToggle() {
        const fullscreenToggle = document.getElementById('fullscreenToggle');

        fullscreenToggle.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log(`Erreur lors du passage en plein écran: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });

        // Mettre à jour l'icône selon l'état du plein écran
        document.addEventListener('fullscreenchange', () => {
            const icon = fullscreenToggle.querySelector('i');
            if (document.fullscreenElement) {
                icon.setAttribute('data-lucide', 'minimize');
            } else {
                icon.setAttribute('data-lucide', 'maximize');
            }
            lucide.createIcons();
        });
    }

    // Actualisation de la météo
    setupWeatherRefresh() {
        const weatherRefresh = document.getElementById('weatherRefresh');
        
        weatherRefresh.addEventListener('click', () => {
            // Déclencher l'actualisation de la météo
            if (window.weather && typeof window.weather.updateWeather === 'function') {
                window.weather.updateWeather();
            }
            
            // Animation de rotation
            weatherRefresh.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                weatherRefresh.style.transform = 'rotate(0deg)';
            }, 500);
        });
    }

    // Recherche améliorée
    setupEnhancedSearch() {
        const searchInput = document.getElementById('search-input');
        const searchSuggestions = document.getElementById('searchSuggestions');
        
        // Suggestions de recherche (simulées)
        const commonSearches = [
            'GitHub', 'Stack Overflow', 'MDN Web Docs', 'YouTube',
            'Netflix', 'Gmail', 'Google Drive', 'Twitter',
            'LinkedIn', 'Reddit', 'Wikipedia', 'Amazon'
        ];

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length > 1) {
                const suggestions = commonSearches.filter(item => 
                    item.toLowerCase().includes(query)
                ).slice(0, 5);
                
                this.showSuggestions(suggestions, searchSuggestions, searchInput);
            } else {
                searchSuggestions.style.display = 'none';
            }
        });

        // Cacher les suggestions quand on clique ailleurs
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-group')) {
                searchSuggestions.style.display = 'none';
            }
        });

        // Recherche avec le moteur sélectionné
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = e.target.value.trim();
                if (query) {
                    const searchUrl = this.searchEngines[this.currentSearchEngine] + encodeURIComponent(query);
                    const openInNewTab = localStorage.getItem('openInNewTab') === 'true';
                    
                    if (openInNewTab) {
                        window.open(searchUrl, '_blank');
                    } else {
                        window.location.href = searchUrl;
                    }
                }
            }
        });
    }

    showSuggestions(suggestions, container, input) {
        container.innerHTML = '';
        
        if (suggestions.length > 0) {
            suggestions.forEach(suggestion => {
                const div = document.createElement('div');
                div.className = 'search-suggestion';
                div.textContent = suggestion;
                div.addEventListener('click', () => {
                    input.value = suggestion;
                    container.style.display = 'none';
                    input.focus();
                });
                container.appendChild(div);
            });
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    }

    // Moteurs de recherche
    setupSearchEngines() {
        const engines = document.querySelectorAll('.search-engine');
        
        engines.forEach(engine => {
            engine.addEventListener('click', () => {
                // Retirer la classe active de tous les moteurs
                engines.forEach(e => e.classList.remove('active'));
                
                // Ajouter la classe active au moteur sélectionné
                engine.classList.add('active');
                
                // Mettre à jour le moteur de recherche actuel
                this.currentSearchEngine = engine.dataset.engine;
                
                // Sauvegarder la préférence
                localStorage.setItem('preferredSearchEngine', this.currentSearchEngine);
            });
        });

        // Charger le moteur de recherche préféré
        const preferredEngine = localStorage.getItem('preferredSearchEngine');
        if (preferredEngine && this.searchEngines[preferredEngine]) {
            this.currentSearchEngine = preferredEngine;
            engines.forEach(e => e.classList.remove('active'));
            const activeEngine = document.querySelector(`[data-engine="${preferredEngine}"]`);
            if (activeEngine) {
                activeEngine.classList.add('active');
            }
        }
    }

    // Raccourcis clavier
    setupKeyboardShortcuts() {
        const shortcutsModal = document.getElementById('keyboardShortcuts');
        const searchInput = document.getElementById('search-input');
        const weatherRefresh = document.getElementById('weatherRefresh');

        document.addEventListener('keydown', (e) => {
            // Ctrl + K : Afficher les raccourcis
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                shortcutsModal.classList.toggle('show');
            }

            // Ctrl + / : Focus sur la recherche
            if (e.ctrlKey && e.key === '/') {
                e.preventDefault();
                searchInput.focus();
                searchInput.select();
            }

            // Ctrl + R : Actualiser la météo
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                weatherRefresh.click();
            }

            // Échap : Fermer les modales
            if (e.key === 'Escape') {
                shortcutsModal.classList.remove('show');
                document.getElementById('searchSuggestions').style.display = 'none';
            }
        });

        // Fermer les raccourcis en cliquant à l'extérieur
        shortcutsModal.addEventListener('click', (e) => {
            if (e.target === shortcutsModal) {
                shortcutsModal.classList.remove('show');
            }
        });
    }
}

// Initialiser les fonctionnalités améliorées
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedFeatures();
});