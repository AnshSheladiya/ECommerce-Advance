function sanitizeReqBody(req, res, next) {
  const { body ,query} = req;
  for (const key in body) {
    if (typeof body[key] === "string") {
      body[key] = body[key].replace(/\s{2,}/g, " ").trim();
    }
        //  Check if the value is an empty string and delete the field
        if (req.body[key] === '') {
          delete req.body[key];
        }
  }

  for (const key in query) {
    if (typeof query[key] === "string") {
      query[key] = query[key].replace(/\s{2,}/g, " ").trim();
    }

     //  Check if the value is an empty string and delete the field
     if (req.query[key] === '') {
      delete req.query[key];
    }
  }
  next();
}

module.exports = sanitizeReqBody;
