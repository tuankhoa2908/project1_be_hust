const db = require("../models/index");
const walletAdmin = db.wallet_admin;

const uuid = require("uuid");
var id = uuid.v4();

module.exports = {
    create: async(req,res) =>
    {
        await walletAdmin.create({
            transactionAdminId: id,
            
        })
    }
}

