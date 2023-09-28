const express = require('express');
const router = express.Router();

const Subscriber = require('../models/subscriber');
const subscriber = require('../models/subscriber');

//Getting All
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.send(subscribers);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Getting One
router.get('/:id', getSubscriber, (req, res) => {
    res.send(res.subscriber);
});

//Creating One
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    });

    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//Updating One
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name;
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }
    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.deleteOne();
        res.json({message: "Deleted"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


async function getSubscriber(req, res, next){
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if (!subscriber) {
            return res.status(404).json({message: "Subscriber Not Found"});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }

    res.subscriber = subscriber
    next()
}


module.exports = router