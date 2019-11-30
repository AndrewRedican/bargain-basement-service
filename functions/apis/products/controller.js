function getAllProducts(req, res) {
  // todo, nothing found return empty array
  return res.status(200).json({
    success: true,
    data: {
      process: 'getAllProducts'
    }
  })
}

function addProducts(req, res) {
  // todo, nothing found return empty array
  return res.status(200).json({
    // 200 or 204 depending if full details or not
    success: true,
    data: {
      process: 'addProducts'
    }
  })
}

function getProduct(req, res) {
  // todo...
  const exists = true
  return res.status(exists ? 200 : 404).json({
    success: true,
    data: {
      process: 'getProduct',
      targetId: req.params.id
    }
  })
}

function editProduct(req, res) {
  // todo...
  const exists = true
  return res.status(exists ? 200 : 404).json({
    success: true,
    data: {
      process: 'editProduct',
      targetId: req.params.id
    }
  })
}

module.exports = {
  getAllProducts,
  addProducts,
  getProduct,
  editProduct
}
