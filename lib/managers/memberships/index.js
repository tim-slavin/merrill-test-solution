'use strict';


const {Memberships} = require('../../services');

exports.get = async function(options) {
  const memberships = await Memberships.get(options, '/projectmemberships');

  return memberships;
};
