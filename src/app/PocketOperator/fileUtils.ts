import type { Pattern } from "./types";

/**
 * Accept a file upload of a .json pattern file.
 */
const importPatternFile = () => {
  return new Promise<File>((resolve) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";

    fileInput.onchange = (event: any) => {
      const file = event?.target?.files?.[0];
      if (!file) return;
      resolve(file);
    };
    fileInput.click();
  });
};

/**
 * Export a pattern file as JSON.
 */
const exportPatternFile = (patterns: Pattern[]) => {
  const json = JSON.stringify(patterns);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "patterns.json";
  link.click();
  URL.revokeObjectURL(url);
};

export { importPatternFile, exportPatternFile };
