import React, { useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from "@material-ui/data-grid";
import { serverCalls } from "../../api";
import { useGetData } from '../../custom-hooks';
import { Button,Dialog, DialogActions, DialogContent,
DialogContentText, DialogTitle } from '@material-ui/core';
import { CarForm } from '../../components/CarForm';

const columns: GridColDef[] = [
    {field: "id", headerName: "ID", width: 100},
    {field: "doors", headerName: "Doors", width: 120},
    {field: "wheels", headerName: "Wheels", width:130},
    {field: "make", headerName: "Make", width: 150},
    {field: "model", headerName: "Model", width: 150},
    {field: "color", headerName: "Color", width:120},
    {field: "year", headerName: "Year", width:120},

];

interface gridData{
    data:{
      id?:string;
    }
  }

const rows = [
    {id: 1, doors: 4, wheels: 4, make: "Honda", model: "Civic", color: "Gray", year: 2019},
    {id: 2, doors: 7, wheels: 3, make: "Ford", model: "Hood", color: "Brown", year: 1942},
    {id: 3, doors: 4, wheels: 7, make: "Lannister", model: "Bannister", color: "Green", year: 1000},
    {id: 4, doors: 4, wheels: 2.5, make: "Chevy", model: "Blazer", color: "Aqua", year: 2005},
    {id: 5, doors: 2, wheels: 3, make: "DriveFast", model: "9000", color: "Streak", year: 2020},
    {id: 6, doors: 3, wheels: 1.37, make: "GMC", model: "Yukon", color: "Red", year: 2001},
    {id: 7, doors: 1, wheels: 0, make: "Ferrara", model: "Big Red", color: "Blue", year: 1999},
    {id: 8, doors: 6, wheels: 10, make: "Rossini", model: "Melisandre", color: "White", year: 1999},
    {id: 9, doors: 10, wheels: 2, make: "Wayne", model: "Batmobile", color: "Black", year: 1963},
];

export const DataTable =  () => {
  
    let { carData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<gridData>({data:{}})
  
    let handleOpen = () => {
      setOpen(true)
    }
  
    let handleClose = () => {
      setOpen(false)
    }
  
    let deleteData = () => {
      serverCalls.delete(gridData.data.id!)
      getData()
    }
  
    console.log(gridData.data.id)
  
      return (
          <div style={{ height: 400, width: '100%' }}>
            <h2>Cars In Inventory</h2>
            <DataGrid rows={carData} columns={columns} pageSize={5} checkboxSelection onRowSelected = { setData } />
            <Button onClick={handleOpen}>Update</Button>
            <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Car</DialogTitle>
                <DialogContent>
                <DialogContentText>Update Car</DialogContentText>
                    <CarForm id={gridData.data.id!}/>
                </DialogContent>
                <DialogActions>
                <Button onClick = {handleClose} color="primary">Cancel</Button>
                <Button onClick={handleClose} color = "primary">Done</Button> 
                </DialogActions>
            </Dialog>
          </div>
        );
  }