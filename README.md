# picast

> Play media from your computer on a Raspberry Pi hooked up to a TV.

## Status

Experimental. Some values are hardcoded.

Happy to get this working for more folks! Post an issue or send a PR if you're
interesting in using this as well. :wave:

## Usage

### Raspberry Pi

```
$ npm install --global picast

$ picast --serve
```

Make sure `omxplayer` is installed.

### Laptop, Desktop, Phone (via Termux)

On the same local network as the Pi, run

```
$ npm install --global picast

$ picast media.mp4
```

It will find the Pi and instruct it to stream the media from the local machine.

You can control the `omxplayer` instance from stdin in this terminal.

### Play youtube videos

If you replace `media.mp4` above with a YouTube URL (or anything
[youtube-dl](https://rg3.github.io/youtube-dl/) can play), it will stream it on
the pi. Requires `youtube-dl` be installed on the pi.

## License

ISC
