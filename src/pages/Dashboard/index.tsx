import { Component, useEffect, useState } from 'react';

import {Header} from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

export function Dashboard (props:any) {

  const [foods,setFoods] = useState<any>([]);
  const [modalOpen,setModalOpen]= useState<Boolean>(false);
  const [editModalOpen,setEditModalOpen]= useState<Boolean>(false);

  const [editingFood,setEditingFood] = useState<any>();

  useEffect(() =>{
    async function fetchFoods(){
      const response = await api.get('/foods').then((response)=>response.data)
      setFoods(response);
    }
    fetchFoods();
  },[])


  const handleAddFood = async (food:any) => {
  

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods,response.data] );
    
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food:any) => {


    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map((f:any) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
     
    } catch (err) {
      console.log(err);
    }
  }

   const handleDeleteFood = async (id:any) => {
   

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter((food:any) => food.id !== id);

    setFoods(foodsFiltered);

  }

  const toggleModal = () => {
    
   setModalOpen( !modalOpen );
  }

  const toggleEditModal = () => {
   

    setEditModalOpen(!editModalOpen);
  }

  const handleEditFood = (food:any) => {
    setEditingFood(food);
    setEditModalOpen(true)
  }

    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map((food:any) => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
  }

export default Dashboard;