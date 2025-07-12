const UrlModel = require('../models/urlmodel');
const generateUniqueCode = require('../utils/generateURL');

const existsInDB = async (code) => {
  const found = await UrlModel.findOne({ shortCode: code });
  return !!found;
};

const shorturlController = async (req, res) => {
  try {
    let { url } = req.body;
 // Auto prepend https:// if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    // Validate again (very basic check)
    try {
      new URL(url);  // will throw if invalid
    } catch {
      return res.status(400).json({ message: 'Invalid URL format' });
    }

    // Check if this URL is already shortened
    const existing = await UrlModel.findOne({ url });
    if (existing) {
     const shortUrl = `${process.env.FRONTEND_URL}/${existing.shortCode}`;
      return res.status(200).json({
        message: 'URL already shortened',
        shortUrl,
        shortCode: existing.shortCode,
        url: existing.url
      });
    }

    const shortCode = await generateUniqueCode(6, existsInDB);

    const newEntry = await UrlModel.create({
      url: url,
      shortCode: shortCode
    });

   const shortUrl = `${process.env.FRONTEND_URL}/${shortCode}`;


    return res.status(201).json({
      shortUrl,
      url: newEntry.url,
      shortCode
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = shorturlController;
