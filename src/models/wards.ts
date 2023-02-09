import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

interface WardsAttributes {
    id: string;
    name: string;
    lgaId:string;
}

  export class WardsInstance extends Model<WardsAttributes> {}

  WardsInstance.init(
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
            msg: " state is required",
          },
          notEmpty: {
            msg: "Please provide a state name",
          },
        },
      },
      lgaId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: " state is required",
          },
          notEmpty: {
            msg: "Please provide a state name",
          },
        },
      },
     
    },
    {
      sequelize: db,
      tableName: "wards",
    }
  );
  
//   UserInstance.hasMany(CourseInstance, { foreignKey: "userId", as: "course" });
  
//   CourseInstance.belongsTo(UserInstance, { foreignKey: "userId", as: "user" });
  