import { Component, useState } from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";

import { Container, Header, Body, Footer } from "./styles";
import api from "../../services/api";

export function Food(props: any) {
  const { available } = props.food;

  const [state, setState] = useState({ isAvailable: available });

  const toggleAvailable = async (id: any) => {
    const { food } = props;
    const { isAvailable } = state;

    await api.put(`/foods/${id}`, {
      ...food,
      available: !isAvailable,
    });

    setState({ isAvailable: !isAvailable });
  };

  const setEditingFood = () => {
    const { food, handleEditFood } = props;

    handleEditFood(food);
  };

  const { isAvailable } = state;
  const { food, handleDelete } = props;

  return (
    <Container>
      <Header available={isAvailable}>
        <img src={food.image} alt={food.name} />
      </Header>
      <Body className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </Body>
      <Footer className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? "Disponível" : "Indisponível"}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={() => toggleAvailable(food.id)}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </Footer>
    </Container>
  );
}

export default Food;
function setState(arg0: { isAvailable: boolean }) {
  throw new Error("Function not implemented.");
}
