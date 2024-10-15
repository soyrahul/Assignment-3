const setData = require('../data/setData');
const themeData = require('../data/themeData');

let sets = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      sets = setData.map(set => {
        const theme = themeData.find(theme => theme.id === set.theme_id)?.name || 'Unknown';
        return {
          ...set,
          theme
        };
      });
      resolve();
    } catch (error) {
      reject('Error initializing sets data');
    }
  });
}

function getAllSets() {
  return new Promise((resolve, reject) => {
    if (sets.length > 0) {
      resolve(sets);
    } else {
      reject('No sets available');
    }
  });
}

function getSetByNum(setNum) {
  return new Promise((resolve, reject) => {
    const set = sets.find(s => s.set_num === setNum);
    if (set) {
      resolve(set);
    } else {
      reject(`Unable to find set with set_num: ${setNum}`);
    }
  });
}

function getSetsByTheme(theme) {
  return new Promise((resolve, reject) => {
    const matchingSets = sets.filter(s => s.theme.toLowerCase().includes(theme.toLowerCase()));
    if (matchingSets.length > 0) {
      resolve(matchingSets);
    } else {
      reject(`Unable to find sets with theme: ${theme}`);
    }
  });
}

module.exports = {
  initialize,
  getAllSets,
  getSetByNum,
  getSetsByTheme
};
