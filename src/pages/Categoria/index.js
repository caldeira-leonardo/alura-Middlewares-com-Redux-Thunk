import Button from "components/Button";
import Header from "components/Header";
import Item from "components/Item";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Categoria.module.scss";
import { useEffect } from "react";
import { buscarItens } from "store/reducers/itens";

export default function Categoria() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { nomeCategoria } = useParams();

  const { categoria, itens } = useSelector((state) => {
    const regexp = new RegExp(state.busca, "i");
    return {
      categoria:
        state.categorias.find((categoria) => categoria.id === nomeCategoria) ??
        {},
      itens: state.itens.filter(
        (item) => item.categoria === nomeCategoria && item.titulo.match(regexp)
      ),
    };
  });

  useEffect(() => {
    if (!itens.length) dispatch(buscarItens());
  }, [dispatch, itens]);

  return (
    <div>
      <Header
        titulo={categoria.nome}
        descricao={categoria.descricao}
        imagem={categoria.header}
      >
        <Button onClick={() => navigate(`/anuncie/${nomeCategoria}`)}>
          Quero anunciar
        </Button>
      </Header>
      <div className={styles.itens}>
        {itens?.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
