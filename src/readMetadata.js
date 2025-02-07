import fs from "fs";
import path from "path";
import chalk from "chalk";

const readMetadata = () => {
  try {
    const packageJsonPath = path.resolve(process.cwd(), "package.json");
    
    if (!fs.existsSync(packageJsonPath)) {
      console.log(chalk.red("Error: No package.json found in this directory."));
      return null;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

    // Check if the repository URL exists
    let repositoryUrl = "Not specified";
    if (packageJson.repository && packageJson.repository.url) {
      repositoryUrl = packageJson.repository.url.replace(/^git\+/, "").replace(/\.git$/, "");
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
