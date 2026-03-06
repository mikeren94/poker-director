interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
    return (
        <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={onClick}>
                {label}
        </button>
    )
}

export default Button;