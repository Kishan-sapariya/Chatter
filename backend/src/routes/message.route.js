import express from "express"
import protectRoute from "../middleware/protectRoute.js"
import {getMessages, getUserForSideBar, sendMessages} from "../controllers/message.controller.js"

const router=express.Router();

router.get('/users',protectRoute,getUserForSideBar)
router.get('/:id',protectRoute,getMessages)

router.post('/send/:id',protectRoute,sendMessages);

export default router;