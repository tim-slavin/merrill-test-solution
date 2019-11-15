'use strict';


const {Memberships} = require('../../microservices');

exports.get = async function(options) {
  const memberships = await Memberships.get(options, '/projectmemberships');

  return memberships;
};
