document.addEventListener('DOMContentLoaded', () => {
  const terminal = document.getElementById('terminal');
  const output = document.getElementById('output');
  const commandInput = document.getElementById('command-input');

  const ascii404 = `<pre class="ascii text-magenta">
██╗  ██╗ ██████╗ ██╗  ██╗
██║  ██║██╔═████╗██║  ██║
███████║██║██╔██║███████║
╚════██║████╔╝██║╚════██║
     ██║╚██████╔╝     ██║
     ╚═╝ ╚═════╝      ╚═╝
                         
</pre>`;

  // We'll use a link in the text as a fallback for non-interactive users
  const clickableReboot = '<a href="/" class="text-cyan">reboot</a>';

  const errorMessage = [
    'SYSTEM ERROR: 404',
    'Command or file not found.',
    'The path you requested does not exist on this server.',
    ascii404,
    `Suggestion: To return to the main system, type ${clickableReboot} and press Enter.`,
    '',
  ];

  // --- Type out the error message ---
  let lineIndex = 0;
  function typeLine() {
    if (lineIndex < errorMessage.length) {
      output.innerHTML += `${errorMessage[lineIndex]}\n`;
      lineIndex++;
      terminal.scrollTop = terminal.scrollHeight;
      setTimeout(typeLine, 100);
    } else {
      commandInput.focus();
    }
  }
  typeLine();

  // --- Command handling ---
  commandInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const command = this.value.trim().toLowerCase();

      // Add the typed command to the output
      const prompt = `<div class="prompt-line"><span class="prompt">grimburly@xyz:~$</span><span class="command-text">${command}</span></div>`;
      output.innerHTML += prompt;

      if (command === 'reboot') {
        output.innerHTML += 'Rebooting system...\n';
        // Redirect after a short delay to feel more authentic
        setTimeout(() => {
          window.location.href = '/';
        }, 500);
      } else if (command) {
        output.innerHTML += `Command not found: ${command}. Type 'reboot' to return.\n\n`;
      }

      this.value = '';
      // Ensure the view scrolls down after command execution
      setTimeout(() => {
        terminal.scrollTop = terminal.scrollHeight;
      }, 0);
    }
  });

  // Refocus the input if the user clicks anywhere on the terminal
  terminal.addEventListener('click', () => {
    commandInput.focus();
  });
});
