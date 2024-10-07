import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Part1nav from '../components/Part1nav';
import Part4foot from '../components/Part4foot';

const AdventureDetail = () => {
  const [adventure, setAdventure] = useState(null);
  const { adventureId } = useParams(); 

  
  useEffect(() => {
    fetch(`https://content-qtripdynamic-qa-backend.azurewebsites.net/api/v1/adventures/detail?adventure=${adventureId}`)
      .then(response => response.json())
      .then(data => {
        setAdventure(data);
      })
      .catch(error => console.error('Error fetching adventure details:', error));
  }, [adventureId]);

  if (!adventure) { 
    return <div>Loading...</div>;

  }

  return (
    <>
    <Part1nav></Part1nav>
    <div className="adventure-detail-container" style={{height:'1500px',width:"700px",border:'1px solid lightgrey',marginTop:'100px'}}>
      <p style={{color:"black",marginBottom:'-10px', fontSize:'50px'}}>{adventure.name}</p>
      <p style={{color:"grey"}}>{adventure.subtitle}</p>
      <div id="carouseltag">
      <Carousel>
  {adventure.images.map((image, index) => (
    <div key={index}>
      <img src={image} alt={`Adventure${index + 1}`} style={{ height: '400px', width: '700px' }} />
    </div>
  ))}
</Carousel>
      </div>
         <p style={{color:"black",fontSize:'16px'}}>{adventure.content}</p>
     
    </div>
    <Part4foot></Part4foot>
    </>
  );
};

export default AdventureDetail;
