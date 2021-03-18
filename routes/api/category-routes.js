const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    })
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    
    if (!categoryData) {
      res.status(404).json({message: 'Category Not Found!'});
      return
    }

    res.status(200).json(categoryData)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.findByPk(req.params.id)
    updatedCategory.category_name = req.body.category_name;
    await updatedCategory.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json(error)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
