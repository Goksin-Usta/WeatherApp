import { useState } from 'react'
import styles from './CustomStyle.module.css'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CityForm from './components/CityForm';  // ./components dizini, App.js dosyasının aynı seviyesinde
import WeatherCard from './components/WeatherCard'; 

function App() {
  const [city, setCity] = useState(''); // Şehir adı state'i
  const [weatherData, setWeatherData] = useState(null); // API'den gelen hava durumu verisi
  const [error, setError] = useState(null); // Hata mesajı

  const fetchWeather = async () => {
    if (!city) {
      setError('Lütfen bir şehir adı girin.');
      return;
    }
    setError(null); // Hataları sıfırla
    try {
      const apiKey = ''; // API anahtarını buraya yazmalısınız
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Şehir bulunamadı!');
      }

      const data = await response.json();
      setWeatherData(data); // API'den gelen veriyi state'e kaydet
    } catch (err) {
      setError(err.message); // Hata mesajını state'e kaydet
      setWeatherData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Formun sayfayı yenilemesini engelle
    fetchWeather(); // Butona tıklanmasıyla API'yi çağır
  };

  return (
    <div className={`container my-5 ${styles.container}`}>
      <h1 className={`text-center ${styles.title}`}>Hava Durumu</h1>
      <CityForm city={city} setCity={setCity} handleSubmit={handleSubmit} />
      <WeatherCard weatherData={weatherData} error={error} />
    </div>
  );
}

export default App;