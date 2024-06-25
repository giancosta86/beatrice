/**
 * Predicate describing a voice.
 */
export type VoicePredicate = (voice: SpeechSynthesisVoice) => boolean;

/**
 * Retrieves an array of all the available voices.
 *
 * The returned array is empty in case of missing TTS.
 */
export function getAllVoices(): readonly SpeechSynthesisVoice[] {
  const synth = window.speechSynthesis;

  if (!synth) {
    return [];
  }

  return synth.getVoices();
}

/**
 * Finds the most suitable voice.
 *
 * Given a sequence of voice-related predicates in decreasing priority order,
 * the function returns the first acceptable voice.
 *
 * Returns `null` if TTS is not available or if none of its voices is acceptable; otherwise, returns a voice instance.
 */
export function findVoice(
  ...predicates: readonly VoicePredicate[]
): SpeechSynthesisVoice | null {
  const voices = getAllVoices();

  for (const voicePredicate of predicates) {
    for (const voice of voices) {
      if (voicePredicate(voice)) {
        return voice;
      }
    }
  }

  return null;
}
