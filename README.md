# picast

> Play media from your computer on a Raspberry Pi hooked up to a TV.

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
