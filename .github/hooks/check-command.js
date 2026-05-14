#!/usr/bin/env node

/**
 * Blocks dangerous terminal commands
 * Prevents accidental execution of:
 * - rm -rf / (system wipe)
 * - sudo commands that could damage system
 * - Destructive git operations without confirmation
 */

const dangerousPatterns = [
  /rm\s+-rf\s+\//, // rm -rf /
  /sudo\s+rm/, // sudo rm
  /:\s*\(\s*\)\s*\{/, // Fork bomb
  /dd\s+if=\/dev\/zero/, // Disk fill
  /force-push.*origin/, // Forced git push to main
];

const command = process.argv.slice(2).join(" ");

if (command) {
  const isDangerous = dangerousPatterns.some((pattern) =>
    pattern.test(command),
  );

  if (isDangerous) {
    console.error("❌ Dangerous command blocked:", command);
    process.exit(1);
  }
}

console.log("✓ Command validation passed");
process.exit(0);
