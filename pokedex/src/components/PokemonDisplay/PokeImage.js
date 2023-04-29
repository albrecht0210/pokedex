import { Chip, IconButton, Stack, Typography } from "@mui/material";
import { BookmarkAddOutlined, BookmarkRemove } from "@mui/icons-material";
import { blue, brown, cyan, 
    grey, indigo, lightBlue, 
    lightGreen, lime, orange, 
    pink, purple, red, yellow 
} from "@mui/material/colors";
import { getPokemonDetails } from "../../services/api";


function PokeImage(props) {
    const { image, name, types, id, setBookmarks, isBookmark, setIsBookmark, setBookmarkPokemon } = props;

    const typeChipSxStyle = {
        normal: {
            width: '7rem',
            backgroundColor: grey[600]
        },
        fighting: {
            width: '7rem',
            backgroundColor: orange[500]
        },
        flying: {
            width: '7rem',
            backgroundColor: lightBlue[500]
        },
        poison: {
            width: '7rem',
            backgroundColor: purple[400]
        },
        ground: {
            width: '7rem',
            backgroundColor: brown[500]
        },
        rock: {
            width: '7rem',
            backgroundColor: brown[900]
        },
        bug: {
            width: '7rem',
            backgroundColor: lime[900]
        },
        ghost: {
            width: '7rem',
            backgroundColor: purple[900]
        },
        steel: {
            width: '7rem',
            backgroundColor: grey[400]
        },
        fire: {
            width: '7rem',
            backgroundColor: red[500]
        },
        water: {
            width: '7rem',
            backgroundColor: blue[500]
        },
        grass: {
            width: '7rem',
            backgroundColor: lightGreen[500]
        },
        electric: {
            width: '7rem',
            backgroundColor: yellow[600]
        },
        psychic: {
            width: '7rem',
            backgroundColor: pink[500]
        },
        ice: {
            width: '7rem',
            backgroundColor: cyan[500]
        },
        dragon: {
            width: '7rem',
            backgroundColor: indigo[500]
        },
        dark: {
            width: '7rem',
            backgroundColor: grey[900]
        },
        fairy: {
            width: '7rem',
            backgroundColor: pink[300]
        }
    }

    const clickHandler = async () => {
        if (isBookmark) {
            setIsBookmark(!isBookmark);
            setBookmarks(bookmarks => bookmarks.filter((item) => item !== id));
            setBookmarkPokemon(pokemons => pokemons.filter((item) => item.id !== id));
        } else {
            const response = await getPokemonDetails(id);
            const pokemon = {
                id: response.id,
                name: response.name,
                sprite: response.sprite
            };
            setBookmarks(bookmarks => [...bookmarks, id]);
            setBookmarkPokemon(pokemons => [...pokemons, pokemon]);
            setIsBookmark(!isBookmark);
        }
    }

    return (
        <Stack 
            spacing={1} 
            sx={{ textAlign: 'center' }}
        >
            <img src={image} alt={name}></img>
            <Stack 
                direction="row" 
                spacing={3} 
                sx={{ justifyContent: 'center', alignItems: 'center' }}
            >
                <Typography 
                    variant="h6" 
                    gutterBottom sx={{ fontWeight:'bold', marginBottom:0 }}
                >
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <IconButton color={isBookmark ? "error" : "primary"} size="large" onClick={clickHandler}>
                    {isBookmark ? <BookmarkRemove /> : <BookmarkAddOutlined />}
                </IconButton>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ justifyContent: 'center' }}>
                {types.map((item, index) => (
                    <Chip 
                        key={index}
                        label={
                            <Typography variant="button" gutterBottom sx={{ fontSize:'12px' }}>
                                {item.type.name}
                            </Typography>
                        } 
                        sx={typeChipSxStyle[item.type.name]}
                        color="primary"
                    />
                ))}
            </Stack>
        </Stack>
    )
}

export default PokeImage;