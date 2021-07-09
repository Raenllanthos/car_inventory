import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        doors: '7',
        seats: "3.75",
        make: "Honda",
        model: 'Civic',
        series: "Civic",
        year: '2019',
        color: 'Gray',
        price: "20,000",
    },
    reducers: {
        chooseMake: (state, action) => { state.make = action.payload},
        chooseModel: (state, action) => { state.model = action.payload},
        chooseYear: (state, action) => { state.year = action.payload},
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseMake, chooseModel, chooseYear} = rootSlice.actions;