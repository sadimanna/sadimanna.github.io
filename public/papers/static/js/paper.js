// Shared behaviour for paper project pages: theme toggle and BibTeX copy.
(function(){
  var root = document.documentElement, key = 'pp-theme';
  try { var t = localStorage.getItem(key); if (t) root.setAttribute('data-theme', t); } catch(e){}
  var toggle = document.getElementById('themeToggle');
  if (toggle) toggle.addEventListener('click', function(){
    var cur = root.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem(key, next); } catch(e){}
  });

  var copy = document.getElementById('copyBib');
  if (copy) copy.addEventListener('click', function(){
    var txt = document.getElementById('bibText').textContent;
    (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function(){
      copy.textContent = 'Copied'; setTimeout(function(){ copy.textContent = 'Copy'; }, 1500);
    }).catch(function(){ copy.textContent = 'Select & copy'; });
  });
})();
