import React, { useState, useEffect } from 'react'; // Importa o React e os hooks useState e useEffect
import './App.css'; // Importa o arquivo CSS para estilização

function App() {
  const [city, setCity] = useState(''); // Estado para armazenar o nome da cidade
  const [weatherData, setWeatherData] = useState(null); // Estado para armazenar os dados climáticos
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
  const [backgroundImage, setBackgroundImage] = useState(''); // Estado para armazenar a imagem de fundo
  const [error, setError] = useState(null); // Estado para armazenar o erro

  const handleSearch = async () => {
    setLoading(true); // Ativa o indicador de carregamento
    setError(null); // Limpa qualquer erro anterior

    try {
      // Faz a chamada à API do OpenWeatherMap para obter os dados climáticos da cidade digitada
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4a5ff0c96bd76f335897cbe6084afbe6&lang=pt_br`);
      const data = await response.json(); // Converte a resposta para JSON

      if (data.cod && data.cod !== 200) {
        // Se a resposta contiver um código de erro, define o erro correspondente
        setError(data.message);
      } else {
        // Se não houver erro, define os dados climáticos e atualiza a imagem de fundo com base na cidade
        setWeatherData(data);
        setBackgroundImage(`https://source.unsplash.com/500x600/?${city}`);
      }
    } catch (error) {
      setError('Erro ao buscar dados climáticos'); // Define uma mensagem de erro genérica
    } finally {
      setLoading(false); // Desativa o indicador de carregamento, independentemente do resultado
    }
  };

  return (
    <div className="container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1>Clima</h1>
      <div className="form-input-container">
        {/* Input para digitar o nome da cidade */}
        <input type="text" placeholder="Digite o nome da cidade" id="city-input" onChange={(e) => setCity(e.target.value)} />
        {/* Botão para acionar a pesquisa */}
        <button id="search" onClick={handleSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div id="weather-data">
        {loading ? (
          <p>Carregando...</p> // Exibe "Carregando..." enquanto os dados estão sendo buscados
        ) : error ? (
          <p>{error}</p> // Exibe a mensagem de erro, se houver
        ) : (
          weatherData && ( // Se houver dados climáticos disponíveis
            <div>
              {/* Cabeçalho com o nome da cidade e o país */}
              <h2>
                <i className="fa-solid fa-location-dot"></i>
                <span id="city"></span>
                {weatherData.name}, {weatherData.sys.country}
                <span></span>
                <img src={`https://flagsapi.com/${weatherData.sys.country}/flat/64.png`} id="country" alt="Flag" />
              </h2>
              {/* Temperatura atual */}
              <p>Temperatura: {weatherData.main.temp}°C</p>
              {/* Ícone representando o clima */}
              <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} id="weather-icon" alt="Weather Icon" />
              {/* Descrição do clima */}
              <p>Descrição: {weatherData.weather[0].description}</p>
              <div id="details-container">
                {/* Umidade */}
                <p id="umidity">
                  <i className="fa-solid fa-droplet"></i>
                  <span></span>
                  Umidade: {weatherData.main.humidity}%
                </p>
                {/* Velocidade do vento */}
                <p id="wind">
                  <i className="fa-solid fa-wind"></i>
                  <span></span>
                  Velocidade do vento: {weatherData.wind.speed} m/s
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App; // Exporta o componente Apps