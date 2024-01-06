const mongoose = require("mongoose");

const option = {
    socketTimeoutMS: 30000
};

const dbConnect = () => {
    const dbUrl = process.env.DB_URL;

    mongoose.connect(dbUrl, option)
        .then(() => {
            console.log("successfully connected with the database.....")
        })
        .catch((res) => {
            console.log(res)
        })
}


module.exports = dbConnect;