const config = require("../config");
const { Router } = require("express");
const router = Router();
const Model = require("../models/model");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];
const modelMimeTypes = ["model/obj", "model/stl", "model/mtl"];

// Initialize Controller
const modelsController = require("../controllers/modelsController");

// Get All
router.get("/models", (req,res) => {
    Model.find({}, function(err, models){
        if(err) {
            return res.status(500).json({
                message: `Error getting records. ${err}`
            });
        }
        return res.json(models);
      });
});

// Get by Author
router.get("/models/mymodels/:id",  (req, res) => {
const result = req.params.id.split(",")
 Model.find({author: {_id: result[0], username: result[1]}},  (err, foundModel) =>{
		if(err) {
			console.log("error", err);
		} else {
      res.json(foundModel); 
		}
	});
});

// Get One
router.get("/models/:id", (req, res) => {
  var id = req.params.id;
  Model.findById(req.params.id).populate("comments").exec( function(err, foundModel){
		if(err) {
			console.log(err);
		} else {
      res.json(foundModel); 
		}
	});
});

// Create
router.post("/models", config.isAuthenticated, async (req, res) => {
  let model = new Model({
    title: req.body.title,
    description: req.body.description,  
  });
  try {
    let mimeType = req.body.cover.match(/[^:\s*]\w+\/[\w+\d.]+(?=[;| ])/)[0];
    let base64Data = req.body.cover;
    model.coverImage = base64Data;
    model.coverImageType = mimeType;
  } catch (error) {
    return res.send({
      message: `44 Error saving record the cover ${error}`,
      error: error
    });
  }
  try {
    let mimeType = req.body.model.match(/[^:\s*]\w+\/[\w+\d.-]+(?=[;| ])/)[0];
    let base64Data = req.body.model;
    model.model = base64Data;
    model.modelType = mimeType;
  } catch (error) {
    return res.send({
      message: `Error saving record the model ${error}`,
      error: error
    });
  }
  model.author.id = req.body.authorID
  model.author.username = req.body.authorUsername
  try {
    await model.save();
  } catch (error) {
    return res.send({
      message: `Error saving record We didnt save it 42 ${error}`,
      error: error
    });
  }
});


// Delete
router.delete("/models/:id", config.isAuthenticated, (req, res) => {
  var id = req.params.id;
  Model.findByIdAndRemove(id, function(err, article){
      if(err) {
          return res.status(500).json({
              message: 'Error getting record.'
          });
      }
      return res.json(article);
  });
});

module.exports = router;


function saveModel(model, coverEncoded) {
  if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && modelMimeTypes.includes(cover.type)) {
    model.model = new Buffer.from(cover.data, "base64");
    model.modelType = cover.type;
  }
}
