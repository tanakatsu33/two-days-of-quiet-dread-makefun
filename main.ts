import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SETUP = "Ship it: tests pass, logic's clean.";
const KICKER =
  "Future on-call will know our names only from git blame at 3 a.m., long after we've forgotten this.";

const ENTRY = `${SETUP} ${KICKER}`;
const EXPECTED_LENGTH = 134;

function guard(text: string): void {
  const length = [...text].length;
  if (length < 1 || length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${length}`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (length !== EXPECTED_LENGTH) {
    throw new Error(`entry must be exactly ${EXPECTED_LENGTH} characters, got ${length}`);
  }
}

guard(ENTRY);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY + "\n", "utf8");
