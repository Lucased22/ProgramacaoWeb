import { Router } from "express";
import mainController from "../controllers/main.controller";
import majorController from "../controllers/major.controller";
import userController from "../controllers/user.controller";


const router = Router()

router.get("/", mainController.index)
router.get("/sobre", mainController.about)
router.get("/bem-vindo/:nome", mainController.welcome)
router.get("/lorem/:num", mainController.lorem)
router.get("/cookie", mainController.testeCookie)
router.get("/hb1", mainController.hb1)
router.get("/hb2", mainController.hb2)
router.get("/hb3", mainController.hb3)
router.get("/hb4", mainController.hb4)

// rotas do controlador major
router.get("/majors/", majorController.index)
router.all("/majors/create", majorController.create)
router.get("/majors/read/:id", majorController.read)
router.all("/majors/update/:id", majorController.update)
router.get("/majors/remove/:id", majorController.remove)

//rotas do user
router.get("/users", userController.index)
router.all("/users/create", userController.create)
router.get("/users/read/:id", userController.read)
router.all("/users/update/:id", userController.update)
router.post("/users/remove/:id", userController.remove)

export default router