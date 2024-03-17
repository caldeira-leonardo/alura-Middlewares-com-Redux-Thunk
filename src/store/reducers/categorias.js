import { createStandaloneToast } from "@chakra-ui/toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriasService from "services/categorias";
import { resetarCarrinho } from "./carrinho";

const { toast } = createStandaloneToast();

const initialState = [];

export const buscarCategorias = createAsyncThunk(
  "categorias/buscar",
  categoriasService.buscar
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(buscarCategorias.fulfilled, (state, { payload }) => {
        toast({
          title: "Sucesso !",
          description: "Categorias carregadas com sucesso!",
          duration: 2000,
          isClosable: true,
          status: "success",
        });
        return payload;
      })
      // .addCase(buscarCategorias.pending, (state, { payload }) => {})
      .addCase(buscarCategorias.rejected, (state, { payload }) => {
        toast({
          title: "Erro",
          description: "Erro na busca de categorias",
          duration: 2000,
          isClosable: true,
          status: "error",
        });
      })
      .addCase(resetarCarrinho.type, () => {
        toast({
          title: "Sucesso !",
          description: "Compra completada com sucesso!",
          duration: 2000,
          isClosable: true,
          status: "success",
        });
      });
  },
});

export default categoriasSlice.reducer;
