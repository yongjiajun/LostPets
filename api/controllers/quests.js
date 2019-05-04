const Quest = require('../models/quest');
const mongo = require('mongoose');
const selectFields = '_id name author location date reward comments description imgurl';

let stream = require('getstream');

exports.get_all_quests = (req, res, next) => {
    Quest.find()
        .select(selectFields)
        .exec()
        .then(docs => {
            const response = {
                quests: docs.map(doc => {
                    return {
                        name: doc.name,
                        author: doc.author,
                        location: doc.location,
                        date: doc.date,
                        reward: doc.reward,
                        comments: doc.comments,
                        description: doc.description,
                        imgurl: doc.imgurl,
                        icon: doc.icon,
                        id: doc._id,
                        status: doc.status
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({ error: error });
        });
}

exports.get_quest = (req, res, next) => {
    Quest.findOne({ _id: id })
        .select(selectFields)
        .exec()
        .then(doc => {
            const response = {
                quest: doc
            }
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({ error: error });
        })
}

exports.create_quest = (req, res, next) => {
    const quest = new Quest({
        _id: new mongo.Types.ObjectId(),
        name: req.body.name,
        author: req.body.author, // get logged in userid!
        location: req.body.location,
        reward: req.body.reward,
        description: req.body.description,
        imgurl: req.body.imgurl,
        icon: req.body.icon,
        status: req.body.status
    });
    quest.save().then(result => {
        res.status(201).json({
            message: `Created quest of id '${result._id}' successfully`,
            created_quest: {
                _id: result._id,
                name: result.name,
                location: result.location,
                author: result.author, // get logged in userid!
                reward: result.reward,
                description: result.description,
                imgurl: result.imgurl,
                icon: result.icon,
                status: result.status
            }
        })
    });
}

exports.delete_quest = (req, res, next) => {
    const id = req.params.questId;
    Quest.findOneAndDelete({ _id: id })
        .select(selectFields)
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: `Deleted quest of id '${id}' successfully`
            });
        })
        .catch(error => {
            res.status(500).json({ error: error });
        });
}

exports.get_token = (req, res, next) => {
    let client = stream.connect('ut44aevygx9r', 'ep7rznvzrgptdb9ma4aqr9rdv7wut9v8evg3egu6ma85554k37h6tsekmfjzuubw');
    let userToken = client.createUserToken("user1");
    res.status(200).json({
        message: userToken
    })
}