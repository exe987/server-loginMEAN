const User = require('../models/User');

const createUserDb = async (user) => {
    try {
        const userdb = new User(user);
        await userdb.save();
    } catch (error) {
        throw error;
    }
};

const verifyEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        throw error;
    }
};

const getDataUser = async (id) => {
    try {
        const user = await User.findById(id).select('-password');
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUserDb,
    verifyEmail,
    getDataUser,
};
