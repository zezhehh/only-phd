import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";
import fs from "fs";

async function fetchAndStoreFile(url: string, filePath: string) {
  if (fs.existsSync(filePath)) {
    return;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
  }
  const fileData = await response.buffer();
  fs.writeFileSync(filePath, fileData);
  console.log("File saved successfully!");
}

const url =
  "https://raw.githubusercontent.com/zezhehh/only-phd/main/prisma/academics.db";
const localFilePath = "./academics.db";

const getClient = async () => {
  await fetchAndStoreFile(url, localFilePath);
  const prisma = new PrismaClient({
    datasources: {
      academics: {
        url: `file:${localFilePath}`,
      },
    },
  });
  return prisma;
};

export default getClient;
