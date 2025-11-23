import bcrypt from "bcrypt";

async function generateHash() {
  const password = "admin";
  const hash = await bcrypt.hash(password, 12);
  console.log("Password:", password);
  console.log("Hash:", hash);

  const isValid = await bcrypt.compare(password, hash);
  console.log("Is valid:", isValid);
}

generateHash();
