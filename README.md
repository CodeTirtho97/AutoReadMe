AutoReadMe – Instant README Generator 🚀

   

AutoReadMe is an instant README generator for developers, automating the creation of structured and detailed README.md files for various project types. It supports interactive CLI mode, different README templates, GitHub badges integration, and debug mode for enhanced customization.

📌 Features

✅ Instant README Generation – Create a README.md in seconds.✅ Interactive CLI – Choose templates, add badges, and preview metadata.✅ Multiple README Templates – Basic, Open Source, CLI Tool, API Docs.✅ GitHub Badges Integration – Add dynamic badges for GitHub stats.✅ Debug Mode – View detailed metadata before generating README.✅ Persistent Logs – Retrieve past README generations.✅ Smart .gitignore Handling – Auto-updates .gitignore to prevent log commits.✅ Cross-Platform Support – Works on Windows, macOS, Linux.

⚙️ Installation

Install globally via npm:

npm install -g autoreadme

Verify installation:

autoreadme --version

🚀 Usage

Generate a README.md using interactive CLI:

autoreadme generate

You'll be prompted to:
1️⃣ Select a README template (Basic, Open Source, CLI Tool, API Docs).2️⃣ Choose whether to include GitHub badges.3️⃣ Auto-generate and save README.md.

Example CLI Output

📌 Extracting project metadata...
✅ Project Metadata Retrieved successfully!!
✔ 📌 Select a README template: 🛠 CLI Tool (Commands, Usage)
✔ 🏆 Do you want to include GitHub badges? No
📄 Generating README.md using "cli-tool" template...
✅ README.md successfully created at /your_project/README.md

📄 Available Templates

AutoReadMe supports the following README templates:

Template Type

Description

📄 Basic

Minimal README with project details, installation, and usage.

🌍 Open Source

Includes contributing guide & code of conduct.

🛠 CLI Tool

Adds CLI commands, usage examples.

🔗 API Docs

Includes API endpoints, documentation links.

🛠 CLI Options

Command

Description

autoreadme generate

Run interactive mode to generate README.md.

autoreadme --help

Show available commands.

autoreadme --version

Display current version.

autoreadme debug

Enable debug mode to inspect metadata.

autoreadme logs

View past README generation logs.

🐞 Debugging & Logs

Enable Debug Mode

autoreadme generate

✔ Select 🐞 Enable Debug Mode

📌 Displays full metadata output before README generation.

View Logs

autoreadme generate

✔ Select 🔍 View Logs

📌 Displays history of README generations and exits.

Log Storage

Logs are stored in ~/.autoreadme/logs.json (hidden from users).

The file is automatically ignored in .gitignore to prevent GitHub commits.

🤝 Contributing

We welcome contributions! To contribute:
1️⃣ Fork the repository.2️⃣ Clone it: git clone https://github.com/CodeTirtho97/AutoReadMe.git3️⃣ Create a new branch & submit a PR.

📜 License

This project is licensed under the MIT License. See LICENSE for details.

🔗 Links

GitHub Repo: AutoReadMe

NPM Package: AutoReadMe