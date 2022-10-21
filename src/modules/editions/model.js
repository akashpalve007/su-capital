const { object } = require('joi');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../models/plugins');

const EditionsSchema = mongoose.Schema(
    {
        editionNo: {
            type: Number,
            required: true,
        },
        collectibleId: {
            type: mongoose.SchemaTypes.ObjectId,
        },
        ownerId: {
            type: mongoose.SchemaTypes.ObjectId,
        },
        brandId: {
            type: mongoose.SchemaTypes.ObjectId,
        },
        seriesId: {
            type: mongoose.SchemaTypes.ObjectId,
        },
        price: {
            type:Number,
            default:0
        },
        dropId: {
            type: mongoose.SchemaTypes.ObjectId,
        },
        assetUrl: {
            type: String,
            required: true,
        },
        displayImage: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: '',
        },
        sold: {
            type: Boolean,
            default: false
        },
        active: {
            type: Boolean,
            default: true
        },
        currency: {
            type: String
        },
    },
    {
        timestamps: true,
    }
);
// add plugin that converts mongoose to json
EditionsSchema.plugin(toJSON);
EditionsSchema.plugin(paginate);


/**
 * @typedef EditionsSchema
 */
const Editions = mongoose.model('editions', EditionsSchema)

module.exports = Editions;
