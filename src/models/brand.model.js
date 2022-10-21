const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const counterIncrementor = require('../utils/counterIncrementer');

const brandSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            default: '',
        },
        username: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            validate(value) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error('Password must contain at least one letter and one number');
                }
            },
            private: true, // used by the toJSON plugin
        },
        role: {
            type: String,
            enum: roles,
            required: true,
            default: 'user',
            enum: ['brand'],
        },
        country: {
            type: String,
            default: '',
            trim: true,
        },
        phoneNumber: {
            type: String,
            default: '',
            trim: true,
        },
        primaryCommission: {
            type: String,
            default: '0',
            trim: true,
        },
        secondaryRoyalty: {
            type: String,
            default: '0',
            trim: true,
        },
        coverLogo: {
            type: String,
            default:
                'https://www.pngitem.com/pimgs/m/517-5177724_vector-transparent-stock-icon-svg-profile-user-profile.png',
        },
        coverImage: {
            type: String,
            default: 'https://wallpaperaccess.com/full/1348033.jpg',
        },
        bio: {
            type: String,
            default: '',
        },

        kycStatus: {
            type: Boolean,
            default: false,
        },
        wallet: {
            type: Object,
            default: { default: '', metamask: '' },
        },
        active: {
            type: Boolean,
            default: true,
        },
        seqId: {
            type: Number
        },
        orgId: {
            type: mongoose.SchemaTypes.ObjectId,
            default: null
        },

        profileStatus: {
            type: String,
            default: 'activated',
        },
        bio: {
            type: String,
            default: '',
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
        address1: {
            type: String,
            default: ""
        },
        address2: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        state: {
            type: String,
            default: ""
        },
        postalCode: {
            type: String,
            default: ""
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
brandSchema.plugin(toJSON);
brandSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
brandSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
brandSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

brandSchema.pre('findOneAndUpdate', async function (next) {
    // console.log("update hook fired")
    const user = this;
    if (user._update && user._update.password) {
        user._update.password = await bcrypt.hash(user._update.password, 8);
    }
    next();
});

brandSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    user.seqId = await counterIncrementor('brand')
    // console.log("user schema checking password value", user.password)
    next();
});

/**
 * @typedef Brand
 */
const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
