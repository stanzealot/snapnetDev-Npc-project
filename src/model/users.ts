import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

interface UsersAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
  }

  export class UsersInstance extends Model<UsersAttributes> {}

  UsersInstance.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "first name is required",
          },
          notEmpty: {
            msg: "Please provide a first name",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "email is required",
          },
          isEmail: {
            msg: "Please provide a a valid Email",
          },
        },
      },
     
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password is required",
          },
          notEmpty: {
            msg: "Please provide a password",
          },
        },
      },
    },
    {
      sequelize: db,
      tableName: "users",
    }
  );
  
//   UserInstance.hasMany(CourseInstance, { foreignKey: "userId", as: "course" });
  
//   CourseInstance.belongsTo(UserInstance, { foreignKey: "userId", as: "user" });
  