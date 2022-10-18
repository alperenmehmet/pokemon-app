import {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getPokemons,next,previous } from '../../features/pokemonSlice'
import { IPokemonCard } from '../../types/interfaces'
import styled from "styled-components"
import PokemonCard from '../PokemonCard/PokemonCard'

const PokemonsContainer = styled.div`
  /* display:grid;
  grid-template-columns: repeat(auto-fill,minmax(400px,2fr)); */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  text-transform: capitalize;
  text-align: center;
  margin-top:1rem;
`

const ButtonContainer = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 gap: 2rem;
 padding: 0.5rem 0;
`
const Button = styled.button`
background-color: lightblue;
padding: 0.3rem;
width: 10rem;
font-size: 1.5rem;
cursor: pointer;
transition: var(--transition);
&:hover{
  background-color: #6187f0;
  color:white;
}
`

const Pokemons = () => {
    const {results,offset,loading,count}=useAppSelector(state=>state.pokemons)
    const dispatch=useAppDispatch()

    useEffect(() => {
        dispatch(getPokemons({offset}))
    }, [offset])

    if(loading){
        <h1>LOADING...</h1>
    }

    return (
        <>
            <PokemonsContainer>
                {
                    results.map((item:IPokemonCard,index:number)=>{
                        return(
                            <PokemonCard key={index} item={item}/>
                        )
                    })
                }
            </PokemonsContainer>
            <ButtonContainer>
                <Button onClick={()=>dispatch(previous(offset))} disabled={!Boolean(offset)}>Previous</Button>
                <Button onClick={()=>dispatch(next(offset))} disabled={Boolean(offset==(count-count%10))} >Next</Button>
            </ButtonContainer>
        </>

    )
}

export default Pokemons