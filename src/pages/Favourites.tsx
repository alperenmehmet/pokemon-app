import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { addToFavourites } from "../features/pokemonSlice";


const FavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
`;

const FavCardContainer = styled.div`
  width: 300px;
  position: relative;
`;
const FavHeader = styled.h1`
  text-transform: uppercase;
  text-align: center;
  padding: 0.2rem;
  border-width: 0 1px 1px 1px;
  border-style: solid;
`;
const FavImg = styled.img`
  width: 100%;
  height: 250px;
  border: 1px solid;
  border-top: 0;
  padding: 0.5rem;
`;
const FavsButton = styled.button`
  background-color: transparent;
  width: 300px;
  border: 1px solid;
  border-bottom: 0;
  border-color: black;
  font-size: 1.5rem;
  color: orangered;
  text-align: end;
  padding:0 5px;
  cursor: pointer;
`;
const BackButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 2rem;
  border: none;
  background-color: transparent;
  font-size: 3rem;
  color: #003cff;
  cursor: pointer;
  @media (min-width: 600px) {
    left: 5rem;
  }
  `
const NoFavHeader = styled.h1`
margin-top: 2rem;
text-align: center;
`

const Favourites = () => {
    const navigate = useNavigate();
    const dispatch=useAppDispatch()
    const { favourites, loading } = useAppSelector((state) => state.pokemons);
    console.log(favourites);

    if (loading) {
        <h1>LOADING..</h1>;
    }

    return (
        <FavContainer>
            <BackButton onClick={() => navigate("/")}>
                <TiArrowBack />
            </BackButton>
            {
                favourites.length==0 ? (
                    <NoFavHeader>No Favourite Item To Show</NoFavHeader>
                ):(
                    favourites.map((item: any) => {
                        const {id,sprites,name}=item;
                        return (
                            <FavCardContainer key={id}>
                                <FavsButton
                                    onClick={()=>dispatch((addToFavourites(id)))}
                                >
                                    <FaStar/>
                                </FavsButton>
                                <FavCardContainer>
                                    <FavImg
                                        src={sprites?.other.home.front_default}
                                        alt={name}
                                    />
                                </FavCardContainer>
                                <FavHeader>{name}</FavHeader>
                            </FavCardContainer>
                        );
                    })
                )
            }

        </FavContainer>
    );
};

export default Favourites;