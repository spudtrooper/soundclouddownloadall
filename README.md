# soundclounddownload

Downloads all your soundcloud tracks.

## Usage

1. Go to [tracks](https://soundcloud.com/you/tracks)
2. (Optional) Clear your `~/Downloads` folder so everything in there is a track
3. Paste [src/download-all.js](./src/download-all.js) into the dev console.
4. Run it again, because this pretty sketchy and it should be idempotent.

If you want to start over, run this in the console:

```js
localStorage.setItem('state', '{}');
```
