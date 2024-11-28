import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

function UpNextCard({ card }) {
  return (
    <Card
      sx={{
        display: "flex",
        p: "0.5vw",
        mt: "2vh",
        mb: "8vh",
        borderRadius: "15px",
        background:
          "linear-gradient(to top, var(--mui-palette-neutral-700), var(--mui-palette-neutral-600))",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 2,
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "100%", height: "auto", borderRadius: "10px" }}
          image={card.image}
        />
        <Typography
          component="p"
          sx={{
            pl: "0.5vw",
            pt: "0.5vh",
          }}
        >
          Up Next
        </Typography>
      </Box>
      <CardContent
        sx={{
          flex: 3,
          display: "flex",
          flexDirection: "column",
          padding: 2,
        }}
      >
        <Typography
          component="p"
          sx={{
            pl: "0.5vw",
            pt: "0.5vh",
          }}
        >
          {card.text}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UpNextCard;
