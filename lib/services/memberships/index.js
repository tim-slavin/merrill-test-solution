'use strict';


const _ = require('lodash');

const Service = require('../service');

const internals = {
  service: 'memberships'
};

exports.get = async function(options, url) {
  const memberships = await Service.get(options, internals.service, url);

  return _.isEmpty(memberships) ? [] : memberships;
};
