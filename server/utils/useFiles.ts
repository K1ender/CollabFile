import Busboy from "busboy";
import { type H3Event } from "h3";

interface FileInfo {
  fieldname: string;
  filename: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
}

const useFiles = async (event: H3Event) => {
  return new Promise<{ files: FileInfo[]; fields: Record<string, string> }>(
    (resolve) => {
      const {
        node: { req },
      } = event;
      const files: FileInfo[] = [];
      const fields: Record<string, string> = {};
      const busboy = Busboy({ headers: req.headers });

      busboy.on("file", (name, file, info) => {
        const { filename, encoding, mimeType } = info;
        const chunks: Buffer[] = [];
        file.on("data", (chunk) => {
          chunks.push(chunk);
        });
        file.on("end", () => {
          files.push({
            fieldname: name,
            filename,
            encoding,
            mimetype: mimeType,
            buffer: Buffer.concat(chunks),
          });
        });
      });

      busboy.on("field", (name, value) => {
        fields[name] = value;
      });

      busboy.on("finish", () => {
        resolve({ files, fields });
      });

      req.pipe(busboy);
    }
  );
};

export default useFiles;
