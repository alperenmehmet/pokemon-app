import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL} from "../constants/api";
import { IPayloadProps, IPokemon, IState } from "../types/interfaces";


const initialState:IState={
    loading:false,
    error:"",
    count: 1154,
    results: [],
    pokemon:<IPokemon>{},
    offset:0,
    favourites:[]
}
if (localStorage.getItem("favourites")) {
    initialState.favourites = [...JSON.parse(localStorage.getItem("favourites")  || "")];
} else {
    initialState.favourites = [];
}

export const getPokemons = createAsyncThunk(
    "pokemons/getPokemons",async({offset}:any)=>{
        return fetch(`${BASE_URL}?offset=${offset}&limit=10`)
            .then(res=>{
                return res.json()
            })
    }
)
export const getSinglePokemon = createAsyncThunk(
    "pokemons/getSinglePokemon",async({id}:IPokemon)=>{
        return fetch(`${BASE_URL}/${id}`)
            .then(res=>{
                return res.json()
            })
    }
)


const pokemonSlice=createSlice({
    name:"pokemons",
    initialState,
    reducers:{

        next:(state,action : PayloadAction<any>)=>{
            if(state.offset<state.count){
                state.offset+=10

            }
            console.log("next",state.offset)
        },
        previous:(state,action : PayloadAction<any>)=>{
            if(state.offset>0){
                state.offset-=10
            }
        },
        addToFavourites:(state,action : PayloadAction<any>)=>{
            if(state.favourites.some((item:any)=>item.id==action.payload)){
                state.favourites=state.favourites.filter((item:any)=>item.id!=action.payload)
            }else{
                state.favourites.push(state.pokemon)
            }
            localStorage.setItem("favourites",JSON.stringify(state.favourites))
        }
    },
    extraReducers(builder:any){
        builder.addCase(getPokemons.pending, (state: IState) => {
            state.loading = true;
        })
        builder.addCase(getPokemons.fulfilled,(state:IState,action:PayloadAction<IPayloadProps>)=>{
            state.loading=false;
            state.results=(action.payload.results)
        })
        builder.addCase(getPokemons.rejected,(state:IState)=>{
            state.loading=false;
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            state.error="An Error Occured"
        })
        builder.addCase(getSinglePokemon.pending, (state: IState) => {
            state.loading = true;
        })
        builder.addCase(getSinglePokemon.fulfilled,(state:IState,action:PayloadAction<any>)=>{
            state.loading=false;
            state.pokemon=action.payload
        })
        builder.addCase(getSinglePokemon.rejected,(state:IState)=>{
            state.loading=false;
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            state.error="An Error Occured"
        })
    }
})

export const {next,previous,addToFavourites}=pokemonSlice.actions
export default pokemonSlice.reducer