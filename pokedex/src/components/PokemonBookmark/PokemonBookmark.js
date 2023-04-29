import { BookmarkRemove } from "@mui/icons-material";
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";

function PokemonBookmark(props) {
    const { pokemons, setID, setBookmarks, setBookmarkPokemon } = props;

    if (pokemons.length === 0) {
        return (
            <Paper 
                variant="outlined" 
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
            >
                <Typography variant="h6">
                    No Bookmarks
                </Typography>
            </Paper>
        )
    }

    const clickHandler = (id) => {
        setBookmarks(bookmarks => bookmarks.filter((item) => item !== id));
        setBookmarkPokemon(pokemons => pokemons.filter((item) => item.id !== id));
    }

    return (
        <Paper 
            variant="outlined" 
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
        >
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    position: 'relative',
                    overflow: 'auto',
                    height: '32.5rem',
                    '& ul': { padding: 0 },
                }}
            >
                {pokemons.map((item, index) => (
                    <ListItem
                        key={index}
                        secondaryAction={
                            <IconButton color="error" onClick={() => clickHandler(item.id)}>
                                <BookmarkRemove />
                            </IconButton>
                        }
                        disablePadding
                    >
                        <ListItemButton onClick={() => setID(item.id)}>
                            <ListItemAvatar>
                                <Avatar
                                alt={item.name}
                                src={item.sprite}
                                />
                            </ListItemAvatar>
                            <ListItemText 
                                id={index} 
                                primary={item.name.charAt(0).toUpperCase() + item.name.slice(1)} 
                                secondary={"#" + "0".repeat(4 - (item.id).toString().length) + (item.id).toString()}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

export default PokemonBookmark;