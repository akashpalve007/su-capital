const EditionModel = require('../model')
const collectibleService = require('../../collectible/service')

/**
 * 
 * @param {Array} collectibleId 
 * @returns <Promise>
 */
const createEditions = async (collectibleId) => {
    let collectible = await collectibleService.getCollectiblebyId(collectibleId)

    if(collectible) {
        let item = {
            collectionId: collectible.collectionId,
            seriesId: collectible.seriesId,
            brandId: collectible.brandId,
            editionNo: 1,
            collectibleId: collectible.id,
            price: collectible.price,
            dropId: collectible.dropId,
            type: collectible.type,
            sold: false,
            active: true,
            currency: collectible.currency,
        }

        let editionsArr = []
        
        for (let idx = 0; idx < array.length; idx++) {
            let edition = {...item}
            edition['editionNo'] = idx + 1
            editionsArr.push()
        }

        console.log();
    }
}

module.exports = createEditions