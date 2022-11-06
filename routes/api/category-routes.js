const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    // find all categories
  Category.findAll({
    //include its associated Products
    include: [Product],
  })
  .then((categoriesData) => res.json(categoriesData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id,
    },
      // include its associated Products
    include: [Product],
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id'});
        return;
      }
      res.json(categoryData);
  })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then(newCatData => res.json(newCatData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(updateCatData => res.json(updateCatData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
      // delete a category by its `id` value
    where: {
      id: req.params.id,
    },
  })
    .then(deletedCatData => res.json(deletedCatData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
});

module.exports = router;
