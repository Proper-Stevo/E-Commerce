const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll();
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => { //params or include section is wrong. 
  // find a single tag by its `id`
  // be sure to include its associated Product data\
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Tag, through: Product, as: 'tag_products' }]
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!'});
      return;
  }
  res.status(200).json(productData);
} catch (err) {
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const productData = Tag.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const productData = await Tag.create(req.body.id);
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const productData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!productData) {
      res.status(404).json({ message: 'No Tag found with this id!'});
      return;
    }

    res.status(404).json(productData);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
