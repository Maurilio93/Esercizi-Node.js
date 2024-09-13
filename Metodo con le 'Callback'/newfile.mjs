import * as fs from "node:fs";

fs.writeFile("file-0.txt", "Ciao sono Maurilio", (error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log("File scritto con successo!");
});
