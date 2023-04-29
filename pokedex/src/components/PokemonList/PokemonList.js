import { Paper, Grid, Stack, CircularProgress } from '@mui/material';
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import PokemonListItem from './PokemonListItem';
import PageControl from './PageControl';

function PokemonList(props) {
    const { offset, loading, pokemons, prevUrl, nextUrl, setCurrentUrl, setID } = props;

    return (
        <Paper sx={{padding: 2, height: '130px', alignItems: 'center'}} variant="outlined">
            <Grid container spacing={2} sx={{alignItems: 'center', height: 'inherit'}} >
                <Grid item xs={1}>
                    <PageControl 
                        icon={<ChevronLeft/>}
                        label="previous"
                        disabled={prevUrl === null}
                        onClick={() => setCurrentUrl(prevUrl)}
                    />
                </Grid>
                <Grid item xs={10}>
                    <Stack direction="row" spacing={1} sx={{justifyContent: 'center', alignItems: 'center'}}>
                        {
                            loading ?
                            <CircularProgress />
                            :
                            pokemons.map((item, index) => (
                                <PokemonListItem
                                    key={index}
                                    pokemon={item}
                                    index={index}
                                    onClick={() => setID(offset + (index + 1))}
                                    id={offset + (index + 1)}
                                />
                            ))
                        }
                    </Stack>
                </Grid>
                <Grid item xs={1}>
                    <PageControl 
                        icon={<ChevronRight/>}
                        label="next"
                        disabled={nextUrl === null}
                        onClick={() => setCurrentUrl(nextUrl)}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}

export default PokemonList;