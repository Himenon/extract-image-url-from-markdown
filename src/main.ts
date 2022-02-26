import * as fs from "fs";
import * as path from "path";
import Glob from "glob";
import * as ExtractImageUrl from "./ExtractImageUrl";

const getMarkdownFiles = (baseDir: string): string[] => {
  const basePattern = path.join(baseDir, "**/*.md");
  const files = Glob.sync(basePattern);
  return files;
}

const DEBUG_DIR = "sample";

const main = async () => {
  const files = getMarkdownFiles(DEBUG_DIR);
  const tasks = files.map(async file => {
    const text = fs.readFileSync(file, "utf-8");
    return await ExtractImageUrl.extractImageUrls(text);
  })
  const urls = (await Promise.all(tasks)).flat();
  console.log(urls);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});

