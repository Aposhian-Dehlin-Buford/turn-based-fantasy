export const seedMap = () => {
    const terrain = ['radial-gradient(orange, orangered)', 'radial-gradient(green, darkgreen)', 'radial-gradient(blue, darkblue)', 'radial-gradient(silver, grey)', 'radial-gradient(tan, khaki)', 'radial-gradient(purple, rebeccapurple)', 'radial-gradient(#999900, gold)']
        return [...Array(50)].map((e,ind) => [...Array(50)].map((f,jnd) => {
            return {
                x: jnd,
                y: ind,
                terrain: terrain[Math.floor(Math.random() * terrain.length)]
            }
        }))
    }