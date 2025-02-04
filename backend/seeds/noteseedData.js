import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import noteSchema from "../model/noteSchema.js";
import userSchema from "../model/userSchema.js";
// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv/config';
const url = process.env.url;

mongoose
  .connect(url)
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const generateFakeNote = (userId) => {
  return {
    userId: userId,
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    timestamps: faker.date.recent(),
  };
};

export const seedNotesDatabase = async (req, res) => {
  try {
    await noteSchema.deleteMany();
    const users = await userSchema.find({});

    if (users.length === 0) {
      return res.status(400).send("No users found. Please create users first.");
    }

    const randomUser = users[Math.floor(Math.random() * users.length)];

    const fakeNotes = [];
    for (let i = 0; i < 10; i++) {
      const fakeNote = generateFakeNote(randomUser._id);
      fakeNotes.push(fakeNote);
    }

    await noteSchema.insertMany(fakeNotes);
    res.send(fakeNotes);
    console.log("Seed data inserted!");
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).send("Error seeding notes database");
  }
};
