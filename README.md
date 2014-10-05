# Example of reloading javascript file on save via chrome remote debugging protocol

# Insrtuctions

 * Clone repo
 * Run 'npm install'
 * Run chrome with support for remote debugging on port 9222. On OSX run
```
/Applications/Google\ Chrome.app/Contents/MacOSoogle\ Chrome --remote-debugging-port=9222
```
For other platforms see [1].
 * Open new tab in chrome. Make sure developer tools are **closed**
 * Run 'npm start' in project folder
 * Open http://localhost:8080/ in chrome. You will see current time
 * Change file public/test.js and see how changes hot swapped without full page reload

## Links

 * https://developer.chrome.com/devtools/docs/debugger-protocol
 * https://github.com/cyrus-and/chrome-remote-interface

