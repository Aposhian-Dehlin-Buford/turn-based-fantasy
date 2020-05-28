import React, {useState, useEffect, useRef, useTimeout} from 'react';
import {seedMap} from './seedMap';
import './Map.css';
import NewTile from './Tile.js';

const Map = (props) => {
    const [viewIndex, setViewIndex] = useState([25, 25])
    const [selectIndex, setSelectIndex] = useState(0)
    const [columns, setColumns] = useState(50)
    const [rows, setRows] = useState(50)
    const [nodes, setNodes] = useState([])
    const [grid, setGrid] = useState(seedMap)
    const [displayGrid, setDisplayGrid] = useState([])

    useEffect(() => {
        console.log("seedMap", grid)
        
        let x1 = viewIndex[1]-6
        let x2 = viewIndex[1]+12
        let y1 = viewIndex[0]-6
        let y2 = viewIndex[0]+12
        let charView = []
        console.log('indexes', x1, x2, y1, y2)

        for(let i = y1; i < y2; i++){
            let viewRow = grid[i].slice(x1, x2-1)
            charView.push(viewRow)
        }
        console.log(charView)
        setDisplayGrid(charView)
    }, [viewIndex])

    const move = ({keyCode}) => {
        if(keyCode === 37 || keyCode === 65){
            setViewIndex([viewIndex[0], viewIndex[1]-1])
        }
        if(keyCode === 38 || keyCode === 87){
            setViewIndex([viewIndex[0]-1, viewIndex[1]])
        }
        if(keyCode === 39 || keyCode === 68){
            setViewIndex([viewIndex[0], viewIndex[1]+1])
        }
        if(keyCode === 40 || keyCode === 83){
            setViewIndex([viewIndex[0]+1, viewIndex[1]])
        }
    }

    console.log("displayGrid", displayGrid)
    console.log("grid", grid)

    return (
        <div className="wrapper" role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <div className="Map-container">
                {
                    displayGrid.map((e,i) => {
                        return e.map((f,j) => {
                            return <NewTile y={f.y} x={f.x} i={i} j={j} newName={i % 2 ? 'hexagon' : 'hexagon-odd'} terrain={f.terrain} />
                        })
                    })
                }
            </div>
        </div>
    )
}

export default Map;