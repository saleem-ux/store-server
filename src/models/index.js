'use strict';

require('dotenv').config();
const POSTGRES_URI = 'postgres://ivfsenzo:jT16g7bwbAjwfk9S_bxMFwHtKcs7OA5M@fanny.db.elephantsql.com/ivfsenzo';

const { Sequelize, DataTypes } = require('sequelize');

const Collection = require('./collection-class')

const productSchema = require('./product');
const cartItemSchema = require('./cartItem');

let sequelize = new Sequelize(POSTGRES_URI);


const productModel = productSchema(sequelize, DataTypes)
const cartItemModel = cartItemSchema(sequelize, DataTypes);


productModel.hasMany(cartItemModel, { foreignKey: 'productId', sourceKey: 'id' });
cartItemModel.belongsTo(productModel, { foreignKey: 'productId', targetKey: 'id' });


//export Collections 
const productCollection = new Collection(productModel);
const cartItemCollection = new Collection(cartItemModel);


module.exports = {
    db: sequelize,
    productCollection: productCollection,
    cartItemCollection: cartItemCollection

}