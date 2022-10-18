import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToFavourites, getSinglePokemon } from "../features/pokemonSlice";
import styled from "styled-components";
import { FaStar,FaRegStar } from "react-icons/fa";

const SinglePokemonContainer = styled.div`
  max-width: 30rem;
  margin: 5rem auto;
`;
const ImgContainer = styled.div`
  width: 16rem;
  margin: auto;
`;
const PokemonName = styled.h1`
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
  padding: 0.7rem 0;
`;
const PokemonMoves = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
  font-size: 1rem;
  padding: 0.7rem 0;
`;
const PokemonHeader = styled.h2`
  text-transform: uppercase;
  text-decoration: underline;
  color: #444;
`;
const PokemonMove = styled.p`
  text-transform: uppercase;
  color: #687980;
`;
const BackButton = styled.button`
  text-transform: uppercase;
  color: #02475e;
  padding: 0.3rem 1rem;
  background-color: transparent;
  border: 1px solid;
  border-radius: var(--radius);
  cursor: pointer;
  transition: var(--transition);
  &:hover{
    background-color: #02475e;
    color: white;
  }
  `

const FavButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
  font-size: 1.5rem;
`;
const ButtonContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`;
const Star = styled.span`
border: none;
background-color: transparent;
color:orangered;
  cursor: pointer;
  font-size: 1.5rem;
`;

const PokemonDetail = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { pokemon, loading,favourites } = useAppSelector((state) => state.pokemons);
    const navigate=useNavigate()

    const { name, sprites, moves } = pokemon;

    useEffect(() => {
        dispatch(getSinglePokemon({ id }));
    }, []);

    if (loading) {
        <h1>LOADING...</h1>;
    }
    return (
        <SinglePokemonContainer>
            <ButtonContainer>
                <BackButton
                    onClick={()=>navigate(-1)}
                >Go Back</BackButton>
                <FavButton
                    onClick={()=>dispatch((addToFavourites(id)))}
                >
                    {
                        favourites.some((item:any)=>item.id==id) ? (
                            <Star> <FaStar/></Star>

                        ):(

                            <FaRegStar/>
                        )
                    }
                </FavButton>
            </ButtonContainer>

            <ImgContainer>
                <img src={sprites?.other.home.front_default} alt={name} />
            </ImgContainer>
            <PokemonName>{name}</PokemonName>
            <PokemonMoves>
                <PokemonHeader>moves</PokemonHeader>
                {moves?.slice(0, 5).map((item: any, index) => {
                    return <PokemonMove key={index}>{item.move.name}</PokemonMove>;
                })}
            </PokemonMoves>
        </SinglePokemonContainer>
    );
};

export default PokemonDetail;