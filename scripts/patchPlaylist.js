import { particleWeather } from "./weatherfx.js"
import { MODULE } from "./const.js";

export async function firstTime(isFirstTime) {
    if (isFirstTime) {
        // await game.settings.set(MODULE, 'firstTime1.2.0', false);
        let src = canvas.scene.getFlag("weatherfx", "audio");
        Hooks.call(particleWeather, []);
        FXMASTER.filters.setFilters([]);
        if (canvas.scene.getFlag("weatherfx", "active"))
            for (let [key, sound] of game.audio.playing) {
                if (sound.src !== src) continue;
                sound.stop();
            }
        await canvas.scene.unsetFlag("weatherfx", "audio");
        await canvas.scene.unsetFlag("weatherfx", "active");
    }
    await weatherfxPlaylistExists();
    firstTimeDialog();
}

function firstTimeDialog() {
    new Dialog({
        title: "Version 1.2.0",
        content: "<p>Weather FX v1.2.0 now uses built in playlist API, it now uses a playlist called 'Weather FX Playlist' with all the SFX you had configured before. This is better because you now have more options like set volume and fade in/out duration. Please never change the playlist name nor the songs names, although you can change the sound path to whichever you prefer.</p><br><p>The weather effects that were playing in this scene got removed because of this change. You can reapply it by clicking the 'OK' button</p>",
        buttons: {
            yes: {
                icon: "<i class='fas fa-check'></i>",
                label: "OK",
                callback: async () => {
                    if (game.settings.get("weatherfx", "currentWeather") == '')
                        await getPrecipitation();
                    if (isChatOutputOn()) {
                        let currentWeather = game.settings.get("weatherfx", "currentWeather")
                        checkWeather(currentWeather)
                        // weatherTrigger(currentWeather);
                    }
                    else noChatOutputDialog()
                }
            }
        },
        default: "yes",
    }).render(true);
}