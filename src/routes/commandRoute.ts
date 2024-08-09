import { Router } from "express";
import { handleRequest } from "../controllers/commandController";

const router = Router();

router.all("/saleOrderItems/:id?", handleRequest);

export default router;

