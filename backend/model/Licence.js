const mongoose = require('mongoose');
var randtoken = require('rand-token');

const Schema = mongoose.Schema;
//monggose

// Define collection and schema
let Licence = new Schema({
  enseigne: {
  type: String
},
siret: {
  type: String
},
code_naf: {
  type: String
},
numero_tva: {
  type: String
},
telephone: {
  type: String
},
adresse: {
  type: String
},
code_postal: {
  type: String
},
ville: {
  type: String
},
pays: {
  type: String
},
nombre_postes: {
  type: String
},
duree_utilisation: {
  type: String
},
client_email: {
  type: String
},
client_pwd: {
  type: String
},
licence: {
  type: String,
  default: function() {
      return randtoken.generate(64);
  }
},
code_licence: {
  type: String,
  default: function() {
      return randtoken.generate(64);
  }
},
etat: {
  type: String
},
site: {
  type: String
},
exercice: {
  type: String
},


}, {
  collection: 'licences'
})

module.exports = mongoose.model('Licence', Licence)