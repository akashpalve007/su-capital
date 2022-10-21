const { object } = require('joi');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../models/plugins');

const counterIncrementor = require('../../utils/counterIncrementer');
const CollectibleSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            default: '',
        },
        tokenAbbrevation: {
          type: String,
          default: '',
        },
        description: {
            type: String,
            default: '',
        },
        noOfEdition: {
            type: Number,
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
        displayMediaType: {
            type: String,
            default: '',
        },
        displayMetaData: {
            type: Object,
            default: '',
        },
        displayMedia: {
            type: String,
            default: '',
        },
        coverMediaType: {
            type: String,
            default: '',
        },
        coverMetaData: {
            type: Object,
            default: '',
        },
        coverMedia: {
            type: String,
            default: '',
        },
        collectionId: {
            type: mongoose.SchemaTypes.ObjectId,
            default: '',
        },
        brandId: {
            type: mongoose.SchemaTypes.ObjectId,
        },
        seriesId: {
            type: mongoose.SchemaTypes.ObjectId,
        },
        ownerId: {
            type: mongoose.SchemaTypes.ObjectId,
        },
        price: {
            type: Number,
            default:0
        },
        editionType: {
            type: String,
            default:""
        },
        currency: {
            type: String,
            required: true,
            default: "USD"
        },
        primaryCommission: {
            type: Number,
        },
        secondaryCommission: {
            type: Number,
        },
        secondaryRoyalty: {
            type: Number,
        },
        status: {
            type: String,
        },
        mintedOn: {
            type: Date,
        },
        season: {
            type: Number,
        },
        rarity: {
            type: String,
        },
        type: {
            type: String,
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
CollectibleSchema.plugin(toJSON);
CollectibleSchema.plugin(paginate);

CollectibleSchema.pre('save', async function (next) {
    const doc = this;
    doc.seqId = await counterIncrementor('collectible')
    next();
});

/**
 * @typedef Collectibles
 */
const Collectibles = mongoose.model('collectible', CollectibleSchema)

module.exports = Collectibles;
