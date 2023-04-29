import { Card, CardContent, CardActionArea, Typography, Grow } from '@mui/material';

function PokemonListItem(props) {
    const { pokemon, index, id, onClick } = props; 
    return (
        <Grow in={true} timeout={800 * index}>
            <Card sx={{width: '300px'}}>
                <CardActionArea onClick={onClick}>
                    <CardContent sx={{textAlign: 'center', padding: 0, paddingBottom: '5px'}}>
                        <img 
                            alt={pokemon.name} 
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                            style={{ width: '80px' }}
                        />
                        <Typography variant="button" display="block">
                            {pokemon.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {"#" + "0".repeat(4 - (id).toString().length) + (id).toString()}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grow>
    )
}

export default PokemonListItem;