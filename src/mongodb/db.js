import mongoose from 'mongoose'

const connect = async (req, res) => {
    try {
            await mongoose.connect('mongodb+srv://ian123:ian123@iancode09.va6uv.mongodb.net/udemy-clone?retryWrites=true&w=majority', {
                useFindAndModify: true,
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            })

            console.log('MongoDB Connect');
    } catch (error) {
        console.log(error);
    }
}

export default connect