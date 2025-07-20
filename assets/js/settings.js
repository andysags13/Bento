document.addEventListener('DOMContentLoaded', function() {
    // Configuration des données par défaut
    const defaultIcons = [
        { name: 'Github', link: 'github.com/' },
        { name: 'Mail', link: 'outlook.com/' },
        { name: 'Todoist', link: 'www.notion.so/' },
        { name: 'Intranet', link: 'intra.epitech.eu/' },
        { name: 'My_Epitech', link: 'my.epitech.eu/' },
        { name: 'Youtube', link: 'youtube.com/' }
    ];

    const defaultList1 = [
        { name: 'New Gen Bénin 🇧🇯', link: 'open.spotify.com/playlist/01IQz6djth4BPsAYKDn8e3?si=Hzxa3yP2T4K_MEowkZmzXA' },
        { name: 'Late Night Vibes', link: 'open.spotify.com/playlist/2DQ2KHEaZcT4IdcaXDSaag?si=84ad3b1b9f6a40c1' },
        { name: 'Sweet Afro_vibes', link: 'open.spotify.com/playlist/14mrd6kzGFXd1LL57oizMG?si=nyizLlzARJ-AXTqqQoscEQ' },
        { name: 'Afropiano Vibes Only !', link: 'open.spotify.com/playlist/0aCBFNpLrqijpfgC12w0vb?si=279eaadb76594d76' }
    ];

    const defaultList2 = [
        { name: 'Google', link: 'google.com' },
        { name: 'Moodle', link: 'moodle.epitest.eu/login/index.php' },
        { name: 'Google Traduction', link: 'translate.google.com' },
        { name: 'Canva', link: 'www.canva.com/' }
    ];

    // Initialisation
    initializeSettings();
    setupEventListeners();

    function initializeSettings() {
        // Charger le nom
        const nameInput = document.getElementById('name');
        if (nameInput) {
            nameInput.value = localStorage.getItem('name') || 'guy';
        }

        // Générer les liens principaux
        generateMainLinks();
        
        // Générer les listes
        generateList('links1Settings', 'iconlist1Name', defaultList1, 'list1');
        generateList('links2Settings', 'iconlist2Name', defaultList2, 'list2');
        
        // Charger les nouveaux paramètres
        // loadAdvancedSettings(); // Supprimé car les champs avancés ont été retirés du HTML
    }

    function generateMainLinks() {
        const linksContainer = document.getElementById('linksSettings');
        if (!linksContainer) return;

        linksContainer.innerHTML = '';

        defaultIcons.forEach((icon, index) => {
            const linkItem = document.createElement('div');
            linkItem.className = 'link-item';
            linkItem.innerHTML = `
                <div class="link-item-header">
                    <span class="link-number">#${index + 1}</span>
                    <span>Lien principal ${index + 1}</span>
                </div>
                <div class="input-container">
                    <input type="text" id="button${index + 1}Name" class="form-input" required>
                    <label for="button${index + 1}Name" class="form-label">Nom du lien</label>
                    <div class="input-underline"></div>
                </div>
                <div class="input-container">
                    <input type="text" id="button${index + 1}Link" class="form-input" required>
                    <label for="button${index + 1}Link" class="form-label">URL du lien</label>
                    <div class="input-underline"></div>
                </div>
            `;
            linksContainer.appendChild(linkItem);

            // Charger les valeurs sauvegardées
            const nameInput = document.getElementById(`button${index + 1}Name`);
            const linkInput = document.getElementById(`button${index + 1}Link`);
            
            if (nameInput) {
                nameInput.value = localStorage.getItem(`button${index + 1}Name`) || icon.name;
            }
            if (linkInput) {
                linkInput.value = localStorage.getItem(`button${index + 1}Link`) || icon.link;
            }
        });
    }

    function generateList(containerId, iconNameId, defaultItems, listType) {
        const container = document.getElementById(containerId);
        // On ne cherche plus l'input du nom d'icône
        if (!container) return;

        // Générer les éléments de la liste
        const listItemsContainer = container.querySelector('.list-items');
        if (!listItemsContainer) return;

        listItemsContainer.innerHTML = '';

        defaultItems.forEach((item, index) => {
            const listItem = document.createElement('div');
            listItem.className = 'list-item';
            listItem.innerHTML = `
                <div class="input-container">
                    <input type="text" id="${listType}LinkName${index + 1}" class="form-input" required>
                    <label for="${listType}LinkName${index + 1}" class="form-label">Nom du lien ${index + 1}</label>
                    <div class="input-underline"></div>
                </div>
                <div class="input-container">
                    <input type="text" id="${listType}Link${index + 1}" class="form-input" required>
                    <label for="${listType}Link${index + 1}" class="form-label">URL du lien ${index + 1}</label>
                    <div class="input-underline"></div>
                </div>
            `;
            listItemsContainer.appendChild(listItem);

            // Charger les valeurs sauvegardées
            const nameInput = document.getElementById(`${listType}LinkName${index + 1}`);
            const linkInput = document.getElementById(`${listType}Link${index + 1}`);
            
            if (nameInput) {
                nameInput.value = localStorage.getItem(`${listType}LinkName${index + 1}`) || item.name;
            }
            if (linkInput) {
                linkInput.value = localStorage.getItem(`${listType}Link${index + 1}`) || item.link;
            }
        });
    }

    function setupEventListeners() {
        // Bouton de sauvegarde
        const saveButton = document.getElementById('saveSettings');
        if (saveButton) {
            saveButton.addEventListener('click', saveSettings);
        }

        // Bouton de réinitialisation
        const resetButton = document.getElementById('resetSettings');
        if (resetButton) {
            resetButton.addEventListener('click', resetSettings);
        }

        // Validation en temps réel
        setupRealTimeValidation();
    }

    function setupRealTimeValidation() {
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateInput(this);
            });
            
            input.addEventListener('blur', function() {
                validateInput(this);
            });
        });
    }

    function validateInput(input) {
        const isValid = input.value.trim().length > 0;
        
        if (isValid) {
            input.classList.add('valid');
            input.classList.remove('invalid');
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
        }
    }

    function saveSettings() {
        try {
            // Sauvegarder le nom
            const nameInput = document.getElementById('name');
            if (nameInput) {
                localStorage.setItem('name', nameInput.value);
            }

            // Sauvegarder les liens principaux
            defaultIcons.forEach((icon, index) => {
                const nameInput = document.getElementById(`button${index + 1}Name`);
                const linkInput = document.getElementById(`button${index + 1}Link`);
                
                if (nameInput) {
                    localStorage.setItem(`button${index + 1}Name`, nameInput.value);
                }
                if (linkInput) {
                    localStorage.setItem(`button${index + 1}Link`, linkInput.value);
                }
            });

            // Sauvegarder les listes
            saveList('list1', defaultList1.length);
            saveList('list2', defaultList2.length);

            // Sauvegarder les noms des icônes des listes
            const iconList1Name = document.getElementById('iconlist1Name');
            const iconList2Name = document.getElementById('iconlist2Name');
            
            if (iconList1Name) {
                localStorage.setItem('iconlist1Name', iconList1Name.value);
            }
            if (iconList2Name) {
                localStorage.setItem('iconlist2Name', iconList2Name.value);
            }

            showToast('Paramètres sauvegardés avec succès !', 'success');
            
            // Rediriger après un délai
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);

        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            showToast('Erreur lors de la sauvegarde', 'error');
        }
    }

    function saveList(listType, itemCount) {
        for (let i = 1; i <= itemCount; i++) {
            const nameInput = document.getElementById(`${listType}LinkName${i}`);
            const linkInput = document.getElementById(`${listType}Link${i}`);
            
            if (nameInput) {
                localStorage.setItem(`${listType}LinkName${i}`, nameInput.value);
            }
            if (linkInput) {
                localStorage.setItem(`${listType}Link${i}`, linkInput.value);
            }
        }
    }

    function resetSettings() {
        if (confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ? Cette action ne peut pas être annulée.')) {
            try {
                // Effacer le localStorage
                localStorage.clear();
                // Recharger la page (le toast ne sert à rien ici)
                location.reload();
            } catch (error) {
                console.error('Erreur lors de la réinitialisation:', error);
                showToast('Erreur lors de la réinitialisation', 'error');
            }
        }
    }

    function showToast(message, type = 'success') {
        // Créer l'élément toast
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Ajouter au DOM
        document.body.appendChild(toast);
        
        // Animation d'entrée
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Supprimer après 3 secondes
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    // Charger les paramètres avancés
    // loadAdvancedSettings(); // Supprimé car les champs avancés ont été retirés du HTML
    
    // Configurer les écouteurs pour les paramètres avancés
    // setupAdvancedEventListeners(); // Supprimé car les champs avancés ont été retirés du HTML

    // Animation d'entrée pour les sections
    function animateSections() {
        const sections = document.querySelectorAll('.settings-section');
        sections.forEach((section, index) => {
            section.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Initialiser les animations
    animateSections();
});
