document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name');
    const backgroundImageInput = document.getElementById('backgroundImageUrl');

    // Charger les paramètres depuis le localStorage
    if (nameInput) {
        nameInput.value = localStorage.getItem('name') || 'guy';
    }

    // Charger l'URL de l'image d'arrière-plan
    const savedImageUrl = localStorage.getItem('imgbg-url') || 'assets/background.jpg';
    if (savedImageUrl) {
        document.documentElement.style.setProperty('--imgbg-url', `url(${savedImageUrl})`);
    }

    // Charger les paramètres des icônes
    const iconInputs = [
        { name: document.getElementById('icon1Name'), link: document.getElementById('icon1Link') },
        { name: document.getElementById('icon2Name'), link: document.getElementById('icon2Link') },
        { name: document.getElementById('icon3Name'), link: document.getElementById('icon3Link') },
        { name: document.getElementById('icon4Name'), link: document.getElementById('icon4Link') },
        { name: document.getElementById('icon5Name'), link: document.getElementById('icon5Link') },
        { name: document.getElementById('icon6Name'), link: document.getElementById('icon6Link') }
    ];

    const defaultIcons = [
        { name: 'Github', link: 'https://github.com/' },
        { name: 'Mail', link: 'https://outlook.com/' },
        { name: 'Todoist', link: 'https://www.notion.so/' },
        { name: 'Intranet', link: 'https://intra.epitech.eu/' },
        { name: 'My_Epitech', link: 'https://my.epitech.eu/' },
        { name: 'Youtube', link: 'https://youtube.com/' }
    ];

    iconInputs.forEach((icon, index) => {
        if (icon.name) {
            icon.name.value = localStorage.getItem(`icon${index + 1}Name`) || defaultIcons[index].name;
        }
        if (icon.link) {
            icon.link.value = localStorage.getItem(`icon${index + 1}Link`) || defaultIcons[index].link;
        }
    });

    // Charger les paramètres des listes
    const list1Inputs = [
        { name: document.getElementById('iconlist1Name'), links: [
            { name: document.getElementById('iconlist1Link1'), linkName: document.getElementById('iconlist1LinkName1') },
            { name: document.getElementById('iconlist1Link2'), linkName: document.getElementById('iconlist1LinkName2') },
            { name: document.getElementById('iconlist1Link3'), linkName: document.getElementById('iconlist1LinkName3') },
            { name: document.getElementById('iconlist1Link4'), linkName: document.getElementById('iconlist1LinkName4') }
        ]}
    ];

    const list2Inputs = [
        { name: document.getElementById('iconlist2Name'), links: [
            { name: document.getElementById('iconlist2Link1'), linkName: document.getElementById('iconlist2LinkName1') },
            { name: document.getElementById('iconlist2Link2'), linkName: document.getElementById('iconlist2LinkName2') },
            { name: document.getElementById('iconlist2Link3'), linkName: document.getElementById('iconlist2LinkName3') },
            { name: document.getElementById('iconlist2Link4'), linkName: document.getElementById('iconlist2LinkName4') }
        ]}
    ];

    const defaultList1 = [
        { name: 'New Gen Bénin 🇧🇯 ', link: 'https://open.spotify.com/playlist/01IQz6djth4BPsAYKDn8e3?si=Hzxa3yP2T4K_MEowkZmzXA' },
        { name: 'Late Night Vibes', link: 'https://open.spotify.com/playlist/2DQ2KHEaZcT4IdcaXDSaag?si=84ad3b1b9f6a40c1' },
        { name: 'Sweet Afro_vibes', link: 'https://open.spotify.com/playlist/14mrd6kzGFXd1LL57oizMG?si=nyizLlzARJ-AXTqqQoscEQ' },
        { name: 'Afropiano Vibes Only !', link: 'https://open.spotify.com/playlist/0aCBFNpLrqijpfgC12w0vb?si=279eaadb76594d76' }
    ];

    const defaultList2 = [
        { name: 'Google', link: 'https://google.com' },
        { name: 'Moodle', link: 'https://moodle.epitest.eu/login/index.php' },
        { name: 'Google Traduction', link: 'https://translate.google.com' },
        { name: 'Canva', link: 'https://www.canva.com/' }
    ];

    // Charger les valeurs des listes depuis le localStorage
    list1Inputs.forEach((list, index) => {
        if (list.name) {
            list.name.value = localStorage.getItem(`iconlist1Name`) || list.name.value;
        }
        list.links.forEach((link, linkIndex) => {
            if (link.name) {
                link.name.value = localStorage.getItem(`iconlist1LinkName${linkIndex + 1}`) || defaultList1[linkIndex].name;
            }
            if (link.linkName) {
                link.linkName.value = localStorage.getItem(`iconlist1Link${linkIndex + 1}`) || defaultList1[linkIndex].link;
            }
        });
    });

    list2Inputs.forEach((list, index) => {
        if (list.name) {
            list.name.value = localStorage.getItem(`iconlist2Name`) || list.name.value;
        }
        list.links.forEach((link, linkIndex) => {
            if (link.name) {
                link.name.value = localStorage.getItem(`list2LinkName${linkIndex + 1}`) || defaultList2[linkIndex].name;
            }
            if (link.linkName) {
                link.linkName.value = localStorage.getItem(`list2Link${linkIndex + 1}`) || defaultList2[linkIndex].link;
            }
        });
    });

    document.getElementById('saveSettings').addEventListener('click', saveSettings);

    // Sauvegarder les paramètres dans le localStorage
    function saveSettings() {
        if (nameInput) {
            localStorage.setItem('name', nameInput.value);
        }

        // Gérer le changement d'arrière-plan
        const file = backgroundImageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const newImageUrl = event.target.result;
                localStorage.setItem('imgbg-url', newImageUrl);
                document.documentElement.style.setProperty('--imgbg-url', `url(${newImageUrl})`);
            };
            reader.readAsDataURL(file);
        }


        // Sauvegarder les paramètres des icônes
        iconInputs.forEach((icon, index) => {
            if (icon.name) {
                localStorage.setItem(`icon${index + 1}Name`, icon.name.value);
            }
            if (icon.link) {
                localStorage.setItem(`icon${index + 1}Link`, icon.link.value);
            }
        });

        // Sauvegarder les paramètres des listes
        list1Inputs.forEach((list, index) => {
            if (list.name) {
                localStorage.setItem(`iconlist1Name`, list.name.value);
            }
            list.links.forEach((link, linkIndex) => {
                if (link.name) {
                    localStorage.setItem(`iconlist1LinkName${linkIndex + 1}`, link.name.value);
                }
                if (link.linkName) {
                    localStorage.setItem(`iconlist1Link${linkIndex + 1}`, link.linkName.value);
                }
            });
        });

        list2Inputs.forEach((list, index) => {
            if (list.name) {
                localStorage.setItem(`iconlist2Name`, list.name.value);
            }
            list.links.forEach((link, linkIndex) => {
                if (link.name) {
                    localStorage.setItem(`iconlist2LinkName${linkIndex + 1}`, link.name.value);
                }
                if (link.linkName) {
                    localStorage.setItem(`iconlist2Link${linkIndex + 1}`, link.linkName.value);
                }
            });
        });

        // Rediriger vers la page précédente
        window.history.back();
    }
});
