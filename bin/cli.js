#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import os from "os";
import readMetadata from "../src/readMetadata.js";
import generateReadme from "../src/generateReadme.js";

// 📌 Define a hidden logs directory in the system's home folder
const LOGS_DIR = path.join(os.homedir(), ".autoreadme");
const LOG_FILE_PATH = path.join(LOGS_DIR, "logs.json");

// Ensure the hidden logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

// Function to read logs from the hidden log file
const readLogs = () => {
  try {
    if (fs.existsSync(LOG_FILE_PATH)) {
      const logData = fs.readFileSync(LOG_FILE_PATH, "utf-8");
      return JSON.parse(logData);
    }
    return [];
  } catch (error) {
    return [];
  }
};

// Function to write logs to the hidden log file
const writeLogs = (logs) => {
  try {
    fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(logs, null, 2), "utf-8");
  } catch (error) {
    console.log(chalk.red("❌ Error writing logs"));
  }
};

// Function to log messages persistently
const logMessage = (message) => {
  let logHistory = readLogs();
  logHistory.push(message);
  writeLogs(logHistory);
};

// Function to display logs in CLI and exit
const displayLogsAndExit = () => {
  console.log(chalk.cyan("\n📜 AutoReadMe Log History:"));
  let logHistory = readLogs();
  if (logHistory.length === 0) {
    console.log(chalk.yellow("⚠️ No logs available yet."));
  } else {
    logHistory.forEach((log, index) => console.log(`${chalk.magenta(index + 1)}. ${log}`));
  }
  console.log(chalk.red("\n❌ Exiting AutoReadMe after showing logs."));
  process.exit(0);
};

// Function to display the welcome banner
const showBanner = () => {
  console.log(chalk.blue.bold(figlet.textSync("AutoReadMe", { horizontalLayout: "full" })));
  console.log(chalk.greenBright("📄 Instant README Boilerplate Generator"));
  console.log(chalk.yellow("✨ Created by CodeTirtho97 ✨\n"));
};

// Function to ask user for main menu options
const askUserChoices = async () => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "📌 What would you like to do?",
      choices: [
        { name: "📄 Generate README", value: "generate" },
        { name: "🔍 View Logs", value: "logs" },
        { name: "🐞 Enable Debug Mode", value: "debug" },
        { name: "❌ Exit", value: "exit" },
      ],
    },
  ]);

  if (answers.action === "logs") {
    displayLogsAndExit(); // Show logs and exit
  } else if (answers.action === "debug") {
    console.log(chalk.bgYellow.black("\n🐞 Debug Mode Enabled: Detailed Logs Below\n"));
    return { enableDebug: true };
  } else if (answers.action === "exit") {
    console.log(chalk.red("❌ Exiting AutoReadMe."));
    process.exit(0);
  }

  return { enableDebug: false };
};

// Function to ask for README template and badge selection
const askReadmeOptions = async () => {
  return await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "📌 Select a README template:",
      choices: [
        { name: "📄 Basic", value: "basic" },
        { name: "🌍 Open Source (Contributing Guide, Code of Conduct)", value: "open-source" },
        { name: "🛠 CLI Tool (Commands, Usage)", value: "cli-tool" },
        { name: "🔗 API Docs (Endpoints, API Reference)", value: "api-docs" },
      ],
    },
    {
      type: "confirm",
      name: "includeBadges",
      message: "🏆 Do you want to include GitHub badges?",
      default: true,
    },
  ]);
};

program
  .version("1.0.0")
  .description(chalk.green("AutoReadMe - Instant README Generator"))
  .command("generate")
  .description("Generate a README.md file")
  .action(async () => {
    showBanner();

    // Ask user for main menu options
    const userChoices = await askUserChoices();

    console.log(chalk.blue("\n📌 Extracting project metadata..."));
    const metadata = await readMetadata();

    if (metadata) {
      logMessage(`✅ Project metadata retrieved for ${metadata.name}`);

      if (userChoices.enableDebug) {
        console.log(chalk.bgMagenta("\n🐞 Debug Info: Full Metadata Output\n"), metadata);
      } else {
        console.log(chalk.green("\n✅ Project Metadata Retrieved successfully!!"));
      }

      // Ask for template & badges selection (even in debug mode)
      const readmeChoices = await askReadmeOptions();

      console.log(chalk.blue(`\n📄 Generating README.md using "${readmeChoices.template}" template...`));
      generateReadme(metadata, readmeChoices.includeBadges, readmeChoices.template);

      // Store logs persistently
      logMessage(`✅ README generated using "${readmeChoices.template}" template at ${new Date().toLocaleString()}.`);
    }
  });

program.parse(process.argv);

// 📌 Add logs.json to .gitignore automatically
const GITIGNORE_PATH = path.join(process.cwd(), ".gitignore");

const addToGitignore = () => {
  try {
    if (!fs.existsSync(GITIGNORE_PATH)) {
      fs.writeFileSync(GITIGNORE_PATH, "# AutoReadMe logs\n" + LOGS_DIR + "\n", "utf-8");
    } else {
      let gitignoreContent = fs.readFileSync(GITIGNORE_PATH, "utf-8");
      if (!gitignoreContent.includes(LOGS_DIR)) {
        fs.appendFileSync(GITIGNORE_PATH, "\n# AutoReadMe logs\n" + LOGS_DIR + "\n", "utf-8");
      }
    }
  } catch (error) {
    console.log(chalk.red("⚠️ Could not modify .gitignore."));
  }
};

// Ensure logs are ignored in Git
addToGitignore();
