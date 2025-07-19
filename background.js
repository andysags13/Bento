document.getElementById('searchInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const query = e.target.value;
    const googleSearchURL = 'https://www.google.com/search?q=' + encodeURIComponent(query);
    chrome.tabs.create({ url: googleSearchURL });
  }
});
