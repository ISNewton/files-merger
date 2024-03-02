import { glob  } from "glob";
import fs from "fs/promises";

const ROOT_DIR = "../UniSoftLaravel";
const OUTPUT_FILE = "output.txt";
const FILES_SEPERATOR = "\n-----------------------------------------------\n";
const IGNORE_PATTERNS = [
  `${ROOT_DIR}/vendor/**`,
  `${ROOT_DIR}/node_modules/**`,
  `${ROOT_DIR}/**/*.blade.php`,
  // Add additional paths to ignore
];

(async () => {

    const content = await getFiles(); // Use await to wait for promise
    await writeContent(content)
})();

async function writeContent(content: string) {
    try {
        await fs.access(OUTPUT_FILE);
        await fs.unlink(OUTPUT_FILE); // Consider using fs.writeFile instead of fs.unlink for appending
    }
    catch(e) {

    }
  try {
    await fs.writeFile(OUTPUT_FILE, content);
  } catch (e) {
    console.log("error writing file content:" + e);
  }
}

async function getFiles() {
  let content = "";

  const jsfiles = await glob(`${ROOT_DIR}/**/*.php`, {
    ignore: IGNORE_PATTERNS,
  });

  for (const file of jsfiles) { // Use for loop for synchronous processing
    try {
      const data = await fs.readFile(file, "utf8");
      content += `
      \n${FILES_SEPERATOR}\n
      File name :${file}\n
      ${FILES_SEPERATOR}\n
      ${data}
      `;
    } catch (e) {
      console.log("error reading file: " + e);
    }
  }

  return content;
}

export {};

