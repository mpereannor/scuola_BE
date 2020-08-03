const { Update } = require("../models/update-models");

async function createUpdate(req, res) {
    try {
      const update = await Update.create(req.body);
      res.status(201).json(update);
    } catch (error) {
      res.status(500).json({
        message: "something went wrong creating an update, try again later!",
      });
    }
  }
  
  async function getUpdates(req, res) {
    try {
      const updates = await Update.find({}).sort({ createdAt: 1 }).limit(10);
      res.status(200).json(updates);
    } catch (error) {
      res.status(500).json({
        message: "something went wrong retrieving updates, try again later!",
      });
    }
  }
  
  async function getUpdate(req, res) {
    const { id } = req.params;
    try {
      const update = await Update.findById(id);
      res.status(200).json(update);
    } catch (error) {
      res.status(500).json({
        message: "something went wrong retrieving update, try again later!",
      });
    }
  }
  
  async function removeUpdate(req, res) {
    const { id } = req.params;
    try {
      const update = await Update.findByIdAndRemove(id);
      res.status(200).json(update);
    } catch (error) {
      res.status(500).json({
        message: "something went wrong removing update, try again later!",
      });
    }
  }
  
  // async function upvoteUpdate(req, res) {
  //   const { id } = req.params;
  //   const upvote = req.body;
  //   try {
  //     const upvotedUpdate = await Update.findByIdAndUpdate(id, upvote);
  //     res.status(201).json(upvotedUpdate);
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "something went wrong upvoting update, try again later!",
  //     });
  //   }
  // }
  // async function downvoteUpdate(req, res) {
  //   const { id } = req.params;
  //   const downvote = req.body;
  //   try {
  //     const downvotedUpdate = await Update.findByIdAndUpdate(id, downvote);
  //     res.status(201).json(downvotedUpdate);
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "something went wrong downvoting update, try again later!",
  //     });
  //   }
  // }

  module.exports = {
    createUpdate,
    getUpdates,
    getUpdate,
    removeUpdate,
    //   upvoteUpdate,
    //   downvoteUpdate,
  
  };
  
  
