import { join } from "https://deno.land/std/path/mod.ts";
import exportFile from "../../src/components/exportFile.ts";

await exportFile({
  distHtmlPath: join(import.meta.url, "../../dist").replace("file:", ""),
  distJsPath: join(import.meta.url, "../../dist").replace("file:", ""),
  distCssPath: join(import.meta.url, "../../dist").replace("file:", ""),
  oneCssFilePath: join(import.meta.url, "../../dist", "bundle.css").replace(
    "file:",
    "",
  ),
  distHtmlExtension: "html",

  entryTsFilePath: join(import.meta.url, "../pages").replace("file:", ""),
});
