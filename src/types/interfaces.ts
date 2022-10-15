export interface IState extends IPayloadProps{
    loading:boolean,
    error:string,
    pokemon:IPokemon
    offset:number
}

export interface IPokemonCard{
    name:string,
    url:string,
}

export interface IPayloadProps{
    count: number
    results: IPokemonCard[]
}
export interface IPokemon{
    name?:string
    id?:string
    moves?:string[] //moves.slice(1).map(item)=>item.move
    sprites?:Sprites
}
export interface Sprites {
    back_default?: string;
    back_female?: any;
    back_shiny?: string;
    back_shiny_female?: any;
    front_default?: string;
    front_female?: any;
    front_shiny?: string;
    front_shiny_female?: any;
}

