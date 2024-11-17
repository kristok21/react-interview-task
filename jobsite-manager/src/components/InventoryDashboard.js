import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  List,
  ListItem,
} from "@mui/material";

function InventoryDashboard() {
  const location = useLocation();
  const { jobSite } = location.state || {};
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [rows, setRows] = useState([]);
  const [isGridVisible, setIsGridVisible] = useState(false);

  useEffect(() => {
    if (jobSite && jobSite.category) {
      setSelectedCategories(jobSite.category.split(", "));
    }
  }, [jobSite]);

  const initialRows = [
    {
      id: 1,
      item: "Scaffolding",
      quantity: 10,
      description: "Metal poles",
      notes: "Urgent",
    },
    {
      id: 2,
      item: "Plywood",
      quantity: 50,
      description: "Wooden sheets",
      notes: "",
    },
    {
      id: 3,
      item: "Nails",
      quantity: 200,
      description: "Steel nails",
      notes: "Extra large",
    },
  ];

  useEffect(() => {
    if (selectedCategory) {
      setRows(initialRows);
    }
  }, [selectedCategory]);

  const handleCellEdit = (params) => {
    const { id, field, value } = params;
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const columns = [
    { field: "id", headerName: "Nr", width: 50, editable: false },
    { field: "item", headerName: "Item", flex: 1, editable: true },
    { field: "quantity", headerName: "Quantity", width: 100, editable: true },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      editable: true,
    },
    { field: "notes", headerName: "Notes", flex: 1, editable: true },
  ];

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        gap: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 2, width: "20%", display: "flex", flexDirection: "column" }}
      >
        {jobSite ? (
          <>
            <Box
              sx={{
                p: 1,
                mb: 2,
              }}
            >
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
                        selectedCategory === category ? "primary" : "default"
                      }
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsGridVisible(true);
                      }}
                      sx={{ cursor: "pointer", width: "100%" }}
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

      <Box sx={{ width: "79%" }}>
        {isGridVisible ? (
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6">{`Details for "${selectedCategory}"`}</Typography>
              <FaTimes
                onClick={() => {
                  setIsGridVisible(false);
                  setSelectedCategory("");
                }}
                style={{ cursor: "pointer", color: "#888" }}
              />
            </Box>
            <DataGrid
              rows={rows}
              columns={columns}
              autoHeight
              disableSelectionOnClick
              onCellEditCommit={handleCellEdit}
              sx={{ backgroundColor: "#f9f9f9" }}
            />
          </Paper>
        ) : (
          <Box textAlign="center" p={3}>
            <img
              src="https://static.vecteezy.com/system/resources/previews/006/757/693/non_2x/empty-cardboard-box-opened-isolated-on-transparent-white-background-eps10-illustration-vector.jpg"
              alt="Empty Box"
              style={{ maxWidth: "200px", marginBottom: "16px" }}
            />
            <Typography variant="body1" fontWeight="bold">
              No Service Selected
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Please select a service on your left to proceed
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default InventoryDashboard;
