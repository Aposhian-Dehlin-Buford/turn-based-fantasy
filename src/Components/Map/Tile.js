import React, {useState, useEffect, useRef} from 'react';

const NewTile = (props) => {
    const [isSelected, setIsSelected] = useState(false)


    const {x, y, i, j, newName, terrain} = props
    return (
        <button onClick={() => setIsSelected(!isSelected)} className={newName} style={{background: `${terrain}`}}>
            <span>x{x}-i{i}-j{j}-y{y}</span>
        </button>
    )
}

export default NewTile;