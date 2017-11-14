# picast

> Play media from your computer on a Raspberry Pi hooked up to a TV.

## Status

Experimental. Some values are hardcoded.

Happy to get this working for more folks! Post an issue or send a PR if you're
interesting in using this as well. :wave:

## Usage

### Raspberry Pi

```
$ picast --serve
```

Make sure `omxplayer` is installed.

### Laptop, Desktop, Phone (via Termux)

On the same local network as the Pi, run

```
$ picast media.mp4
```

It will find the Pi and instruct it to stream the media from the local machine.

You can control the `omxplayer` instance from stdin in this terminal.

## License

ISC
