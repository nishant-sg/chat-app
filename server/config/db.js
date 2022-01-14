const mongoose = require('mongoose');
const dbName = 'zinedb'
exports.connectDB = async () => {
    try {
        console.log(dbName)
        const con = await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}
