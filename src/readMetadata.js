import fs from "fs";
import path from "path";
import chalk from "chalk";
import simpleGit from "simple-git";

const readMetadata = async () => {
  try {
    const packageJsonPath = path.resolve(process.cwd(), "package.json");

    if (!fs.existsSync(packageJsonPath)) {
      console.log(chalk.red("Error: No package.json found in this directory."));
      return null;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

    let repositoryUrl = "Not specified";

    // 1️⃣ Check for repo URL in package.json
    if (packageJson.repository && packageJson.repository.url) {
      repositoryUrl = packageJson.repository.url.replace(/^git\+/, "").replace(/\.git$/, "");
    } else {
      // 2️⃣ If missing, try getting repo URL from .git/config
      try {
        const git = simpleGit();
        const remotes = await git.getRemotes(true);

        const originRemote = remotes.find((remote) => remote.name === "origin");
        if (originRemote) {
          repositoryUrl = originRemote.refs.fetch.replace(/\.git$/, "");
        }
      } catch (gitError) {
        console.log(chalk.yellow("⚠️ Could not fetch repo from .git/config."));
      }
    }

    return {
      name: packageJson.name || "Unnamed Project",
      description: packageJson.description || "No description provided.",
      version: packageJson.version || "1.0.0",
      license: packageJson.license || "No license specified",
      main: packageJson.main || "index.js",
      dependencies: packageJson.dependencies
        ? Object.keys(packageJson.dependencies).join(", ")
        : "No dependencies",
      repository: repositoryUrl,
    };
  } catch (error) {
    console.log(chalk.red("Error reading package.json:", error.message));
    return null;
  }
};

export default readMetadata;
