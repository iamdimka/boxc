# BoxC
An Unofficial NodeJS Library for BoxC API

Compatibility: Node.js version 5+

Install with `npm`:

```sh
npm install boxc
```

[Official Documentation HERE](https://api.boxc.com/v1/docs/)

## API

### Create access token
[Generates authorization URL](https://api.boxc.com/v1/docs/oauth2#get)

```js
const BoxC = require('boxc');

// Get authorization url
var authorizationURL = BoxC.getAuthorizationURL(APPLICATION_ID, returnURI);

//... after user got authorized, you get nonce

BoxC.createAccessToken(APPLICATION_ID, APPLICATION_SECRET, nonce)
    .then(accessToken => new BoxC(accessToken));

// if last argument will be true, you don't need invoke "new BoxC(accessToken)"

BoxC.createAccessToken(APPLICATION_ID, APPLICATION_SECRET, nonce, true)
    .then(api => {
        // work with boxc api
    });
    
// or create using (/static?) constructor
(new BoxC(token)) instanceof BoxC
BoxC.create(token) instanceof BoxC
```

### Estimate
- [estimate(args)](https://api.boxc.com/v1/docs/estimate#get)

### Invoices
- [getInvoices(args)](https://api.boxc.com/v1/docs/invoices#search)
- [getInvoice(id)](https://api.boxc.com/v1/docs/invoices#get)

### Labels
- [getLabel(id)](https://api.boxc.com/v1/docs/labels#get)
- [createLabel(label)](https://api.boxc.com/v1/docs/labels#create)
- [updateLabel(id, label)](https://api.boxc.com/v1/docs/labels#update)
- [cancelLabel(label)](https://api.boxc.com/v1/docs/labels#cancel)

### Manifests
- [createManifest(manifest)](https://api.boxc.com/v1/docs/manifests#post)
- [getManifest(id)](https://api.boxc.com/v1/docs/manifests#get)

### Overpacks
- [getOverpacks(args)](https://api.boxc.com/v1/docs/overpacks#search)
- [getOverpack(id)](https://api.boxc.com/v1/docs/overpacks#get)
- [createOverpack(overpack)](https://api.boxc.com/v1/docs/overpacks#create)
- [updateOverpack(id, overpack)](https://api.boxc.com/v1/docs/overpacks#update)
- [deleteOverpack(id, overpack)](https://api.boxc.com/v1/docs/overpacks#delete)

### Shipments
- [getShipments(args)](https://api.boxc.com/v1/docs/shipments#search)
- [getShipment(id)](https://api.boxc.com/v1/docs/shipments#get)
- [createShipment(shipment)](https://api.boxc.com/v1/docs/shipments#create)
- [updateShipment(id, shipment)](https://api.boxc.com/v1/docs/shipments#update)
- [deleteShipment(id)](https://api.boxc.com/v1/docs/shipments#delete)

### Users
- [getUser()](https://api.boxc.com/v1/docs/users#get)
- [updateUser(user)](https://api.boxc.com/v1/docs/users#update)