var reload_button = document.getElementById("reload-button");
reload_button.onclick = function() {
    self.port.emit("reload");
}
