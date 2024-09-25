import { BlogModel } from "../models/blog.model.js"



const addBlog = async (request, response) => {
    const blogImg = request.file.filename
    try {
        const blogData = { ...request.body, blogImg: blogImg }; // Combine request.body and blogImg
        const blog = await BlogModel.create(blogData); // Pass combined object to create
        response.status(200).json(blog);
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const getAllBlogs = async (request, response) => {
    try {
        const all_blogs = await BlogModel.find({}).sort({ createdAt: -1 })
        response.status(200).json(all_blogs)
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const getSingleBlog = async (request, response) => {
    const { id } = request.params
    try {
        const single_blog = await BlogModel.findById({ _id: id })
        response.status(200).json(single_blog)
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const updatingBlog = async (request, response) => {

        const blogImg = request?.file?.filename
    
    const { id } = request.params
    try {
        const blogData = { ...request.body, blogImg: blogImg};

        const blog = await BlogModel.findByIdAndUpdate(id, blogData)

        if (!blog) {
            return response.status(404).json({ message: "blog not found" });
        }

        const updated_blog = await BlogModel.findById(id);
        response.status(200).json(updated_blog);
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

const deleteBlog = async (request, response) => {
    const { id } = request.params
    try {
        const deleted_blog = await BlogModel.findByIdAndDelete(id)
        response.status(200).json(deleted_blog)
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

export { addBlog, getAllBlogs, getSingleBlog, updatingBlog, deleteBlog }