import { useNavigate } from 'react-router-dom'
import styled from "styled-components"
import { useAppSelector } from '../../app/hooks'

const PokemonCardName = styled.div`
  border:2px solid gray;
  padding:0.7rem;
  cursor: pointer;
  margin: 1rem;
  transition:var(--transition);
  width: 380px;
  &:hover{
    background:gray;
    color:white;
  }
`

const PokemonCard = ({item}:any) => {
    const navigate=useNavigate()
    const {results,offset}=useAppSelector(state=>state.pokemons)
    // console.log(results);
    const id=(results.indexOf(item)+1+offset)

    return (

        <PokemonCardName onClick={()=>navigate(`/pokemon-detail/${id}`)}>
            {item.name}
        </PokemonCardName>

    )
}

export default PokemonCard