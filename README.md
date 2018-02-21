# picast

> Play media from your computer on a Raspberry Pi hooked up to a TV.

Some people have a raspberry pi (or other small ARM computer) plugged into a
TV or big screen of some kind. It can be useful to play videos or youtube videos
on it sometimes. `picast` is a command line tool for sending local media or
youtube urls to the pi's screen.

## Setup

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

## Usage

```
  picast --serve

    Run a picast server. Prints its IP address and port to stdout.

  picast [-h HOST] FILE

    Play a local file on the pi. Optionally specify the IP address. Defaults to
    10.0.0.32 otherwise.

  picast [-h HOST] URL

    Play the video at URL. This uses the external program youtube-dl to try and
    find and play any embedded video on the website. Requires youtube-dl be
    installed on the pi.
```

## Youtube videos

If you replace `media.mp4` above with a YouTube URL (or anything
[youtube-dl](https://rg3.github.io/youtube-dl/) can play), it will stream it on
the pi. Requires `youtube-dl` be installed on the pi.

## License

ISC
