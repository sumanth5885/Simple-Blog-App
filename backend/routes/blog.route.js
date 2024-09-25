import express from 'express'
import { addBlog, getAllBlogs, getSingleBlog, updatingBlog, deleteBlog } from '../controllers/blog.controller.js'
import multer from 'multer'

const router = express.Router()

//image settings
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (request, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage: storage})

router.post('/add-blog', upload.single('image'), addBlog)
router.get('/get-all-blogs', getAllBlogs)
router.get('/get-single-blog/:id', getSingleBlog)
router.put('/update-blog/:id', upload.single('image'), updatingBlog)
router.delete('/delete-blog/:id', deleteBlog)





export const blogRoutes = router