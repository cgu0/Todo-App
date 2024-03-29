import mongoose from "mongoose"

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://robingu0519:cgu0@cluster0.c5tgoss.mongodb.net/Todo-APP')
    console.log('Database connected')
}