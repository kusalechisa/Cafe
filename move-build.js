const fs = require("fs-extra"); // Use `fs-extra` for file operations
const path = require("path");

// Define source and destination paths
const sourcePath = path.join(__dirname, "frontend", "build");
const destPath = path.join(__dirname, "backend", "src", "public");

// Move the build folder
fs.move(sourcePath, destPath, { overwrite: true }, (err) => {
  if (err) {
    console.error("Error moving build folder:", err);
    process.exit(1); // Exit with failure code
  } else {
    console.log("Build folder moved successfully.");
  }
});
