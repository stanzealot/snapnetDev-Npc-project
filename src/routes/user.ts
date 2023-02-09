import express from "express";
const router = express.Router();
import {
  LoginUser,LogoutUser,CreateUser,getSingleUser,CreateState,getSingleState,CreateLga,searchByName,
  getSingleLga,CreateWard,getSingleWard,CreateCitizen,getSingleCitizen,getAllCitizens,searchByPhone
} from "../controller/userController";
import { auth } from "../middleware/auth";



router.post("/login", LoginUser);
router.get("/logout", LogoutUser);
router.post("/create",auth,CreateUser)
router.get("/get-user/:id",getSingleUser)
router.post("/create-state",auth,CreateState)
router.get("/get-state/:id",getSingleState)
router.post("/create-lga",auth,CreateLga)
router.get("/get-lga/:id",getSingleLga)
router.post("/create-ward",auth,CreateWard)
router.get("/get-ward/:id",getSingleWard)
router.post("/create-citizen",auth,CreateCitizen)
router.get("/get-citizen/:id",getSingleCitizen)
router.get("/get-all-citizens",getAllCitizens)
router.post("/search-by-name",searchByName)
router.post("/search-by-phone",searchByPhone)




export default router;
