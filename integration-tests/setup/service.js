'use strict';

const _ = require('lodash');
const Wreck = require('@hapi/wreck');
const Querystring = require('querystring');

const Environment = require('./environment');

const internals = {};

exports.get = async function(path, query, headers) {
  const {url, opts} = await internals.getOptsAndUrl(path, headers, query);
  try {
    return await Wreck.get(url, opts);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(_.get(error, 'data.payload'));
    throw error;
  }
};

exports.post = async function(path, payload, query, headers) {
  const {url, opts} = await internals.getOptsAndUrl(path, headers, query, payload);
  try {
    return await Wreck.post(url, opts);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(_.get(error, 'data.payload'));
    throw error;
  }
};

exports.delete = async function(path, query, headers) {
  const {url, opts} = await internals.getOptsAndUrl(path, headers, query);
  try {
    return await Wreck.delete(url, opts);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(_.get(error, 'data.payload'));
    throw error;
  }
};

internals.getOptsAndUrl= async function(path, headers, query, payload) {
  const baseUrl = Environment.api.url;
  // const _headers = await internals.getAuthorizationHeader(headers);
  const opts = {json: true, rejectUnauthorized: false, headers, payload};

  if (_.isEmpty(query)) {
    return {opts, url: `${baseUrl}${path}`};
  }

  return {opts, url: `${baseUrl}${path}?${Querystring.stringify(query)}`};
};
