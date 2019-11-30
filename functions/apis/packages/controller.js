function getAllPackages(req, res) {
  // todo, nothing found return empty array
  return res.status(200).json({
    success: true,
    data: {
      process: 'getAllPackages'
    }
  })
}

function addPackages(req, res) {
  // todo, nothing found return empty array
  return res.status(200).json({
    // 200 or 204 depending if full details or not
    success: true,
    data: {
      process: 'addPackages'
    }
  })
}

function getPackage(req, res) {
  // todo...
  const exists = true
  return res.status(exists ? 200 : 404).json({
    success: true,
    data: {
      process: 'getPackage',
      targetId: req.params.id
    }
  })
}

function editPackage(req, res) {
  // todo...
  const exists = true
  return res.status(exists ? 200 : 404).json({
    success: true,
    data: {
      process: 'editPackage',
      targetId: req.params.id
    }
  })
}

function removePackage(req, res) {
  // todo...
  const existed = true
  return res.status(existed ? 204 : 404).json({
    success: true,
    data: {
      process: 'removePackage',
      targetId: req.params.id
    }
  })
}

module.exports = {
  getAllPackages,
  addPackages,
  getPackage,
  editPackage,
  removePackage
}
