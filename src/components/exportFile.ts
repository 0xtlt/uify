import { join } from "https://deno.land/std/path/mod.ts";

type ExportParams = {
  distHtmlPath: string;
  distJsPath: string;
  distCssPath: string;
  distHtmlExtension: string;
  // if defined, only one css file will be returned
  oneCssFilePath?: string;

  entryTsFilePath: string;
};

async function exportFile(
  params: ExportParams,
): Promise<void> {
  const files: string[] = [];
  for await (const dirEntry of Deno.readDir(params.entryTsFilePath)) {
    files.push(join(params.entryTsFilePath, dirEntry.name));
  }

  let styles = "";
  let javascripts = "";

  const promises: Promise<void>[] = files.map((filePath) =>
    new Promise(async (resolve, reject) => {
      const file = await import(filePath);
      styles += file.default.css;
      javascripts += file.default.js;

      await Deno.writeTextFile(
        join(
          params.distHtmlPath,
          filePath.split("/").slice(-1)[0].replace(
            ".ts",
            `.${params.distHtmlExtension}`,
          ),
        ),
        file.default.html,
      );

      if (!params.oneCssFilePath) {
        await Deno.writeTextFile(
          join(
            params.distCssPath,
            filePath.split("/").slice(-1)[0].replace(
              ".ts",
              `.css`,
            ),
          ),
          file.default.css,
        );
      }

      resolve();
    })
  );

  await Promise.all(promises);

  if (params.oneCssFilePath) {
    await Deno.writeTextFile(
      params.oneCssFilePath,
      styles,
    );
  }

  await Deno.writeTextFile(
    params.distJsPath,
    javascripts,
  );
}

export default exportFile;
