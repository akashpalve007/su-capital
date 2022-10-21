const { object } = require('joi');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../models/plugins');

const counterIncrementor = require('../../utils/counterIncrementer');
const CollectionSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        brandId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
        },
       
        displayImage: {
            type: String,
            default: '',
        },
        coverImage: {
            type: String,
            default: '',
        },
        backgroundImage: {
            type: String,
            default: '',
        },
        ownerId: {
            type: mongoose.SchemaTypes.ObjectId,
            // required: true,
        },
        ownerName: {
            type: String,
            // required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
        coverBgColor: {
            type: String,
            default: ""
        },
        pageBgColor: {
            type: String,
            default: ""
        },
        coverDescBgColor: {
            type: String,
            default: ""
        },
        pageDescFontColor: {
            type: String,
            default: ""
        },
        seqId: { type: Number }
    },
    {
        timestamps: true,
    }
);
// add plugin that converts mongoose to json
CollectionSchema.plugin(toJSON);
CollectionSchema.plugin(paginate);

CollectionSchema.pre('save', async function (next) {
    const doc = this;
    doc.seqId = await counterIncrementor('nftCollections')
    next();
});

/**
 * @typedef Collections
 */
const Collections = mongoose.model('collections', CollectionSchema)

module.exports = Collections;
