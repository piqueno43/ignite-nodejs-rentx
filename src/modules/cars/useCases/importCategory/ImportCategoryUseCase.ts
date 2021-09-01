import csvParse from "csv-parse";
import fs from "fs";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  loadCategory(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategory(file);

    console.log(categories);
  }
}

export { ImportCategoryUseCase };
