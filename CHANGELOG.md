# Changelog

All notable changes to this project will be documented in this file.

The format is based on on Keep a Changelog,

and this project adheres to Semantic Versioning.

A solid changelog entry for this round of work could look like this:

## Changelog

### [1.8.4] – 2026-01-04

#### Fixed
- Resolved GitHub Pages Content Security Policy blocking the app JavaScript by moving inline `<script>` into an external `linktracker.js` file.
- Removed inline event handlers (such as `onclick`) and replaced them with `addEventListener`-based wiring for all controls, including View Progress, Expand/Collapse, Export, and Clear.
- Eliminated inline styles on header text in favor of a reusable `.header-subtitle` CSS class to comply with stricter CSP rules.

#### Changed
- Slightly adjusted HTML structure to add stable IDs for buttons and links used by the external script (for example, `view-progress-link`, `expand-all-btn`, `collapse-all-btn`, `export-btn`, `clear-btn`).



## [1.8.3] - 2025-10-02


### Added

- Clickable ls Output: Filenames listed by the ls command are now clickable, which auto-populates the input with the corresponding cat command.

- Dynamic Page Title: The browser tab title now temporarily updates to reflect the command currently being executed.

- Secret File & Theme: Added a hidden journal.log file that contains a clue to unlock a secret "matrix" theme, rewarding user exploration.

- New Commands: Added history to show command history and echo to repeat text, enhancing the authentic terminal feel. 

- Enhanced help command: The help command can now accept an argument (e.g., help cat) to display detailed usage for a specific command. 

- 'sudo' Easter Egg: Included a playful sudo command that returns a classic "permission denied" message.


- An interactive, themed 404 "File Not Found" page that maintains the terminal aesthetic and allows the user to `reboot` back to the main site.

- sitemap.xml

### Fixed
- **Accessibility**: Resolved a linter warning by programmatically linking the visual prompt to the command input field using `aria-labelledby`, making it accessible to screen readers.


## [1.8.1] - 2025-09-24


### Changed



* **Contact Display:** Replaced the ASCII art for the email address with a cleaner, text-based box design for better readability and a more professional appearance.


## [1.8.0] - 2025-09-24


### Changed



* **Contact Information:** Updated the contact command and contact.txt file to display the email address grim@grimburly.xyz as ASCII art, enhancing the site's theme and providing resistance to email scrapers.


## [1.7.2] - 2025-09-24


### Fixed



* **Mobile Viewport Issues:** Refactored the CSS layout using a more robust flexbox model and improved the JavaScript scrolling logic to ensure the command prompt remains visible and usable on mobile devices, especially when the on-screen keyboard is active.


## [1.7.1] - 2025-09-20


### Added



* **Pull Request Template:** Added a PULL_REQUEST_TEMPLATE.md to the repository to standardize contributions and improve the review process.


## [1.7.0] - 2025-09-20


### Added



* **Prettier Configuration:** Added a .prettierrc file to enforce a consistent code style across the project, improving code quality and maintainability.


## [1.6.0] - 2025-09-20


### Added



* **Contact Command:** Added a contact command and a corresponding contact.txt file that links to an external contact form.


## [1.5.0] - 2025-09-20


### Added



* **Theme Command:** Added a theme command that allows users to switch between different color schemes ('green', 'amber', 'mono').
* **CSS Refactor:** Refactored the stylesheet to use CSS variables for colors, enabling the new theme functionality.


## [1.4.1] - 2025-09-20


### Improved



* **Tab Autocomplete:** The feature now also completes filenames for the cat command, improving usability.


## [1.4.0] - 2025-09-20


### Added



* **Simulated File System:** Replaced the whois, social, and projects commands with a more immersive file system.
* **ls Command:** Added the ls command to list available "files."
* **cat Command:** Added the cat command to display the content of "files."


## [1.3.0] - 2025-09-20


### Added



* **Tab Autocomplete:** Implemented a tab-to-complete feature for the command input, making it faster and easier to use.


## [1.2.0] - 2025-09-20


### Added



* **Typo Suggestions:** Implemented a feature to suggest valid commands when a user enters a typo. This is powered by the Levenshtein distance algorithm to find the closest match.


### Fixed



* **Responsive Design:** Adjusted font sizes and added scaling for the ASCII art to ensure it displays correctly on mobile devices without being cut off or distorted.


## [1.1.0] - 2025-09-19


### Added



* **Favicon and Meta Tags:** Added a full set of favicons and a description meta tag to index.html for better browser integration and SEO.
* **Command History:** Implemented a command history feature, allowing users to cycle through previous commands using the up and down arrow keys.
* **Security Headers:** Created a netlify.toml file to enforce HTTPS and add other security headers like a Content Security Policy (CSP).


### Improved



* **User Experience:** The new command history feature makes the terminal much easier and more intuitive to use.


## [1.0.0] - 2025-09-19


### Added



* **Initial Project Setup:** Created the foundational index.html, style.css, and script.js files.
* **Retro Terminal Interface:** Built a single-page website styled as a classic computer terminal, complete with a pixel font (VT323) and a green-on-black color scheme.
* **Boot-up Sequence:** Implemented a JavaScript-powered animation that simulates a system booting up on page load.
* **Interactive Command Prompt:** Created a functional command line where users can enter commands.
* **Command Library:**
    * help: Lists all available commands.
    * whois: Displays a short bio for the "grimburly" persona.
    * social: Shows clickable links to a social media profile.
    * projects: Lists key projects with links for more information.
    * date: Shows the current system date and time.
    * motd: Displays a random "Message of the Day".
    * clear: Clears the terminal screen.
    * reboot: Restarts the boot-up sequence.
* **Visual Effects:**
    * Added a custom ASCII art banner for "GRIMBURLY".
    * Implemented colored text output for better readability.
    * Added a subtle, non-intrusive scan lines overlay to enhance the retro CRT monitor feel.


### Fixed



* Corrected multiple versions of the ASCII art to ensure the name "GRIMBURLY" is spelled correctly and is legible.
* Resolved a visual bug where a text-glow animation caused the entire page to appear blurry. The final version uses a