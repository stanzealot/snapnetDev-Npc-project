import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import { WardsInstance } from "./wards";

interface CitizensAttributes {
  id: string;
  fullname: string;
  gender: string;
  address: string;
  phonenumber: string;
  wardId: string;

}

export class CitizenInstance extends Model<CitizensAttributes> {}

CitizenInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "full name is required",
        },
        notEmpty: {
          msg: "Please provide a full name",
        },
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: " gender is required",
        },
        notEmpty: {
          msg: "Please provide a gender",
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "address is required",
        },
        notEmpty: {
          msg: "address is required",
        },
      },
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "phone number is required",
        },
        notEmpty: {
          msg: "Please provide a valid phone number",
        },
      },
    },
    wardId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notNull: {
          msg: "Your ward Id is required",
        },
        notEmpty: {
          msg: "PLease provide a valid ward Id",
        },
      },
    },
  },
  {
    sequelize: db,
    tableName: "user",
  }
);

CitizenInstance.hasMany(WardsInstance, { foreignKey: "wardId", as: "ward" });

WardsInstance.belongsTo(CitizenInstance, { foreignKey: "wardId", as: "citizen" });
