"use strict";

let pickerInput = document.querySelector("[data-picker='input']");
let pickerOutput = document.querySelector("[data-picker='output']");

// =============
// Пример данных для подстановки и проверки
// =============
// let mock = `Трамвай	92 
// Potsdam Kirschallee	0-08
// Трамвай	92 
// Potsdam Kirschallee	0 28
// Трамвай	92 
// Potsdam Kirschallee	4.08
// Трамвай	92 
// Potsdam Kirschallee	4,28
// Трамвай	92 
// Potsdam Kirschallee	1037
// Трамвай	92 `;;
// input.value = mock;
// pick(mock);
// =============


// Обработчик каждого изменения поля "input"
pickerInput.addEventListener("input", input_Input_Handler);


// =================================================================
// ФУНКЦИИ
// =================================================================
// 
function pick(data) {
  // 1. Поиск массива времени отправлений по шаблону
  let times = searchTimes(data);
  if (!times) return;
  // console.log( times );

  // 2. Обработка массива найденных вхождений
  times = times.map(time => {
    // 2.1 Удалить разделитель, если он есть
    time = deleteSeparator(time);

    // 2.2 Задать формат 4 символов hhmm
    time = fourSumbols(time);

    // 2.3 Добавить разделитель - двоеточие
    time = semicolonSeparator(time);
    
    // console.log( item );
    return time;
  })

  // 3. Заполнить поле результата выборки
  fillOutput(times);
}


// Поиск массива времени отправлений по шаблону
function searchTimes(inputData) {
  // - Количество часов: 1 или 2 цифры
  // - Разделитель: 0 или 1 символ (не число и не буква)
  // - Количество минут: 2 цифры
  return inputData.match(/\d?\d[^\d\w]{0,1}\d\d/g);
}


// Удалить разделитель, если он есть
function deleteSeparator(time) {
  return time.replace(/[^\d\w]/, "");
}


// Задать формат 4 символов hhmm
function fourSumbols(time) {
  if (time.length >= 4) return time;

  return "0" + time;
}


// Добавить разделитель - двоеточие
function semicolonSeparator(time) {
  return time.substring(0, 2) + ":" + time.substring(2, 4);
}


// Заполнить поле результата выборки
function fillOutput(times) {
  pickerOutput.value = times.join(", ");
}



// =================================================================
// ОБРАБОТЧИКИ
// =================================================================
function input_Input_Handler(evt) {
  pick(evt.target.value);
}