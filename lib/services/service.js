'use strict';


const _ = require('lodash');

const internals = {};

exports.delete = async function(options, service, path) {
  const {url, headers} = internals.getHeadersAndUrl(options, service, path);

  const opts = {headers};

  const {payload} = await Wreck.delete(url, opts);

  return payload;
};

exports.get = async function(options, service, path) {
  const {url, headers} = internals.getHeadersAndUrl(options, service, path);

  const opts = {headers};

  const {payload} = await options.request.wreck.get(url, opts);

  return payload;
};

exports.post = async function(options, service, path, postPayload) {
  const {url, headers} = internals.getHeadersAndUrl(options, service, path);

  const opts = {headers, payload: postPayload};

  const {payload} = await options.request.wreck.post(url, opts);
  return payload;
};

exports.patch = async function(options, service, path, patchPayload) {
  const {url, headers} = internals.getHeadersAndUrl(options, service, path);

  const opts = {headers, payload: patchPayload};

  const {payload} = await options.request.wreck.patch(url, opts);

  return payload;
};

exports.put = async function(options, service, path, putPayload) {
  const {url, headers} = internals.getHeadersAndUrl(options, service, path);

  const opts = {headers, payload: putPayload};

  const {payload} = await options.request.wreck.put(url, opts);

  return payload;
};


internals.getHeadersAndUrl = function(options, service, path) {
  const {url} = options.context[service];

  const headers = _.pickBy({
    'correlation-id': options.request.headers['correlation-id'] || options.request.info.id,
    'accept': 'application/json; charset=utf-8'
  });

  const _url = `${url}${path}`;

  return {headers, url: _url};
};
