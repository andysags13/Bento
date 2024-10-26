// ╔╗ ╔═╗╔╗╔╔╦╗╔═╗
// ╠╩╗║╣ ║║║ ║ ║ ║
// ╚═╝╚═╝╝╚╝ ╩ ╚═╝
// ┌─┐┌─┐┌┐┌┌─┐┬┌─┐┬ ┬┬─┐┌─┐┌┬┐┬┌─┐┌┐┌
// │  │ ││││├┤ ││ ┬│ │├┬┘├─┤ │ ││ ││││
// └─┘└─┘┘└┘└  ┴└─┘└─┘┴└─┴ ┴ ┴ ┴└─┘┘└┘

const CONFIG = {
	// ┌┐ ┌─┐┌─┐┬┌─┐┌─┐
	// ├┴┐├─┤└─┐││  └─┐
	// └─┘┴ ┴└─┘┴└─┘└─┘

	// General
	name: localStorage.getItem('name') || 'guy',
	imageBackground: true,
	openInNewTab: true,
	twelveHourFormat: localStorage.getItem('twelveHourFormat') === 'true',

	// Greetings
	greetingMorning: 'Good morning!',
	greetingAfternoon: 'Good afternoon,',
	greetingEvening: 'Good evening,',
	greetingNight: 'Go to Sleep!',

	// Layout
	bentoLayout: 'bento', // 'bento', 'lists', 'buttons'

	// Weather
	weatherKey: 'InsertYourAPIKeyHere123456', // Write here your API Key
	weatherIcons: 'OneDark', // 'Onedark', 'Nord', 'Dark', 'White'
	weatherUnit: 'C', // 'F', 'C'
	language: 'en', // More languages in https://openweathermap.org/current#multi

	trackLocation: true, // If false or an error occurs, the app will use the lat/lon below
	defaultLatitude: '37.775',
	defaultLongitude: '-122.419',

	// Autochange
	autoChangeTheme: true,

	// Autochange by OS
	changeThemeByOS: true,

	// Autochange by hour options (24hrs format, string must be in: hh:mm)
	changeThemeByHour: true,
	hourDarkThemeActive: '18:30',
	hourDarkThemeInactive: '07:00',

	// ┌┐ ┬ ┬┌┬┐┌┬┐┌─┐┌┐┌┌─┐
	// ├┴┐│ │ │  │ │ ││││└─┐
	// └─┘└─┘ ┴  ┴ └─┘┘└┘└─┘

	firstButtonsContainer: [
		{
			id: '1',
			name: 'Github',
			icon: localStorage.getItem(`icon1Name`) || 'github',
			link: localStorage.getItem(`icon1Link`) || 'github.com/',
		},
		{
			id: '2',
			name: 'Mail',
			icon: localStorage.getItem(`icon2Name`) || 'mail',
			link: localStorage.getItem(`icon2Link`) || 'outlook.com/',
		},
		{
			id: '3',
			name: 'Todoist',
			icon: localStorage.getItem(`icon3Name`) || 'calendar-plus',
			link: localStorage.getItem(`icon3Link`) || 'www.notion.so/',
		},
		{
			id: '4',
			name: 'Intranet',
			icon: localStorage.getItem(`icon4Name`) || 'graduation-cap',
			link: localStorage.getItem(`icon4Link`) || 'intra.epitech.eu/',
		},
		{
			id: '5',
			name: 'My_Epitech',
			icon: localStorage.getItem(`icon5Name`) || 'disc',
			link: localStorage.getItem(`icon5Link`) || 'my.epitech.eu/',
		},
		{
			id: '6',
			name: 'Youtube',
			icon: localStorage.getItem(`icon6Name`) || 'youtube',
			link: localStorage.getItem(`icon6Link`) || 'youtube.com/',
		},
	],

	secondButtonsContainer: [
		{
			id: '1',
			name: 'Music',
			icon: localStorage.getItem(`icon7Name`) || 'headphones',
			link: localStorage.getItem(`icon7Link`) || 'https://open.spotify.com',
		},
		{
			id: '2',
			name: 'twitter',
			icon: localStorage.getItem(`icon8Name`) || 'twitter',
			link: localStorage.getItem(`icon8Link`) || 'https://twitter.com/',
		},
		{
			id: '3',
			name: 'bot',
			icon: localStorage.getItem(`icon9Name`) || 'bot',
			link: localStorage.getItem(`icon9Link`) || 'https://discord.com/app',
		},
		{
			id: '4',
			name: 'Amazon',
			icon: 'shopping-bag',
			link: 'https://amazon.com/',
		},
		{
			id: '5',
			name: 'Hashnode',
			icon: 'pen-tool',
			link: 'https://hashnode.com/',
		},
		{
			id: '6',
			name: 'Figma',
			icon: 'figma',
			link: 'https://figma.com/',
		},
	],

	// ┬  ┬┌─┐┌┬┐┌─┐
	// │  │└─┐ │ └─┐
	// ┴─┘┴└─┘ ┴ └─┘

	// First Links Container
	firstlistsContainer: [
		{
			icon: localStorage.getItem(`iconlist1Name`) || 'music',
			id: '1',
			links: [
				{
					name: localStorage.getItem(`iconlist1Link1Name1`) || 'New Gen Bénin 🇧🇯 ',
					link: localStorage.getItem(`iconlist1Link1`) || 'open.spotify.com/playlist/01IQz6djth4BPsAYKDn8e3?si=Hzxa3yP2T4K_MEowkZmzXA',
				},
				{
					name: localStorage.getItem(`iconlist1Link2Name2`) || 'Late Night Vibes',
					link: localStorage.getItem(`iconlist1Link2`) || 'open.spotify.com/playlist/2DQ2KHEaZcT4IdcaXDSaag?si=84ad3b1b9f6a40c1',
				},
				{
					name: localStorage.getItem(`iconlist1Link3Name3`) || 'Sweet Afro_vibes',
					link: localStorage.getItem(`iconlist1Link3`) || 'open.spotify.com/playlist/14mrd6kzGFXd1LL57oizMG?si=nyizLlzARJ-AXTqqQoscEQ',
				},
				{
					name: localStorage.getItem(`iconlist1Link4Name4`) || 'Afropiano Vibes Only !',
					link: localStorage.getItem(`iconlist1Link4`) || 'open.spotify.com/playlist/0aCBFNpLrqijpfgC12w0vb?si=279eaadb76594d76',
				},
			],
		},
		{
			icon: localStorage.getItem(`iconlist2Name`) || 'coffee',
			id: '2',
			links: [
				{
					name: localStorage.getItem(`iconlist2Link1Name1`) || 'Google',
					link: localStorage.getItem(`iconlist2Link1`) || 'www.google.com/',
				},
				{
					name: localStorage.getItem(`iconlist2Link2Name2`) || 'Moodle',
					link: localStorage.getItem(`iconlist2Link2`) || 'moodle.epitest.eu/login/index.php',
				},
				{
					name: localStorage.getItem(`iconlist2Link3Name3`) || 'Google Traduction',
					link: localStorage.getItem(`iconlist2Link3`) || 'translate.google.com',
				},
				{
					name: localStorage.getItem(`iconlist2Link4Name4`) || 'Canva',
					link: localStorage.getItem(`iconlist2Link4`) || 'www.canva.com/',
				},
			],
		},
	],

	// Second Links Container
	secondListsContainer: [
		{
			icon: 'binary',
			id: '1',
			links: [
				{
					name: 'Spotify',
					link: 'https://www.spotify.com',
				},
				{
					name: 'Reddit',
					link: 'https://www.reddit.com',
				},
				{
					name: 'Hashnode',
					link: 'https://www.hashnode.com',
				},
				{
					name: 'Pocket',
					link: 'https://www.pocket.com',
				},
			],
		},
		{
			icon: 'github',
			id: '2',
			links: [
				{
					name: 'Front',
					link: 'https://www.reddit.com/r/Frontend/',
				},
				{
					name: 'Rust',
					link: 'https://www.reddit.com/r/rust/',
				},
				{
					name: 'Go',
					link: 'https://www.reddit.com/r/golang/',
				},
				{
					name: 'Repos',
					link: 'https://github.com/migueravila',
				},
			],
		},
	],
};
