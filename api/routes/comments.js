const config = require("../config");
const { Router } = require("express");
const router = Router();
const Comment = require("../models/comment");
const Model = require("../models/model");

router.get("/comments", (req, res) => {
  //lookup campground using ID
});

// Get One
router.get("/comments/:id", (req, res) => {
  Model.findById(req.params.id).populate("comments").exec( function(err, foundCamp){
		if(err) {
			console.log(err);
		} else {
      res.json({campground: foundCamp, currentUser: req.user}); 
		}
	});	
});

// Create
router.post("/comments", config.isAuthenticated, async (req, res) => {

  Model.findById(req.body.model, function(err, model) {
    if (err) {
      console.log(err);
      res.json({ err: err });
    } else {
      Comment.create(req.body, function(err, comment) {
        if (err) {
          console.log(err);
          res.json({ err: err });
        } else {
          comment.comment = req.body.comment;
          comment.author.username = req.body.authorUsername;
          comment.save();
          model.comments.push(comment);
          model.save();
        }
      });
    }
  });
});

// Delete
// router.delete("/comments/:id", config.isAuthenticated, modelsController.delete);

module.exports = router;
