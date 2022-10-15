import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BASE_URL } from '../constants/api'
import { IPayloadProps, IPokemon, IState } from '../types/interfaces'

const initialState: IState = {
    loading: false,
    error: '',
    count: 1154,
    results: [],
    pokemon: <IPokemon>{},
    offset: 0
}

export const getPokemons = createAsyncThunk(
    'pokemons/getPokemons',
    async (offset: number) => {
        return fetch(`${BASE_URL}?offset=${offset}&limit=10`).then((res) => {
            return res.json()
        })
    }
)
export const getSinglePokemon = createAsyncThunk(
    'pokemons/getSinglePokemon',
    async ({ id }: IPokemon) => {
        return fetch(`${BASE_URL}/${id}`).then((res) => {
            return res.json()
        })
    }
)

const pokemonSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        next: (state, action: PayloadAction<any>) => {
            let pokemonLength = state.count
            console.log('pokemon lenght', pokemonLength)
            let limit = 10
            let lastPage = Math.ceil(pokemonLength / limit)
            console.log('last', lastPage)
            let newOffset = action.payload
            // if (newOffset < lastPage) {
            state.offset = newOffset + 10
            // }

            console.log('next', newOffset)
        },
        previous: (state, action: PayloadAction<any>) => {
            let newPrevOffset = action.payload

            if (action.payload > 0) {
                state.offset = newPrevOffset - 10
            }
            console.log(action.payload)
        }
    },
    extraReducers(builder: any) {
        builder.addCase(getPokemons.pending, (state: IState) => {
            state.loading = true
        })
        builder.addCase(
            getPokemons.fulfilled,
            (state: IState, action: PayloadAction<IPayloadProps>) => {
                state.loading = false
                state.results = action.payload.results
            }
        )
        builder.addCase(getPokemons.rejected, (state: IState) => {
            state.loading = false
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            state.error = 'An Error Occured'
        })
        builder.addCase(getSinglePokemon.pending, (state: IState) => {
            state.loading = true
        })
        builder.addCase(
            getSinglePokemon.fulfilled,
            (state: IState, action: PayloadAction<any>) => {
                state.loading = false
                state.pokemon = action.payload
            }
        )
        builder.addCase(getSinglePokemon.rejected, (state: IState) => {
            state.loading = false
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            state.error = 'An Error Occured'
        })
    }
})

export const { next, previous } = pokemonSlice.actions
export default pokemonSlice.reducer
