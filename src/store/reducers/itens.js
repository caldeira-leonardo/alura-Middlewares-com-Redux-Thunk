import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import itensService from "services/itens";
import { v4 as uuid } from "uuid";

const initialState = [];

export const buscarItens = createAsyncThunk(
  "itens/buscar",
  itensService.buscar
);

const itensSlice = createSlice({
  name: "itens",
  initialState,
  reducers: {
    mudarFavorito: (state, { payload }) => {
      state.map((item) => {
        if (item.id === payload) item.favorito = !item.favorito;
        return item;
      });
    },
    cadastrarItem: (state, { payload }) => {
      state.push({ ...payload, id: uuid() });
    },
    mudarItem: (state, { payload }) => {
      const index = state.findIndex((item) => item.id === payload.id);
      Object.assign(state[index], payload.item);
    },
    deletarItem: (state, { payload }) => {
      const index = state.findIndex((item) => item.id === payload);
      state.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(buscarItens.fulfilled, (_, { payload }) => {
        return payload;
      })
      .addCase(buscarItens.pending, (state, { payload }) => {
        console.log("carregando itens"); // remove logs
      })
      .addCase(buscarItens.rejected, (state, { payload }) => {
        console.log("busca de itens rejeitda"); // remove logs
      });
  },
});

export const { mudarFavorito, cadastrarItem, mudarItem, deletarItem } =
  itensSlice.actions;

export default itensSlice.reducer;
