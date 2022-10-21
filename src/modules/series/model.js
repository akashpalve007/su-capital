const { object } = require('joi');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../models/plugins');

const counterIncrementor = require('../../utils/counterIncrementer');
const SeriesSchema = mongoose.Schema(
    {
        seriesName: {
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
        collectionId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
        },
        launchDate: {
            type: Date,
            required: true,
        },
        launchTime: {
            /* 
              values are 1, 2
              denotes am(1) and pm(2) when calculating scheduleOn time, where hour is fixed number(7).
              currently this referes to either 7am or 7pm, and setting this time in scheduleOn is done on api caller side.
             */
            type: String,
            // required: true,
        },
       
        secondaryRoyalty: {
            type: Number,
            default: 0,
        },
        primaryCommission: {
            type: Number,
            default: 0,
        },
        secondaryCommission: {
            type: Number,
            default: 0,
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
        displayImage: {
            type: String,
            default: '',
        },
        coverImage: {
            type: String,
            default: '',
        },
        displayMediaType: {
            type: String,
            default: 'image',
        },
        coverMediaType: {
            type: String,
            default: 'image',
        },
        displayMediaMeta: {
            type: Object,
            default: 'image',
        },
        coverMediaMeta: {
            type: Object,
            default: 'image',
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

        seqId: { type: Number }
    },
    {
        timestamps: true,
    }
);
// add plugin that converts mongoose to json
SeriesSchema.plugin(toJSON);
SeriesSchema.plugin(paginate);

SeriesSchema.pre('save', async function (next) {
    const doc = this;
    doc.seqId = await counterIncrementor('series')
    next();
});

/**
 * @typedef Series
 */
const Series = mongoose.model('series', SeriesSchema)

module.exports = Series;
