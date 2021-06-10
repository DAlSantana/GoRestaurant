import { Component, createRef, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

export function ModalAddFood(props: any){

  const { isOpen } = props;
  let [open ,setIsOpen] = useState(isOpen);
  let handleSubmit = async (data:any) => {
    const { setIsOpen, handleAddFood } = props;
    handleAddFood(data);
    setIsOpen();
  };

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form onSubmit={handleSubmit} >
          <h1>Novo Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" icon="" />

          <Input name="name" placeholder="Ex: Moda Italiana" icon="" />
          <Input name="price" placeholder="Ex: 19.90"  icon=""/>

          <Input name="description" placeholder="Descrição" icon=""/>
          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );

};

export default ModalAddFood;
