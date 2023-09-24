const Company = require("../models/Company");

const createCompany = async (req, res) => {
  const { name, code } = req.body;    
  try {
    const newCompany = new Company({
      name: name,
      code: code
    });
    
    const companyCreated = await Company.create(newCompany);
    return res.status(201).json({
      ok: true,
      message: "Request successfully completed",
      data: companyCreated || [],
    });
  } catch (err) {
    return res.status(404).json({ ok: false, message: "Request failed", error: err });
  }
};

module.exports = { createCompany };