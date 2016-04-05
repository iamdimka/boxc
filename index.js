'use strict';

const request = require('./request');
const querystring = require('querystring');

class BoxC {
  constructor(token) {
    this.token = token;
  }

  /**
   * Create instance
   * @param token
   */
  static create(token) {
    return new BoxC(token);
  }

  /**
   * Use token
   * @param token
   * @returns {BoxC}
   */
  useToken(token) {
    this.token = token;
    return this;
  }

  /**
   * Get authorization URL
   * @link https://api.boxc.com/v1/docs/oauth2#get
   *
   * @param {String} applicationID
   * @param {String}  returnURI
   *
   * @returns {String}
   */
  static getAuthorizationURL(applicationID, returnURI) {
    return `https://api.boxc.com/v1/oauth/authorize?${querystring.stringify({
      application_id: applicationID,
      return_uri: returnURI
    })}`;
  }

  /**
   * Trying to create access token from nonce
   * @link https://api.boxc.com/v1/docs/oauth2#post
   *
   * @param {String} applicationID
   * @param {String} applicationSecret
   * @param {String} nonce
   * @optional {Boolean} autoCreate
   *
   * @returns {Promise.<String>|Promise<BoxC>}
   */
  static createAccessToken(applicationID, applicationSecret, nonce) {
    return request.post(null, 'oauth/access_token', {
      application_id: applicationID,
      application_secret: applicationSecret,
      nonce: nonce
    }).then(json => arguments[3] ? new BoxC(json.access_token) : json.access_token);
  }

  /**
   * Estimate
   * @link https://api.boxc.com/v1/docs/estimate#get
   *
   * @param {{country: string, entry_point: string, height: number, length: number, postal_code: string, weight: number, width: number}} args
   * country        The destined country in ISO 3166-1 alpha-2 format. Only US is accepted. Not required.
   * entry_point    The code for the drop off location. See Entry Points for a list of codes. Not required.
   * height        The height of the shipment in CM. Default is 1.
   * length        The length of the shipment in CM. Default is 15.
   * postal_code    The destined Postal Code or ZIP Code. Required for a more accurate estimate.
   * weight        The weight of the shipment in KG. Maximum: 11.363. Required
   * width        The width of the shipment in CM. Default is 10.
   *
   * @returns {Promise.<{currency: string, entry_point: string, oversize_fee: string, services: [{service: string, total_cost: string, transit_min: number, transit_max: number}]}>}
   */
  estimate(args) {
    return request.get(this.token, 'estimate', args).then(json => json.estimate);
  }

  /**
   * Retrieves a list of entry points
   * @link https://api.boxc.com/v1/docs/entry-points#search
   *
   * @returns {Promise.<[{address: string, country: string, city: string, id: string}]>}
   */
  getEntryPoints() {
    return request.get(this.token, 'entry-points').then(json => json['entry-points']);
  }

  /**
   * Retrieves an entry point
   * @link https://api.boxc.com/v1/docs/entry-points#get
   *
   * @param {String} id
   *
   * @returns {Promise.<{address: string, country: string, city: string, id: string}>}
   */
  getEntryPoint(id) {
    return request.get(this.token, `entry-points/${id}`).then(json => json['entry_point']);
  }

  /**
   * Retrieves a paginated list of invoices
   * @link https://api.boxc.com/v1/docs/invoices#search
   *
   * @param {Object} args
   * date_end        The inclusive date to end the search in YYYY-MM-DD format. Default is "now".
   * date_start    The inclusive date to begin the search in YYYY-MM-DD format. Default is 1 year ago.
   * limit        The number of results to return. Max: 50. Default: 50.
   * order        The order of the results. Can be "asc" for ascending, or "desc" for descending. Default: desc.
   * page            The page number of the results. Default: 1.
   *
   * @returns {Promise.<Object>}
   */
  getInvoices(args) {
    return request.get(this.token, 'invoices', args);
  }

  /**
   * Retrieves an invoice
   * @link https://api.boxc.com/v1/docs/invoices#get
   *
   * @param {String} id
   *
   * @returns {Promise.<Object>}
   */
  getInvoice(id) {
    return request.get(this.token, `invoice/${id}`).then(json => json.invoice);
  }

  /**
   * Retrieves a label
   * @link https://api.boxc.com/v1/docs/labels#get
   *
   * @param {String|Number} id
   *
   * @returns {Promise.<Object>}
   */
  getLabel(id) {
    return request.get(this.token, `labels/${id}`).then(json => json.label);
  }

  /**
   * Create Label
   * @link https://api.boxc.com/v1/docs/labels#create
   *
   * @param label
   *
   * @returns {Promise.<Object>}
   */
  createLabel(label) {
    return request.post(this.token, 'labels', {label: label}).then(json => json.label);
  }

  /**
   * Update label
   * @link https://api.boxc.com/v1/docs/labels#update
   *
   * @param {String} id
   * @param {Object} label
   *
   * @returns {Promise.<Object>}
   */
  updateLabel(id, label) {
    return request.put(this.token, `labels/${id}`, {label: label}).then(() => true);
  }

  /**
   * Cancels a label
   * @link https://api.boxc.com/v1/docs/labels#cancel
   *
   * @param {String} id
   *
   * @returns {Promise.<Object>}
   */
  cancelLabel(id) {
    return request.put(this.token, `labels/${id}/cancel`).then(() => true);
  }

  /**
   * Create manifest
   * @link https://api.boxc.com/v1/docs/manifests#post
   *
   * @param {Object} manifest
   *
   * @returns {Promise.<Object>}
   */
  createManifest(manifest) {
    return request.post(this.token, 'manifests', {manifest: manifest}).then(json => json.manifest);
  }

  /**
   * Retrieve manifest
   * @link https://api.boxc.com/v1/docs/manifests#get
   *
   * @param {string} id
   *
   * @returns {Promise.<Object>}
   */
  getManifest(id) {
    return request.get(this.token, `manifests/${id}`).then(json => json.manifest);
  }

  /**
   * Get overpacks
   * @link https://api.boxc.com/v1/docs/overpacks#search
   *
   * @param {Object} args
   *
   * @returns {Promise.<Object>}
   */
  getOverpacks(args) {
    return request.get(this.token, 'overpacks', args);
  }


  /**
   * Retrieves an overpack
   * @link https://api.boxc.com/v1/docs/overpacks#get
   *
   * @param {String} id
   *
   * @returns {Promise.<Object>}
   */
  getOverpack(id) {
    return request.get(this.token, `overpacks/${id}`).then(json => json.overpack);
  }

  /**
   * Creates an overpack
   * @link https://api.boxc.com/v1/docs/overpacks#create
   *
   * @param {Object} overpack
   *
   * @returns {Promise.<Object>}
   */
  createOverpack(overpack) {
    return request.post(this.token, 'overpacks', {overpack: overpack}).then(json => json.overpack)
  }

  /**
   * Updates an overpack
   * @link https://api.boxc.com/v1/docs/overpacks#update
   *
   * @param {String} id
   * @param {Object} overpack
   *
   * @returns {Promise.<Object>}
   */
  updateOverpack(id, overpack) {
    return request.put(this.token, `overpacks/${id}`, {overpack: overpack}).then(json => json.overpack);
  }

  /**
   * Deletes an overpack
   * @link https://api.boxc.com/v1/docs/overpacks#delete
   *
   * @param {String} id
   *
   * @returns {Promise.<Object>}
   */
  deleteOverpack(id) {
    return request.delete(this.token, `overpacks/${id}`).then(() => true);
  }

  /**
   * Retrieves a paginated list of shipments
   * @link https://api.boxc.com/v1/docs/shipments#search
   *
   * @param {Object} args
   *
   * @returns {Promise.<Object>}
   */
  getShipments(args) {
    return request.get(this.token, 'shipments', args);
  }

  /**
   * Retrieves a shipment
   * @link https://api.boxc.com/v1/docs/shipments#get
   *
   * @param {String} id
   *
   * @returns {Promise.<Object>}
   */
  getShipment(id) {
    return request.get(this.token, `shipments/${id}`).then(json => json.shipment);
  }

  /**
   * Creates a shipment
   * @link https://api.boxc.com/v1/docs/shipments#create
   *
   * @param {Object} shipment
   *
   * @returns {Promise.<Object>}
   */
  createShipment(shipment) {
    return request.post(this.token, 'shipments', {shipment: shipment}).then(json => json.shipment)
  }

  /**
   * Updates a shipment
   * @link https://api.boxc.com/v1/docs/shipments#update
   *
   * @param {String} id
   * @param {Object} shipment
   *
   * @returns {Promise.<Boolean>}
   */
  updateShipment(id, shipment) {
    return request.put(this.token, `shipments/${id}`, {shipment: shipment}).then(() => true);
  }

  /**
   * Deletes a shipment
   * @link https://api.boxc.com/v1/docs/shipments#update
   *
   * @param {String} id
   *
   * @returns {Promise.<Boolean>}
   */
  deleteShipment(id) {
    return request.delete(this.token, `shipments/${id}`).then(() => true);
  }

  /**
   * Retrieves this user
   * @link https://api.boxc.com/v1/docs/users#get
   *
   * @returns {Promise.<Object>}
   */
  getUser() {
    return request.get(this.token, 'users/me').then(json => json.user);
  }

  /**
   * Updates this user
   * @link https://api.boxc.com/v1/docs/users#update
   *
   * @param {Object} user
   *
   * @returns {Promise.<Object>}
   */
  updateUser(user) {
    return request.put(this.token, 'users/me', {user: user}).then(json => json.user);
  }
}

module.exports = BoxC;