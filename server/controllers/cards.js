const joi = require('joi');
const { User } = require('../models/User');
const { Card } = require('../models/Card');

module.exports = {
    list: async function (req, res, next) {
        try {
            const result = await Card.find({});
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: 'error getting cards' });
        }
    },

    details: async function (req, res, next) {
        try {
            const schema = joi.object({
                id: joi.string().required(),
            });

            const { error, value } = schema.validate(req.params);

            if (error) {
                console.log(error.details[0].message);
                throw `error get details`;
            }

            const card = await Card.findById(value.id);
            if (!card) throw "Invalid card id, no such card.";
            res.json(card);
        }
        catch (err) {
            res.status(400).json({ error: "Invalid data" });
            console.log(`Error: ${err}`);
        }
    },

    userCards: async function (req, res, next) {
        try {
            const schema = joi.object({
                id: joi.string().required(),
            });

            const { error, value } = schema.validate(req.params);

            if (error) {
                console.log(error.details[0].message);
                throw 'error get details';
            }

            const user = await User.findById({_id:value.id});
            if (!user || !user.isBiz ) throw "Invalid user id, no such user.";

            const cards = await Card.find({ user_id: user._id });
            res.json(cards);
        }
        catch (err) {
            res.status(400).json({ error: `error get cards of a user` });
            console.log(err.message);
        }
    },

    addNew: async function (req, res, next) {
        try {
            const user = await User.findOne({ email: req.token.email });
            if (!user || !user.isBiz) throw "Not a business user";

            const schema = joi.object({
                title: joi.string().min(2).max(256).required(),
                shortdescription:joi.string().min(2).max(30).required(),
                description: joi.string().min(2).max(1024).required(),
                address: joi.string().min(2).max(256).required(),
                phone: joi.string().min(9).max(14).required(),
                image: joi.string().min(6).max(1024)
            });

            const { error, value } = schema.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                throw 'error add card';
            }

            const card = new Card({
                title: value.title,
                shortdescription:value.shortdescription,
                description: value.description,
                address: value.address,
                phone: value.phone,
                image: value.image ? value.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                bizNumber: Date.now() +Math.floor(Math.random()),
                user_id: user._id,
            });

            const newCard = await card.save();
            res.json(newCard);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error adding card` });
        }
    },

    updateDetails: async function (req, res, next) {
        try {
            const user = await User.findOne({ email: req.token.email });
            if (!user || (!user.isBiz && !user.isAdmin) ) throw "Not a business user";

            const schema = joi.object({
                title: joi.string().min(2).max(256).required(),
                shortdescription:joi.string().min(2).max(30).required(),
                description: joi.string().min(2).max(1024).required(),
                address: joi.string().min(2).max(256).required(),
                phone: joi.string().min(9).max(14).required(),
                image: joi.string().min(6).max(1024)
            }).min(1);

            const { error, value } = schema.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                throw 'error updating card';
            }

            const filter = {
                _id: req.params.id,
                userID: user._id ,
            };

            const card = await Card.findOneAndUpdate(filter, value);
            if (!card) throw "No card with this ID in the database";
            const uCard = await Card.findById(card._id);
            res.json(uCard);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error updating card` });
        }
    },

    deleteCard: async function (req, res, next) {
        try {
            const user = await User.findOne({ email: req.token.email });
            if (!user || !user.isBiz) throw "Not a business user";

            const schema = joi.object({
                _id: joi.string().required(),
            });

            const { error, value } = schema.validate({ _id: req.params.id });

            if (error) {
                console.log(error.details[0].message);
                throw `error delete card`;
            } 
            
            const deleted=await Card.findOne({_id: value._id})
            await Card.deleteOne(value).exec();
            res.json(deleted);          
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: `error delete card` });
        }
    },

}