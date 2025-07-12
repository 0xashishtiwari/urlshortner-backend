async function generateUniqueCode(initialLength = 6, existsInDB) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  function generateCode(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  let length = initialLength;
  let code, isUnique = false;

  while (!isUnique) {
    code = generateCode(length);
    isUnique = !(await existsInDB(code));
    if (!isUnique) length++;
  }

  return code;
}

module.exports = generateUniqueCode;
