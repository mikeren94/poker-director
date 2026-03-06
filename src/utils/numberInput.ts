export function handleNumberChange(
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: number | "") => void
) {
    const val = e.target.value;

    // Allow clearing the input
    if (val === "") {
        setter("");
        return;
    }

    // Reject non-numeric input
    if (!/^\d+$/.test(val)) {
        return;
    }

    // Convert to number
    setter(Number(val));
}