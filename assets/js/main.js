document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    document.getElementById('search-input').addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        const query = event.target.value;
        if (query) {
          window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
      }
    });
  });
  