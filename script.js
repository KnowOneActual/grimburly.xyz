document.addEventListener('DOMContentLoaded', () => {
  const terminal = document.getElementById('terminal');
  const output = document.getElementById('output');
  const commandInput = document.getElementById('command-input');
  const originalTitle = document.title; // QoL: Store the original title
  let commandHistory = [];
  let historyIndex = -1;

  const banner = `<pre class="ascii text-magenta">
 ██████╗ ██████╗ ██╗███╗   ███╗██████╗ ██╗   ██╗██████╗ ██╗  ██╗   ██╗
██╔════╝ ██╔══██╗██║████╗ ████║██╔══██╗██║   ██║██╔══██╗██║  ╚██╗ ██╔╝
██║  ███╗██████╔╝██║██╔████╔██║██████╔╝██║   ██║██████╔╝██║   ╚████╔╝
██║   ██║██╔══██╗██║██║╚██╔╝██║██╔══██╗██║   ██║██╔══██╗██║    ╚██╔╝
╚██████╔╝██║  ██║██║██║ ╚═╝ ██║██████╔╝╚██████╔╝██║  ██║███████╗██║
 ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝

</pre>`;

  const motd = [
    '"Stay bold, keep creating, and rock on!"',
    '"Have the Best Day and/or Night ever!"',
    '"The future is not set. There is no fate but what we make for ourselves."',
    '"Do a barrel roll!"',
  ];

  const filesystem = {
    'about.txt': `<pre class="ascii">
<span class="text-yellow">grimburly:</span> A creative tech generalist.
Loves building fun, interactive things.
Powered by coffee and curiosity.
Seems to be keeping a private journal...</pre>`, // QoL: Hint for the secret file
    'social.links': `<pre class="ascii">
<span class="text-yellow">Connecting...</span>
  - Mastodon: <a href="https://mastodon.social/@grimburly" target="_blank">mastodon.social/@grimburly</a>
  - Bluesky : <a href="https://bsky.app/profile/@grimburly.xyz" target="_blank">bsky.app/profile/@grimburly.xyz</a>
  - GitHub  : <a href="https://github.com/KnowOneActual" target="_blank">github.com/KnowOneActual</a></pre>`,
    'projects.md': `<pre class="ascii">
<span class="text-yellow">Fetching projects...</span>
  - Weather Bot        : An AI-powered conversational weather bot.
  - AV IP Calculator   : A tool for AV techs to plan on-site networks.
  - Image Cleaner (Tor): A privacy-first tool to strip image metadata.
  - More at          : <a href="https://beaubremer.com" target="_blank">beaubremer.com</a></pre>`,
    'contact.txt': `<pre class="ascii text-cyan">
+---------------------------------------+
|                                       |
|  Email: grim [at] grimburly [dot] xyz |
|                                       |
+---------------------------------------+
</pre>`,
    // QoL: New secret file, not shown by 'ls'
    'journal.log': `<pre class="ascii text-yellow">
[ENTRY 001]
The simulation is running smoothly. The user seems engaged.
They found this log. Clever. They must be rewarded.

Let's add a secret theme. Try: 'theme matrix'</pre>`,
  };

  // --- Theme Management ---
  const themes = ['green', 'amber', 'mono', 'matrix']; // Added secret theme

  const commandDetails = {
    help: 'Usage: help [command]\nDisplays a list of commands or details about a specific command.',
    ls: 'Usage: ls\nLists all available files.',
    cat: 'Usage: cat [filename]\nDisplays the content of a file.',
    theme:
      'Usage: theme [name]\nChanges the terminal theme. Available: green, amber, mono.',
    contact: 'Usage: contact\nShows contact information.',
    motd: 'Usage: motd\nDisplays the message of the day.',
    date: 'Usage: date\nShows the current date and time.',
    clear: 'Usage: clear\nClears the terminal screen.',
    reboot: 'Usage: reboot\nReboots the system.',
    history: 'Usage: history\nDisplays your command history.',
    echo: 'Usage: echo [text]\nDisplays a line of text.',
    sudo: 'Usage: sudo [command]\nExecute a command as the superuser.',
  };

  const commands = {
    help: (args) => {
      const commandName = args[0];
      if (commandName) {
        if (commandDetails[commandName]) {
          return commandDetails[commandName];
        }
        return `help: No help topics match '${commandName}'.`;
      } else {
        return `<pre class="ascii">
<span class="text-yellow">Available commands:</span>
  - ls       : List files and directories
  - cat      : Display content of a file
  - echo     : Display a line of text
  - history  : View your command history
  - theme    : Change the terminal theme
  - contact  : Show contact information
  - motd     : Display the message of the day
  - date     : Show the current date and time
  - clear    : Clear the terminal
  - reboot   : Reboot the system
  - sudo     : Execute a command as root

Type 'help [command]' for more information.</pre>`;
      }
    },
    // --- UPDATED: 'ls' Command for Clickable Output ---
    ls: () => {
      const visibleFiles = Object.keys(filesystem).filter(
        (file) => file !== 'journal.log',
      );
      return visibleFiles
        .map(
          (file) =>
            `<span class="file-link text-cyan" data-filename="${file}">${file}</span>`,
        )
        .join('\n');
    },
    cat: (args) => {
      const filename = args[0];
      if (!filename) {
        return 'Usage: cat [filename]';
      }
      if (filename in filesystem) {
        return filesystem[filename];
      }
      return `cat: ${filename}: No such file or directory`;
    },
    theme: (args) => {
      const themeName = args[0];
      if (!themeName) {
        return `Usage: theme [name]\nAvailable themes: green, amber, mono.`;
      }
      if (themes.includes(themeName)) {
        // The 'green' theme is the default (no class)
        if (themeName === 'green') {
          document.body.className = '';
        } else {
          document.body.className = `theme-${themeName}`;
        }
        return `Theme set to ${themeName}.`;
      }
      return `Theme not found. Available themes: green, amber, mono.`;
    },
    contact: () => filesystem['contact.txt'],
    date: () => new Date().toString(),
    motd: () => motd[Math.floor(Math.random() * motd.length)],
    clear: () => '',
    reboot: () => '',
    history: () => {
      if (commandHistory.length === 0) {
        return 'No history to show.';
      }
      return commandHistory
        .slice()
        .reverse()
        .map((cmd, i) => `<span class="text-cyan">${i + 1}</span>  ${cmd}`)
        .join('\n');
    },
    echo: (args) => {
      return args.join(' ');
    },
    sudo: () => {
      return `<span class="text-yellow">Error:</span> User is not in the sudoers file. This incident will be reported.`;
    },
  };

  const bootSequence = [
    'Booting GRIMBURLY OS...',
    'System check... OK.',
    'Loading modules... DONE.',
    'Connecting to network... SECURE.',
    banner,
    'Welcome, user.',
    'Type `help` or `ls` for a list of commands and files.',
    '',
  ];

  function runBootSequence() {
    let lineIndex = 0;
    output.innerHTML = '';
    function typeLine() {
      if (lineIndex < bootSequence.length) {
        output.innerHTML += `${bootSequence[lineIndex]}\n`;
        lineIndex++;
        setTimeout(typeLine, Math.random() * 100 + 50);
      } else {
        commandInput.focus();
        terminal.scrollTop = terminal.scrollHeight;
      }
    }
    typeLine();
  }

  function levenshtein(a, b) {
    // Levenshtein distance logic (unchanged)
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1,
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  function findClosestCommand(cmd) {
    // findClosestCommand logic (unchanged)
    let closestCmd = '';
    let minDistance = Infinity;
    Object.keys(commands).forEach((validCmd) => {
      const distance = levenshtein(cmd, validCmd);
      if (distance < minDistance) {
        minDistance = distance;
        closestCmd = validCmd;
      }
    });
    return minDistance <= 2 ? closestCmd : null;
  }

  runBootSequence();

  commandInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const fullInput = this.value.trim();
      const [command, ...args] = fullInput.split(' ');
      const prompt = `<div class="prompt-line"><span class="prompt">grimburly@xyz:~$</span><span class="command-text">${fullInput}</span></div>`;
      output.innerHTML += prompt;

      if (fullInput) {
        commandHistory.unshift(fullInput);
        historyIndex = -1;
        // QoL: Update page title with the command
        document.title = `${command} - grimburly.xyz`;
      }

      const lowerCaseCommand = command.toLowerCase();

      if (lowerCaseCommand in commands) {
        const cmdFunction = commands[lowerCaseCommand];
        const response =
          typeof cmdFunction === 'function' ? cmdFunction(args) : cmdFunction;

        if (lowerCaseCommand === 'clear') {
          output.innerHTML = '';
        } else if (lowerCaseCommand === 'reboot') {
          runBootSequence();
        } else {
          output.innerHTML += `${response}\n\n`;
        }
      } else if (command) {
        const suggestion = findClosestCommand(command);
        output.innerHTML +=
          `Command not found: ${command}. ` +
          (suggestion
            ? `Did you mean '<span class="text-yellow">${suggestion}</span>'?\n\n`
            : `Type 'help' for a list of commands.\n\n`);
      }

      this.value = '';

      setTimeout(() => {
        terminal.scrollTop = terminal.scrollHeight;
        // QoL: Reset page title after command execution
        if (command) document.title = originalTitle;
      }, 0);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      // Arrow key history logic (unchanged)
      if (e.key === 'ArrowUp' && historyIndex < commandHistory.length - 1)
        historyIndex++;
      if (e.key === 'ArrowDown' && historyIndex > 0) historyIndex--;
      this.value = historyIndex >= 0 ? commandHistory[historyIndex] : '';
      if (e.key === 'ArrowDown' && historyIndex < 0) this.value = '';
    } else if (e.key === 'Tab') {
      // Tab autocomplete logic (unchanged)
      e.preventDefault();
      const [command, partialArg] = this.value.trim().toLowerCase().split(' ');
      if (!partialArg) {
        const matchingCommands = Object.keys(commands).filter((cmd) =>
          cmd.startsWith(command),
        );
        if (matchingCommands.length === 1) this.value = matchingCommands[0];
      } else if (command === 'cat' || command === 'help') {
        const fileList =
          command === 'cat'
            ? Object.keys(filesystem)
            : Object.keys(commandDetails);
        const matchingFiles = fileList.filter((file) =>
          file.startsWith(partialArg),
        );
        if (matchingFiles.length === 1)
          this.value = `${command} ${matchingFiles[0]}`;
      }
    }
  });

  // --- NEW: Event Listener for Clickable Filenames ---
  output.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('file-link')) {
      e.preventDefault();
      const filename = e.target.dataset.filename;
      commandInput.value = `cat ${filename}`;
      commandInput.focus();
    }
  });

  terminal.addEventListener('click', () => {
    commandInput.focus();
  });

  commandInput.addEventListener('focus', () => {
    setTimeout(() => {
      terminal.scrollTop = terminal.scrollHeight;
    }, 100);
  });
});
