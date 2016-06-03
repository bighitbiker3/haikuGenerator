var fs = require('fs');
var cmuDictFile = readCmudictFile('./cmudict.txt');
var formattedDict = formatData(cmuDictFile);
var macbethFile = readCmudictFile('./macbeth.txt');

function readCmudictFile(path){
  return fs.readFileSync(path).toString()
}

function formatData(data){
  var lines = data.toString().split('\n');
  var lineSplit;
  var array = [];
  lines.forEach(function(line){
    lineSplit = line.split('  ');
    array.push(lineSplit)
  })
  return array;
}


function createHaiku(structure, oneWord){
  if(structure === undefined){
    throw "You need to define a structure argument"
  }
  var finalHaiku = '';
  if(oneWord == false || oneWord == undefined){
    structure.forEach(function(syl){
      var syLeft = syl;
      while(syLeft > 0){
        var randomIndex = Math.floor(Math.random() * formattedDict.length + 1);
        var syllCount = (formattedDict[randomIndex][1].match(/\d/g) || []).length;
        if(syLeft - syllCount >= 0){
          finalHaiku += formattedDict[randomIndex][0] + ' ';
          syLeft -= syllCount
        }
      }
      finalHaiku += '\n'
    })
    finalHaiku = finalHaiku.replace(/\(\d\)/g, '')
  }
  else if(oneWord == true){
    var object = {};
    structure.forEach(function(syl){
      if(object[syl] === undefined){
        object[syl] = []
        formattedDict.forEach(function(index){
          if(index[1] !== undefined){
            var syllCount = (index[1].match(/\d/g) || []).length;
            if(syllCount == syl) {
              object[syl].push(index[0])
            }
          }
        })
      }
    })
    structure.forEach(function(syl){
      var randomIndex = Math.floor(Math.random() * (object[syl].length - 0 + 1))
      finalHaiku += object[syl][randomIndex] + '\n'
    })
    finalHaiku = finalHaiku.replace(/\(\d\)/g, '')
  }
  return finalHaiku
};


module.exports = {
  createHaiku: createHaiku,
}
