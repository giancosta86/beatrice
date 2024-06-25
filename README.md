# beatrice

_Simplified text-to-speech for the browser_

![GitHub CI](https://github.com/giancosta86/beatrice/actions/workflows/publish-to-npm.yml/badge.svg)
[![npm version](https://badge.fury.io/js/@giancosta86%2Fbeatrice.svg)](https://badge.fury.io/js/@giancosta86%2Fbeatrice)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)

**beatrice** is a minimalist **TypeScript** library focusing on text-to-speech (TTS) within the browser.

## Installation

The package on NPM is:

> @giancosta86/beatrice

The public API entirely resides in the root package index, so you shouldn't reference specific modules.

## Usage

### Retrieving a voice

The very first step consists in retrieving a suitable voice for your target language:

```typescript
const mandarinVoice = findVoice(
  //eSpeak on Linux
  voice => voice.name == "Chinese (Mandarin)",

  //Firefox on Android
  voice => voice.lang == "zh-CN",

  //Chrome on Android
  voice => voice.name == "Chinese China"
);
```

The recommended way to retrieve a voice is the `findVoice()` method, which takes an arbitrary number of `VoicePredicate` arguments, working as follows:

1. It takes the first predicate, trying to apply it to every voice in the TTS system: if the predicate returns `true` for a voice, the entire process ends and such voice is returned.

1. Otherwise, the cycle starts again, applying the subsequent predicate to each voice, and so on.

1. Finally, if no predicate remains, the function returns `null`.

- **Please, note**: for more fine-grained interaction, you can call `getAllVoices()` instead.

- **API safety**: the `findVoice()` and `getAllVoices()` functions are designed to work even if the underlying browser implements no TTS system - by returning, respectively, `null` and an empty array.

### Creating a Speaker

Once you have chosen a voice, you can pass it to the `Speaker` constructor:

```typescript
const mandarinSpeaker = new Speaker(mandarinVoice);
```

You can later reuse the above instance as many times as needed.

### Reading text aloud

Finally, whenever you want to read text aloud, just call the `speak()` method of the `Speaker` instance - passing:

- the _text_ to read

- optional _parameters_

For example:

```typescript
mandarinSpeaker.speak("你好！我喜欢学习汉语！", {
  pitch: 1.7,

  rate: 1.1,

  onEnd() {
    //Called as soon as the reading has finished
  }
});
```

## See also

- [Web Speech API on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

- [Text-to-speech live demo, by MDN](https://mdn.github.io/dom-examples/web-speech-api/speak-easy-synthesis/)
