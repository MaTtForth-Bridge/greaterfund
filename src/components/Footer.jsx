import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? theme.palette.black[200]
            : theme.palette.grey[300],
        color: (theme) => theme.palette.text.secondary,
        py: 8,
      }}
    >
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Connect with us
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Follow us on social media to stay up to date on our latest news and
          initiatives.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton
            color="inherit"
            aria-label="Facebook"
            href="https://www.facebook.com/GreaterFund"
            target="_blank"
            rel="noopener"
            sx={{ mr: 2 }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="Twitter"
            href="https://twitter.com/greaterfund"
            target="_blank"
            rel="noopener"
            sx={{ mr: 2 }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="Instagram"
            href="https://www.instagram.com/greaterfund/"
            target="_blank"
            rel="noopener"
            sx={{ mr: 2 }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="LinkedIn"
            href="https://www.linkedin.com/company/greaterfund/"
            target="_blank"
            rel="noopener"
          >
            <LinkedInIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 4 }}>
          © {new Date().getFullYear()} GreaterFund. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
