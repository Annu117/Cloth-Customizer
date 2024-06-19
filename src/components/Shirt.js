import React, { useState, useRef, useEffect } from 'react';
import shirtOriginal from '../assets/OnlyShirtOriginal.png';
import shirtBg from '../assets/OnlyShirtBg.png';
import personWithShirt from '../assets/shirt.png';
import personWithShirtBg from '../assets/ShirtBg.png';
import BlackPant from '../assets/BlackPant.png';
import BlackPantBg from '../assets/BlackPantBg.png';
import BlackShirt from '../assets/BlackShirt.png';
import BlackShirtBg from '../assets/BlackShirtBg.png';
import Suit from '../assets/Suit.png';
import SuitBg from '../assets/SuitBg.png';
import texture1 from '../assets/gray-woven-fabric.jpg';
import texture2 from '../assets/texture3.jpg';
import texture3 from '../assets/brown-linen-textile.jpg';
import texture4 from '../assets/texture2.jpg';
import './Shirt.css';

const imageOptions = [
  {
    name: 'Person in shirt',
    original: personWithShirt,
    background: personWithShirtBg,
  },
  {
    name: 'Shirt',
    original: shirtOriginal,
    background: shirtBg,
  },
  {
    name: 'Person in suit',
    original: Suit,
    background: SuitBg,
  },
  {
    name: 'Person in black shirt',
    original: BlackShirt,
    background: BlackShirtBg,
  },
  {
    name: 'Person in black pant',
    original: BlackPant,
    background: BlackPantBg,
  },

];

function Shirt() {
  const [color, setColor] = useState('');
  const [texture, setTexture] = useState('none');
  const [customTexture, setCustomTexture] = useState(null);
  const [opacity, setOpacity] = useState(0.1);
  const [brightness, setBrightness] = useState(1.1);
  const [contrast, setContrast] = useState(1.2);
  const [selectedImage, setSelectedImage] = useState(imageOptions[0]);
  const textureUrlRef = useRef();

  const handleColorChange = (e) => {
    setColor(e.target.value);
    adjustBrightnessContrast(e.target.value);
  };

  const handleTextureChange = (e) => {
    if (e.target.value === 'custom') return;
    setTexture(e.target.value);
    setCustomTexture(null);
  };

  const handleCustomTextureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomTexture(event.target.result);
        setTexture('custom');
      };
      reader.readAsDataURL(file);
    }
  };

  const applyTextureUrl = () => {
    const url = textureUrlRef.current.value.trim();
    if (url) {
      setCustomTexture(url);
      setTexture('custom');
    }
  };

  const adjustBrightnessContrast = (color) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightnessValue = (r * 0.299 + g * 0.587 + b * 0.114);

    if (brightnessValue < 128) {
      setBrightness(1.5);
      setContrast(1.2);
    } else {
      setBrightness(1);
      setContrast(1.2);
    }
  };

  const textureStyle = {
    backgroundImage: customTexture ? `url(${customTexture})` : texture !== 'none' ? `url(${texture})` : 'none',
    opacity,
    filter: `brightness(${brightness}) contrast(${contrast})`,
    backgroundBlendMode: 'multiply',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  const imgRef = useRef(null);

  
  return (
    
    <div className="App">
      <div className="product">
        <div className="img-container">
          <img  src={selectedImage.original} className="img-1" alt="Shirt base" />
          {/* <img src={selectedImage.original} ref={imgRef} className="img-1" alt="Shirt base" /> */}

          <div className="color" style={{ backgroundColor: color }}></div>
          <div className="texture" style={textureStyle}></div>
        </div>
        <img src={selectedImage.background} className="img-2" alt="Shirt overlay" />
      </div>
      <div className="controls">
        <h1>{selectedImage.name}</h1>
        <p>
          Customize your {selectedImage.name.toLowerCase()} by changing its color and applying different textures. Use the controls below to see how it looks!
        </p>
        <b>Select image: </b>
        <select className="texture-select" onChange={(e) => setSelectedImage(imageOptions[e.target.selectedIndex])}>
          {imageOptions.map((option, index) => (
            <option key={index} value={option.name}>{option.name}</option>
          ))}
        </select>
        <br /><br />
        <b>Customize color: </b>
        <input type="color" className="color-input" value={color} onChange={handleColorChange} />
        <br /><br />
        <b>Apply texture: </b>
        <select className="texture-select" onChange={handleTextureChange} value={texture}>
          <option value="none">None</option>
          <option value={texture1}>Gray Woven Fabric</option>
          <option value={texture2}>Grunge Seamless</option>
          <option value={texture3}>Brown Linen Textile</option>
          <option value={texture4}>Pattern</option>
        </select>
        <input type="file" id="customTexture" accept="image/*" onChange={handleCustomTextureChange} style={{ display: 'none' }} />
        <label htmlFor="customTexture" style={{ cursor: 'pointer' }}>Choose a texture file</label>
        <br />
        Or
        <div style={{ position: 'relative' }}>
          <input
            type="url"
            id="textureUrl"
            placeholder="Enter texture image URL"
            ref={textureUrlRef}
            style={{ width: '69%' }}
          />
          <button onClick={applyTextureUrl} style={{ position: 'absolute', right: 'calc(0.1% / 3)', top: "-0.35rem" }}>
            Apply URL
          </button>
        </div>

        <div className="control-panel">
          <div className="control-item">
            <span htmlFor="opacityRange">Opacity:</span>
            <input type="range" id="opacityRange" min="0" max="1" step="0.1" value={opacity} onChange={(e) => setOpacity(e.target.value)} />
          </div>
          <div className="control-item">
            <span htmlFor="brightnessRange">Brightness:</span>
            <input type="range" id="brightnessRange" min="0" max="2" step="0.1" value={brightness} onChange={(e) => setBrightness(e.target.value)} />
          </div>
          <div className="control-item">
            <span htmlFor="contrastRange">Contrast:</span>
            <input type="range" id="contrastRange" min="0" max="2" step="0.1" value={contrast} onChange={(e) => setContrast(e.target.value)} />
          </div>
          <br></br>
        </div>
      </div>
    </div>
  );
}

export default Shirt;
