import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import { LgasInstance } from "./lgas";

interface StatesAttributes {
    id: string;
    name: string;
}

  export class StatesInstance extends Model<StatesAttributes> {}

  StatesInstance.init(
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
     
    },
    {
      sequelize: db,
      tableName: "states",
    }
  );
  
   StatesInstance.hasMany(LgasInstance, { foreignKey: "stateId", as: "lga" });
  
   LgasInstance.belongsTo(StatesInstance, { foreignKey: "stateId", as: "state" });
  