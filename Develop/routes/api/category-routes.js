const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryInfo = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['product_name'],
        },
      ],
    })
    res.status(200).json(categoryInfo)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
  const categoryInfo = await Category.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ['product_name'],
      }
    ],
  })
  res.status(200).json(categoryInfo)
} catch (err) {
  res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  const newCategory = await Category.create(req.body);
  (newCategory) ? res.status(200).json(newCategory) : res.status(500).json(err) ;
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  
  const updateCategory = await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  if (updateCategory) {
    res.status(200).json(updateCategory)
  } else {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deleteCategory = await Category.destroy({
    where: {
      id: req.params.id
    }
  })
  if (deleteCategory) {
    res.status(200).json(deleteCategory)
  } else {
    res.status(500).json(err)
  }
});

module.exports = router;