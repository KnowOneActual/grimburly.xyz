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

    const commands = {
        help: `<pre class="ascii">
<span class="text-yellow">Available commands:</span>
  - whois    : About Grimburly
  - social   : My social media links
  - projects : View my latest work
  - motd     : Display the message of the day
  - date     : Show the current date and time
  - clear    : Clear the terminal
  - reboot   : Reboot the system</pre>`,
        whois: `<pre class="ascii">
<span class="text-yellow">grimburly:</span> A creative tech generalist.
Loves building fun, interactive things.
Powered by coffee and curiosity.</pre>`,
        social: `<pre class="ascii">
<span class="text-yellow">Connecting...</span>
  - Mastodon: <a href="https://mastodon.social/@grimburly" target="_blank">mastodon.social/@grimburly</a>
  - Bluesky : <a href="https://bsky.app/profile/@grimburly.xyz" target="_blank">bsky.app/profile/@grimburly.xyz</a>
  - GitHub  : <a href="https://github.com/KnowOneActual" target="_blank">github.com/KnowOneActual</a></pre>`,
        projects: `<pre class="ascii">
<span class="text-yellow">Fetching projects...</span>
  - Weather Bot        : An AI-powered conversational weather bot.
  - AV IP Calculator   : A tool for AV techs to plan on-site networks.
  - Image Cleaner (Tor): A privacy-first tool to strip image metadata.
  - More at          : <a href="https://beaubremer.com" target="_blank">beaubremer.com</a></pre>`,
        date: new Date().toString(),
        motd: motd[Math.floor(Math.random() * motd.length)],
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
        'Type `help` for a list of commands.',
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
                        matrix[i - 1][j - 1] + 1, // substitution
                        matrix[i][j - 1] + 1,     // insertion
                        matrix[i - 1][j] + 1      // deletion
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

        // Only suggest if the distance is reasonably close (e.g., 2 or less)
        return minDistance <= 2 ? closestCmd : null;
    }

    runBootSequence();

    commandInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim().toLowerCase();
            const prompt = `<div class="prompt-line"><span class="prompt">grimburly@xyz:~$</span><span class="command-text">${command}</span></div>`;
            output.innerHTML += prompt;

            if (command) {
                commandHistory.unshift(command); // Add command to history
                historyIndex = -1; // Reset history index
            }

            if (command in commands) {
                if (command === 'date') {
                    commands.date = new Date().toString();
                } else if (command === 'motd') {
                    commands.motd = motd[Math.floor(Math.random() * motd.length)];
                }
                const response = commands[command];
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
            document.getElementById('terminal').scrollTop = document.getElementById('terminal').scrollHeight;

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
            e.preventDefault(); // Prevent default tab behavior
            const partialCommand = this.value.trim().toLowerCase();
            if (partialCommand) {
                const matchingCommands = Object.keys(commands).filter(cmd => cmd.startsWith(partialCommand));
                if (matchingCommands.length === 1) {
                    this.value = matchingCommands[0];
                }
            }
        }
    });

    document.getElementById('terminal').addEventListener('click', () => {
        commandInput.focus();
    });
});