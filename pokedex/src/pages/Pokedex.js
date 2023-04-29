import { Box, Grid, Stack } from '@mui/material';
import { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList/PokemonList";
import { getPokemonDetails, getPokemons } from '../services/api';
import PokemonDisplay from '../components/PokemonDisplay/PokemonDisplay';
import PokemonBookmark from '../components/PokemonBookmark/PokemonBookmark';

function Pokedex() {
    const [offset, setOffset] = useState(Math.floor(Math.random() * 200) * 5);
    const [prevOffset, setPrevOffset] = useState(null);
    const [nextOffset, setNextOffset] = useState(null);
    const [isListLoading, setIsListLoading] = useState(null);
    const [errorList, setErrorList] = useState(null);
    const [pokemonList, setPokemonList] = useState([]);
    
    const [currentID, setCurrentID] = useState(offset + 1);
    const [isDetailLoading, setDetailLoading] = useState(null);
    const [errorDetail, setErrorDetail] = useState(null);
    const [pokemon, setPokemon] = useState(null);
    
    const [isBookmark, setIsBookmark] = useState(null);
    const [bookmarkID, setBookmarkID] = useState(JSON.parse(localStorage.getItem('bookmarks')) || []);
    const [bookmarkPokemon, setBookmarkPokemon] = useState([]);
    
    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                setIsListLoading(true);
                const response = await getPokemons(offset);
                setPokemonList(response.data.results);
                if (response.data.previous !== null)
                    setPrevOffset(offset - 5);
                else
                    setPrevOffset(null);

                if (response.data.next !== null)
                    setNextOffset(offset + 5);
                else
                    setNextOffset(null);
            } catch (error) {
                setErrorList(error.message);
            } finally {
                setIsListLoading(false);
            }
        }

        fetchPokemons();
    }, [offset]);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setDetailLoading(true);
                const response = await getPokemonDetails(currentID);
                setPokemon(response);
            } catch (error) {
                setErrorDetail(error.message);
            } finally {
                setDetailLoading(false);
                if (bookmarkID.indexOf(currentID) > -1) {
                    setIsBookmark(true);
                } else {
                    setIsBookmark(false);
                }
            }
        }

        fetchPokemon();
    }, [currentID]);

    useEffect(() => {
        const pokemons = [];
        localStorage.setItem('bookmarks', JSON.stringify([]));

        bookmarkID.forEach(async (item) => {
            const response = await getPokemonDetails(item);
            pokemons.push({
                id: response.id,
                name: response.name,
                sprite: response.sprite
            })
        })
        setBookmarkPokemon(pokemons);
    }, [])

    useEffect(() => {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkID));
        if (bookmarkID.indexOf(currentID) > -1) {
            setIsBookmark(true);
        } else {
            setIsBookmark(false);
        }
    }, [bookmarkID])

    const boxStyle = {
        padding: 5
    }

    if (errorList !== null) {
        return (
            <Box sx={boxStyle}>
                <h1>{errorList}</h1>
            </Box>
        )
    } 

    return (
        <Box sx={boxStyle}>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <Stack spacing={5}>
                        <PokemonDisplay 
                            pokemon={pokemon}
                            loading={isDetailLoading}
                            currentID={currentID}
                            setID={setCurrentID}
                            bookmarks={bookmarkID}
                            setBookmarks={setBookmarkID}
                            isBookmark={isBookmark}
                            setIsBookmark={setIsBookmark}
                            setBookmarkPokemon={setBookmarkPokemon}
                        />
                        <PokemonList 
                            offset={offset}
                            loading={isListLoading}
                            pokemons={pokemonList}
                            prevUrl={prevOffset}
                            nextUrl={nextOffset}
                            setCurrentUrl={setOffset}
                            setID={setCurrentID}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={3}>
                    <PokemonBookmark
                        pokemons={bookmarkPokemon}
                        setID={setCurrentID}
                        setBookmarks={setBookmarkID}
                        setBookmarkPokemon={setBookmarkPokemon}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Pokedex;