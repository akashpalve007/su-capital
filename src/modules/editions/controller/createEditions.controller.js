const editionService = require('../services/index')
const collectibleService = require('../../collectible/service')
const pick = require('../../../utils/pick')
const { sendResponse } = require('../../../utils/responseHandler')
const httpStatus = require('http-status')
/**
 * 
 * @param {ObjectId} collectibleId 
 */
const createEditions =  async (req, res) => {
    const {collectibleId} = pick(req.body, ['collectibleId'])
    let editionsArr = []
    let collectible = await collectibleService.getCollectiblebyId(collectibleId)
    if(Array.isArray(collectible)) collectible = collectible[0]

    if(collectible && collectible.noOfEdition) {
        
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
        
        for (let idx = 0; idx < collectible.noOfEdition; idx++) {
            let edition = {...item}
            edition['editionNo'] = idx + 1
            editionsArr.push(edition)
        }
    }

    sendResponse(res, httpStatus.OK, editionsArr, null)
    
}

module.exports = createEditions