const config = require("../config");
const { Router } = require("express");
const router = Router();
const Comment = require("../models/comment");
const Model = require("../models/model");



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
          comment.author.id = req.body.authorID;
          comment.save();
          model.comments.push(comment);
          model.save();
          res.json({ message: "success" })
        }
      });
    }
  });
});

// Delete
router.delete("/comments/:id", config.isAuthenticated, async (req, res) => {
  var id = req.params.id;
  Comment.findByIdAndRemove(id, function(err, article){
      if(err) {
          return res.status(500).json({
              message: 'Error getting record.'
          });
      }
      return res.json(article);
  });
});

module.exports = router;
