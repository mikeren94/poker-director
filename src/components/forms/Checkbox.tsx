interface CheckboxProps {
    value: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
}

const Checkbox = ({value, onChange, label}: CheckboxProps) => {
    return (
        <div className="flex items-center mb-4">
            <input 
                type="checkbox" 
                checked={value} 
                onChange={onChange}
                className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
            />
            <label className="select-none ms-2 text-sm font-medium text-heading">{label}</label>
        </div>
    )
}

export default Checkbox;