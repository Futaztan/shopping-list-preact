import { useTheme } from "../../hooks/useTheme";

type TopMenuIconsProps = {

    toggleMute: () => void;
    downloadShoppingList: () => void;
    uploadShoppingList: (e: any) => void;
    isMuted: boolean;

}
/**
 * Az oldal tetején található ikonok
 *
 * @param toggleMute - muteolás on/off függvény
 * @param downloadShoppingList - bevásárló lista elemeinek letöltése jsonba
 * @param uploadShoppingList - bevásárló lista elemeinek feltöltése jsonból
 * @param isMuted - némítva van e az oldal
 * @returns Felső rész ikonjainak html kódja
 */
export function TopMenuIcons({ toggleMute, downloadShoppingList, uploadShoppingList, isMuted }: TopMenuIconsProps) {

    const { isDarkMode, toggleTheme } = useTheme()

    return (

        <div>
            <input
                type="file"
                accept=".json"
                id="file-upload-input"
                style={{ display: "none" }}
                onChange={uploadShoppingList}
            />
            <img onClick={toggleTheme} src={isDarkMode ? "/icons/day-mode.png" : "/icons/dark-mode.png"} width="30px" height="30px" />
            <img onClick={downloadShoppingList} src={isDarkMode ? "/icons/download-white.png" : "/icons/download.png"} width="30px" height="30px" />
            <img onClick={() => document.getElementById('file-upload-input').click()} src={isDarkMode ? "/icons/upload-white.png" : "/icons/upload.png"} width="30px" height="30px" />
            <img onClick={toggleMute} src={isMuted ? "/icons/mute.png" : isDarkMode ? "icons/volume-white.png" : "icons/volume.png"} width="30px" height="30px" />

        </div>
    )
}