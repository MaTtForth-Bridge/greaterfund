import React, { useEffect } from "react";
import Twemoji from 'react-twemoji';

// UI imports
import { Stack } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

// [block-chain] smart-contract related imports..
import {
  getDeployedCampaigns,
  getCampaignsSummary,
} from "../../utils/getCampaigns";

// local imports..
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CampaignCard from "../components/CampaignCard";

// service imports..
import axios from "axios";

const api_url = "http://localhost:4000/api/";

function HomePage() {
  // for navigation..
  const navigate = useNavigate();

  // hooks..
  const [campaignsList, setCampaignsList] = React.useState([]);

  useEffect(() => {
    // console.log("useEffect called");
    let ignore = false;
    // fetch the campaigns..
    const fetchData = async () => {
      const deployedCampaignsList = await getDeployedCampaigns(); // call the function to fetch the data
      // console.log(deployedCampaignsList);
      setCampaignsList(await getCampaignsSummary(deployedCampaignsList));
      console.log("fetched campaigns");
      console.log(campaignsList);
    };

    // fetch the data..
    fetchData();
    return () => {
      ignore = true; // to avoid rendering multiple times..
    };
  }, []);

  return (
    <Box sx={{
      backgroundColor: "#fdfdfd",
      backgroundImage: "linear-gradient(to bottom right, #f0f0f0, #e3e3e3)",
      minHeight: "100vh",
    }}>
      <CssBaseline />
      <NavBar />
      <Container sx={{ mt: 8, mb: 2 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" align="center" fontFamily="'Montserrat'">
            Crowdfunding using the powers of Crypto & Blockchain
          </Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" align="center" gutterBottom fontFamily="'Montserrat'">
            Take part in active campaigns
          </Typography>
          <Typography variant="caption" align="center" gutterBottom fontFamily="'Montserrat'">
            Top {campaignsList.length} recent campaigns
          </Typography>
        </Box>
        {campaignsList.length == 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress color="success" />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {campaignsList.map((activeCampaign, idx) => (
              <Grid item key={idx} xs={12} sm={6} md={4}>
                <CampaignCard details={activeCampaign} />
              </Grid>
            ))}
          </Grid>
        )}
        <Box sx={{ mt: 4 }}>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Typography variant="caption" fontFamily="'Montserrat'">
              
            </Typography>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}


export default HomePage;
