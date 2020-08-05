const { Board, Tag } = require("../../board/models/board-models");
const { Report, Update } = require("../models/report-models");
const { BadRequest } = require("../../authentication/middlewares/auth-errors");

async function submitReport(req, res) {
  try {
    const report = await Report.create(req.body);
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong submitting report, try again later!",
    });
  }
}

async function readReports(req, res) {
  try {
    const reports = await Report.find({});
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong reading reports, try again later!",
    });
  }
}

async function readReport(req, res) {
  const { id } = req.params;
  try {
    const report = await Report.findById(id);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong reading report, try again later!",
    });
  }
}

async function changeReport(req, res) {
  const { id } = req.params;
  const update = req.body;
  try {
    const updatedReport = await Report.findByIdAndUpdate(id, update);
    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong updating report, try again later!",
    });
  }
}

async function closeReport(req, res) {
  const { id } = req.params;
  try {
    const closedReport = await Report.findByIdAndDelete(id);
    res.status(200).json(closedReport);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong closing report, try again later!",
    });
  }
}

async function addReporter(req, res) {
  try {
    const { id, user_id } = req.params;
    const report = await Report.findByIdAndUpdate(
      id,
      {
        $push: {
          reporters: user_id,
        },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({
      message:
        "something went wrong adding reporters to report, try again later!",
    });
  }
}

async function getReporters(req, res) {
  try {
    const { id } = req.params;
    const report = await Report.findById(id).populate("reporters");
    const reporters = report.reporters;
    res.status(200).json(reporters);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong getting reporters, try again later!",
    });
  }
}

async function removeReporter(req, res) {
  try {
    const { id, user_id } = req.params;
    const report = await Report.findByIdAndUpdate(
      id,

      {
        $pull: {
          reporters: user_id,
        },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong removing reporter, try again later!",
    });
  }
}

async function createUpdateAndAssignToReport(req, res) {
  try {
    const { id } = req.params;
    const update = req.body;
    const reportUpdate = await Update.create(update);
    const report = await Report.findById(id);
    report.updates = reportUpdate._id;
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong creating report update, try again later!",
    });
  }
}
async function assignUpdateToReport(req, res) {
  try {
    const { id, update_id } = req.params;
    const report = await Report.findByIdAndUpdate(
      id,
      {
        $push: {
          updates: update_id,
        },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({
      message:
        "something went wrong assigning update to report, try again later!",
    });
  }
}

async function getReportUpdates(req, res) {
  try {
    const { id } = req.params;
    const report = await Report.findById(id).populate({
      path: "updates",
      options: {
        limit: 10,
        sort: "createdAt",
      },
    });
    const updates = report.updates;
    res.status(200).json(updates);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong getting report updates, try again later!",
    });
  }
}

async function createReportTag(req, res) {
  try {
    const { id } = req.params;
    const tag = req.body;
    const createdTag = await Tag.create(tag);
    const report = await Report.findByIdAndUpdate(
      id,
      {
        $push: {
          tags: createdTag._id,
        },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong creating tag for report, try again later!",
    });
  }
}

async function getReportTags(req, res) {
  try {
    const { id } = req.params;
    const report = await Report.findById(id).populate("tags");
    const tags = report.tags;
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong getting report tags, try again later!",
    });
  }
}

async function uploadReportAsset(req, res){ 
    try{ 
         const { id } = req.params;
         const asset = req.file.buffer;
         const reportAsset = await Report.findByIdAndUpdate(
             id,
             { 
                 $push: { 
                     assets : asset
                 }
             },
             { 
                new: true,
                useFindAndModify: false,
            }
        )
        res.status(201).json(reportAsset)

    } catch(error){ 
        res.status(500).json({
            message: 'something went wrong uploading document, try again later!'
        })
    }
}

async function getReportAsset(req, res){ 
    try{
        const { id } = req.params;
        const report = await Report.findById(id);
        const asset = report.report_finding.assets;
        res.set('Content-Type', 'image/jpg')
        res.status(200).json(asset)
    }  catch (error) {
        res.status(500).json({
            message: "something went wrong fetching document, try again later!",
          });
    }
}

module.exports = {
  submitReport,
  readReports,
  readReport,
  changeReport,
  closeReport,
  addReporter,
  getReporters,
  removeReporter,
  createUpdateAndAssignToReport,
  assignUpdateToReport,
  getReportUpdates,
  createReportTag,
  getReportTags,
  uploadReportAsset,
  getReportAsset
};
