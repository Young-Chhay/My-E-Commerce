const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
      // include its associated Product data
    include: [{model: Product, through: ProductTag}],
  })
  .then((TagsData) => res.json(TagsData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
  where: {
    id: req.params.id,
  },
    // include its associated Products
    include: [{model: Product, through: ProductTag}],
})
  .then(TagData => {
    if (!TagData) {
      res.status(404).json({ message: 'No Tag found with this id'});
      return;
    }
    res.json(TagData);
})
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((newTag) => res.json(TagsData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,{
    where: {id: req.params.id,}
  })
  .then(UpdateTagData => {
    if (!UpdateTagData) {
        res.status(404).json({ message: 'No car found with this id' });
        return;
    }
    res.json(dbCarData);
})
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  }); 
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {id: req.params.id},
  })
    .then((deletedTagData) => {
      console.log(deletedTagData);
      res.json(deletedTagData)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
});

module.exports = router;