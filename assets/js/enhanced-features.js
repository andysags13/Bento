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

    // Plein écran
    setupFullscreenToggle() {
        const fullscreenToggle = document.getElementById('fullscreenToggle');

        fullscreenToggle.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
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
        if (weatherRefresh) {
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

    // Moteurs de recherche - Approche simplifiée et robuste
    setupSearchEngines() {
        
        // Fonction pour initialiser les moteurs
        const initEngines = () => {
            
            // Vérifier que le conteneur existe
            const container = document.querySelector('.search-engines');
            if (!container) {
                setTimeout(initEngines, 300);
                return;
            }
            
            // Supprimer tous les anciens événements
            const newContainer = container.cloneNode(true);
            container.parentNode.replaceChild(newContainer, container);
            
            // Récupérer les nouveaux boutons
            const engines = newContainer.querySelectorAll('.search-engine');
            if (engines.length === 0) {
                setTimeout(initEngines, 300);
                return;
            }
            
            // Ajouter les événements de manière très simple
            engines.forEach((engine, index) => {
                
                // Forcer les styles
                engine.style.cursor = 'pointer';
                engine.style.pointerEvents = 'auto';
                engine.style.userSelect = 'none';
                
                // Gestionnaire d'événement simple
                 const handleClick = () => {
                     
                     // Retirer active de tous
                     engines.forEach(e => e.classList.remove('active'));
                     
                     // Ajouter active au sélectionné
                     engine.classList.add('active');
                     
                     // Sauvegarder
                     this.currentSearchEngine = engine.dataset.engine;
                     localStorage.setItem('preferredSearchEngine', this.currentSearchEngine);
                     
                 };
                
                // Ajouter plusieurs types d'événements
                engine.onclick = handleClick;
                engine.addEventListener('click', handleClick);
                engine.addEventListener('mousedown', handleClick);
                
            });
            
            // Charger le moteur préféré
            const preferred = localStorage.getItem('preferredSearchEngine');
            if (preferred) {
                const preferredEngine = newContainer.querySelector(`[data-engine="${preferred}"]`);
                if (preferredEngine) {
                    engines.forEach(e => e.classList.remove('active'));
                    preferredEngine.classList.add('active');
                    this.currentSearchEngine = preferred;
                }
            }
            
        };
        
        // Appeler directement pour test
        initEngines();
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
    // Attendre que les icônes Lucide soient créées
    const initWhenReady = () => {
        // Vérifier si les icônes Lucide sont créées
        const hasLucideIcons = document.querySelector('[data-lucide]');
        if (hasLucideIcons && window.lucide) {
            new EnhancedFeatures();
        } else {
            setTimeout(initWhenReady, 100);
        }
    };
    
    // Démarrer la vérification
    setTimeout(initWhenReady, 50);
});