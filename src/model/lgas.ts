import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import {WardsInstance} from './wards'

interface LgasAttributes {
    id: string;
    name: string;
    stateId:string;
}

  export class LgasInstance extends Model<LgasAttributes> {}

  LgasInstance.init(
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
      stateId: {
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
      tableName: "lgas",
    }
  );
  
   LgasInstance.hasMany(WardsInstance, { foreignKey: "lgaId", as: "ward" });
  
  WardsInstance.belongsTo(LgasInstance, { foreignKey: "lgaId", as: "lga" });
  