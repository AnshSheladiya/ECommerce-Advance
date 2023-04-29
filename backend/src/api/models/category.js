const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    parent: {
      type: ObjectId,
      ref: 'Category',
    },
    ancestors: [
      {
        type: ObjectId,
        ref: 'Category',
      },
    ],
    created_at: { type: Date, default: Date.now },
    updated_at: Date,
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    is_deleted: Boolean,
    deleted_at: Date,
    deleted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    createdByIp: String,
    updatedByIp: String,
  },
  {
    versionKey: false,
  }
);

categorySchema.virtual('children', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent',
});

categorySchema.statics.getTree = async function () {
  const categories = await this.find({})
    .populate('parent', '_id name')
    .populate('ancestors', '_id name')
    .populate('children', '_id name');

  const categoryMap = {};
  const roots = [];

  categories.forEach((category) => {
    categoryMap[category._id] = category.toObject();
    categoryMap[category._id].children = [];
  });

  categories.forEach((category) => {
    if (category.parent) {
      const parentId = category.parent._id.toString();
      const ancestorIds = category.ancestors.map((a) => a._id.toString());
      categoryMap[parentId].children.push(categoryMap[category._id]);
      categoryMap[category._id].ancestors = ancestorIds.concat(parentId);
    } else {
      roots.push(categoryMap[category._id]);
    }
  });

  return roots;
};

categorySchema.set('toJSON', {
  transform: (doc, ret, options) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model('Category', categorySchema);
