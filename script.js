document.addEventListener('DOMContentLoaded', () => {
  const terminal = document.getElementById('terminal'); // Get the terminal element
  const output = document.getElementById('output');
  const commandInput = document.getElementById('command-input');
  let commandHistory = [];
  let historyIndex = -1;

  // Corrected ASCII Art Banner for "GRIMBURLY"
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
Powered by coffee and curiosity.</pre>`,
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
  };

  // --- Theme Management ---
  const themes = ['green', 'amber', 'mono'];

  // --- NEW: Detailed Help Descriptions ---
  // Storing command descriptions here makes the help command cleaner.
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
    // --- UPDATED: Help Command ---
    // Now a function that can provide detailed help.
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
    ls: () => Object.keys(filesystem).join('\n'),
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
        return `Usage: theme [name]\nAvailable themes: ${themes.join(', ')}`;
      }
      if (themes.includes(themeName)) {
        document.body.className =
          themeName === 'green' ? '' : `theme-${themeName}`;
        return `Theme set to ${themeName}.`;
      }
      return `Theme not found. Available themes: ${themes.join(', ')}`;
    },
    contact: () => filesystem['contact.txt'],
    date: () => new Date().toString(),
    motd: () => motd[Math.floor(Math.random() * motd.length)],
    clear: () => '',
    reboot: () => '',
    // --- NEW: History Command ---
    history: () => {
      if (commandHistory.length === 0) {
        return 'No history to show.';
      }
      // Create a numbered list from the history array
      return commandHistory
        .slice()
        .reverse()
        .map((cmd, i) => `<span class="text-cyan">${i + 1}</span>  ${cmd}`)
        .join('\n');
    },
    // --- NEW: Echo Command ---
    echo: (args) => {
      // Joins all arguments back into a single string
      return args.join(' ');
    },
    // --- NEW: Sudo Easter Egg ---
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

  let lineIndex = 0;

  function typeLine() {
    if (lineIndex < bootSequence.length) {
      output.innerHTML += `${bootSequence[lineIndex]}\n`;
      lineIndex++;
      setTimeout(typeLine, Math.random() * 100 + 50);
    } else {
      commandInput.focus();
      // Scroll to the bottom after the boot sequence
      terminal.scrollTop = terminal.scrollHeight;
    }
  }

  function runBootSequence() {
    lineIndex = 0;
    output.innerHTML = '';
    typeLine();
  }

  // Levenshtein distance function to find closest match for typos
  function levenshtein(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
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
    let closestCmd = '';
    let minDistance = Infinity;
    for (const validCmd in commands) {
      const distance = levenshtein(cmd, validCmd);
      if (distance < minDistance) {
        minDistance = distance;
        closestCmd = validCmd;
      }
    }
    return minDistance <= 2 ? closestCmd : null;
  }

  runBootSequence();

  commandInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const fullInput = this.value.trim(); // No more toLowerCase() here
      const [command, ...args] = fullInput.split(' ');
      const prompt = `<div class="prompt-line"><span class="prompt">grimburly@xyz:~$</span><span class="command-text">${fullInput}</span></div>`;
      output.innerHTML += prompt;

      if (fullInput) {
        // Add to history only if it's not empty
        commandHistory.unshift(fullInput);
        historyIndex = -1;
      }

      // The command itself is case-insensitive
      const lowerCaseCommand = command.toLowerCase();

      if (lowerCaseCommand in commands) {
        let response;
        const cmdFunction = commands[lowerCaseCommand];
        if (typeof cmdFunction === 'function') {
          response = cmdFunction(args);
        } else {
          response = cmdFunction;
        }
        if (lowerCaseCommand === 'clear') {
          output.innerHTML = '';
        } else if (lowerCaseCommand === 'reboot') {
          runBootSequence();
        } else {
          output.innerHTML += `${response}\n\n`;
        }
      } else if (command) {
        const suggestion = findClosestCommand(command);
        if (suggestion) {
          output.innerHTML += `Command not found: ${command}. Did you mean '<span class="text-yellow">${suggestion}</span>'?\n\n`;
        } else {
          output.innerHTML += `Command not found: ${command}. Type 'help' for a list of commands.\n\n`;
        }
      }

      this.value = '';

      // This is the new, more forceful scrolling method
      setTimeout(() => {
        terminal.scrollTop = terminal.scrollHeight;
      }, 0);
    } else if (e.key === 'ArrowUp') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        this.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        historyIndex--;
        this.value = commandHistory[historyIndex];
      } else {
        historyIndex = -1;
        this.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const inputParts = this.value.trim().toLowerCase().split(' ');
      const command = inputParts[0];
      const partialArg = inputParts[1];

      if (inputParts.length === 1) {
        const matchingCommands = Object.keys(commands).filter((cmd) =>
          cmd.startsWith(command),
        );
        if (matchingCommands.length === 1) {
          this.value = matchingCommands[0];
        }
      } else if (command === 'cat' && partialArg) {
        const matchingFiles = Object.keys(filesystem).filter((file) =>
          file.startsWith(partialArg),
        );
        if (matchingFiles.length === 1) {
          this.value = `cat ${matchingFiles[0]}`;
        }
      }
    }
  });

  document.getElementById('terminal').addEventListener('click', () => {
    commandInput.focus();
  });

  // When the input field is focused (tapped), scroll it into view.
  commandInput.addEventListener('focus', () => {
    setTimeout(() => {
      terminal.scrollTop = terminal.scrollHeight;
    }, 100); // A short delay helps mobile browsers catch up
  });
});
