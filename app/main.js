(function() {
  var editor;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    createEditor();
    events();
  }

  function createEditor() {
    if (!editor) {
      editor = ace.edit("editor");
      editor.setTheme("ace/theme/monokai");
      editor.getSession().setMode("ace/mode/javascript");
    }
  }

  function events() {
    document.getElementById("run").onclick = runCode;
  }

  function runCode() {
    var sanitizedValue = editor.getValue().replace(/\n/g, '').replace(/'/g, '\"');
    var code = "var script = document.createElement('script');script.textContent = '" + sanitizedValue + "';document.body.appendChild(script);";
    chrome.tabs.executeScript({
      code: code
    });
  }
})();