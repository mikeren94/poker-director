interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    label?: string;
}

const Input = ({ value, onChange, placeholder, type = "text", label }: InputProps) => {
    return (
        <>
            {label && (
                <label>{label}</label>
            )}
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </>
    );
};

export default Input;