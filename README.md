# Sentr.io Email Templates

## Setup
```
$ bundle install
$ npm install -g grunt-cli
$ npm install
```

If you wish to test the email templates create a `secret.json` that looks like this:
```
{
  "mandrill": {
    "key": "mandrill-api-key",
    "testAddress": "your@testemail"
  }
}
```
### Previewing/Development
Starts the BrowserSync on `localhost:3000`

`$ grunt`

Builds, inlines css, inlines images, places in `dist` directory and then fires an email through Mandrill to the address specified in `secret.json`.

`$ grunt test`

### Building
Will build the templates, putting final files in the `dist` directory.

`$ grunt build`

