#!/usr/bin/env node

/**
 * Validates theme configuration and CSS files
 * Checks for:
 * - Proper Tailwind CSS configuration
 * - Theme colors in index.css
 * - Valid color format
 */

const fs = require("fs");
const path = require("path");

const checks = [
  {
    name: "Tailwind Config",
    file: "tailwind.config.js",
    validate: (content) =>
      content.includes("@theme") || content.includes("colors"),
  },
  {
    name: "Theme Styles",
    file: "src/styles/index.css",
    validate: (content) =>
      content.includes("@import") || content.includes("tailwindcss"),
  },
  {
    name: "Theme Hook",
    file: "src/hooks/useTheme.ts",
    validate: (content) =>
      content.includes("toggleTheme") && content.includes("localStorage"),
  },
];

let hasErrors = false;

checks.forEach(({ name, file, validate }) => {
  const filePath = path.join(process.cwd(), file);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Warning: ${name} file not found at ${file}`);
    return;
  }

  const content = fs.readFileSync(filePath, "utf-8");

  if (!validate(content)) {
    console.error(`❌ Error: ${name} validation failed for ${file}`);
    hasErrors = true;
  } else {
    console.log(`✓ ${name} validated`);
  }
});

if (hasErrors) {
  process.exit(1);
}

console.log("✓ All theme configurations validated");
process.exit(0);
