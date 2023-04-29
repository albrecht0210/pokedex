import { Grid, Paper, Stack } from "@mui/material";
import PokeImage from "./PokeImage";
import PokeStat from "./PokeStat";
import PokeDetails from "./PokeDetail";

function PokemonDisplay(props) {
    const { pokemon, bookmarks, setBookmarks, isBookmark, setIsBookmark, setBookmarkPokemon } = props;

    if (pokemon === null) {
        return (
            <Paper variant="outlined" sx={{padding: 2}}></Paper>
        )
    }

    return (
        <Paper variant="outlined" sx={{padding: 2}}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <PokeImage 
                        image={pokemon.sprite}
                        name={pokemon.name}
                        types={pokemon.types}
                        id={pokemon.id}
                        bookmarks={bookmarks}
                        setBookmarks={setBookmarks}
                        isBookmark={isBookmark}
                        setIsBookmark={setIsBookmark}
                        setBookmarkPokemon={setBookmarkPokemon}
                    />
                </Grid>
                <Grid item xs={9}>
                    <Stack spacing={2}>
                        <PokeDetails
                            description={pokemon.description.replace('\f', ' ')}
                            height={pokemon.height}
                            weight={pokemon.weight}
                            abilities={pokemon.abilities}
                        />
                        <PokeStat 
                            stats={pokemon.stats}
                        />
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default PokemonDisplay;