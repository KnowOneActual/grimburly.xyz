document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const commandInput = document.getElementById('command-input');

    // Corrected ASCII Art Banner for "GRIMBURLY"
    const banner = `<pre class="ascii text-magenta">
  ██████╗ ██╗██╗███╗   ███╗██████╗ ██╗   ██╗██╗   ██╗██╗   ██╗
 ██╔════╝ ██║██║████╗ ████║██╔══██╗██║   ██║██║   ██║╚██╗ ██╔╝
 ██║  ███╗██║██║██╔████╔██║██████╔╝██║   ██║██║   ██║ ╚████╔╝
 ██║   ██║██║██║██║╚██╔╝██║██╔══██╗██║   ██║██║   ██║  ╚██╔╝
 ╚██████╔╝██║██║██║ ╚═╝ ██║██████╔╝╚██████╔╝╚██████╔╝   ██║
  ╚═════╝ ╚═╝╚═╝╚═╝     ╚═╝╚═════╝  ╚═════╝  ╚═════╝    ╚═╝
</pre>`;

    const commands = {
        help: `<pre class="ascii">
<span class="text-yellow">Available commands:</span>
  - whois    : About Grimburly
  - social   : My social media links
  - projects : View my latest work
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

    runBootSequence();

    commandInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim().toLowerCase();
            const prompt = `<div class="prompt-line"><span class="prompt">grimburly@xyz:~$</span><span class="command-text">${command}</span></div>`;
            output.innerHTML += prompt;

            if (command in commands) {
                const response = commands[command];
                if (command === 'clear') {
                    output.innerHTML = '';
                } else if (command === 'reboot') {
                    runBootSequence();
                } else {
                    output.innerHTML += `${response}\n\n`;
                }
            } else if (command) {
                output.innerHTML += `Command not found: ${command}. Type 'help' for a list of commands.\n\n`;
            }

            this.value = '';
            document.getElementById('terminal').scrollTop = document.getElementById('terminal').scrollHeight;
        }
    });

    document.getElementById('terminal').addEventListener('click', () => {
        commandInput.focus();
    });
});
