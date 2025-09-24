document.addEventListener('DOMContentLoaded', () => {
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
        '"Do a barrel roll!"'
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
        'contact.txt': `<pre class="ascii">
<span class="text-yellow">Get in touch:</span>
  - Form: <a href="https://beaubremer.com/#contact" target="_blank">beaubremer.com/#contact</a></pre>`
    };

    // --- Theme Management ---
    const themes = ['green', 'amber', 'mono'];

    const commands = {
        help: `<pre class="ascii">
<span class="text-yellow">Available commands:</span>
  - ls       : List files and directories
  - cat      : Display content of a file
  - theme    : Change the terminal theme
  - contact  : Show contact information
  - motd     : Display the message of the day
  - date     : Show the current date and time
  - clear    : Clear the terminal
  - reboot   : Reboot the system</pre>`,
        ls: Object.keys(filesystem).join('\n'),
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
                document.body.className = themeName === 'green' ? '' : `theme-${themeName}`;
                return `Theme set to ${themeName}.`;
            }
            return `Theme not found. Available themes: ${themes.join(', ')}`;
        },
        contact: () => filesystem['contact.txt'],
        date: () => new Date().toString(),
        motd: () => motd[Math.floor(Math.random() * motd.length)],
        clear: '',
        reboot: ''
    };

    const bootSequence = [
        'Booting GRIMBURLY OS...',
        'System check... OK.',
        'Loading modules... DONE.',
        'Connecting to network... SECURE.',
        banner,
        'Welcome, user.',
        'Type `help` or `ls` for a list of commands and files.',
        ''
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
            commandInput.scrollIntoView();
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
        for (let i = 0; i <= b.length; i++) { matrix[i] = [i]; }
        for (let j = 0; j <= a.length; j++) { matrix[0][j] = j; }
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
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

    commandInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const fullInput = this.value.trim().toLowerCase();
            const [command, ...args] = fullInput.split(' ');
            const prompt = `<div class="prompt-line"><span class="prompt">grimburly@xyz:~$</span><span class="command-text">${fullInput}</span></div>`;
            output.innerHTML += prompt;

            if (command) {
                commandHistory.unshift(fullInput);
                historyIndex = -1;
            }

            if (command in commands) {
                let response;
                const cmdFunction = commands[command];
                if (typeof cmdFunction === 'function') {
                    response = cmdFunction(args);
                } else {
                    response = cmdFunction;
                }
                if (command === 'clear') {
                    output.innerHTML = '';
                } else if (command === 'reboot') {
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

            // This is the key change:
            // Use a timeout to ensure the scroll happens after the DOM has been updated.
            setTimeout(() => {
                this.scrollIntoView();
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
                const matchingCommands = Object.keys(commands).filter(cmd => cmd.startsWith(command));
                if (matchingCommands.length === 1) {
                    this.value = matchingCommands[0];
                }
            } else if (command === 'cat' && partialArg) {
                const matchingFiles = Object.keys(filesystem).filter(file => file.startsWith(partialArg));
                if (matchingFiles.length === 1) {
                    this.value = `cat ${matchingFiles[0]}`;
                }
            }
        }
    });

    document.getElementById('terminal').addEventListener('click', () => {
        commandInput.focus();
    });

    // --- New code for the keyboard issue ---
    // When the input field is focused, scroll it into view.
    commandInput.addEventListener('focus', () => {
        // A short timeout gives the browser time to render the keyboard
        setTimeout(() => {
            commandInput.scrollIntoView();
        }, 100);
    });
});

