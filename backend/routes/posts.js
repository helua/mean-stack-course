const express = require('express');

const Post = require('../models/post');//data schema/model imported

const router = express.Router();//main app const


router.post('', (req, res, next) => {
  const post = new Post({ //constructor from mongoose
    title: req.body.title,
    content: req.body.content
  });
  post.save()//mongoose option
  .then(createdPost => {
    res.status(201).json({
      message: 'Post added succsessfully',
      postId: createdPost._id //dodanie id takiego jak dodało mongoose też na froncie, żeby można było od razu np. usunąć obiekt
    });
  });
});

router.get('', (req, res, next) => {
  Post.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: documents
    }); //static method from mongoose
  });
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post){
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found'});
    }
  })

});

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post)
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'Post has been updated successfully' });
    });
});

router.delete('/:id', (req, res, next) => { //strzelamy dodając id do endpointa
  Post.deleteOne({ _id: req.params.id }) //opcja mongoose _id z backendu id z frontendu
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'Post has been deleted' });
    });
});


module.exports = router;
