/**
 * Optional settings when reading text aloud.
 */
export type SpeechOptions = Readonly<{
  /**
   * The pitch, as described at: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/pitch.
   */
  pitch?: number;

  /**
   * The rate, as described at: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/rate.
   */
  rate?: number;

  /**
   * The volume, as described at: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/volume.
   */
  volume?: number;

  /**
   * Code to execute as soon as the reading ends.
   */
  onEnd?: () => void;
}>;
