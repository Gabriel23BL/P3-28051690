//cofiguraciones de los selet productos


const productVersions = {
    //Gama alta
     "Nubia Red Magic 9S Pro+": {
         version1: {
             price: 1020,
             features: {
                 memory: "16GB",
                 storage: "512GB",
                 display: "6.8\", 1116 x 2480 pixels",
                 cpu: "Snapdragon 8 Gen 3 Leading 3.4GHz",
                 battery: "5500 mAh",
                 camera: "Triple, 50MP+50MP+2MP",
                 available: 3 
             }
         },
         version2: {
             price: 1110,
             features: {
                 memory: "24GB",
                 storage: "1TB",
                 display: "6.8\", 1116 x 2480 pixels",
                 cpu: "Snapdragon 8 Gen 3 Leading 3.4GHz",
                 battery: "5500 mAh",
                 camera: "Triple, 50MP+50MP+2MP",
                 available: 2 
             }
         }
     },
     "Samsung Galaxy S25 Ultra": {
         version1: {
             price: 1199,
             features: {
                 memory: "12GB",
                 storage: "512GB",
                 display: "6.9\", 1440 x 3120 pixels",
                 cpu: "Snapdragon 8 Elite for Galaxy 4.47GHz",
                 battery: "5000 mAh",
                 camera: "Cuádruple, 50MP+50MP +50MP+50MP",
                 available: 3
             }
         },
         version2: {
             price: 1299,
             features: {
                 memory: "12GB",
                 storage: "1TB",
                 display: "6.9\", 1440 x 3120 pixels",
                 cpu: "Snapdragon 8 Elite for Galaxy 4.47GHz",
                 battery: "5000 mAh",
                 camera: "Cuádruple, 50MP+50MP +50MP+50MP",
                 available: 2
             }
         }
     },
     "Apple iPhone 16 Pro Max": {
         version1: {
             price: 1220,
             features: {
                 memory: "8GB",
                 storage: "512GB",
                 display: "6.9\", 1320 x 2868 pixels",
                 cpu: "Apple A18 Pro",
                 battery: "4685 mAh",
                 camera: "Cuádruple, 48MP+48MP +12MP+ToF",
                 available: 3 
             }
         },
         version2: {
             price: 1399,
             features: {
                 memory: "8GB",
                 storage: "1TB",
                 display: "6.9\", 1320 x 2868 pixels",
                 cpu: "Apple A18 Pro",
                 battery: "4685 mAh",
                 camera: "Cuádruple, 48MP+48MP +12MP+ToF",
                 available: 2 
             }
         }
     },
     
     //Gama media
     "Infinix Hot 40i": {
         version1: {
             price: 155,
             features: {
                 memory: "4GB",
                 storage: "128GB",
                 display: "6.56\", 720x1612 pixels",
                 cpu: "Unisoc Tiger T606",
                 battery: "5000 mAh",
                 camera: "Dual, 50MP+0.08MP",
                 available: 3 
             }
         },
         version2: {
             price: 168,
             features: {
                 memory: "8GB",
                 storage: "256GB",
                 display: "6.56\", 720x1612 pixels",
                 cpu: "Unisoc Tiger T606",
                 battery: "5000 mAh",
                 camera: "Dual, 50MP+0.08MP",
                 available: 2 
             }
         }
     },
     "Samsung Galaxy A55": {
         version1: {
             price: 270,
             features: {
                 memory: "8GB",
                 storage: "128GB",
                 display: "6.6\", 1080 x 2340 pixels",
                 cpu: "Exynos 1380 2.7GHz",
                 battery: "5000 mAh",
                 camera: "Triple, 50MP+12MP+5MP",
                 available: 3 
             }
         },
         version2: {
             price: 299,
             features: {
                 memory: "12GB",
                 storage: "256GB",
                 display: "6.6\", 1080 x 2340 pixels",
                 cpu: "Exynos 1380 2.7GHz",
                 battery: "5000 mAh",
                 camera: "Triple, 50MP+12MP+5MP",
                 available: 2 
             }
         }
     },
     "Xiaomi Redmi note 13 pro": {
         version1: {
             price: 200,
             features: {
                 memory: "8GB",
                 storage: "256GB",
                 display: "6.67\", 1080 x 2400 pixels",
                 cpu: "Mediatek Helio G99-Ultra 2.2GHz",
                 battery: "5000 mAh",
                 camera: "Triple, 200MP+8MP+2MP",
                 available: 3 
             }
         },
         version2: {
             price: 230,
             features: {
                 memory: "12GB",
                 storage: "512GB",
                 display: "6.67\", 1080 x 2400 pixels",
                 cpu: "Mediatek Helio G99-Ultra 2.2GHz",
                 battery: "5000 mAh",
                 camera: "Triple, 200MP+8MP+2MP",
                 available: 2 
             }
         }
     },
 
     //Gama baja
         "Xiaomi Redmi 12": {
             version1: {
                 price: 115,
                 features: {
                     memory: "4GB",
                     storage: "128GB",
                     display: "6.79\", 1080 x 2460 pixels",
                     cpu: "Mediatek Helio G88 2GHz",
                     battery: "5000 mAh",
                     camera: "Triple, 50MP+8MP+2MP",
                     available: 3 
                 }
             },
             version2: {
                 price: 130,
                 features: {
                     memory: "8GB",
                     storage: "256GB",
                     display: "6.79\", 1080 x 2460 pixels",
                     cpu: "Mediatek Helio G88 2GHz",
                     battery: "5000 mAh",
                     camera: "Triple, 50MP+8MP+2MP",
                     available: 2 
                 }
             }
         },
         "Tecno Spark 20C": {
         version1: {
             price: 100,
             features: {
                 memory: "4GB",
                 storage: "128GB",
                 display: "6.6\", 720 x 1612 pixels",
                 cpu: "Octa-core 2.2GHz",
                 battery: "5000 mAh",
                 camera: "Dual, 50MP+0.08MP",
                 available: 3 
             }
         },
         version2: {
             price: 115,
             features: {
                 memory: "8GB",
                 storage: "256GB",
                 display: "6.6\", 720 x 1612 pixels",
                 cpu: "Octa-core 2.2GHz",
                 battery: "5000 mAh",
                 camera: "Dual, 50MP+0.08MP",
                 available: 2 
             }
         }
     },
     "Samsung Galaxy A16": {
         version1: {
             price: 160,
             features: {
                 memory: "4GB",
                 storage: "128GB",
                 display: "6.7\", 1080 x 2340 pixels",
                 cpu: "Mediatek Helio G99 2.2GHz",
                 battery: "5000 mAh",
                 camera: "Triple, 50MP+5MP+2MP",
                 available: 3 
             }
         },
         version2: {
             price: 175,
             features: {
                 memory: "6GB",
                 storage: "256GB",
                 display: "6.7\", 1080 x 2340 pixels",
                 cpu: "Mediatek Helio G99 2.2GHz",
                 battery: "5000 mAh",
                 camera: "Triple, 50MP+5MP+2MP",
                 available: 2 
             }
         }
     }
 };
 
 document.querySelectorAll('.product').forEach(product => {
     const versionSelect = product.querySelector('.version-select');
     const productName = product.getAttribute('data-name');
 
     versionSelect.addEventListener('change', (event) => {
         const selectedVersion = event.target.value;
         const selectedData = productVersions[productName][selectedVersion];
 
         // Actualizar las características
         product.querySelector('.bi-memory').textContent = selectedData.features.memory;
         product.querySelector('.bi-device-hdd').textContent = selectedData.features.storage;
         product.querySelector('.bi-display').textContent = selectedData.features.display;
         product.querySelector('.bi-cpu').textContent = selectedData.features.cpu;
         product.querySelector('.bi-battery-full').textContent = selectedData.features.battery;
         product.querySelector('.bi-camera').textContent = selectedData.features.camera;
 
         // Actualizar el precio
         product.querySelector('.add-to-cart').textContent = `Agregar al carrito $${selectedData.price}`;
     });
 });