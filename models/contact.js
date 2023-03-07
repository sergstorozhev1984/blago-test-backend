const {Schema, model} = require("mongoose")
const Joi = require("joi");
const mongoosePaginate = require("mongoose-paginate-v2");

const handleSaveErrors = require("../helpers/handleSaveErrors");

const contactSchema = new Schema ({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }

}, {versionKey: false, timeseries: true});

contactSchema.post("save", handleSaveErrors);

contactSchema.plugin(mongoosePaginate);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemas = {
  addSchema,
  updateFavoriteSchema,
}

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
}
