const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    Under$25: {
        type: Number,
        
    },
    $25to$50: {
        type: Number,
    },
    $50to$100: { 
        type: Number,
    },
    Above$100: { 
        type: Number,
    }
})


categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true,
});

exports.Category = mongoose.model('Category', categorySchema);