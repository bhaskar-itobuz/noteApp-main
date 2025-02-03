import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import userSchema from "../model/userSchema.js";

mongoose
  .connect("mongodb://root:example@localhost:4006/note-app?authSource=admin")
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const generateFakeUser = async () => {
  const password = faker.internet.password();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return {
    email: faker.internet.email(),
    userName: faker.internet.username(),
    password: hashedPassword,
    verify: true,
    fileName: "",
  };
};

export const seedDatabase = async (req, res) => {
  try {
    await userSchema.deleteMany();
    const fakeUsers = [];
    for (let i = 0; i < 10; i++) {
      const fakeUser = await generateFakeUser();
      fakeUsers.push(fakeUser);
    }
    await userSchema.insertMany(fakeUsers);
    res.send(fakeUsers);
    console.log("Seed data inserted!");
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).send("Error seeding database");
  }
};
