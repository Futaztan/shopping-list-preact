import { useState } from "preact/hooks";

export enum SoundType {
    ADD = 'add.mp3',
    DELETE = 'delete.mp3',
}

export function useSounds() {
    const [isMuted, setIsMuted] = useState(false);

    function toggleMute() {
        setIsMuted(!isMuted);
    }

    function playSound(soundFile: SoundType) {

        if (isMuted) return;

        try {
            const audio = new Audio(`/sounds/${soundFile}`);
            audio.play()
        }
        catch (e) {
            console.error("Audio hiba:", e);
        }
    }

    return { playSound, toggleMute, isMuted }
}
