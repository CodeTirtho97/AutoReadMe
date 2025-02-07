#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import readMetadata from "../src/readMetadata.js";
import generateReadme from "../src/generateReadme.js";

program
  .version("1.0.0")
  .description(chalk.green("AutoReadMe - Instant README Generator"))
  .command("generate")
  .option("--badges", "Include GitHub & npm badges in the README")
  .description("Generate a README.md file")
  .action(async (options) => {
    console.log(chalk.blue("\n📌 Extracting project metadata..."));

    const metadata = await readMetadata();

    if (metadata) {
      console.log(chalk.yellow("\n✅ Project Metadata Retrieved:"));
      console.log(chalk.green(`📂 Name: ${metadata.name}`));
      console.log(chalk.green(`📝 Description: ${metadata.description}`));
      console.log(chalk.green(`🔢 Version: ${metadata.version}`));
      console.log(chalk.green(`📜 License: ${metadata.license}`));
      console.log(chalk.green(`📍 Entry File: ${metadata.main}`));
      console.log(chalk.green(`📦 Dependencies: ${metadata.dependencies}`));
      console.log(chalk.green(`🌍 GitHub Repo: ${metadata.repository}`));

      console.log(chalk.blue("\n📄 Generating README.md..."));
      generateReadme(metadata, options.badges);
    }
  });

program.parse(process.argv);
