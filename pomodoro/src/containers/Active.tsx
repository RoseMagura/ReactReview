import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../store";
import { toggleActive } from '../actions/active';

const selectActive = (state: RootState) => state.active;

const Active = () => {
    const { activeType } = useSelector(selectActive);
    return(
        <div>
            <h2>{activeType}</h2>
            <h2>Active Timer Here</h2>
            <button id='start_stop'>Play / Pause</button>
            <button id='reset'>Reset</button>
        </div>
    )
}
export default Active;