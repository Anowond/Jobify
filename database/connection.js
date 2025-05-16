import mongoose from 'mongoose'

// Activer les valdiateurs de mongoose
mongoose.set('runValidators', true)

export const connection = () => {
    mongoose.connect(process.env.MONGO_URI, {connectTimeoutMS: 2000})
    .then(() => console.log('Database connected !'))
    .catch(err => console.log(err))
}