import Button from "../forms/Button";
import Input from "../forms/Input";

interface SideGameFormProps {
    name: string;
    cost: number | "";
    save: (name: string, cost: number | "") => void;
    remove: () => void;
}

const SideGameForm = ({ name, cost, save, remove }: SideGameFormProps) => {
    return (
        <>
            <Input
                value={name}
                onChange={(e) => save(e.target.value, cost)}
                label="Name"
            />
            <Input
                value={cost.toString()}
                onChange={(e) => save(name, Number(e.target.value))}
                label="Cost"
            />
            <div className="mt-2">
                <Button
                    label="Remove"
                    onClick={remove}
                />
            </div>

        </>
    )
}

export default SideGameForm;