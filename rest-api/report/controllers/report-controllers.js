const { Board } = require('../../board/models/board-models')
const { Report, Update } = require("../models/report-models");
const { BadRequest } = require("../../authentication/middlewares/auth-errors");

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



async function submitReport(req, res) {
    try{
        const report = await Report.create(req.body)
        res.status(201).json(report);
    }catch(error){
        res.status(500).json({
            message: 'something went wrong submitting report, try again later!'
        })
    }
}

async function readReports(req, res) { 
    try{ 
        const reports = await Report.find({});
        res.status(200).json(reports);

    } catch(error){ 
        res.status(500).json({ 
            message: 'something went wrong reading reports, try again later!'
        })
    }

}

async function readReport(req, res){ 
    const { id } = req.params;
    try {
        const report = await Report.findById(id);
        res.status(200).json(report)
    } catch (error){
        res.status(500).json({
            message: 'something went wrong reading report, try again later!'
        })
    }
}


async function changeReport(req,res) { 
    const { id } = req.params;
    const update = req.body;
    try{

        const updatedReport = await Report.findByIdAndUpdate(id, update);
        res.status(200).json(updatedReport);
    } catch (error) {
        res.status(500).json({
          message: "something went wrong updating report, try again later!",
        });
      }
}

async function closeReport(req,res) { 
    const { id } = req.params;
    try{

        const closedReport = await Report.findByIdAndDelete(id);
        res.status(200).json(closedReport);
    } catch (error) {
        res.status(500).json({
          message: "something went wrong closing report, try again later!",
        });
      }
}



module.exports = {
  createUpdate,
  getUpdates,
  getUpdate,
  removeUpdate,
//   upvoteUpdate,
//   downvoteUpdate,
submitReport,
readReports,
readReport,
changeReport,
closeReport
};
