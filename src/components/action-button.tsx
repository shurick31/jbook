interface ActonButtonProps {
    onClick(): void;
    className: 'fa-arrow-up'|'fa-arrow-down'|'fa-times';
}

const ActionButton: React.FC<ActonButtonProps> = ({onClick, className}) => {
        return (
        <button
            onClick={onClick}
            className='button is-primary is-small'
            >
            <span className='icon'>
                <i className={`fas ${className}`} />
            </span>
        </button>)
}

export default ActionButton