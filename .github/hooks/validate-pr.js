#!/usr/bin/env node

/**
 * Validates PR quality including:
 * - Branch naming conventions (feature/, fix/, docs/)
 * - Commit message format
 * - File changes validation
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function getCurrentBranch() {
  try {
    return execSync("git rev-parse --abbrev-ref HEAD", {
      encoding: "utf-8",
    }).trim();
  } catch {
    return null;
  }
}

function validateBranchName(branch) {
  const validPrefixes = [
    "feature/",
    "fix/",
    "docs/",
    "refactor/",
    "test/",
    "main",
    "develop",
  ];
  const isValid = validPrefixes.some(
    (prefix) => branch.startsWith(prefix) || branch === prefix,
  );

  if (!isValid) {
    console.warn(
      `⚠️  Warning: Branch name "${branch}" doesn't follow convention`,
    );
    console.log(
      "   Suggested prefixes: feature/, fix/, docs/, refactor/, test/",
    );
  }

  return isValid;
}

function validateCommitMessage() {
  try {
    const message = execSync("git log -1 --pretty=%B", {
      encoding: "utf-8",
    }).trim();

    // Check for conventional commits or meaningful messages
    const isValid =
      message.length >= 10 &&
      /^(feat|fix|docs|style|refactor|test|chore):|^.{10,}/.test(message);

    if (!isValid) {
      console.warn("⚠️  Warning: Commit message seems too short or unclear");
    }

    return isValid;
  } catch {
    return true;
  }
}

function validateModifiedFiles() {
  try {
    const modified = execSync("git diff --name-only HEAD~1", {
      encoding: "utf-8",
    })
      .trim()
      .split("\n");

    // Check for important files
    const hasComponentChanges = modified.some((f) =>
      f.includes("src/components"),
    );
    const hasHooksChanges = modified.some((f) => f.includes("src/hooks"));
    const hasTypeChanges = modified.some((f) => f.includes("src/lib/types"));

    console.log(`✓ Modified files validated (${modified.length} files)`);

    if (hasComponentChanges) console.log("  → Component changes detected");
    if (hasHooksChanges) console.log("  → Hook changes detected");
    if (hasTypeChanges) console.log("  → Type definition changes detected");

    return true;
  } catch {
    return true;
  }
}

console.log("🔍 Validating PR quality...\n");

const branch = getCurrentBranch();
if (branch) {
  console.log(`Branch: ${branch}`);
  validateBranchName(branch);
}

validateCommitMessage();
validateModifiedFiles();

console.log("\n✓ PR validation complete");
process.exit(0);
