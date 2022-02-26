import * as path from "path";
import Glob from "glob";

const getMarkdownFiles = (baseDir: string): string[] => {
  const basePattern = path.join(baseDir, "**/*.md");
  const files = Glob.sync(basePattern);
  return files;
}


const DEBUG_DIR = "sample";

const main = () => {

  const files = getMarkdownFiles(DEBUG_DIR);
  console.log(files);
}

main();

