import { useEffect, useState } from "react";
import Input from "../forms/Input";
import Player from "../../classes/Player";
interface PlayerFormProps {
    player: Player;
    save: (player: Player) => void;
}

const PlayerForm = ({ player, save }: PlayerFormProps) => {
    const [updatingPlayer, setUpdatingPlayer] = useState<Player>(player);
    const handleNameChange = (name: string) => {
        const updated = { ...updatingPlayer, name };
        setUpdatingPlayer(updated);
        save(updated);
    };
    useEffect(() => {
        setUpdatingPlayer(player);
    }, [player]);
    if (!updatingPlayer) return;
    return (
        <>
            <Input
                value={updatingPlayer.name}
                onChange={(e) => handleNameChange(e.target.value)}
                label="Name"
            />
        </>
    )
}

export default PlayerForm;