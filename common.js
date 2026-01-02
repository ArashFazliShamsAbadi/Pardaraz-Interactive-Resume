export const urbanprojectsEl = document.querySelector('#urbanprojects');
export const architectureprojectsEl = document.querySelector('#architectureprojects');
export const trafficprojectsEl = document.querySelector('#trafficprojects');
export const buildingsupervisionprojectsEl = document.querySelector('#buildingsupervisionprojects');
export const searchprojectEl = document.querySelector('.search__input');
export const searchformEl = document.querySelector('.search');
export const searchbarEl = document.querySelector('.search__input');

export const state = {
    searchedItems : new L.layerGroup(),
    results: []
};