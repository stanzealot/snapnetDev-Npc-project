import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  options,
  loginSchema,
  generateToken,
  createuserSchema,
  createStateSchema,
  createLgaSchema,
  createWardSchema,
  createCitizenSchema,
} from "../utils/utils";
import { UsersInstance } from "../model/users";
import bcrypt from "bcryptjs";
import { StatesInstance } from "../model/states";
import { LgasInstance } from "../model/lgas";
import { WardsInstance } from "../model/wards";
import { CitizenInstance } from "../model/citizens";
import  Sequelize, {Op}  from "sequelize";



export async function LoginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validationResult = loginSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const record = (await UsersInstance.findOne({
      where: { email: req.body.email },
    })) as unknown as { [key: string]: string };

    const { id } = record;
    const token = generateToken({ id }) as unknown as string;
    const validUser = await bcrypt.compare(req.body.password, record.password);

    if (!validUser) {
      return res.status(401).json({
        message: "Password do not match",
      });
    }

    if (validUser) {
      res.setHeader('Authorization', token);
      return res.status(200).json({
        message: "Successfully logged in",
        token,
        record,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "failed to login",
      route: "/login",
    });
  }
}

export async function LogoutUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.clearCookie("authorization");
    res.clearCookie("id");
    res.render("logoutrefresh");
  } catch (err) {
    res.status(500).json({
      msg: "failed to logout",
      route: "/logout",
    });
  }
}

export async function CreateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validationResult = createuserSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const duplicatEmail = await UsersInstance.findOne({
      where: { email: req.body.email },
    });
    if (duplicatEmail) {
      return res.status(409).json({
        msg: "Email is used, please enter another email",
      });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 8);
    const record = await UsersInstance.create({
      id: id,
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
    });
   res.status(201).json({record})
  } catch (err) {
    res.status(500).json({
      msg: "failed to create user",
      route: "/create",
    });
  }
}

export async function getSingleUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await UsersInstance.findOne({ where: { id } });

    res.status(200).json({
      message:"user fetched successfully",
      record:record
    })
  } catch (error) {
    res.status(500).json({
      msg: "failed to read single user",
      route: "/read/:id",
    });
  }
}

export async function CreateState(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validationResult = createStateSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
   
    const record = await StatesInstance.create({
      id: id,
      name: req.body.name,
    });
   res.status(201).json({record})
  } catch (err) {
    res.status(500).json({
      msg: "failed to create state",
      route: "/create",
    });
  }
}

export async function getSingleState(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await StatesInstance.findOne({ where: { id } });

    res.status(200).json({
      message:"state fetched successfully",
      record:record
    })
  } catch (error) {
    res.status(500).json({
      msg: "failed to read single state",
      route: "/read/:id",
    });
  }
}
export async function CreateLga(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validationResult = createLgaSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
   
    const record = await LgasInstance.create({
      id: id,
      name: req.body.name,
      stateId:req.body.stateId,
    });
   res.status(201).json({record})
  } catch (err) {
    res.status(500).json({
      msg: "failed to create state",
      route: "/create",
    });
  }
}

export async function getSingleLga(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await LgasInstance.findOne({ where: { id } });

    res.status(200).json({
      message:"Lga fetched successfully",
      record:record
    })
  } catch (error) {
    res.status(500).json({
      msg: "failed to read single lga",
      route: "/read/:id",
    });
  }
}

export async function CreateWard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validationResult = createWardSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
   
    const record = await WardsInstance.create({
      id: id,
      name: req.body.name,
      lgaId:req.body.lgaId,
    });
   res.status(201).json({record})
  } catch (err) {
    res.status(500).json({
      msg: "failed to create ward",
      route: "/create",
    });
  }
}

export async function getSingleWard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await WardsInstance.findOne({ where: { id } });

    res.status(200).json({
      message:"ward fetched successfully",
      record:record
    })
  } catch (error) {
    res.status(500).json({
      msg: "failed to read single ward",
      route: "/read/:id",
    });
  }
}
export async function CreateCitizen(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validationResult = createCitizenSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
   
    const record = await CitizenInstance.create({
      id: id,
      fullname: req.body.fullname,
      gender: req.body.gender,
      address: req.body.address,
      phonenumber: req.body.phonenumber,
      wardId:req.body.wardId,
    });
   res.status(201).json({record})
  } catch (err) {
    res.status(500).json({
      msg: "failed to create citizen",
      route: "/create",
    });
  }
}

export async function getSingleCitizen(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await CitizenInstance.findOne({ where: { id } });

    res.status(200).json({
      message:"citizen fetched successfully",
      record:record
    })
  } catch (error) {
    res.status(500).json({
      msg: "failed to read single citizen",
      route: "/read/:id",
    });
  }
}

export async function getAllCitizens(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const record = await CitizenInstance.findAll();

    res.status(200).json({
      message:"All citizens fetched successfully",
      record:record
    })
  } catch (error) {
    res.status(500).json({
      msg: "failed to read all citizen",
      route: "/read/:id",
    });
  }
}

export async function searchByName(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {searchParam}=req.body;
    const record = await CitizenInstance.findAll({
      where:{
        fullname:{
          [Op.like]: `%${searchParam}%`
        }
      }
    });

    res.status(200).json({
      message:"All citizens search fetched successfully",
      record:record
    })
  } catch (error) {
    res.status(500).json({
      msg: "failed to search all citizen",
      route: "/read",
    });
  }
}

export async function searchByPhone(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {searchParam}=req.body;
    const record = await CitizenInstance.findAll({
      where:{
        phonenumber:{
          [Op.like]: `%${searchParam}%` 
        }
      }
    });

    res.status(200).json({
      message:"All citizens search fetched successfully",
      record:record
    })
  } catch (error) {
    res.status(500).json({
      msg: "failed to search all citizen",
      route: "/read",
    });
  }
}