import React from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  Chip,
  Button,
} from "@mui/material";
import { MdArrowBack, MdCheckCircle } from "react-icons/md";

function CategoriesList({
  jobSite,
  selectedCategories,
  selectedCategory,
  setSelectedCategory,
  setIsGridVisible,
  navigate,
}) {
  return (
    <Paper
      elevation={3}
      sx={{ p: 2, width: "20%", display: "flex", flexDirection: "column" }}
    >
      {jobSite ? (
        <>
          <Box sx={{ p: 1, mb: 2 }}>
            <Typography variant="h5">{jobSite.name}</Typography>
          </Box>
          <List sx={{ padding: 0 }}>
            {selectedCategories.length === 0 ? (
              <Typography variant="body1" color="textSecondary">
                No category selected. Please select a service on your left to
                proceed.
              </Typography>
            ) : (
              selectedCategories.map((category) => (
                <ListItem key={category} sx={{ padding: 0, marginBottom: 1 }}>
                  <Chip
                    label={category}
                    color={
                      selectedCategory === category ? "success" : "default"
                    }
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsGridVisible(true);
                    }}
                    sx={{
                      cursor: "pointer",
                      width: "100%",
                      justifyContent: "center",
                    }}
                    deleteIcon={
                      selectedCategory === category ? <MdCheckCircle /> : null
                    }
                    />
                </ListItem>
              ))
            )}
          </List>
        </>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No job site selected
        </Typography>
      )}
      <Box
        sx={{
          mt: "auto",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          startIcon={<MdArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2, width: "auto" }}
        >
          Go Back
        </Button>
      </Box>
    </Paper>
  );
}

export default CategoriesList;
