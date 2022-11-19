const errorHandler = (err, req, res, next) => {
  res.status(500).send({ err: err });
};

module.exports = errorHandler;
