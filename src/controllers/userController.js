const userRepo = require('../repositories/userRepositorie');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let user = await req.body;
    const { email, password } = user;

    try {
        //VERIFY IF EMAIL EXIST IN DB
        const existing_user = await userRepo.verifyEmail(email);

        if (existing_user) {
            return res.status(400).json({ msg: 'User already exists' });
        } else {
            const salt = await bcryptjs.genSalt(10);
            user.password = await bcryptjs.hash(password, salt);
            //SAVE USER IN DB
            await userRepo.createUserDb(user);
            res.status(200).json({ msg: 'User created' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
};

const signIn = async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = await req.body;

        //CHECK IF EMAIL EXIST
        let user = await userRepo.verifyEmail(email);
        if (!user) {
            return res.status(400).json({ msg: 'User does not exists' });
        }

        const passCorrect = await bcryptjs.compare(password, user.password);

        if (!passCorrect) {
            return res.status(400).json({ msg: 'Wrong password' });
        }

        //RETURN TOKEN
        const payload = {
            user: {
                id: user._id,
            },
        };

        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: 3600,
            },
            (error, token) => {
                if (error) throw error;
                res.json({ token });
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
};

const userAuth = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await userRepo.getDataUser(id);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error ocurred' });
    }
};

module.exports = {
    createUser,
    signIn,
    userAuth,
};
