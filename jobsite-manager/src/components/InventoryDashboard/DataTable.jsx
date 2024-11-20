import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FaTimes } from "react-icons/fa";

function DataTable({
  rows,
  selectedCategory,
  setIsGridVisible,
  setSelectedCategory,
  handleCellDoubleClick,
}) {
  const columns = [
    { field: "id", headerName: "Nr.", width: 90 },
    { field: "item", headerName: "Item", width: 100 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "notes", headerName: "Notes", flex: 1 },
  ];

  return (
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
        disableSelectionOnClick
        onCellDoubleClick={handleCellDoubleClick}
        sx={{ backgroundColor: "#f9f9f9" }}
      />
    </Paper>
  );
}

export default DataTable;
