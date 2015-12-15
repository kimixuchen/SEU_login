function saveData() {
	// Get a value saved in a form.
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	// Save it using the Chrome extension storage API.
	chrome.storage.sync.set({'username': username, 'password': password}, function() {
	  // Notify that we saved.
	  alert('username='+username+'\n'+'password='+password);
	});
  }

window.onload = function() {
  document.getElementById('save').onclick = function() {
    saveData()
  };
}