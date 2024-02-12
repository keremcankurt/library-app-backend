import express from "express"
import auth from "./auth"
import book from "./book"

const router = express.Router()

router.use("/auth", auth)
router.use("/book", book)

export default router;