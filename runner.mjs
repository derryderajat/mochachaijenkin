import { glob } from "glob";
import Mocha from "mocha";

const mocha = new Mocha({
  reporter: "allure-mocha",
  reporterOptions: {
    resultsDir: "reports/allure-results",
  },
});


glob.sync("tests/**/*.{spec,test}.{js,mjs,cjs}").forEach((file) => mocha.addFile(file));
await mocha.loadFilesAsync();
mocha.run((failures) => process.exit(failures));