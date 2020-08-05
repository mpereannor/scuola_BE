const router = require("express").Router();

const {
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
} = require("../controllers/report-controllers");


const { 
    upload
}  = require('../middlewares/report-middlewares');
//report
router.post("/", submitReport);
router.get("/", readReports);
router.get("/:id", readReport);
router.put("/:id", changeReport);
router.delete("/:id", closeReport);

//updates
router.post(
  "/:id/updates",
  createUpdateAndAssignToReport,
  router.patch("/:id/updates/:update_id", assignUpdateToReport)
);
router.get("/:id/updates", getReportUpdates);

//reporters
router.patch("/:id/reporters/:user_id", addReporter);
router.get("/:id/reporters", getReporters);
router.delete("/:id/reporters/:user_id", removeReporter);

//assets
router.post('/:id/asset', upload.single('asset'), uploadReportAsset)
router.get('/:id/asset', getReportAsset )

//tags
router.post("/:id/tags/", createReportTag);
router.get("/:id/tags/", getReportTags);

module.exports = router;
