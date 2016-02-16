"use strict";

var GameEngine = GameEngine || {};

GameEngine.TextFileLoader = (function(){
    var _TextFileType = Object.freeze({ XMLFile: 0, TextFile: 1 });

    var _LoadTextFile = function(fileName, fileType, callback){
        if(!GameEngine.ResourceMap.IsAssetLoaded(fileName)){
            GameEngine.ResourceMap.AsyncLoadRequest(fileName);
            var _request = new XMLHttpRequest();
            _request.onreadystatechange = function(){
                if(_request.readyState === 4 && _request.status !== 200) alert(fileName + ": loading failed!");
            };
            _request.open("GET", fileName, true);
            _request.setRequestHeader("Content-Type", "text/xml");
            _request.onload = function(){
                var _content = null;
                if(fileType === _TextFileType.XMLFile){
                    var _parser = new DOMParser();
                    _content = _parser.parseFromString(_request.responseText, "text/xml");
                } else _content = _request.responseText;
                GameEngine.ResourceMap.AsyncLoadComplete(fileName, _content);
                if(callback !== null && callback !== undefined) callback(fileName);
            };
            _request.send();
        } else{
            if(callback !== null && callback !== undefined) callback(fileName);
        }
    };

    var _UnloadTextFile = function(fileName){ GameEngine.ResourceMap.UnloadAsset(fileName) };

    return {
        LoadTextFile: _LoadTextFile,
        UnloadTextFile: _UnloadTextFile,
        TextFileType: _TextFileType
    };
}());