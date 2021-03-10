import { useActions } from '../hooks/use-actions';
import ActionButton from './action-button';

interface ActionBarProps {
    id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
    const { moveCell, deleteCell } = useActions();
    return (<div>
        <ActionButton
            onClick={() => moveCell(id, 'up')}
            className='fa-arrow-up' />
        <ActionButton
            onClick={() => moveCell(id, 'down')}
            className='fa-arrow-down' />
        <ActionButton
            onClick={() => deleteCell(id)}
            className='fa-times' />
    </div>)
}

export default ActionBar;