class ErrorHandler extends Error {
   constructor(data) {
      super(data);
      this.message = data.message;
      this.status = data.status;
   }
}

module.exports = { ErrorHandler };
