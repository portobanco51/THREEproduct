import { proxy } from 'valtio'

const state = proxy({
    intro: true,
    color: '#6663E7',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './cube.svg',
    fullDecal: './cube.svg'
})

export default state;