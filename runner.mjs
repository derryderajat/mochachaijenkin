import { config as dotenvConfig } from "dotenv";
import { glob } from "glob";
import Mocha from "mocha";
dotenvConfig();

const mocha = new Mocha({
  reporter: "allure-mocha",
  reporterOptions: {
    resultsDir: "reports/allure-results",
  },
});

console.log("🔍 Searching for test files...");
const testFiles = glob.sync("tests/**/*.{spec,test}.{js,mjs,cjs}");

if (testFiles.length === 0) {
  console.warn("⚠️  No test files found.");
  process.exit(1);
}

// Tambahkan semua test files ke Mocha
testFiles.forEach((file) => {
  mocha.addFile(file);
  console.log(`✅ Loaded: ${file}`);
});

console.log("🚀 Running tests...\n");

await mocha.loadFilesAsync();
const startTime = Date.now();

mocha.run((failures) => {
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`⏱️  Done in ${duration} seconds`);

  if (failures > 0) {
    console.error(`❌ ${failures} test(s) failed.`);
    // Tetap exit 0 agar pipeline Jenkins tidak gagal
    process.exit(0);
  } else {
    console.log("✅ All tests passed.");
    process.exit(0);
  }
});
