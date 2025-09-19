# Changelog

All notable changes to this project will be documented in this file.

The format is based on on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-09-19

### Added
- **Favicon and Meta Tags:** Added a full set of favicons and a description meta tag to `index.html` for better browser integration and SEO.
- **Command History:** Implemented a command history feature, allowing users to cycle through previous commands using the up and down arrow keys.
- **Security Headers:** Created a `netlify.toml` file to enforce HTTPS and add other security headers like a Content Security Policy (CSP).

### Improved
- **User Experience:** The new command history feature makes the terminal much easier and more intuitive to use.

## [1.0.0] - 2025-09-19

### Added

- **Initial Project Setup:** Created the foundational `index.html`, `style.css`, and `script.js` files.
- **Retro Terminal Interface:** Built a single-page website styled as a classic computer terminal, complete with a pixel font (`VT323`) and a green-on-black color scheme.
- **Boot-up Sequence:** Implemented a JavaScript-powered animation that simulates a system booting up on page load.
- **Interactive Command Prompt:** Created a functional command line where users can enter commands.
- **Command Library:**
    - `help`: Lists all available commands.
    - `whois`: Displays a short bio for the "grimburly" persona.
    - `social`: Shows clickable links to social media profiles.
    - `projects`: Lists key projects with links for more information.
    - `date`: Shows the current system date and time.
    - `motd`: Displays a random "Message of the Day".
    - `clear`: Clears the terminal screen.
    - `reboot`: Restarts the boot-up sequence.
- **Visual Effects:**
    - Added a custom ASCII art banner for "GRIMBURLY".
    - Implemented colored text output for better readability.
    - Added a subtle, non-intrusive scan lines overlay to enhance the retro CRT monitor feel.

### Fixed

- Corrected multiple versions of the ASCII art to ensure the name "GRIMBURLY" is spelled correctly and is legible.
- Resolved a visual bug where a text-glow animation caused the entire page to appear blurry. The final version uses a crisp, sharp text display.