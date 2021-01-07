import IconConnect from '../public/images/icon_connect.svg';
import IconRefresh from '../public/images/icon_refresh.svg';
import IconSearch from '../public/images/icon_search.svg';
import Link from 'next/link';
import { Registry } from '../interfaces';
import axios from 'axios';
import styled from 'styled-components';
import { useState } from 'react';

const Wrapper = styled.div`
  .search-wrapper {
    border-top: 1px solid #d2d1d1;
    border-bottom: 1px solid #d2d1d1;

    .search-icon {
      width: 17px;
      height: 100%;
      vertical-align: middle;

      path {
        fill: #767676;
      }
    }

    input {
      width: 95%;
      margin-left: 10px;
      outline: none;
      border: none;
      font-size: 14px;
      line-height: 22px;
    }
  }
`;

const Home = ({ ...props }) => {
  console.log('Home');
  const [registries] = useState<Registry[]>(props.registries);

  return (
    <Wrapper>
      <div className='widget-wrapper'>
        <div className='widget-header-wrapper'>
          <div className='header-title'>
            <IconConnect className='header-icon' />
            <span>Endpoints</span>
          </div>
        </div>
        <div className='widget-row-wrapper'>
          <button
            className='button1'
            type='button'
            onClick={() => {
              console.log('onClick');
            }}
          >
            <IconRefresh className='button-icon' />
            Refresh
          </button>
        </div>
        <div className='widget-row-wrapper search-wrapper'>
          <IconSearch className='search-icon' />
          <input type='text' />
        </div>
        <div className='widget-row wrapper'>
          {registries.length === 0 ? (
            <p>No endpoint available</p>
          ) : (
            <ul>
              {registries.map(({ id, name, host }) => (
                <li key={`${id}-${name}`}>
                  <Link href='#'>
                    <p>{host}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export const getServerSideProps = async () => {
  console.log('getServerSideProps');

  const props = {
    registries: [],
  };

  try {
    const res = await axios.get('http://localhost:3000/api/registry');

    if (res && res.data) {
      props.registries = res.data;
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props,
  };
};

export default Home;
