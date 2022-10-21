const { object } = require('joi');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../models/plugins');

const counterIncrementor = require('../../utils/counterIncrementer');
const WhitelistSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required:true

        },
        dropId:{
            type: mongoose.SchemaTypes.ObjectId,

        },
        walletAddress: {
            type: Array,
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
WhitelistSchema.plugin(toJSON);
WhitelistSchema.plugin(paginate);

WhitelistSchema.pre('save', async function (next) {
    const doc = this;
    doc.seqId = await counterIncrementor('whitelist')
    next();
});

/**
 * @typedef WhiteList
 */
const WhiteList = mongoose.model('whitelist', WhitelistSchema)

module.exports = WhiteList;
