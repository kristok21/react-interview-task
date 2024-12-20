import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Modal,
  Autocomplete,
  TextField,
} from "@mui/material";
import CategoriesList from "./CategoriesList";
import DataTable from "./DataTable";
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

function InventoryDashboard() {
  const location = useLocation();
  const { jobSite } = location.state || {};
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [rows, setRows] = useState([]);
  const [isGridVisible, setIsGridVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    item: "",
    quantity: "",
    description: "",
    notes: "",
  });

  useEffect(() => {
    if (jobSite && jobSite.category) {
      setSelectedCategories(jobSite.category.split(", "));
    }
  }, [jobSite]);

  useEffect(() => {
    if (selectedCategory) {
      fetch("http://localhost:5000/items")
        .then((response) => response.json())
        .then((data) => {
          const filteredData = data.filter(
            (item) => item.category === selectedCategory
          );
          setRows(filteredData);
        })
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      setRows([]);
    }
  }, [selectedCategory]);

  const handleCellDoubleClick = (params) => {
    const rowData = params.row;
    setFormData({
      id: rowData.id,
      item: rowData.item,
      quantity: rowData.quantity,
      description: rowData.description,
      notes: rowData.notes,
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleModalOpen = () => {
    setFormData({
      id: null,
      item: "",
      quantity: "",
      description: "",
      notes: "",
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEditing(false);
  };

   const handleSaveChanges = () => {
     if (!formData.item || !formData.quantity || !formData.description) {
       console.error("Error: All fields are required.");
       alert("Please fill out all fields before saving.");
       return;
     }

     const itemData = {
       ...formData,
       category: selectedCategory,
     };

     if (!formData.id) {
       const newId =
         rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
       const newItem = { ...itemData, id: newId };

       fetch("http://localhost:5000/items", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(newItem),
       })
         .then((response) => {
           if (!response.ok) {
             throw new Error("Failed to create new item on the server.");
           }
           return response.json();
         })
         .then((createdItem) => {
           setRows((prevRows) => [...prevRows, createdItem]);
           console.log("New item created:", createdItem);
         })
         .catch((error) => {
           console.error("Error creating item:", error);
         });
     } else {
       const updatedRows = rows.map((row) =>
         row.id === formData.id
           ? {
               ...row,
               item: formData.item,
               quantity: formData.quantity,
               description: formData.description,
               notes: formData.notes,
               category: selectedCategory,
             }
           : row
       );

       setRows(updatedRows);

       fetch(`http://localhost:5000/items/${formData.id}`, {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           item: formData.item,
           quantity: formData.quantity,
           description: formData.description,
           notes: formData.notes,
           category: selectedCategory,
         }),
       })
         .then((response) => {
           if (!response.ok) {
             throw new Error("Failed to update item on the server.");
           }
           return response.json();
         })
         .then(() => {
           console.log("Item updated in db.json");
         })
         .catch((error) => {
           console.error("Error saving item:", error);
         });
     }

     setIsModalOpen(false);
   };

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
      <CategoriesList
        jobSite={jobSite}
        selectedCategories={selectedCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setIsGridVisible={setIsGridVisible}
        navigate={navigate}
      />

      <Box sx={{ width: "79%" }}>
        {selectedCategory && (
          <Button
            variant="contained"
            sx={{
              mb: 2,
              backgroundColor: "green",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
            }}
            onClick={handleModalOpen}
          >
            Create
          </Button>
        )}
        {isGridVisible ? (
          <DataTable
            rows={rows}
            selectedCategory={selectedCategory}
            setIsGridVisible={setIsGridVisible}
            setSelectedCategory={setSelectedCategory}
            handleCellDoubleClick={handleCellDoubleClick}
          />
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

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            width: "800px",
            height: "450px",
            backgroundColor: "white",
            p: 4,
            borderRadius: "8px",
            boxShadow: 24,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            position: "relative",
          }}
        >
          <FaTimes
            onClick={handleModalClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              fontSize: "24px",
              color: "#888",
            }}
          />
          <Typography id="modal-title" variant="h6" component="h2">
            {isEditing ? "Edit Item" : "Create Item"}
          </Typography>
          <Box display="flex" gap={2}>
            <Autocomplete
              options={[
                "Scaffolding",
                "Plywood",
                "Nails",
                "Concrete",
                "Bricks",
              ]}
              value={formData.item}
              onChange={(event, newValue) => {
                setFormData((prev) => ({ ...prev, item: newValue }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Item"
                  placeholder="Search & select item"
                />
              )}
              fullWidth
            />
            <TextField
              fullWidth
              label="Quantity"
              placeholder="Set Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleFormChange}
              type="number"
            />
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Type the description..."
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Type a note..."
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleFormChange}
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "green",
                "&:hover": { backgroundColor: "darkgreen" },
                fontWeight: "bold",
              }}
              onClick={handleSaveChanges}
              endIcon={<FaCheck />}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default InventoryDashboard;
