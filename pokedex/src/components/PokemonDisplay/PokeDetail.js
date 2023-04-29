import { Grid, Paper, Stack, Typography } from "@mui/material";

function PokeDetails(props) {
    const { description, height, weight, abilities } = props;

    
    return (
        <Paper sx={{padding: 1.5}}>
            <Typography 
                variant="body1" 
                gutterBottom 
                sx={{textAlign: 'justify'}}
            >
                {description}
            </Typography> 
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <Typography 
                            variant="button" 
                            gutterBottom 
                        >
                            Height: {height}
                        </Typography>
                        <Typography 
                            variant="button" 
                            gutterBottom 
                        >
                            Weight: {weight}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                <Stack spacing={0}>
                        <Typography 
                            variant="button" 
                            gutterBottom 
                            sx={{marginBottom: 0}}
                        >
                            Abilities:
                        </Typography>
                        {abilities
                            .filter((item, index) => !item.is_hidden)
                            .map((item, index) => (
                                <Typography 
                                    key={index}
                                    variant="button" 
                                    gutterBottom 
                                    sx={{marginBottom: 0}}
                                >
                                    {item.ability.name}
                                </Typography>
                            ))
                        }
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default PokeDetails;