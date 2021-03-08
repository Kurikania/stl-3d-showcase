const Model = require('../models/model');
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];
const modelMimeTypes = ["model/obj", "model/stl", "model/mtl"];


// Get one

// Create
module.exports.create = function(req, res) { 
    // initialize record
    let model = new Model({
        title : req.body.title,
        description : req.body.description,
    })    
    try {        
        saveCover(model, req.body.cover);
    } catch (error) {
        return res.status(502).json({
            message: 'Error saving record',
            error: err
        });
    }
    //saveModel(model, req.body.model);
    // save record
    model.save(function(err, model){
        if(err) {
            return res.status(508).json({
                message: 'Error saving record',
                error: err
            });
        } else {

            return res.json({
                message: 'saved',
                _id: model._id
            });
        }
    })
  }

// Update
module.exports.update = [
  function(req, res) {
    var id = req.params.id;
    Model.findOne({_id: id}, function(err, article){
        if(err) {
            return res.status(500).json({
                message: 'Error saving record',
                error: err
            });
        }
        if(!article) {
            return res.status(404).json({
                message: 'No such record'
            });
        }

        // initialize record
        article.title =  req.body.title ? req.body.title : article.title;
        article.author =  req.body.author ? req.body.author : article.author;
        article.body =  req.body.body ? req.body.body : article.body;

        // save record
        article.save(function(err, article){
            if(err) {
                return res.status(500).json({
                    message: 'Error getting record.'
                });
            }
            if(!article) {
                return res.status(404).json({
                    message: 'No such record'
                });
            }
            return res.json(article);
        });
    });
  }
]


// Delete

function saveCover(model, coverEncoded) {
  if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    model.coverImage = new Buffer.from(cover.data, "base64");
    model.coverImageType = cover.type;
  }
}

function saveModel(model, coverEncoded) {
  if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && modelMimeTypes.includes(cover.type)) {
    model.model = new Buffer.from(cover.data, "base64");
    model.modelType = cover.type;
  }
}