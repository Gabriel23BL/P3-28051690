const cart = [
    {
        id: 1,
        codigo: 'NUBIA9SP',
        nombre: 'Nubia Red Magic 9S Pro+',
        precio: 1020,
        categoria: 'Gama alta',
        cantidad: 1
    },
    {
        id: 2,
        codigo: 'SAMSUNG25U',
        nombre: 'Samsung Galaxy S25 Ultra',
        precio: 1199,
        categoria: 'Gama alta',
        cantidad: 1
    },
    {
        id: 3,
        codigo: 'IPHONE16PM',
        nombre: 'Apple iPhone 16 Pro Max',
        precio: 1220,
        categoria: 'Gama alta',
        cantidad: 1
    },
    {
        id: 4,
        codigo: 'INFINIX40I',
        nombre: 'Infinix Hot 40i',
        precio: 155,
        categoria: 'Gama media',
        cantidad: 1
    },
    {
        id: 5,
        codigo: 'SAMSUNGA55',
        nombre: 'Samsung Galaxy A55',
        precio: 270,
        categoria: 'Gama media',
        cantidad: 1
    },
    {
        id: 6,
        codigo: 'XIAOMI13PRO',
        nombre: 'Xiaomi Redmi note 13 pro',
        precio: 200,
        categoria: 'Gama media',
        cantidad: 1
    },
    {
        id: 7,
        codigo: 'XIAOMI12',
        nombre: 'Xiaomi Redmi 12',
        precio: 115,
        categoria: 'Gama baja',
        cantidad: 1
    },
    {
        id: 8,
        codigo: 'TECNO20C',
        nombre: 'Tecno Spark 20C',
        precio: 100,
        categoria: 'Gama baja',
        cantidad: 1
    },
    {
        id: 9,
        codigo: 'SAMSUNGA16',
        nombre: 'Samsung Galaxy A16',
        precio: 160,
        categoria: 'Gama baja',
        cantidad: 1
    }
];

// Guardar en localStorage para simular el carrito
localStorage.setItem('cart', JSON.stringify(cart));