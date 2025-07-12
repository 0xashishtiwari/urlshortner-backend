const UrlModel = require('../models/urlmodel');

const redirectUrl = async (req, res) => {
  const { shortcode } = req.params;

  if (shortcode === 'favicon.ico') return res.status(204).end();

  try {
    const entry = await UrlModel.findOne({ shortCode: shortcode });

    if (!entry) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    return res.status(200).json({ url: entry.url });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = redirectUrl;
