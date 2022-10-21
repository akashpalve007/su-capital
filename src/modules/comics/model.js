const { object } = require('joi');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../models/plugins');

const counterIncrementor = require('../../utils/counterIncrementer');
const ComicSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: 'no-description',
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
        price:{
            type:Number,
            default:0
        },
        startYear:{
            type:String
        },
        collectionId: {
            type: mongoose.SchemaTypes.ObjectId,
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
        backgroundImage: {
            type: String,
            default: '',
        },
        coverImage: {
            type: String,
            default: '',
        },
        displayImage: {
            type: String,
            default: '',
        },
        writerId: {
            type: mongoose.SchemaTypes.ObjectId,
        },
        writerName: {
            type: String,
        },
        publisherId: {
            type: mongoose.SchemaTypes.ObjectId,
        },
        publisherName: {
            type: String,
        },
        noOfEditions: {
            type: Number,
        },
        pages: {
            type: Number,
        },
        characters: {
            type: String,
        },
        type: {
            type: String,
            default: '',
        },
        season: {
            type: Number,
            default: 1,
        },
        rarity: {
            type: String,
            default: 'none',
        },
        primaryCommission: {
            type: Number,
            default: 0,
        },
        secondaryCommission: {
            type: Number,
            default: 0,
        },
        secondaryRoyalty: {
            type: Number,
            default: 0,
        },
        active: {
            type: Boolean,
            default: true
        },
        currency:{
            type:String
        },
        seqId: { type: Number }
    },
    {
        timestamps: true,
    }
);
// add plugin that converts mongoose to json
ComicSchema.plugin(toJSON);
ComicSchema.plugin(paginate);

ComicSchema.pre('save', async function (next) {
    const doc = this;
    doc.seqId = await counterIncrementor('comic')
    next();
});

/**
 * @typedef Comics
 */
const Comics = mongoose.model('comic', ComicSchema)

module.exports = Comics;
