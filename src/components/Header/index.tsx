import { FiPlusSquare } from 'react-icons/fi';

import { Container,HeaderStyled } from "./styles";
import Logo from '../../assets/logo.svg';

export function Header(props:any){
  const { openModal } = props;

    return (
      <Container>
        <HeaderStyled>
          <img src={Logo} alt="GoRestaurant" />
          <nav>
            <div>
              <button
                type="button"
                onClick={openModal}
              >
                <div className="text">Novo Prato</div>
                <div className="icon">
                  <FiPlusSquare size={24} />
                </div>
              </button>
            </div>
          </nav>
        </HeaderStyled>
      </Container>
    )
  
};


