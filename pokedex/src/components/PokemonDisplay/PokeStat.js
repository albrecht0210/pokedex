import { Grid, Paper, Stack, Typography } from "@mui/material";

function PokeStat(props) {
    const { stats } = props;
    return (
        <Paper sx={{padding: 1.5}}>
            <Typography 
                variant="body1" 
                gutterBottom 
            >
                Stats
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        {stats
                            .filter((item, index) => index < 3)
                            .map((item, index) => (
                                <Typography 
                                    key={index} 
                                    variant="button" 
                                    gutterBottom 
                                    sx={{marginBottom: 0}}
                                >
                                    {item.stat.name}: {item.base_stat}
                                </Typography>
                            ))
                        }
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        {stats
                            .filter((item, index) => index >= 3)
                            .map((item, index) => (
                                <Typography 
                                    key={index} 
                                    variant="button" 
                                    gutterBottom 
                                    sx={{marginBottom: 0}}
                                >
                                    {item.stat.name}: {item.base_stat}
                                </Typography>
                            ))
                        }
                    </Stack>
                </Grid>
            </Grid>
            <Stack direction="row">
            </Stack>
        </Paper>
    );
}

export default PokeStat;