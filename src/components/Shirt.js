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
import texture1 from '../assets/white-wallpaper-textures-surface.jpg';
import texture2 from '../assets/pattern.jpg';
import texture3 from '../assets/white-crossed-fabric-texture.jpg';
// import texture4 from '../assets/plain-bluish-gray.jpg';
// import texture5 from '../assets/plain-gray-fabric.jpg'
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
  // {
  //   name: 'Person in suit',
  //   original: Suit,
  //   background: SuitBg,
  // },
  // {
  //   name: 'Person in black shirt',
  //   original: BlackShirt,
  //   background: BlackShirtBg,
  // },
  // {
  //   name: 'Person in black pant',
  //   original: BlackPant,
  //   background: BlackPantBg,
  // },

];

function Shirt() {
  const [color, setColor] = useState('');
  const [texture, setTexture] = useState('none');
  const [customTexture, setCustomTexture] = useState(null);
  const [opacity, setOpacity] = useState();
  const [brightness, setBrightness] = useState();
  const [contrast, setContrast] = useState();
  const [selectedImage, setSelectedImage] = useState(imageOptions[0]);
  const textureUrlRef = useRef();
  const [draggedOver, setDraggedOver] = useState(false);

  const handleColorChange = (e) => {
    setColor(e.target.value);
    adjustBrightnessContrast(e.target.value);
  };

  const handleTextureChange = (e) => {
    if (e.target.value === 'custom') return;
    setTexture(e.target.value);
    setCustomTexture(null);
  };

    const applyTextureUrl = () => {
      const url = textureUrlRef.current.value.trim();
      if (url) {
        setCustomTexture(url);
        setTexture('custom');
      }
    };
    const handleDrop = (event) => {
      event.preventDefault();
      setDraggedOver(false);
      const file = event.dataTransfer.files[0];
      handleFile(file);
    };
  
    const handleFile = (file) => {
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCustomTexture(e.target.result);
          setTexture('custom');
        };
        reader.readAsDataURL(file);
      }
    };
    const handleCustomTextureChange = (event) => {
      const file = event.target.files[0];
      handleFile(file);
    };
  
    const handleDragOver = (event) => {
      event.preventDefault();
      setDraggedOver(true);
    };
    const handleDragLeave = () => {
      setDraggedOver(false);
    };
    const removeImage = () => {
      setCustomTexture(null);
      setTexture('');
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
      <div>
      <div className="button-container">
        {imageOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(option)}
            className={`texture-button ${selectedImage === option ? 'active' : ''}`}
          >
            {option.name}
          </button>
        ))}
      </div>
      <div className="product">
        <div className="img-container">
          <img src={selectedImage.original} className="img-1" alt="Shirt base" />
          <div className="color" style={{ backgroundColor: color }}></div>
          <div className="texture" style={textureStyle}></div>
        </div>
        <img src={selectedImage.background} className="img-2" alt="Shirt overlay" />
      </div>
      </div>
      <div className="controls">
        <h1>{selectedImage.name}</h1>
          <div className='controlP'>
          Customize {selectedImage.name.toLowerCase()} by changing its color and applying different textures. Use the controls below to see how it looks!
        </div>
        <label for="color-input"><b>Customize color </b></label>
        <input type="color" className="color-input" value={color} onChange={handleColorChange} />
        <br /><br />
        {/* <b>Apply texture: </b> */}
        <label for="texture-select"><b>Apply texture </b></label>
        <select id="texture-select" className="texture-select" onChange={handleTextureChange} value={texture}>
          <option value="none">None</option>
          <option value={texture3}>White Crossed Fabric Texture</option>
          <option value={texture1}>White Wallpaper Texture</option>
          {/* <option value={texture5}>Plain Gray Fabric</option>
          <option value={texture4}>Plain Bluish Gray</option> */}
           <option value="texture5" data-image-url="https://i.ibb.co/4dNj71n/plain-gray-fabric.jpg">Plain Gray Fabric</option>
            <option value="texture4" data-image-url="https://i.ibb.co/85Stzdk/plain-bluish-gray.jpg">Plain Bluish Gray</option>

          <option value={texture2}>Pattern</option>
        </select>
        <br />
        <div style={{ position: 'center',textAlign: 'center', padding: '10px' }}>
        Or
        </div>
        <div
          onClick={() => document.getElementById('customTexture').click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            position: 'relative',
            border: draggedOver ? '2px solid navy' : '2px dashed #cccccc',
            borderRadius: '5px',
            padding: '10px',
            textAlign: 'center',
            backgroundColor: draggedOver ? '#ccc' : 'white',
            cursor: 'pointer'
          }}
          >
          <input
            type="file"
            id="customTexture"
            accept="image/*"
            onChange={handleCustomTextureChange}
            style={{ display: 'none' }}
          />
          {customTexture ? (
            <div style={{ position: 'relative' }}>
            <img src={customTexture} alt="Custom Texture" style={{ maxWidth: '10%' }} />
            <button
              onClick={removeImage}
              style={{
                position: 'absolute',
                top: '-1.5rem',
                right: '-0.6rem',
                backgroundColor: 'white',
                color: 'gray',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
              }}
              >
              X
            </button>
          </div>
            ) : (
              "Drag and drop texture image here"
            )}      {texture === 'custom' && customTexture && (
            <div style={{ marginTop: '10px' }}>
              {/* <img src={customTexture} alt="Custom Texture" style={{ maxWidth: '10%' }} /> */}
            </div>
            )}
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
        </div>
      </div>
    </div>
  );
}

export default Shirt;
