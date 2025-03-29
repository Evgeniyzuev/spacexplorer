// Глобальные переменные
const starCount = 600; // Увеличенное количество звезд
const starTypes = [
    // Обычные звезды
    { name: 'Белый карлик', color: '#FFFFFF', glow: '#FFFFFF', minSize: 2, maxSize: 3, glowIntensity: 0.5, type: 'star' },
    { name: 'Желтый карлик', color: '#FFFFA8', glow: '#FFFF00', minSize: 2.5, maxSize: 3.5, glowIntensity: 0.6, type: 'star' },
    { name: 'Красный гигант', color: '#FF6666', glow: '#FF0000', minSize: 5, maxSize: 8, glowIntensity: 0.7, type: 'star' },
    { name: 'Голубой гигант', color: '#66CCFF', glow: '#0099FF', minSize: 6, maxSize: 9, glowIntensity: 0.8, type: 'star' },
    { name: 'Оранжевый гигант', color: '#FFAA66', glow: '#FF8800', minSize: 4.5, maxSize: 7, glowIntensity: 0.6, type: 'star' },
    { name: 'Фиолетовая звезда', color: '#CC99FF', glow: '#9900FF', minSize: 3, maxSize: 5, glowIntensity: 0.7, type: 'star' },
    { name: 'Зеленая звезда', color: '#99FF99', glow: '#33CC33', minSize: 2.5, maxSize: 4.5, glowIntensity: 0.6, type: 'star' },
    { name: 'Бирюзовая звезда', color: '#66FFEE', glow: '#00CCAA', minSize: 3, maxSize: 4.5, glowIntensity: 0.65, type: 'star' },
    { name: 'Розовая звезда', color: '#FF99CC', glow: '#FF3399', minSize: 2.8, maxSize: 4, glowIntensity: 0.6, type: 'star' },
    
    // Специальные объекты
    { name: 'Нейтронная звезда', color: '#E0E0FF', glow: '#AAAAFF', minSize: 1.5, maxSize: 2.5, glowIntensity: 1.2, pulseRate: 5, type: 'neutron' },
    { name: 'Пульсар', color: '#CCCCFF', glow: '#9999FF', minSize: 1, maxSize: 2, glowIntensity: 1.4, pulseRate: 20, type: 'pulsar' },
    { name: 'Черная дыра', color: '#000000', glow: '#660066', minSize: 3, maxSize: 7, glowIntensity: 1.8, accretionDisk: true, type: 'blackhole' },
    { name: 'Двойная звезда', color: '#FFFF88', glow: '#FFAA00', minSize: 4, maxSize: 6, glowIntensity: 0.9, binary: true, type: 'binary' },
    { name: 'Сверхновая', color: '#FFFFFF', glow: '#FFFF99', minSize: 6, maxSize: 9, glowIntensity: 2.0, expanding: true, type: 'supernova' },
    { name: 'Квазар', color: '#AAEEFF', glow: '#00AAFF', minSize: 4, maxSize: 8, glowIntensity: 2.2, jets: true, type: 'quasar' }
];

// В начало файла добавим новые константы
const VIEW_MODES = {
    GLOBAL: 'global',
    SYSTEM: 'system'
};

// В начало файла после starTypes
const systemObjectTypes = [
    // Планеты
    { name: 'Каменистая планета', type: 'rocky_planet', color: '#A86A3E', minSize: 3, maxSize: 5, canHaveMoons: true, minOrbit: 20, maxOrbit: 100 },
    { name: 'Газовый гигант', type: 'gas_giant', color: '#E0A95E', minSize: 6, maxSize: 10, canHaveMoons: true, minOrbit: 50, maxOrbit: 150 },
    { name: 'Ледяная планета', type: 'ice_planet', color: '#A5D6D9', minSize: 2.5, maxSize: 4.5, canHaveMoons: true, minOrbit: 30, maxOrbit: 120 },
    { name: 'Вулканический мир', type: 'volcanic', color: '#FF4400', minSize: 2, maxSize: 4, canHaveMoons: true, minOrbit: 15, maxOrbit: 80 },
    
    // Луны
    { name: 'Луна', type: 'moon', color: '#CCCCCC', minSize: 1, maxSize: 2, minOrbit: 5, maxOrbit: 15 },
    
    // Космические объекты
    { name: 'Газовое облако', type: 'gas_cloud', color: '#7744AA', minSize: 8, maxSize: 15, minOrbit: 30, maxOrbit: 200 },
    { name: 'Астероидное поле', type: 'asteroid_field', color: '#666666', minSize: 10, maxSize: 20, minOrbit: 25, maxOrbit: 180 },
    { name: 'Космическая станция', type: 'station', color: '#44AAFF', minSize: 2, maxSize: 3, minOrbit: 10, maxOrbit: 160 },
    
    // Аномалии и особые объекты
    { name: 'Пространственная аномалия', type: 'anomaly', color: '#FF00FF', minSize: 3, maxSize: 6, minOrbit: 40, maxOrbit: 190 },
    { name: 'Древние руины', type: 'ruins', color: '#FFD700', minSize: 2, maxSize: 4, minOrbit: 20, maxOrbit: 170 }
];

// Класс для управления фоном
class Background {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Загрузка фонового изображения
        this.image = new Image();
        this.image.src = 'background.jpeg';
        
        // Проверка загрузки изображения
        this.image.onload = () => {
            console.log('Фоновое изображение загружено успешно');
            this.imageLoaded = true;
        };
        
        this.image.onerror = () => {
            console.error('Ошибка при загрузке фонового изображения');
        };
        
        this.imageLoaded = false;
    }
    
    draw(ctx) {
        // Если изображение загружено, отрисовываем его
        if (this.imageLoaded) {
            // Подгоняем изображение под размер холста
            this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
            
            // Добавляем темный оверлей для затемнения пространства между звездами
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            // Если изображение еще не загружено, используем темный фон
            this.ctx.fillStyle = '#030309';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    resize() {
        // Нет необходимости в дополнительных действиях - drawImage будет масштабировать
    }
}

// Основной класс игры
class SpaceGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Установка размеров canvas
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Создаем фоновый объект
        this.background = new Background(this.canvas);
        
        // Параметры карты и навигации
        this.stars = [];
        this.currentStar = null;
        this.targetStar = null;
        this.offsetX = 0;
        this.offsetY = 0;
        this.scale = 1;
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.time = 0;
        
        // Номера для имен звезд
        this.nameIndex = 1;
        
        // Добавляем параметры для режима просмотра
        this.viewMode = VIEW_MODES.GLOBAL;
        this.systemViewScale = 3; // Масштаб для просмотра системы
        this.globalViewScale = this.scale; // Сохраняем глобальный масштаб
        this.systemViewOffset = { x: 0, y: 0 }; // Смещение для просмотра системы
        this.globalViewOffset = { x: this.offsetX, y: this.offsetY }; // Сохраняем глобальное смещение
        
        // Добавляем массив для хранения объектов системы
        this.systemObjects = new Map(); // ключ - звезда, значение - массив объектов системы
        
        // Для отслеживания выбранного объекта
        this.selectedSystemObject = null;
        
        // Генерация звезд
        this.generateStars();
        
        // Генерируем объекты для каждой звезды
        this.generateSystemObjects();
        
        // Обработчики событий
        this.setupEventListeners();
        
        // Инициализация обработчика кнопки
        this.setupViewModeButton();
        
        // Запуск игрового цикла
        this.animate();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        if (this.background) {
            this.background.resize();
        }
    }
    
    generateStars() {
        // Область, в которой генерируются звезды
        const spaceWidth = 6000;
        const spaceHeight = 6000;
        
        // Параметры спиральной галактики
        const centerX = 0;
        const centerY = 0;
        const spiralArms = 3; // Количество спиральных рукавов
        const spiralTightness = 3.5; // Параметр сжатия спирали (меньше = туже)
        const randomness = 0.2; // Случайность расположения (0 = идеальная спираль, 1 = полный хаос)
        // Увеличиваем радиус галактики в 2 раза для размещения звезд с большим расстоянием
        const galaxyRadius = spaceWidth / 2 * 1.6; // Было 0.8, увеличили в 2 раза
        const coreStars = 40; // Количество звезд в ядре галактики
        
        // Функция для проверки расстояния между звездами
        const checkDistanceToExistingStars = (x, y, minDistance) => {
            for (const existingStar of this.stars) {
                const distance = Math.sqrt(
                    Math.pow(existingStar.x - x, 2) + 
                    Math.pow(existingStar.y - y, 2)
                );
                
                // Проверяем, достаточно ли далеко новая звезда от существующей
                // Учитываем радиусы обеих звезд плюс дополнительный отступ
                // Увеличиваем минимальное расстояние в 4 раза
                const minRequiredDistance = existingStar.radius + minDistance * 4;
                
                if (distance < minRequiredDistance) {
                    return false; // Слишком близко к существующей звезде
                }
            }
            return true; // Достаточно далеко от всех звезд
        };
        
        // Функция для получения корректного положения звезды
        const getValidStarPosition = (isCore, typeRadius) => {
            const maxAttempts = 50; // Максимальное количество попыток найти позицию
            let attempts = 0;
            let x, y, minDistance;
            
            // Минимальное расстояние между звездами
            // Для центра галактики допускаем меньшее расстояние, но все равно увеличиваем в 4 раза от прежних значений
            minDistance = isCore ? typeRadius * 4.8 : typeRadius * 8; // Было 1.2 и 2
            
            do {
                if (isCore) {
                    // Звезды в ядре расположены ближе к центру, но с большим расстоянием
                    const angle = Math.random() * Math.PI * 2;
                    // Увеличиваем область ядра, чтобы звезды могли разместиться с большим расстоянием
                    const distance = Math.random() * galaxyRadius * 0.2; // Было 0.15
                    x = centerX + Math.cos(angle) * distance;
                    y = centerY + Math.sin(angle) * distance;
                } else {
                    // Выбор рукава спирали
                    const arm = Math.floor(Math.random() * spiralArms);
                    
                    // Спиральное распределение
                    const distanceFromCenter = Math.random() * galaxyRadius;
                    const angleOffset = arm * (2 * Math.PI / spiralArms);
                    const spiralAngle = angleOffset + (distanceFromCenter / galaxyRadius) * spiralTightness * Math.PI * 2;
                    
                    // Добавляем случайность к положению
                    const randX = (Math.random() - 0.5) * 2 * randomness * distanceFromCenter;
                    const randY = (Math.random() - 0.5) * 2 * randomness * distanceFromCenter;
                    
                    x = centerX + Math.cos(spiralAngle) * distanceFromCenter + randX;
                    y = centerY + Math.sin(spiralAngle) * distanceFromCenter + randY;
                }
                
                attempts++;
                // Если превысили количество попыток, уменьшаем требования к минимальному расстоянию
                if (attempts > maxAttempts / 2) {
                    minDistance *= 0.9; // Уменьшаем минимальное расстояние на 10%
                }
            } while (!checkDistanceToExistingStars(x, y, minDistance) && attempts < maxAttempts);
            
            return { x, y, minDistance };
        };
        
        // Количество пробуемых звезд увеличим, чтобы компенсировать возможное уменьшение итогового количества при большем расстоянии
        const maxPossibleStars = Math.min(starCount * 1.5, 400); // Пробуем до 150% от заданного количества, но не более 400
        
        // Генерация звезд в центре галактики (ядро)
        for (let i = 0; i < coreStars && this.stars.length < maxPossibleStars && this.stars.length < starCount; i++) {
            // Большая вероятность редких и ярких звезд в центре
            let typeIndex;
            const rand = Math.random();
            
            if (rand > 0.7) {
                // 30% вероятность особых объектов в центре
                typeIndex = 9 + Math.floor(Math.random() * 6);
            } else {
                // 70% вероятность ярких обычных звезд
                typeIndex = Math.floor(Math.random() * 5);
            }
            
            // Защита от выхода за границы массива
            if (typeIndex >= starTypes.length) {
                typeIndex = 0;
            }
            
            const type = starTypes[typeIndex];
            
            // Проверяем, что type определен
            if (!type) {
                console.error('Undefined star type at index:', typeIndex);
                continue;
            }
            
            // Примерный радиус звезды для расчета минимального расстояния
            const typeRadius = (type.maxSize + type.minSize) / 2 + 5;
            
            // Получаем позицию для ядра галактики
            const { x, y } = getValidStarPosition(true, typeRadius);
            
            const star = {
                x: x,
                y: y,
                radius: Math.random() * (type.maxSize - type.minSize) + type.minSize + 5, // Увеличенный размер для центральных звезд
                color: type.color || '#FFFFFF',
                glow: type.glow || '#FFFFFF',
                glowIntensity: (type.glowIntensity || 1) * 1.5, // Увеличенное свечение
                type: type.name || 'Unknown Star',
                objectType: type.type || 'star',
                name: `${type.name || 'Star'}-${this.nameIndex++}`,
                pulseOffset: Math.random() * Math.PI * 2,
                pulseRate: type.pulseRate || 1,
                rotationAngle: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1)
            };
            
            // Добавляем специфические свойства
            this.addSpecificStarProperties(star, type);
            
            this.stars.push(star);
        }
        
        // Генерация звезд в спиральных рукавах
        let remainingStars = maxPossibleStars - this.stars.length;
        let attemptsForArms = 0;
        const maxArmAttempts = remainingStars * 3; // Допускаем в среднем 3 попытки на звезду
        
        while (this.stars.length < maxPossibleStars && this.stars.length < starCount && attemptsForArms < maxArmAttempts) {
            // Распределение типов звезд - редкие объекты должны встречаться реже
            let typeIndex;
            const rand = Math.random();
            
            if (rand > 0.95) {
                // 5% вероятность особых объектов (с индексами 9-14)
                typeIndex = 9 + Math.floor(Math.random() * 6);
            } else {
                // 95% вероятность обычных звезд (с индексами 0-8)
                typeIndex = Math.floor(Math.random() * 9);
            }
            
            // Защита от выхода за границы массива
            if (typeIndex >= starTypes.length) {
                typeIndex = 0;
            }
            
            const type = starTypes[typeIndex];
            
            // Проверяем, что type определен
            if (!type) {
                console.error('Undefined star type at index:', typeIndex);
                attemptsForArms++;
                continue;
            }
            
            // Примерный радиус звезды для расчета минимального расстояния
            const typeRadius = (type.maxSize + type.minSize) / 2;
            
            // Получаем позицию для рукава галактики
            const { x, y } = getValidStarPosition(false, typeRadius);
            
            const star = {
                x: x,
                y: y,
                radius: Math.random() * (type.maxSize - type.minSize) + type.minSize,
                color: type.color || '#FFFFFF',
                glow: type.glow || '#FFFFFF',
                glowIntensity: type.glowIntensity || 1,
                type: type.name || 'Unknown Star',
                objectType: type.type || 'star',
                name: `${type.name || 'Star'}-${this.nameIndex++}`,
                pulseOffset: Math.random() * Math.PI * 2,
                pulseRate: type.pulseRate || 1,
                rotationAngle: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1)
            };
            
            // Добавляем специфические свойства
            this.addSpecificStarProperties(star, type);
            
            this.stars.push(star);
            attemptsForArms++;
        }
        
        console.log(`Сгенерировано ${this.stars.length} звезд из ${starCount} запланированных`);
        
        // Установка начальной текущей звезды
        if (this.stars.length > 0) {
            // Найдем для начала обычную звезду
            let normalStarFound = false;
            
            for (const star of this.stars) {
                if (star.objectType === 'star' || star.objectType === 'normal') {
                    this.currentStar = star;
                    normalStarFound = true;
                    break;
                }
            }
            
            // Если не нашли обычную звезду, берем первую
            if (!normalStarFound) {
                this.currentStar = this.stars[0];
            }
            
            this.updateStarInfo();
        }
    }
    
    // Вспомогательный метод для добавления специфических свойств звезд
    addSpecificStarProperties(star, type) {
        // Добавляем специфические свойства для определенных типов объектов
        if (type.accretionDisk) {
            star.accretionDiskRadius = star.radius * 4;
            star.accretionDiskColors = [
                {stop: 0, color: '#660066'},
                {stop: 0.2, color: '#990099'},
                {stop: 0.4, color: '#CC00CC'},
                {stop: 0.6, color: '#FF00FF'},
                {stop: 0.8, color: '#FF66FF'},
                {stop: 1, color: 'rgba(255, 200, 255, 0)'}
            ];
        }
        
        if (type.binary) {
            star.companion = {
                radius: star.radius * 0.6 + (Math.random() * 0.4),
                color: ['#FFFFFF', '#FFDDAA', '#AACCFF'][Math.floor(Math.random() * 3)],
                distance: star.radius * (3 + Math.random() * 2),
                angle: Math.random() * Math.PI * 2,
                speed: 0.03 + Math.random() * 0.02,
            };
        }
        
        if (type.expanding) {
            star.expansionRate = 0.1 + Math.random() * 0.1;
            star.maxExpansion = star.radius * (10 + Math.random() * 5);
            star.currentExpansion = 0;
        }
        
        if (type.jets) {
            star.jetLength = star.radius * (10 + Math.random() * 5);
            star.jetWidth = star.radius * 0.5;
            star.jetAngle = Math.random() * Math.PI * 2;
        }
    }
    
    generateSystemObjects() {
        // Коэффициент масштабирования орбит - делаем их более разреженными в системе
        // Увеличиваем орбиты в 2 раза
        const orbitScale = 5.0; // Было 2.5, увеличили в 2 раза
        
        for (const star of this.stars) {
            const systemObjects = [];
            
            // Количество объектов зависит от типа звезды
            let objectCount;
            switch (star.objectType) {
                case 'blackhole':
                    objectCount = 5 + Math.floor(Math.random() * 10); // Меньше объектов
                    break;
                case 'binary':
                    objectCount = 15 + Math.floor(Math.random() * 15); // Среднее количество
                    break;
                case 'neutron':
                case 'pulsar':
                    objectCount = 8 + Math.floor(Math.random() * 12); // Немного объектов
                    break;
                default:
                    objectCount = 20 + Math.floor(Math.random() * 30); // Много объектов
            }
            
            // Генерируем планеты
            const planetCount = Math.floor(objectCount * 0.3); // 30% объектов - планеты
            const planetTypes = systemObjectTypes.filter(t => 
                t.type.includes('planet') || t.type === 'volcanic'
            );
            
            for (let i = 0; i < planetCount; i++) {
                // Убедимся, что planetTypes не пустой массив
                if (planetTypes.length === 0) continue;
                
                const planetType = planetTypes[Math.floor(Math.random() * planetTypes.length)];
                
                // Проверяем наличие необходимых свойств
                if (!planetType || typeof planetType.minOrbit === 'undefined' || typeof planetType.maxOrbit === 'undefined') {
                    console.error('Invalid planet type:', planetType);
                    continue;
                }
                
                // Применяем масштаб к орбитам и гарантируем положительные значения
                const minOrbit = Math.max(planetType.minOrbit * orbitScale, 1);
                const maxOrbit = Math.max(planetType.maxOrbit * orbitScale, minOrbit + 1);
                
                // Равномерно распределяем планеты по орбитам для избегания скученности
                const orbitStep = (maxOrbit - minOrbit) / (planetCount > 1 ? planetCount - 1 : 1);
                const orbit = minOrbit + orbitStep * i;
                
                const angle = Math.random() * Math.PI * 2;
                
                // Убедимся, что радиус положительный
                const minSize = Math.max(planetType.minSize || 1, 1);
                const maxSize = Math.max(planetType.maxSize || minSize + 1, minSize + 1);
                const radius = Math.random() * (maxSize - minSize) + minSize;
                
                const planet = {
                    name: `${planetType.name}-${this.nameIndex++}`,
                    type: planetType.type,
                    objectType: 'planet',
                    color: planetType.color || '#AAAAAA',
                    radius,
                    orbit,
                    angle,
                    // Замедляем скорость вращения в 100 раз (было 10)
                    rotationSpeed: (0.02 + Math.random() * 0.03) * (Math.random() > 0.5 ? 1 : -1) / 100,
                    moons: [],
                    stations: [] // Добавляем массив для космических станций
                };
                
                // Добавляем луны к планетам
                if (planetType.canHaveMoons) {
                    const moonCount = Math.floor(Math.random() * 4); // 0-3 луны
                    const moonType = systemObjectTypes.find(t => t.type === 'moon');
                    
                    // Проверяем наличие moonType и его свойств
                    if (moonType && typeof moonType.minOrbit !== 'undefined' && typeof moonType.maxOrbit !== 'undefined') {
                        for (let j = 0; j < moonCount; j++) {
                            // Гарантируем положительную орбиту для луны
                            const minMoonOrbit = Math.max(moonType.minOrbit, 1);
                            const maxMoonOrbit = Math.max(moonType.maxOrbit, minMoonOrbit + 1);
                            const moonOrbit = minMoonOrbit + Math.random() * (maxMoonOrbit - minMoonOrbit);
                            
                            // Гарантируем положительный радиус для луны
                            const minMoonSize = Math.max(moonType.minSize || 1, 0.5);
                            const maxMoonSize = Math.max(moonType.maxSize || minMoonSize + 0.5, minMoonSize + 0.5);
                            const moonRadius = Math.random() * (maxMoonSize - minMoonSize) + minMoonSize;
                            
                            planet.moons.push({
                                name: `Луна-${this.nameIndex++}`,
                                type: 'moon',
                                color: moonType.color || '#CCCCCC',
                                radius: moonRadius,
                                orbit: moonOrbit,
                                angle: Math.random() * Math.PI * 2,
                                // Замедляем скорость вращения лун в 100 раз (было 10)
                                rotationSpeed: (0.05 + Math.random() * 0.05) / 100
                            });
                        }
                    }
                    
                    // Добавляем космические станции к планетам (0-2 станции)
                    const stationCount = Math.floor(Math.random() * 3);
                    const stationType = systemObjectTypes.find(t => t.type === 'station');
                    
                    if (stationType) {
                        for (let j = 0; j < stationCount; j++) {
                            // Гарантируем положительную орбиту для станции, ближе к планете, чем луны
                            const minStationOrbit = Math.max((planet.radius + 2), 1);
                            const maxStationOrbit = Math.max(minStationOrbit + 5, minStationOrbit + 1);
                            const stationOrbit = minStationOrbit + Math.random() * (maxStationOrbit - minStationOrbit);
                            
                            // Размер станции меньше луны
                            const stationRadius = Math.max(Math.random() * 1.5 + 0.5, 0.5);
                            
                            planet.stations.push({
                                name: `Станция-${this.nameIndex++}`,
                                type: 'station',
                                color: '#AAAAFF',
                                radius: stationRadius,
                                orbit: stationOrbit,
                                angle: Math.random() * Math.PI * 2,
                                // Замедляем скорость вращения станций в 50 раз (было в 5)
                                rotationSpeed: (0.08 + Math.random() * 0.05) / 50
                            });
                        }
                    }
                }
                
                systemObjects.push(planet);
            }
            
            // Генерируем остальные объекты
            const remainingTypes = systemObjectTypes.filter(t => 
                !t.type.includes('planet') && t.type !== 'moon' && t.type !== 'volcanic' && t.type !== 'station'
            );
            
            // Проверяем, что есть типы объектов для генерации
            if (remainingTypes.length > 0) {
                for (let i = 0; i < objectCount - planetCount; i++) {
                    const objectType = remainingTypes[Math.floor(Math.random() * remainingTypes.length)];
                    
                    // Проверяем наличие необходимых свойств
                    if (!objectType || typeof objectType.minOrbit === 'undefined' || typeof objectType.maxOrbit === 'undefined') {
                        console.error('Invalid object type:', objectType);
                        continue;
                    }
                    
                    // Применяем масштаб к орбитам и гарантируем положительные значения
                    const minOrbit = Math.max(objectType.minOrbit * orbitScale, 1);
                    const maxOrbit = Math.max(objectType.maxOrbit * orbitScale, minOrbit + 1);
                    
                    // Распределяем остальные объекты по орбитам
                    const orbitRange = maxOrbit - minOrbit;
                    const orbit = minOrbit + Math.random() * orbitRange;
                    
                    const angle = Math.random() * Math.PI * 2;
                    
                    // Убедимся, что радиус положительный
                    const minSize = Math.max(objectType.minSize || 1, 1);
                    const maxSize = Math.max(objectType.maxSize || minSize + 1, minSize + 1);
                    
                    // Для газовых облаков увеличиваем размер в 3 раза
                    const sizeMultiplier = objectType.type === 'gas_cloud' ? 3 : 1;
                    const radius = (Math.random() * (maxSize - minSize) + minSize) * sizeMultiplier;
                    
                    // Добавляем признак isStatic для газовых облаков
                    const isStatic = objectType.type === 'gas_cloud';
                    
                    systemObjects.push({
                        name: `${objectType.name}-${this.nameIndex++}`,
                        type: objectType.type,
                        objectType: 'space_object',
                        color: objectType.color || '#AAAAAA',
                        radius,
                        orbit,
                        angle,
                        // Замедляем скорость вращения в 100 раз (было 10), для газовых облаков ставим 0
                        rotationSpeed: isStatic ? 0 : (0.01 + Math.random() * 0.02) * (Math.random() > 0.5 ? 1 : -1) / 100,
                        isStatic // Добавляем признак статичности объекта
                    });
                }
            }
            
            this.systemObjects.set(star, systemObjects);
        }
    }
    
    setupEventListeners() {
        // Обработчик клика мыши
        this.canvas.addEventListener('click', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            if (this.viewMode === VIEW_MODES.SYSTEM && this.currentStar) {
                // Проверяем клик по объекту системы
                const clickedObject = this.findSystemObjectAtPosition(mouseX, mouseY);
                if (clickedObject) {
                    this.selectedSystemObject = clickedObject;
                    this.showSystemObjectInfo(clickedObject);
                    return; // Прекращаем проверку, если нашли объект системы
                } else {
                    this.selectedSystemObject = null;
                }
            }
            
            // Проверяем, был ли клик по звезде
            const clickedStar = this.findStarAtPosition(mouseX, mouseY);
            if (clickedStar) {
                this.targetStar = clickedStar;
                this.updateStarInfo();
            }
        });
        
        // Обработчик двойного клика
        this.canvas.addEventListener('dblclick', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const clickedStar = this.findStarAtPosition(mouseX, mouseY);
            if (clickedStar) {
                this.currentStar = clickedStar;
                this.targetStar = null;
                this.updateStarInfo();
            }
        });
        
        // Обработчики для перемещения карты
        this.canvas.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
        });
        
        window.addEventListener('mouseup', () => {
            this.isDragging = false;
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                const deltaX = e.clientX - this.lastMouseX;
                const deltaY = e.clientY - this.lastMouseY;
                
                this.offsetX += deltaX / this.scale;
                this.offsetY += deltaY / this.scale;
                
                this.lastMouseX = e.clientX;
                this.lastMouseY = e.clientY;
            }
        });
        
        // Обработчик для масштабирования карты
        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Преобразуем координаты мыши в координаты мира до изменения масштаба
            const worldX = (mouseX - this.canvas.width / 2) / this.scale - this.offsetX;
            const worldY = (mouseY - this.canvas.height / 2) / this.scale - this.offsetY;
            
            // Изменяем масштаб
            const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
            this.scale *= zoomFactor;
            
            // Ограничение масштаба
            this.scale = Math.max(0.1, Math.min(5, this.scale));
            
            // Корректируем смещение, чтобы место под курсором оставалось на том же месте
            this.offsetX = -(worldX - (mouseX - this.canvas.width / 2) / this.scale);
            this.offsetY = -(worldY - (mouseY - this.canvas.height / 2) / this.scale);
        });
    }
    
    findStarAtPosition(x, y) {
        // Преобразуем координаты экрана в координаты мира
        const worldX = (x - this.canvas.width / 2) / this.scale - this.offsetX;
        const worldY = (y - this.canvas.height / 2) / this.scale - this.offsetY;
        
        // Находим звезду под курсором
        for (const star of this.stars) {
            const dx = star.x - worldX;
            const dy = star.y - worldY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Для объектов с аккреционным диском или расширяющихся объектов используем больший радиус
            let selectionRadius = star.radius;
            if (star.accretionDiskRadius) selectionRadius = star.accretionDiskRadius / 2;
            if (star.expanding && star.currentExpansion) selectionRadius = star.currentExpansion / 2;
            
            // Учитываем размер звезды и добавляем небольшой запас для удобства выбора
            if (distance < selectionRadius + 10) {
                return star;
            }
        }
        
        return null;
    }
    
    updateStarInfo() {
        // Обновляем информацию о текущей звезде
        if (this.currentStar) {
            document.getElementById('currentStarName').textContent = this.currentStar.name;
            document.getElementById('currentStarInfo').textContent = `Тип: ${this.currentStar.type}`;
        } else {
            document.getElementById('currentStarName').textContent = 'Нет';
            document.getElementById('currentStarInfo').textContent = '';
        }
        
        // Обновляем информацию о целевой звезде
        if (this.targetStar) {
            document.getElementById('targetStarName').textContent = this.targetStar.name;
            document.getElementById('targetStarInfo').textContent = `Тип: ${this.targetStar.type}`;
            
            // Рассчитываем расстояние
            if (this.currentStar) {
                const distance = this.calculateDistance(this.currentStar, this.targetStar);
                document.getElementById('distance').textContent = distance.toFixed(2);
            }
        } else {
            document.getElementById('targetStarName').textContent = 'Нет';
            document.getElementById('targetStarInfo').textContent = '';
            document.getElementById('distance').textContent = '0';
        }
    }
    
    calculateDistance(star1, star2) {
        const dx = star2.x - star1.x;
        const dy = star2.y - star1.y;
        return Math.sqrt(dx * dx + dy * dy) / 10; // Делим на 10 для более реалистичных значений
    }
    
    setupViewModeButton() {
        const viewModeButton = document.getElementById('viewModeButton');
        viewModeButton.addEventListener('click', () => {
            if (this.viewMode === VIEW_MODES.GLOBAL) {
                this.switchToSystemView();
            } else {
                this.switchToGlobalView();
            }
        });
    }
    
    switchToSystemView() {
        if (!this.currentStar) return;
        
        // Сохраняем текущие глобальные настройки
        this.globalViewScale = this.scale;
        this.globalViewOffset = { x: this.offsetX, y: this.offsetY };
        
        // Устанавливаем режим просмотра системы
        this.viewMode = VIEW_MODES.SYSTEM;
        
        // Устанавливаем масштаб, уменьшаем его для более широкого обзора системы
        this.systemViewScale = 0.8;
        this.scale = this.systemViewScale;
        
        // Центрируем вид на текущей звезде
        this.offsetX = -this.currentStar.x;
        this.offsetY = -this.currentStar.y;
        
        // Сбрасываем выбранный объект
        this.selectedSystemObject = null;
        
        // Обновляем текст кнопки
        document.getElementById('viewModeButton').textContent = 'Показать галактику';
        
        // Показываем информацию о системе
        const systemInfo = document.getElementById('systemInfo');
        if (systemInfo) {
            systemInfo.style.display = 'block';
            this.updateSystemInfo();
        } else {
            console.error('Element with ID "systemInfo" not found');
        }
    }
    
    switchToGlobalView() {
        // Восстанавливаем глобальные настройки
        this.viewMode = VIEW_MODES.GLOBAL;
        this.scale = this.globalViewScale;
        this.offsetX = this.globalViewOffset.x;
        this.offsetY = this.globalViewOffset.y;
        
        // Обновляем текст кнопки
        document.getElementById('viewModeButton').textContent = 'Показать систему';
        
        // Скрываем информацию о системе
        document.getElementById('systemInfo').style.display = 'none';
    }
    
    updateSystemInfo() {
        if (!this.currentStar) return;
        
        // Если выбран конкретный объект, показываем информацию о нем
        if (this.selectedSystemObject) {
            this.showSystemObjectInfo(this.selectedSystemObject);
            return;
        }
        
        const systemObjects = this.systemObjects.get(this.currentStar);
        if (!systemObjects) return;
        
        const systemInfoContent = document.getElementById('systemInfoContent');
        if (!systemInfoContent) {
            console.error('Element with ID "systemInfoContent" not found');
            return;
        }
        
        let info = `<h4>Система: ${this.currentStar.name}</h4>`;
        info += `<p>Тип звезды: ${this.currentStar.type}</p>`;
        
        // Добавляем информацию о звезде в зависимости от её типа
        switch (this.currentStar.objectType) {
            case 'binary':
                info += '<p>Двойная система</p>';
                info += '<p>Компаньон: ' + this.getCompanionInfo(this.currentStar) + '</p>';
                break;
            case 'blackhole':
                info += '<p>Характеристики чёрной дыры:</p>';
                info += `<p>- Радиус горизонта событий: ${this.currentStar.radius.toFixed(1)} св. ед.</p>`;
                info += `<p>- Радиус аккреционного диска: ${this.currentStar.accretionDiskRadius.toFixed(1)} св. ед.</p>`;
                break;
            case 'neutron':
                info += '<p>Характеристики нейтронной звезды:</p>';
                info += `<p>- Период пульсации: ${(1/this.currentStar.pulseRate).toFixed(2)} сек</p>`;
                break;
            case 'pulsar':
                info += '<p>Характеристики пульсара:</p>';
                info += `<p>- Частота импульсов: ${this.currentStar.pulseRate} Гц</p>`;
                break;
            case 'supernova':
                info += '<p>Характеристики сверхновой:</p>';
                info += `<p>- Радиус расширения: ${(this.currentStar.currentExpansion || 0).toFixed(1)} св. ед.</p>`;
                break;
            case 'quasar':
                info += '<p>Характеристики квазара:</p>';
                info += `<p>- Длина джетов: ${this.currentStar.jetLength.toFixed(1)} св. ед.</p>`;
                break;
        }
        
        // Добавляем статистику системы
        const planets = systemObjects.filter(obj => obj.objectType === 'planet');
        const stations = systemObjects.filter(obj => obj.type === 'station');
        const anomalies = systemObjects.filter(obj => obj.type === 'anomaly' || obj.type === 'ruins');
        const gasClouds = systemObjects.filter(obj => obj.type === 'gas_cloud');
        const asteroidFields = systemObjects.filter(obj => obj.type === 'asteroid_field');
        
        info += '<h4>Состав системы:</h4>';
        info += `<p>Планет: ${planets.length}</p>`;
        info += `<p>Космических станций: ${stations.length}</p>`;
        info += `<p>Астероидных полей: ${asteroidFields.length}</p>`;
        info += `<p>Газовых облаков: ${gasClouds.length}</p>`;
        info += `<p>Аномалий и руин: ${anomalies.length}</p>`;
        
        // Добавляем подсказку о том, как получить детальную информацию
        info += '<div class="info-tip">Нажмите на любой объект в системе для просмотра детальной информации</div>';
        
        systemInfoContent.innerHTML = info;
    }
    
    getCompanionInfo(star) {
        if (!star.companion) return 'нет данных';
        return `Радиус: ${star.companion.radius.toFixed(1)} св. ед., ` +
               `Орбитальный период: ${(2 * Math.PI / star.companion.speed).toFixed(1)} дней`;
    }
    
    draw() {
        const ctx = this.ctx;
        const canvas = this.canvas;
        
        this.time += 0.01;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.background.draw(ctx);
        
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(this.scale, this.scale);
        ctx.translate(this.offsetX, this.offsetY);
        
        // В режиме системы рисуем только близкие к текущей звезде объекты
        if (this.viewMode === VIEW_MODES.SYSTEM && this.currentStar) {
            // Рисуем звезду в центре с увеличенным масштабом (в 5 раз больше)
            this.drawStar(ctx, this.currentStar, 5.0);
            
            // Рисуем объекты системы
            const systemObjects = this.systemObjects.get(this.currentStar);
            if (systemObjects) {
                for (const obj of systemObjects) {
                    this.drawSystemObject(ctx, obj, this.currentStar);
                }
            }
        } else {
            // В глобальном режиме рисуем все звезды
            for (const star of this.stars) {
                this.drawStar(ctx, star);
            }
        }
        
        // Рисуем маршрут между звездами только в глобальном режиме
        if (this.viewMode === VIEW_MODES.GLOBAL && this.currentStar && this.targetStar) {
            this.drawRoute(ctx);
        }
        
        ctx.restore();
    }
    
    drawStar(ctx, star) {
        // Если мы в режиме системы и это текущая звезда, увеличим её размер
        const starScale = (this.viewMode === VIEW_MODES.SYSTEM && star === this.currentStar) ? 2.5 : 1;
        
        // Определяем цвет свечения звезды
        const glowColor = star.glow || '#FFFFFF';
        
        // Пульсация для эффекта - с проверкой наличия pulseRate
        const pulseRate = star.pulseRate || 1; // Значение по умолчанию 1
        const pulse = 1 + Math.sin(this.time * pulseRate) * 0.1;
        
        // Проверяем наличие радиуса и избегаем NaN/Infinity
        if (!star.radius || isNaN(star.radius) || !isFinite(star.radius)) {
            console.error('Invalid star radius:', star);
            return; // Пропускаем отрисовку звезды с некорректным радиусом
        }
        
        // Создаем свечение вокруг звезды
        const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.radius * 3 * pulse * starScale
        );
        gradient.addColorStop(0, glowColor);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 3 * pulse * starScale, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.3;
        ctx.fill();
        ctx.globalAlpha = 1;
        
        // Определяем тип звезды и вызываем соответствующий метод отрисовки
        switch (star.objectType) {
            case 'normal':
            case 'star': // Поддерживаем оба названия типов для совместимости
                this.drawNormalStar(ctx, star, starScale);
                break;
            case 'neutron':
                this.drawNeutronStar(ctx, star, starScale);
                break;
            case 'pulsar':
                this.drawPulsar(ctx, star, starScale);
                break;
            case 'blackhole':
                this.drawBlackHole(ctx, star, starScale);
                break;
            case 'binary':
                this.drawBinaryStar(ctx, star, starScale);
                break;
            case 'supernova':
                this.drawSupernova(ctx, star, starScale);
                break;
            case 'quasar':
                this.drawQuasar(ctx, star, starScale);
                break;
            default:
                // Если тип неизвестен, рисуем как обычную звезду
                this.drawNormalStar(ctx, star, starScale);
        }
        
        // Рисуем название звезды, если она выбрана
        if (this.targetStar === star) {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(star.name, star.x, star.y - star.radius * starScale - 10);
        }
    }
    
    drawNormalStar(ctx, star, scale = 1) {
        scale = scale || 1; // Если масштаб не передан, используем 1
        
        // Пульсирующий эффект для звезды
        const pulseRate = star.pulseRate || 1; // Значение по умолчанию, если не задано
        const pulse = 1 + Math.sin(this.time * pulseRate) * 0.1;
        
        // Создаем градиент для звезды
        const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.radius * scale
        );
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(0.5, star.color || '#FFDD88'); // Цвет по умолчанию, если не задан
        gradient.addColorStop(1, star.color || '#FFDD88');
        
        // Рисуем основную часть звезды
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * pulse * scale, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    }
    
    drawNeutronStar(ctx, star, scale = 1) {
        scale = scale || 1; // Значение по умолчанию
        
        // Нейтронная звезда - маленькая с интенсивным свечением
        const pulseRate = star.pulseRate || 5;
        const pulseOffset = star.pulseOffset || 0;
        const glowIntensity = star.glowIntensity || 1.5;
        const pulse = 1 + Math.sin(this.time * pulseRate + pulseOffset) * 0.2;
        const currentRadius = star.radius * pulse * scale;
        
        // Большое яркое свечение
        const glowRadius = currentRadius * 6 * glowIntensity;
        const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, glowRadius
        );
        gradient.addColorStop(0, star.glow || '#AAAAFF');
        gradient.addColorStop(0.3, 'rgba(170, 170, 255, 0.7)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.6 * pulse;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        
        // Основа нейтронной звезды
        ctx.beginPath();
        ctx.arc(star.x, star.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = star.color || '#AAAAFF';
        ctx.fill();
        
        // Интенсивный блик
        ctx.beginPath();
        ctx.arc(
            star.x, 
            star.y, 
            currentRadius * 0.7, 
            0, Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
    }
    
    drawPulsar(ctx, star, scale = 1) {
        scale = scale || 1;
        
        // Пульсар - быстро пульсирующая звезда вытянутой формы, которая вращается
        const pulseRate = star.pulseRate || 20;
        const glowIntensity = star.glowIntensity || 1.5;
        const rotationAngle = star.rotationAngle || 0;
        const pulse = 1 + Math.sin(this.time * pulseRate) * 0.3;
        const currentRadius = star.radius * scale;
        
        // Параметры эллипса для пульсара
        const majorAxis = currentRadius * 2.5; // Большая ось эллипса
        const minorAxis = currentRadius * 0.8; // Малая ось эллипса
        const rotationSpeed = 3; // Скорость вращения
        
        // Свечение пульсара
        const glowRadius = currentRadius * 5 * glowIntensity * pulse;
        const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, glowRadius
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(0.2, star.glow || '#AAAAFF');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.3 * pulse;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        
        // Рисуем основу пульсара (эллипс)
        ctx.save();
        ctx.translate(star.x, star.y);
        ctx.rotate(this.time * rotationSpeed + rotationAngle);
        
        // Рисуем эллипс
        ctx.beginPath();
        ctx.ellipse(0, 0, majorAxis, minorAxis, 0, 0, Math.PI * 2);
        
        // Создаем градиент для эллипса
        const ellipseGradient = ctx.createRadialGradient(
            0, 0, 0,
            0, 0, majorAxis
        );
        ellipseGradient.addColorStop(0, '#FFFFFF');
        ellipseGradient.addColorStop(0.5, star.color || '#AAAAFF');
        ellipseGradient.addColorStop(1, 'rgba(150, 150, 255, 0.7)');
        
        ctx.fillStyle = ellipseGradient;
        ctx.fill();
        
        // Добавляем детали к пульсару - линии вдоль эллипса
        ctx.beginPath();
        ctx.ellipse(0, 0, majorAxis * 0.8, minorAxis * 0.8, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Второе кольцо
        ctx.beginPath();
        ctx.ellipse(0, 0, majorAxis * 0.5, minorAxis * 0.5, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        ctx.restore();
    }
    
    drawBlackHole(ctx, star, scale = 1) {
        scale = scale || 1;
        
        // Черная дыра с аккреционным диском
        
        // Обновляем угол вращения
        star.accretionDiskAngle = (star.accretionDiskAngle || 0) + 0.01;
        
        // Рисуем аккреционный диск
        if (star.accretionDiskRadius) {
            const diskRadius = star.accretionDiskRadius * scale;
            const innerRadius = star.radius * 1.5 * scale;
            
            ctx.save();
            ctx.translate(star.x, star.y);
            ctx.rotate(star.accretionDiskAngle || 0);
            
            // Создаем градиент для аккреционного диска
            const diskGradient = ctx.createRadialGradient(
                0, 0, innerRadius,
                0, 0, diskRadius
            );
            
            const diskColors = star.accretionDiskColors || [
                {stop: 0, color: '#660066'},
                {stop: 0.2, color: '#990099'},
                {stop: 0.4, color: '#CC00CC'},
                {stop: 0.6, color: '#FF00FF'},
                {stop: 0.8, color: '#FF66FF'},
                {stop: 1, color: 'rgba(255, 200, 255, 0)'}
            ];
            
            for (const color of diskColors) {
                diskGradient.addColorStop(color.stop, color.color);
            }
            
            // Рисуем диск с вырезанным центром
            ctx.beginPath();
            ctx.arc(0, 0, diskRadius, 0, Math.PI * 2);
            ctx.fillStyle = diskGradient;
            ctx.fill();
            
            // Добавляем детали к диску - несколько ярких полос
            const stripeCount = 5;
            const baseAngle = Math.PI * 2 / stripeCount;
            
            for (let i = 0; i < stripeCount; i++) {
                const angle = baseAngle * i;
                const width = diskRadius * 0.1;
                const length = diskRadius - innerRadius;
                
                ctx.save();
                ctx.rotate(angle);
                
                // Градиент для полосы
                const stripeGradient = ctx.createLinearGradient(
                    innerRadius, 0,
                    diskRadius, 0
                );
                stripeGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
                stripeGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                
                // Полоса
                ctx.beginPath();
                ctx.moveTo(innerRadius, -width / 2);
                ctx.lineTo(diskRadius, -width / 2);
                ctx.lineTo(diskRadius, width / 2);
                ctx.lineTo(innerRadius, width / 2);
                ctx.closePath();
                ctx.fillStyle = stripeGradient;
                ctx.globalAlpha = 0.3 + Math.sin(this.time * 3 + i) * 0.2;
                ctx.fill();
                ctx.globalAlpha = 1.0;
                
                ctx.restore();
            }
            
            // Создаем эффект скорости вращения - размытие по краям
            ctx.beginPath();
            ctx.arc(0, 0, diskRadius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 100, 255, 0.3)';
            ctx.lineWidth = 5;
            ctx.stroke();
            
            ctx.restore();
        }
        
        // Рисуем черную дыру (черный круг)
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * scale, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        ctx.shadowBlur = 0;
        
        // Добавляем эффект гравитационной линзы вокруг черной дыры
        const lensRadius = star.radius * 2 * scale;
        const lensGradient = ctx.createRadialGradient(
            star.x, star.y, star.radius * scale,
            star.x, star.y, lensRadius
        );
        lensGradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
        lensGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.4)');
        lensGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, lensRadius, 0, Math.PI * 2);
        ctx.fillStyle = lensGradient;
        ctx.fill();
    }
    
    drawBinaryStar(ctx, star, scale = 1) {
        scale = scale || 1;
        
        // Двойная звезда - две звезды, вращающиеся вокруг общего центра масс
        const pulse = 1 + Math.sin(this.time * 2 + (star.pulseOffset || 0)) * 0.1;
        const currentRadius = star.radius * pulse * scale;
        
        // Основная звезда
        const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, currentRadius
        );
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(0.5, star.color || '#FFAAAA');
        gradient.addColorStop(1, star.color || '#FFAAAA');
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Добавляем компаньона, если он определен
        if (star.companion) {
            // Обновляем положение компаньона
            star.companion.angle = (star.companion.angle || 0) + (star.companion.speed || 0.02);
            
            // Вычисляем позицию компаньона
            const companionX = star.x + Math.cos(star.companion.angle) * (star.companion.distance || star.radius * 4) * scale;
            const companionY = star.y + Math.sin(star.companion.angle) * (star.companion.distance || star.radius * 4) * scale;
            
            // Рисуем компаньона
            const companionRadius = (star.companion.radius || star.radius * 0.6) * pulse * scale;
            const companionGradient = ctx.createRadialGradient(
                companionX, companionY, 0,
                companionX, companionY, companionRadius
            );
            companionGradient.addColorStop(0, '#FFFFFF');
            companionGradient.addColorStop(0.5, star.companion.color || '#AAAAFF');
            companionGradient.addColorStop(1, star.companion.color || '#AAAAFF');
            
            ctx.beginPath();
            ctx.arc(companionX, companionY, companionRadius, 0, Math.PI * 2);
            ctx.fillStyle = companionGradient;
            ctx.fill();
            
            // Рисуем линию соединения между звездами
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(companionX, companionY);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Рисуем орбиту компаньона
            ctx.beginPath();
            ctx.arc(star.x, star.y, (star.companion.distance || star.radius * 4) * scale, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
    
    drawSupernova(ctx, star, scale = 1) {
        scale = scale || 1;
        
        // Сверхновая звезда - расширяющаяся без лучей
        
        // Обновляем расширение, если это сверхновая со свойством expanding
        if (star.expanding) {
            star.currentExpansion = (star.currentExpansion || 0) + (star.expansionRate || 0.1);
            
            // Ограничиваем максимальное расширение
            if (star.currentExpansion > (star.maxExpansion || star.radius * 15)) {
                star.currentExpansion = star.maxExpansion || star.radius * 15;
            }
        }
        
        // Радиус расширения (меньше в начале, больше в конце)
        const expansionRadius = (star.currentExpansion || star.radius * 5) * scale;
        
        // Пульсирующий эффект
        const pulse = 1 + Math.sin(this.time * 3) * 0.1;
        
        // Внешние несколько слоев сверхновой (концентрические расширяющиеся оболочки)
        // Первый (самый внешний) слой
        const outerGradient1 = ctx.createRadialGradient(
            star.x, star.y, expansionRadius * 0.7,
            star.x, star.y, expansionRadius
        );
        outerGradient1.addColorStop(0, 'rgba(255, 100, 50, 0.5)');
        outerGradient1.addColorStop(1, 'rgba(100, 50, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, expansionRadius, 0, Math.PI * 2);
        ctx.fillStyle = outerGradient1;
        ctx.fill();
        
        // Второй слой
        const outerGradient2 = ctx.createRadialGradient(
            star.x, star.y, expansionRadius * 0.5,
            star.x, star.y, expansionRadius * 0.7
        );
        outerGradient2.addColorStop(0, 'rgba(255, 150, 50, 0.6)');
        outerGradient2.addColorStop(1, 'rgba(255, 100, 50, 0.3)');
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, expansionRadius * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = outerGradient2;
        ctx.fill();
        
        // Третий слой (ближе к центру)
        const outerGradient3 = ctx.createRadialGradient(
            star.x, star.y, expansionRadius * 0.2,
            star.x, star.y, expansionRadius * 0.5
        );
        outerGradient3.addColorStop(0, 'rgba(255, 200, 50, 0.8)');
        outerGradient3.addColorStop(1, 'rgba(255, 150, 50, 0.5)');
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, expansionRadius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = outerGradient3;
        ctx.fill();
        
        // Ядро сверхновой
        const coreSize = star.radius * pulse * scale;
        const coreGradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, coreSize
        );
        coreGradient.addColorStop(0, '#FFFFFF');
        coreGradient.addColorStop(0.5, '#FFFF88');
        coreGradient.addColorStop(1, '#FF5500');
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, coreSize, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();
        
        // Добавляем эффект вспышки вокруг ядра
        const flashRadius = coreSize * 2;
        ctx.beginPath();
        ctx.arc(star.x, star.y, flashRadius, 0, Math.PI * 2);
        
        const flashGradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, flashRadius
        );
        flashGradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
        flashGradient.addColorStop(0.5, 'rgba(255, 255, 100, 0.5)');
        flashGradient.addColorStop(1, 'rgba(255, 200, 50, 0)');
        
        ctx.fillStyle = flashGradient;
        ctx.fill();
    }
    
    drawQuasar(ctx, star, scale = 1) {
        scale = scale || 1;
        
        // Квазар - яркий центр с джетами (струями)
        
        // Пульсирующий эффект
        const pulse = 1 + Math.sin(this.time * 4) * 0.2;
        const currentRadius = star.radius * pulse * scale;
        
        // Рисуем яркое ядро квазара
        const coreGradient = ctx.createRadialGradient(
            star.x, star.y, 0, 
            star.x, star.y, currentRadius
        );
        coreGradient.addColorStop(0, '#FFFFFF');
        coreGradient.addColorStop(0.3, '#AADDFF');
        coreGradient.addColorStop(1, '#0088FF');
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();
        
        // Рисуем джеты
        if (star.jets) {
            // Обновляем угол джетов
            star.jetAngle = (star.jetAngle || 0) + 0.005;
            
            // Первый джет
            this.drawJet(
                ctx, 
                star.x, 
                star.y, 
                star.jetAngle, 
                (star.jetLength || star.radius * 15) * scale, 
                (star.jetWidth || star.radius * 0.5) * scale
            );
            
            // Второй джет (в противоположном направлении)
            this.drawJet(
                ctx, 
                star.x, 
                star.y, 
                star.jetAngle + Math.PI, 
                (star.jetLength || star.radius * 15) * scale, 
                (star.jetWidth || star.radius * 0.5) * scale
            );
        }
        
        // Добавляем свечение вокруг ядра
        const glowRadius = currentRadius * 4;
        const glowGradient = ctx.createRadialGradient(
            star.x, star.y, currentRadius,
            star.x, star.y, glowRadius
        );
        glowGradient.addColorStop(0, 'rgba(50, 150, 255, 0.7)');
        glowGradient.addColorStop(1, 'rgba(50, 150, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.globalAlpha = 1.0;
    }
    
    // Вспомогательный метод для рисования джетов квазара
    drawJet(ctx, x, y, angle, length, width) {
        // Параметры волн в джете
        const waveAmplitude = width * 0.2;
        const waveLength = width * 2;
        const waveSpeed = this.time * 5;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        
        // Создаем градиент для джета
        const jetGradient = ctx.createLinearGradient(0, 0, length, 0);
        jetGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        jetGradient.addColorStop(0.2, 'rgba(100, 170, 255, 0.8)');
        jetGradient.addColorStop(0.8, 'rgba(50, 100, 255, 0.4)');
        jetGradient.addColorStop(1, 'rgba(50, 100, 255, 0)');
        
        // Рисуем джет в виде волнистой линии
        ctx.beginPath();
        ctx.moveTo(0, 0);
        
        // Верхняя граница джета
        for (let i = 0; i <= length; i += 5) {
            const wave = Math.sin(i / waveLength + waveSpeed) * waveAmplitude;
            const widthAtPoint = width * (1 - i / length); // Джет сужается к концу
            ctx.lineTo(i, -widthAtPoint / 2 + wave);
        }
        
        // Кончик джета
        ctx.lineTo(length, 0);
        
        // Нижняя граница джета
        for (let i = length; i >= 0; i -= 5) {
            const wave = Math.sin(i / waveLength + waveSpeed) * waveAmplitude;
            const widthAtPoint = width * (1 - i / length);
            ctx.lineTo(i, widthAtPoint / 2 + wave);
        }
        
        ctx.closePath();
        ctx.fillStyle = jetGradient;
        ctx.fill();
        
        // Добавляем яркие точки вдоль джета для эффекта
        const dotCount = 5;
        for (let i = 1; i < dotCount; i++) {
            const dotPos = (length / dotCount) * i;
            const dotSize = width * 0.3 * (1 - i / dotCount);
            
            ctx.beginPath();
            ctx.arc(dotPos, 0, dotSize, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
        }
        
        ctx.restore();
    }
    
    drawRoute(ctx) {
        const gradient = ctx.createLinearGradient(
            this.currentStar.x, this.currentStar.y,
            this.targetStar.x, this.targetStar.y
        );
        gradient.addColorStop(0, this.currentStar.glow || '#FFFFFF');
        gradient.addColorStop(1, this.targetStar.glow || '#FFFFFF');
        
        const pulseOpacity = 0.6 + Math.sin(this.time * 2) * 0.2;
        
        ctx.beginPath();
        ctx.moveTo(this.currentStar.x, this.currentStar.y);
        ctx.lineTo(this.targetStar.x, this.targetStar.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.globalAlpha = pulseOpacity;
        ctx.stroke();
        ctx.globalAlpha = 1;
        
        // Свечение линии
        ctx.beginPath();
        ctx.moveTo(this.currentStar.x, this.currentStar.y);
        ctx.lineTo(this.targetStar.x, this.targetStar.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 5;
        ctx.globalAlpha = pulseOpacity * 0.3;
        ctx.stroke();
        ctx.globalAlpha = 1;
        
        // Отображение дистанции
        const midX = (this.currentStar.x + this.targetStar.x) / 2;
        const midY = (this.currentStar.y + this.targetStar.y) / 2;
        const distance = this.calculateDistance(this.currentStar, this.targetStar);
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(midX - 50, midY - 15, 100, 20);
        ctx.strokeStyle = 'rgba(100, 149, 237, 0.7)';
        ctx.lineWidth = 1;
        ctx.strokeRect(midX - 50, midY - 15, 100, 20);
        
        ctx.fillStyle = '#64c8ff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${distance.toFixed(2)} св.лет`, midX, midY);
    }
    
    adjustColor(color, amount) {
        const hex = color.replace('#', '');
        const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
        const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
        const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
    
    // Добавляем метод для поиска объекта системы по клику
    findSystemObjectAtPosition(x, y) {
        if (this.viewMode !== VIEW_MODES.SYSTEM || !this.currentStar) return null;
        
        // Преобразуем координаты экрана в координаты мира
        const worldX = (x - this.canvas.width / 2) / this.scale - this.offsetX;
        const worldY = (y - this.canvas.height / 2) / this.scale - this.offsetY;
        
        const systemObjects = this.systemObjects.get(this.currentStar);
        if (!systemObjects) return null;
        
        // Перебираем объекты от ближних к дальним (чтобы ближние имели приоритет при клике)
        for (const obj of systemObjects) {
            // Проверяем, что у объекта есть необходимые свойства для определения положения
            if (!obj || !obj.orbit || typeof obj.angle !== 'number') continue;
            
            // Проверяем, что радиус положительный
            if (!obj.radius || obj.radius <= 0) continue;
            
            // Вычисляем реальную позицию объекта
            const objX = this.currentStar.x + Math.cos(obj.angle) * obj.orbit;
            const objY = this.currentStar.y + Math.sin(obj.angle) * obj.orbit;
            
            const dx = objX - worldX;
            const dy = objY - worldY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Используем радиус объекта с небольшим запасом для удобства выбора
            const selectionRadius = obj.radius * 1.5;
            
            if (distance < selectionRadius) {
                return obj;
            }
            
            // Проверяем луны для планет
            if (obj.objectType === 'planet' && obj.moons && obj.moons.length > 0) {
                for (const moon of obj.moons) {
                    // Проверяем свойства луны
                    if (!moon || !moon.orbit || typeof moon.angle !== 'number' || !moon.radius || moon.radius <= 0) continue;
                    
                    const moonX = objX + Math.cos(moon.angle) * moon.orbit;
                    const moonY = objY + Math.sin(moon.angle) * moon.orbit;
                    
                    const moonDx = moonX - worldX;
                    const moonDy = moonY - worldY;
                    const moonDistance = Math.sqrt(moonDx * moonDx + moonDy * moonDy);
                    
                    if (moonDistance < moon.radius * 1.5) {
                        return { ...moon, parentPlanet: obj };
                    }
                }
            }
            
            // Проверяем космические станции вокруг планет
            if (obj.objectType === 'planet' && obj.stations && obj.stations.length > 0) {
                for (const station of obj.stations) {
                    // Проверяем свойства станции
                    if (!station || !station.orbit || typeof station.angle !== 'number' || !station.radius || station.radius <= 0) continue;
                    
                    const stationX = objX + Math.cos(station.angle) * station.orbit;
                    const stationY = objY + Math.sin(station.angle) * station.orbit;
                    
                    const stationDx = stationX - worldX;
                    const stationDy = stationY - worldY;
                    const stationDistance = Math.sqrt(stationDx * stationDx + stationDy * stationDy);
                    
                    if (stationDistance < station.radius * 2) { // Используем больший радиус выбора для станций
                        return { ...station, parentPlanet: obj };
                    }
                }
            }
        }
        
        return null;
    }
    
    // Добавляем метод для отображения информации о выбранном объекте
    showSystemObjectInfo(obj) {
        let infoText = '';
        
        if (obj.parentPlanet && obj.type === 'moon') {
            // Это луна
            infoText = `<h4>Луна: ${obj.name}</h4>`;
            infoText += `<p>Орбита планеты: ${obj.parentPlanet.name}</p>`;
            infoText += `<p>Радиус: ${obj.radius.toFixed(1)} ед.</p>`;
            infoText += `<p>Орбитальное расстояние: ${obj.orbit.toFixed(1)} ед.</p>`;
            infoText += `<p>Скорость вращения: ${(obj.rotationSpeed * 100).toFixed(1)}</p>`;
        } else if (obj.parentPlanet && obj.type === 'station') {
            // Это станция на орбите планеты
            infoText = `<h4>Космическая станция: ${obj.name}</h4>`;
            infoText += `<p>Орбита планеты: ${obj.parentPlanet.name}</p>`;
            infoText += `<p>Радиус станции: ${obj.radius.toFixed(1)} ед.</p>`;
            infoText += `<p>Орбитальное расстояние: ${obj.orbit.toFixed(1)} ед.</p>`;
            infoText += `<p>Скорость вращения: ${(obj.rotationSpeed * 100).toFixed(1)}</p>`;
            infoText += `<p>Тип: Орбитальная станция</p>`;
        } else if (obj.objectType === 'planet') {
            // Это планета
            infoText = `<h4>Планета: ${obj.name}</h4>`;
            infoText += `<p>Тип: ${obj.type.replace('_', ' ')}</p>`;
            infoText += `<p>Радиус: ${obj.radius.toFixed(1)} ед.</p>`;
            infoText += `<p>Орбитальное расстояние: ${obj.orbit.toFixed(1)} ед.</p>`;
            
            if (obj.moons && obj.moons.length > 0) {
                infoText += `<p>Количество спутников: ${obj.moons.length}</p>`;
            }
            
            if (obj.stations && obj.stations.length > 0) {
                infoText += `<p>Количество станций: ${obj.stations.length}</p>`;
            }
        } else if (obj.type === 'station') {
            // Это станция на орбите звезды
            infoText = `<h4>Космическая станция: ${obj.name}</h4>`;
            infoText += `<p>Орбита звезды: ${this.currentStar.name}</p>`;
            infoText += `<p>Радиус станции: ${obj.radius.toFixed(1)} ед.</p>`;
            infoText += `<p>Орбитальное расстояние: ${obj.orbit.toFixed(1)} ед.</p>`;
            infoText += `<p>Скорость вращения: ${(obj.rotationSpeed * 100).toFixed(1)}</p>`;
            infoText += `<p>Тип: Орбитальная станция</p>`;
        } else if (obj.type === 'gas_cloud') {
            // Газовое облако
            infoText = `<h4>Газовое облако: ${obj.name}</h4>`;
            infoText += `<p>Тип объекта: Газовое облако (статично)</p>`;
            infoText += `<p>Размер: ${obj.radius.toFixed(1)} ед.</p>`;
            infoText += `<p>Расстояние от звезды: ${obj.orbit.toFixed(1)} ед.</p>`;
            infoText += `<p>Состав: Космический газ и космическая пыль</p>`;
        } else {
            // Другие объекты
            infoText = `<h4>${obj.name}</h4>`;
            infoText += `<p>Тип объекта: ${obj.type.replace('_', ' ')}</p>`;
            infoText += `<p>Размер: ${obj.radius.toFixed(1)} ед.</p>`;
            infoText += `<p>Расстояние от звезды: ${obj.orbit.toFixed(1)} ед.</p>`;
            if (obj.isStatic) {
                infoText += `<p>Статус: Статичный объект</p>`;
            } else {
                infoText += `<p>Скорость вращения: ${(obj.rotationSpeed * 100).toFixed(1)}</p>`;
            }
        }
        
        // Добавляем кнопку для возврата к информации о системе
        infoText += `<button id="backToSystemInfo" class="info-button">Вернуться к информации о системе</button>`;
        
        // Обновляем панель информации
        const systemInfoContent = document.getElementById('systemInfoContent');
        if (systemInfoContent) {
            systemInfoContent.innerHTML = infoText;
            
            // Добавляем обработчик для кнопки
            const backButton = document.getElementById('backToSystemInfo');
            if (backButton) {
                backButton.addEventListener('click', () => {
                    this.selectedSystemObject = null;
                    this.updateSystemInfo();
                });
            }
        }
    }
    
    // Выделяем отрисовку названия в отдельный метод для переиспользования
    drawObjectLabel(ctx, x, y, obj) {
        if (!obj || !obj.name) return; // Проверяем наличие объекта и имени
        
        // Гарантируем положительный радиус
        const radius = Math.max(obj.radius || 2, 1);
        
        // Создаем фон для текста
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        const labelWidth = ctx.measureText(obj.name).width + 10;
        
        ctx.fillRect(x - labelWidth / 2, y - radius - 22, labelWidth, 18);
        ctx.strokeStyle = 'rgba(100, 149, 237, 0.7)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x - labelWidth / 2, y - radius - 22, labelWidth, 18);
        
        // Рисуем название
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(obj.name, x, y - radius - 13);
    }
    
    // Добавляем индикатор выбора объекта
    drawSelectionIndicator(ctx, x, y, obj) {
        if (!obj) return; // Проверяем наличие объекта
        
        // Гарантируем положительный радиус
        const radius = Math.max(obj.radius || 2, 1);
        
        // Пульсирующий круг вокруг выбранного объекта
        const pulse = 1 + Math.sin(this.time * 3) * 0.2;
        const highlightRadius = radius * 1.5 * pulse;
        
        ctx.beginPath();
        ctx.arc(x, y, highlightRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, ' + (0.5 + Math.sin(this.time * 4) * 0.2) + ')';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Добавляем второе кольцо
        ctx.beginPath();
        ctx.arc(x, y, highlightRadius * 1.2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(100, 200, 255, ' + (0.3 + Math.sin(this.time * 3) * 0.1) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    
    drawSystemObject(ctx, obj, star) {
        if (!obj || !star) return; // Проверка наличия объекта и звезды
        
        // Проверяем, что радиус положительный
        if (!obj.radius || obj.radius <= 0) {
            console.error('Invalid radius for system object:', obj);
            return;
        }
        
        // Проверяем, что орбита положительная
        if (!obj.orbit || obj.orbit <= 0) {
            console.error('Invalid orbit for system object:', obj);
            return;
        }
        
        // Вычисляем позицию объекта относительно звезды
        // Обновляем угол вращения объекта только если объект не статичный
        if (!obj.isStatic) {
            obj.angle = (obj.angle || 0) + (obj.rotationSpeed || 0.01);
        }
        
        // Вычисляем позицию объекта
        const x = star.x + Math.cos(obj.angle) * obj.orbit;
        const y = star.y + Math.sin(obj.angle) * obj.orbit;
        
        // Рисуем орбиту (не рисуем для космических станций, т.к. они будут вращаться вокруг планет)
        if (obj.type !== 'station') {
            ctx.beginPath();
            ctx.arc(star.x, star.y, obj.orbit, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        // Определяем тип объекта и рисуем соответственно
        if (obj.objectType === 'planet') {
            // Рисуем планету
            const gradient = ctx.createRadialGradient(
                x, y, 0,
                x, y, obj.radius
            );
            gradient.addColorStop(0, this.adjustColor(obj.color, 30));
            gradient.addColorStop(1, obj.color);
            
            ctx.beginPath();
            ctx.arc(x, y, obj.radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Если это выбранный объект, показываем название
            if (this.selectedSystemObject === obj) {
                this.drawSelectionIndicator(ctx, x, y, obj);
                this.drawObjectLabel(ctx, x, y, obj);
            }
            
            // Рисуем луны планеты
            if (obj.moons && obj.moons.length > 0) {
                for (const moon of obj.moons) {
                    // Проверяем радиус луны
                    if (!moon.radius || moon.radius <= 0 || !moon.orbit || moon.orbit <= 0) {
                        console.error('Invalid moon properties:', moon);
                        continue;
                    }
                    
                    // Обновляем угол вращения луны
                    moon.angle = (moon.angle || 0) + (moon.rotationSpeed || 0.03);
                    
                    // Вычисляем позицию луны относительно планеты
                    const moonX = x + Math.cos(moon.angle) * moon.orbit;
                    const moonY = y + Math.sin(moon.angle) * moon.orbit;
                    
                    // Рисуем орбиту луны
                    ctx.beginPath();
                    ctx.arc(x, y, moon.orbit, 0, Math.PI * 2);
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                    
                    // Рисуем луну
                    ctx.beginPath();
                    ctx.arc(moonX, moonY, moon.radius, 0, Math.PI * 2);
                    ctx.fillStyle = moon.color || '#CCCCCC';
                    ctx.fill();
                    
                    // Если это выбранный объект, показываем название
                    if (this.selectedSystemObject === moon || 
                        (this.selectedSystemObject && this.selectedSystemObject.parentPlanet === obj && 
                         this.selectedSystemObject.name === moon.name)) {
                        this.drawSelectionIndicator(ctx, moonX, moonY, moon);
                        this.drawObjectLabel(ctx, moonX, moonY, moon);
                    }
                }
            }
            
            // Рисуем космические станции вокруг планеты
            if (obj.stations && obj.stations.length > 0) {
                for (const station of obj.stations) {
                    // Проверяем параметры станции
                    if (!station.radius || station.radius <= 0 || !station.orbit || station.orbit <= 0) {
                        console.error('Invalid station properties:', station);
                        continue;
                    }
                    
                    // Обновляем угол вращения станции
                    station.angle = (station.angle || 0) + (station.rotationSpeed || 0.06);
                    
                    // Вычисляем позицию станции относительно планеты
                    const stationX = x + Math.cos(station.angle) * station.orbit;
                    const stationY = y + Math.sin(station.angle) * station.orbit;
                    
                    // Рисуем орбиту станции
                    ctx.beginPath();
                    ctx.arc(x, y, station.orbit, 0, Math.PI * 2);
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                    ctx.lineWidth = 0.5;
                    ctx.setLineDash([1, 2]); // Пунктирная линия для орбиты станции
                    ctx.stroke();
                    ctx.setLineDash([]); // Возвращаем сплошную линию
                    
                    // Рисуем станцию
                    this.drawStation(ctx, stationX, stationY, station, station.angle);
                    
                    // Если это выбранный объект, показываем название
                    if (this.selectedSystemObject === station || 
                        (this.selectedSystemObject && this.selectedSystemObject.parentPlanet === obj && 
                         this.selectedSystemObject.name === station.name)) {
                        this.drawSelectionIndicator(ctx, stationX, stationY, station);
                        this.drawObjectLabel(ctx, stationX, stationY, station);
                    }
                }
            }
        } else if (obj.type === 'gas_cloud') {
            // Проверяем радиус газового облака
            if (!obj.radius || obj.radius <= 0) {
                console.error('Invalid radius for gas cloud:', obj);
                return;
            }
            
            // Рисуем газовое облако более ярким и заметным
            // Создаем пульсирующий эффект для облака, но не меняем его положение
            const pulse = 1 + Math.sin(this.time * 0.5) * 0.1; // Медленная пульсация
            const cloudRadius = obj.radius * pulse;
            
            const cloudGradient = ctx.createRadialGradient(
                x, y, 0,
                x, y, cloudRadius
            );
            
            // Делаем облака более яркими и насыщенными
            cloudGradient.addColorStop(0, this.adjustColor(obj.color, 50) + 'BB'); // Более яркий и менее прозрачный
            cloudGradient.addColorStop(0.3, this.adjustColor(obj.color, 20) + '99');
            cloudGradient.addColorStop(0.7, obj.color + '66');
            cloudGradient.addColorStop(1, obj.color + '00'); // Прозрачный край
            
            ctx.beginPath();
            ctx.arc(x, y, cloudRadius, 0, Math.PI * 2);
            ctx.fillStyle = cloudGradient;
            ctx.fill();
            
            // Добавляем внутреннюю структуру облака - неоднородности
            const cloudDetail = 5;
            for (let i = 0; i < cloudDetail; i++) {
                // Используем угол объекта как seed для генерации постоянной структуры
                const seedAngle = obj.angle * 1000 + i * 1000;
                const detailSize = obj.radius * (0.2 + Math.abs(Math.sin(seedAngle)) * 0.3);
                
                // Вычисляем смещение от центра (не слишком далеко)
                const offsetDistance = obj.radius * 0.5 * Math.abs(Math.sin(seedAngle + 500));
                const offsetAngle = seedAngle % (Math.PI * 2);
                
                const detailX = x + Math.cos(offsetAngle) * offsetDistance;
                const detailY = y + Math.sin(offsetAngle) * offsetDistance;
                
                // Создаем градиент для детали облака
                const detailGradient = ctx.createRadialGradient(
                    detailX, detailY, 0,
                    detailX, detailY, detailSize
                );
                
                // Используем цвет, немного отличающийся от основного
                const colorShift = (i % 3 - 1) * 30; // -30, 0 или +30
                detailGradient.addColorStop(0, this.adjustColor(obj.color, 50 + colorShift) + 'AA');
                detailGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                
                ctx.beginPath();
                ctx.arc(detailX, detailY, detailSize, 0, Math.PI * 2);
                ctx.fillStyle = detailGradient;
                ctx.fill();
            }
            
            // Если это выбранный объект, показываем название
            if (this.selectedSystemObject === obj) {
                this.drawSelectionIndicator(ctx, x, y, obj);
                this.drawObjectLabel(ctx, x, y, obj);
            }
        } else if (obj.type === 'station' && !obj.parentPlanet) {
            // Станции, которые не привязаны к планетам (существующие станции на орбите звезды)
            // Рисуем космическую станцию
            this.drawStation(ctx, x, y, obj, obj.angle);
            
            // Если это выбранный объект, показываем название
            if (this.selectedSystemObject === obj) {
                this.drawSelectionIndicator(ctx, x, y, obj);
                this.drawObjectLabel(ctx, x, y, obj);
            }
        } else if (obj.type === 'asteroid_field') {
            // Проверяем радиус астероидного поля
            if (!obj.radius || obj.radius <= 0) {
                console.error('Invalid radius for asteroid field:', obj);
                return;
            }
            
            // Рисуем астероидное поле как группу маленьких точек
            const baseRadius = obj.radius * 0.8; // Область, в которой расположены астероиды
            
            // Создаем градиент для области астероидного поля
            const fieldGradient = ctx.createRadialGradient(
                x, y, 0,
                x, y, baseRadius
            );
            fieldGradient.addColorStop(0, 'rgba(150, 150, 150, 0.2)');
            fieldGradient.addColorStop(1, 'rgba(100, 100, 100, 0)');
            
            ctx.beginPath();
            ctx.arc(x, y, baseRadius, 0, Math.PI * 2);
            ctx.fillStyle = fieldGradient;
            ctx.fill();
            
            // Рисуем случайно расположенные астероиды
            // Используем хэш от угла объекта для стабильного отображения
            const seedValue = Math.sin(obj.angle * 1000) * 10000;
            const asteroidCount = 15;
            
            for (let i = 0; i < asteroidCount; i++) {
                // Генерируем псевдослучайные позиции на основе seedValue и i
                const randAngle = (seedValue + i * 100) % (Math.PI * 2);
                const randDistance = ((seedValue + i * 200) % 100) / 100 * baseRadius;
                
                const asteroidX = x + Math.cos(randAngle) * randDistance;
                const asteroidY = y + Math.sin(randAngle) * randDistance;
                const asteroidSize = 0.5 + ((seedValue + i) % 10) / 10;
                
                // Убедимся, что размер астероида положительный
                if (asteroidSize > 0) {
                    ctx.beginPath();
                    ctx.arc(asteroidX, asteroidY, asteroidSize, 0, Math.PI * 2);
                    ctx.fillStyle = obj.color;
                    ctx.fill();
                }
            }
            
            // Если это выбранный объект, показываем название
            if (this.selectedSystemObject === obj) {
                this.drawSelectionIndicator(ctx, x, y, obj);
                this.drawObjectLabel(ctx, x, y, obj);
            }
        } else if (obj.type === 'anomaly') {
            // Проверяем радиус аномалии
            if (!obj.radius || obj.radius <= 0) {
                console.error('Invalid radius for anomaly:', obj);
                return;
            }
            
            // Рисуем пространственную аномалию как мерцающее искажение
            const anomalyGradient = ctx.createRadialGradient(
                x, y, 0,
                x, y, obj.radius
            );
            
            // Мерцающий эффект для аномалии
            const pulseIntensity = 0.5 + Math.sin(this.time * 3) * 0.3;
            
            anomalyGradient.addColorStop(0, 'rgba(255, 0, 255, ' + pulseIntensity + ')');
            anomalyGradient.addColorStop(0.5, 'rgba(100, 0, 150, ' + pulseIntensity * 0.7 + ')');
            anomalyGradient.addColorStop(1, 'rgba(50, 0, 100, 0)');
            
            ctx.beginPath();
            ctx.arc(x, y, obj.radius, 0, Math.PI * 2);
            ctx.fillStyle = anomalyGradient;
            ctx.fill();
            
            // Добавляем энергетические вспышки вокруг аномалии
            const flashCount = 5;
            const flashRadius = obj.radius * 1.2;
            
            for (let i = 0; i < flashCount; i++) {
                const flashAngle = this.time * 2 + i * (Math.PI * 2 / flashCount);
                const flashX = x + Math.cos(flashAngle) * flashRadius;
                const flashY = y + Math.sin(flashAngle) * flashRadius;
                const flashSize = obj.radius * 0.2 * (0.5 + Math.sin(this.time * 4 + i) * 0.5);
                
                // Проверяем, что размер вспышки положительный
                if (flashSize > 0) {
                    ctx.beginPath();
                    ctx.arc(flashX, flashY, flashSize, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255, 100, 255, ' + (0.7 + Math.sin(this.time * 5 + i) * 0.3) + ')';
                    ctx.fill();
                }
            }
            
            // Если это выбранный объект, показываем название
            if (this.selectedSystemObject === obj) {
                this.drawSelectionIndicator(ctx, x, y, obj);
                this.drawObjectLabel(ctx, x, y, obj);
            }
        } else if (obj.type === 'ruins') {
            // Проверяем радиус руин
            if (!obj.radius || obj.radius <= 0) {
                console.error('Invalid radius for ruins:', obj);
                return;
            }
            
            // Рисуем древние руины как золотистую структуру
            ctx.save();
            ctx.translate(x, y);
            
            // Базовая структура руин
            ctx.beginPath();
            ctx.arc(0, 0, obj.radius * 0.8, 0, Math.PI * 2);
            ctx.fillStyle = obj.color;
            ctx.fill();
            
            // Добавляем детали руин
            ctx.strokeStyle = this.adjustColor(obj.color, 30);
            ctx.lineWidth = obj.radius * 0.2;
            
            // Внутренняя структура руин - символы и узоры
            for (let i = 0; i < 5; i++) {
                const angle = i * (Math.PI * 2 / 5);
                const length = obj.radius * 0.6;
                
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
                ctx.stroke();
            }
            
            // Кольцо вокруг руин
            ctx.beginPath();
            ctx.arc(0, 0, obj.radius, 0, Math.PI * 2);
            ctx.strokeStyle = this.adjustColor(obj.color, -20);
            ctx.lineWidth = obj.radius * 0.1;
            ctx.stroke();
            
            // Добавляем эффект свечения
            const glowRadius = obj.radius * 1.3;
            const glowGradient = ctx.createRadialGradient(0, 0, obj.radius, 0, 0, glowRadius);
            glowGradient.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
            glowGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
            
            ctx.beginPath();
            ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
            ctx.fillStyle = glowGradient;
            ctx.fill();
            
            ctx.restore();
            
            // Если это выбранный объект, показываем название
            if (this.selectedSystemObject === obj) {
                this.drawSelectionIndicator(ctx, x, y, obj);
                this.drawObjectLabel(ctx, x, y, obj);
            }
        } else {
            // Проверяем радиус для прочих объектов
            if (!obj.radius || obj.radius <= 0) {
                console.error('Invalid radius for object:', obj);
                return;
            }
            
            // Для всех остальных типов рисуем стандартный объект
            ctx.beginPath();
            ctx.arc(x, y, obj.radius, 0, Math.PI * 2);
            ctx.fillStyle = obj.color || '#AAAAAA';
            ctx.fill();
            
            // Если это выбранный объект, показываем название
            if (this.selectedSystemObject === obj) {
                this.drawSelectionIndicator(ctx, x, y, obj);
                this.drawObjectLabel(ctx, x, y, obj);
            }
        }
    }
    
    // Отдельный метод для рисования космической станции
    drawStation(ctx, x, y, station, angle) {
        // Проверяем радиус станции
        if (!station.radius || station.radius <= 0) {
            console.error('Invalid radius for station:', station);
            return;
        }
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        
        // Центральная часть
        ctx.beginPath();
        ctx.arc(0, 0, station.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = station.color || '#AAAAFF';
        ctx.fill();
        
        // Крестообразные отсеки
        ctx.fillStyle = this.adjustColor(station.color || '#AAAAFF', -20);
        
        // Горизонтальный отсек
        ctx.fillRect(-station.radius, -station.radius * 0.3, station.radius * 2, station.radius * 0.6);
        
        // Вертикальный отсек
        ctx.fillRect(-station.radius * 0.3, -station.radius, station.radius * 0.6, station.radius * 2);
        
        // Добавляем детали - солнечные панели
        ctx.fillStyle = this.adjustColor(station.color || '#AAAAFF', 30);
        ctx.fillRect(-station.radius, -station.radius * 0.8, station.radius * 0.3, station.radius * 0.6);
        ctx.fillRect(station.radius - station.radius * 0.3, -station.radius * 0.8, station.radius * 0.3, station.radius * 0.6);
        ctx.fillRect(-station.radius, station.radius * 0.2, station.radius * 0.3, station.radius * 0.6);
        ctx.fillRect(station.radius - station.radius * 0.3, station.radius * 0.2, station.radius * 0.3, station.radius * 0.6);
        
        ctx.restore();
    }
}

// Ждем загрузки страницы и запускаем игру
window.addEventListener('load', () => {
    new SpaceGame();
}); 