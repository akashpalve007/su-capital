const { object } = require('joi');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../models/plugins');

const counterIncrementor = require('../../utils/counterIncrementer');
const DropSchema = mongoose.Schema(
    {   name: {
            type: String,
            required:true

        },
        dateFrom:{
            type: Date,
            required:true
        },
        dateTo:{
            type: Date,
            required:true

        },
        collectionId:{
            type: mongoose.SchemaTypes.ObjectId,

        },
        seriesId:{
            type: mongoose.SchemaTypes.ObjectId,

        },
        comicId:{
            type: mongoose.SchemaTypes.ObjectId,

        },
        collectibleId:{
            type: mongoose.SchemaTypes.ObjectId,

        },
        ownerId:{
            type: mongoose.SchemaTypes.ObjectId,

        },
        type: {
            type: String,
            required:true

        },
        active: {
            type: Boolean,
            default: true,
        },

        seqId: { type: Number }
    },
    {
        timestamps: true,
    }
);
// add plugin that converts mongoose to json
DropSchema.plugin(toJSON);
DropSchema.plugin(paginate);

DropSchema.pre('save', async function (next) {
    const doc = this;
    doc.seqId = await counterIncrementor('drops')
    next();
});

/**
 * @typedef Drops
 */
const Drops = mongoose.model('drops', DropSchema)

module.exports = Drops;
