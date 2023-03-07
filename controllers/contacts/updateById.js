const {Contact} = require("../../models/contact");

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result)
      return res
        .status(404)
        .json({ message: `Contact by ID ${contactId}: not found` });
    res.status(201).json(result);
}

module.exports = updateById;