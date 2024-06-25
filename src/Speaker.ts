import { SpeechOptions } from "./SpeechOptions";

/**
 * Abstraction over the browser's TTS engine.
 *
 * It only requires a voice - which can be retrieved, for example,
 * via `findVoice()` or `getAllVoices()`.
 *
 * Once instantiated, you can keep it, calling its `speak()` method
 * when necessary.
 */
export class Speaker {
  constructor(readonly voice: SpeechSynthesisVoice) {}

  /**
   * Reads some text aloud - with the given optional parameters.
   */
  speak(text: string, options?: SpeechOptions): void {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.voice = this.voice;

    if (options?.pitch !== undefined) {
      utterance.pitch = options.pitch;
    }

    if (options?.rate !== undefined) {
      utterance.rate = options.rate;
    }

    if (options?.volume !== undefined) {
      utterance.volume = options.volume;
    }

    if (options?.onEnd) {
      utterance.onend = options.onEnd;
    }

    window.speechSynthesis.speak(utterance);
  }
}
