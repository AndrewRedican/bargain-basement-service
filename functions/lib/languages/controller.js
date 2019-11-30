const languages = require('./languages.json')

function getAllLanguages(_req, res) {
  return res.json({
    success: true,
    data: languages
  })
}

function getLanguage(_req, res) {
  const requiredLang = _req.params.language
  const lang = languages.filter(lang => lang.name === requiredLang)
  const exists = lang.length > 0

  return res
    .status(exists ? 200 : 404)
    .json({ success: exists, data: exists ? lang[0] : 'Language Not Found' })
}

module.exports = {
  getAllLanguages,
  getLanguage
}
