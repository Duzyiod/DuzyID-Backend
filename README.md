# API

Methods:

* GET - get object/objects list
* POST - add new object
* PUT - update existring object
* PATCH - edit existing objects details
* DELETE - delete existing object

accepts any of:

* common requirests structure:
  * Headaer: `Content-Type: application/json`
* file upload structure:
  * Headaer: `Content-Type: <type>/<format>`
  * Headaer: `Content-Length: <bytelength>`
  * Body: raw file


Success result:

```javascript
success = {
    errors: null,
    data: {
        ...
    }
}
```

Error result:

```javascript
error = {
    errors: {
        main: "...",
        ...
    },
    data: null
}
```
