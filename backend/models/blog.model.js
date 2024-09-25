import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'please enter blog title']
        },
        description: {
            type: String,
            required: [true, 'please enter blog description']
        },
        blogImg: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const BlogModel = mongoose.model('Blog', BlogSchema)

export { BlogModel }