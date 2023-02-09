import { Sequelize } from "sequelize";
import mongoose from "mongoose";
const { Schema } = mongoose;

const db = new Sequelize("app", "", "", {
  storage: "./database.sqlite",
  dialect: "sqlite",
  logging: false,
});

export default db;
