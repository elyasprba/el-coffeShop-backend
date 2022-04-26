const validateCreatUsers = (req, res, next) => {
   // email, password, phone_number
   const query = req.query;
   const validQuery = Object.keys(query).filter((key) => key === 'email' || key === 'password' || key === 'phone_number');
   if (validQuery.length < 3) {
      return res.status(400).json({
         err: 'Query harus berisikan email, password, phone_number',
      });
   }
   next();
};

module.exports = {
   validateCreatUsers,
};
