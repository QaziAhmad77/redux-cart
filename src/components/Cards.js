import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import CardsData from './CardsData';
import './style.css';
import { ADD } from '../redux/actions/action';

const Cards = () => {
  const [data, setData] = useState(CardsData);
  console.log('data', data);
  const dispatch = useDispatch();

  const send = (ele) => {
    console.log(ele);
    dispatch(ADD(ele)); // dispatch triggor action
  };
  return (
    <div className="container mt-3">
      <h2 className="text-center">Add to Cart </h2>
      <div className="row d-flex justify-content-center align-item-center">
        {data.map((element, id) => {
          return (
            <>
              <Card
                style={{ width: '22rem', border: 'none' }}
                className="mx-2 mt-4 card_style"
              >
                <Card.Img
                  variant="top"
                  src={element.imgdata}
                  style={{ height: '16rem' }}
                  className="mt-3"
                />
                <Card.Body>
                  <Card.Title>{element.rname}</Card.Title>
                  <Card.Text>Price: Rs {element.price}</Card.Text>
                  <div className="button_div d-flex justify-content-center">
                    <Button
                      variant="primary"
                      onClick={() => send(element)}
                      className="col-lg-12"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
